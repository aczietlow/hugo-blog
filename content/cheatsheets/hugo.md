---
title: "Hugo"
date: 2024-04-27T16:14:11-04:00
tags: [
  "hugo",
  "Cheatsheet"
]
teaser: "Basic Hugo Usages and some handy tips and tricks"
codeLineNumbers: false
---

{{< three-column>}}

{{<cheatsheet-section>}}
### Compiling website

```shell
# Recompile
hugo --gc
```

```shell
# Recompile in developer friendly mode
# -D Enabled compiling drafts
# -F content with future post dates
# - ignore cache
hugo -D -F --ignoreCache
```

```shell
# Recompile assets for production
# - remove unused cache after build
# - minify supported output
hugo --gc --minify
```

{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### Working locally

```shell
# Run server locally with live reloading
# e.g. http://localhost:1313
hugo server
```

```shell
# Select non-default theme
# matches directory within /themes
hugo server -t hugo-clarity
```

```shell
# Work via local webserver
# - enables drafts
# - enables future dated content
hugo server -D -F
```

{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### Letting Hugo Scaffold New Content

```sh
# Generate new content
# - automatically sets the date
# Selects the kind of post based on path
# Attempts to find & use archetype
`hugo new projects/some-new-project.md`
```

```sh
# A kind of post can be specific with -k
`hugo new -k gallery blog/photo-gallery.md`
```

{{</cheatsheet-section>}}

{{< /three-column>}}

## Theming

{{< three-column>}}
{{< cheatsheet-section>}}
### Dumping variable in theme
```html
<!--Display variable debug info-->
<pre>{{ debug.Dump .Params }}</pre>
```
{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}
### Conditional check for homepage
```html
<!--Available within Page Object -->
{{ if .IsHome }}
  <h1>Homepage!</h1>
{{ end}
```
{{</ cheatsheet-section>}}

{{< /three-column>}}
