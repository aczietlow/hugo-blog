---
title: "Local Dev with NeoVim"
date: 2024-10-04
tags: [
  "neovim",
  "Cheatsheet"
]
teaser: "Fedora, nvim, tmux, and OS shortcuts"
codeLineNumbers: false
---

## VIM Basics

{{<three-column>}}

{{<cheatsheet-section>}}
### Movement
```
↑ - k
← - h
→ - l
↓ - j
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Words 

```
w - next word
b - previous word
e - end of next word
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Exit 

```
:q - quit 
:qw - save & quit
:w - save
:q! - quit without saving
```

{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Navigation

```
G - end of file
gg || :0 - beginning of the file
% - jump to matching '()', '{}', '[]'
<c-B> - page up
<c-F> - page down
```
{{</cheatsheet-section>}}

{{</three-column>}}

## Neovim Basics

{{<three-column>}}


{{<cheatsheet-section>}}

### Fuzzy Finder (Telescope)
```
:Telescope  - to launch
<c-/>       - insert mode while in Telescope
?           - normal mode while in Telescope
<c-c>       - close telescope 
```

{{</cheatsheet-section>}}


{{<cheatsheet-section>}}
### Keymaps for Telescope
```
space-sh  - search help
space-sk  - search keymaps
```
{{</cheatsheet-section>}}


{{</three-column>}}
