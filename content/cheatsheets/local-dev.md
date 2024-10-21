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
<c-b> - page up
<c-f> - page down
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}

### Text Editing

```
a   - append
A   - append from the end of the line
i   - insert
o   - insert from new line
O   - insert from prev line
s   - delete character & insert
S   - Delete line and insert
C   - delete to the end of line and insert
r   - replace single character
R   - Enter Replace mode
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

{{<cheatsheet-section>}}
### Harpoon
```
space-a   - add to list
<c-e>     - show list
<c-1>     - Select 1 from list
<c-2>     - Select 2 from list
<c-3>     - Select 3 from list
<c-4>     - Select 4 from list
```
{{</cheatsheet-section>}}
{{</three-column>}}

## Local Dev Tools

{{<three-column>}}

{{<cheatsheet-section>}}
### Kitty Terminal

```
<c-shift-t>     - new tab
<c-shift-q>     - close tab
<c-shift-right> - next tab
<c-shift-left>  - previous tab
```
{{</cheatsheet-section>}}

{{</three-column>}}

