## Theme refactor

- [x] fix build errors from broken templates
- [T] rewrite sass to scss
- [x] fix issue with highlighter and code fences
  - turns out it was just a zen browser thing all along
- [x] style single blog post first
- [x] print post tags at bottom of post meta data section
- [x] get libsass installed locally
  - [x] switch transpiler to "dartsass" in head.html
  - [x] update vulcan to include dartsass
- [ ] Refactor the config.toml global file to the newer more modulular config
- [ ] fix to-top button svg fill to match the rest of the buttons 

## 

- [x] implement h-card
- [x] Implement h-entry
  - [x] post
- [x] Implement h-feed
- [x] IndieAuth
  - [x] indieauth.com
  - [x] Indie OAuth client [more](https://indieweb.org/IndieAuth)
- [ ] webmentions
- [ ] bridgy
- [x] add webring

- [ ] Look at microblog
- [x] fix date in some posts metadata section in the header. Recent change caused issues

## Bugs 

- [x] Fix line numbers appearing on code blocks

## Books

- [ ] Setup micropub
- [ ] https://indiebookclub.biz

## Backlog

- [x] Make cheatsheet for hugo
  - `<pre>{{ debug.Dump .Site.Menus.social }}</pre>`
- [x] Make cheatsheet archetype for scaffolding quicker
- [x] Look for jetbrains hugo plugin
- [ ] write plugin to pull github project stats. Activity, releases, license, etc
- [ ] Implement Reading list
  - inspiration: 
    - https://blog.zmh.org/bookshelf/
    - https://www.jvt.me/kind/reads/
    - https://www.jvt.me/kind/listens/
    - https://joelchrono.xyz/ 
    - https://mtwb.blog/
- [x] Refactor theme to separate site structure markup from theming logic
  - Have ability to switch themes at some point in the future
- [ ] switch to a more open analytics and tracking tool
- [ ] Replace "zietlow.io" in main menu with home icon
- [ ] Add little user icon before author in post-meta-data
- [ ] Add little tag like icon before categories in post- single template
- [ ] Homepage should be feed of all content
- [ ] Only blog content should be a part of the h-feed
- [x] look more into indieauth
- [ ] Add client side search.
- [ ] Finish updated the scrivener project post 
- [x] Add license to goFxSocial
- [ ] Add credit and attribution to Jamie and changelog for really energizing me on this
- [ ] Update the /project type to contain more info to their project page. Or should the links just go directly to the github page instead?
- [ ] Add section of books "to read" in library section
- [ ] fix go theming on fedora. currently not rendering scss

## Even later backlog
- [ ] https://indiepass.app/
- [ ] Finish uses page
- [ ] Add my site to [uses.tech](https://github.com/wesbos/awesome-uses/)
- [ ] Stats page like [lanre](https://lanre.wtf/stats)
