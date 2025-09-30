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

## Neovim Basics

{{<three-column>}}

{{<cheatsheet-section>}}
### Open New Pane

opens a in-memory file (buffer) and creates a viewport of that buffer (window)

```
<c-w> v     - split window vertically
:vsplit :vs - alais for above
<c-w><c-s>  - split window in 2 horizontally
:split :sp  - alais for above 
:sp +term   - opens window and creates new terminal session
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Navigate between nvim panes
```
<c-w-h> - Moves the cursor to the left pane.
<c-w-j> - Moves the cursor to the lower pane.
<c-w-k> - Moves the cursor to the upper pane.
<c-w-l> - Moves the cursor to the right pane.
```
{{</cheatsheet-section>}}

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
{{<cheatsheet-section>}}
### Todo

```
:TodoQuickFix   - list all todos in project
:TodoTelescope  - list all todos in telescope
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Coding

```
<shift-k>     - show function definiton in tooltip
```
{{</cheatsheet-section>}}


{{<cheatsheet-section>}}
### Diagnostic

```
space-q       - show all diagnostic messages
space-sd      - search diagnostics
<c-W>d         - show diagnostic under cursor

```
{{</cheatsheet-section>}}
### Coding

```
<shift-k>     - show function definiton in tooltip
```
{{</cheatsheet-section>}}
### Coding

```
<shift-k>     - show function definiton in tooltip
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
<c-shift-enter> - new window
<c-shift-n>     - new os window
```
{{</cheatsheet-section>}}


{{<cheatsheet-section>}}
### Tmux

```
tmux new -s sessionName - Start a new session with name
tmux a -t sessionName   - Attach to session with given name
tmux ls                 - list all sessions
tmux kill-session -t sessionName
<c-b> + d               - detact from session
```
{{</cheatsheet-section>}}

{{</three-column>}}


