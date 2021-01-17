---
title: "Lightbox Gallery with Go Templates in Hugo"
date: 2021-01-11T08:43:33-05:00
draft: true
tags: [
  "Markdown",
  "hugo",
  "Go Templates",
  "css"
]
categories: [
  "themes"
]
---

I typically spend my weekends shooting landscape photography or hacking away my newest side project.  Trying to start the new year off by killing two birds with one stone, I embarked to enable a lightweight lightbox component into my fresh hugo blog.

I wanted a reusable component, once complete I could quickly drop in any future blog post to share a new series of photos. Given that I choose Hugo based on the ease of writing content within Markdown, I didn't want to deviate to far from that paradigm. Not wanting to add markup with my markdown files, I quickly landed on implementing new *Shortcodes*.

*Shortcodes* within Hugo were designed for adding markup rich content within markdown without breaking the simplicity of markdown. Hugo actually ships with several simple yet common Shortcodes. E.g. If an author wanted to embed an youtube video they could simply use the following within their markdown.

```html
    {{</* youtube _X8NzH12INY */>}}
```

To use Shortcodes Hugo will match the shortcode using the first word in within the snippet to match a corresponding template. All shortcode templates must be located within `layouts/shortcodes`. Parameters can follow the name, are space deliminated, and can be either name or positioned. So the following `{{</* foo bar baz */>}}` will load the template `templates/shortcodes/foo.html` and pass `bar` and `baz` as parameters to the template.

I'll add a new template to match my gallery desires. I need the number of images added to a gallery to be variable, so I'll create a separate shortcode for the gallery item. I plan on nested the gallery item shortcode within the gallery. To access this child shortcode I'll use the `.Inner` variable.

```html
<!--layouts/shortcodes/gallery.html-->
<div class="gallery">
  {{.Inner}}
</div>
```

Next I'll add the html for the gallery items.

```html
<!--layouts/shortcodes/gallery-item.html-->
{{- $src := .Get "src" -}}
{{- $alt := .Get "alt" -}}
{{- $caption := .Get "caption" -}}
{{- $dimension := .Get "dimension" -}}
{{ with $dimension }}
{{ else }}
    {{ $dimension = "1x1" }}
{{ end }}

<div class="gallery-item item-{{$dimension}}">
    <img class="thumb placeholder" src="{{$src}}" data-src="{{$src}}" data-image="{{$src}}" data-title="{{$alt}}" alt="{{$alt}}">
    {{ with $caption }}
        <div class="caption"><span>{{$caption}}</span></div>
    {{ end }}
</div>
```

Some decisions may start to become clear looking at the above template. I've decided to pass named parameters of "src", "alt", "caption", and "dimension" to the gallery items. This will allow me to control variations on the final rendered gallery from the content markdown files. Photo captions will be optional, and dimensions will have a default value of "1x1" if a value is not provided.



No to add the newly created Shortcodes to a content post markdown file. 

```gotemplate
{{</* gallery */>}}
    {{</* gallery-item src="https://via.placeholder.com/500" alt="placeholder 1x1" caption="Caption 1" dimension="1x1" */>}}
    {{</* gallery-item src="https://via.placeholder.com/800x500" alt="placeholder 8x5" caption="Caption 2" dimension="8x5" */>}}
    {{</* gallery-item src="https://via.placeholder.com/300x400" alt="placeholder 3x4" caption="Caption 3" dimension="3x4" */>}}
{{</* /gallery */>}}
```

42 ms later when Hugo is done with a fresh site rebuild the newly added shortcode will render the following HTML.

```html
<div class="gallery">
    <div class="gallery-item item-1x1">
        <img alt="placeholder 1x1" class="thumb" data-image="https://via.placeholder.com/500" data-pos="1" data-src="https://via.placeholder.com/500" data-title="placeholder 1x1" loading="lazy" src="https://via.placeholder.com/500"><p class="img_alt">placeholder 1x1</p>
        <div class="caption"><span>Caption 1</span></div>
    </div>
    <div class="gallery-item item-8x5">
        <img alt="placeholder 8x5" class="thumb" data-image="https://via.placeholder.com/800x500" data-pos="2" data-src="https://via.placeholder.com/800x500" data-title="placeholder 8x5" loading="lazy" src="https://via.placeholder.com/800x500"><p class="img_alt">placeholder 8x5</p>
        <div class="caption"><span>Caption 2</span></div>
    </div>
    <div class="gallery-item item-3x4">
        <img alt="placeholder 3x4" class="thumb" data-image="https://via.placeholder.com/300x400" data-pos="3" data-src="https://via.placeholder.com/300x400" data-title="placeholder 3x4" loading="lazy" src="https://via.placeholder.com/300x400"><p class="img_alt">placeholder 3x4</p>
        <div class="caption"><span>Caption 3</span></div>
    </div>
</div>
```

After some quick [Sass](https://github.com/aczietlow/hugo-blog/blob/master/assets/sass/gallery.sass) and [JS](https://github.com/aczietlow/hugo-blog/blob/master/assets/js/gallery.js) using Hugo's [pipes asset management](https://gohugo.io/hugo-pipes/introduction/) (both of which are outside the scope of this blog post), I'm left with a shortcode I can quickly drop into future posts to share a new photo collections. For more comprehensive information on Shortcodes read [the Hugo documentation](https://gohugo.io/templates/shortcode-templates/).

{{< gallery >}}
  {{< gallery-item src="https://live.staticflickr.com/7901/47368926912_61a1122d76_k.jpg" alt="Glass Orb Photo by Chris Zietlow" caption="Charleston Battery Park" dimension="3x4" >}}
  {{< gallery-item src="https://live.staticflickr.com/4855/45173560614_72ec13aecc_k.jpg" alt="Fall Shoot Photo by Chris Zietlow" dimension="4x3">}}
  {{< gallery-item src="https://live.staticflickr.com/65535/48705742973_1a13a6f07c_k.jpg" alt="New Orlenes Photo by Chris Zietlow" dimension="4x3" caption="St Louis Cathedral in New Orlenes">}}
{{< /gallery >}}
