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

{{<two-column>}}

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
### Screen Navigation

```
G - end of file
gg || :0 - beginning of the file
% - jump to matching '()', '{}', '[]'
<c-b> - page up
<c-f> - page down
```
{{</cheatsheet-section>}}


{{<cheatsheet-section>}}
### Line Navigation

```
0 - Move to beginning of line
^ - First non-blank char of line
$ - End of the line
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Word Navigation

```
w   - next word
b   - prev word
0   - start of line
^   - first non-blank char of line
$   - end of line
```

{{</cheatsheet-section>}}

{{<cheatsheet-section>}}

### Text Editing

```
a   - append
A   - append from the end of the line
o   - insert from new line
O   - insert from prev line
x   - delete char under cursor
s   - delete character & insert
S   - Delete line and insert
C   - delete to the end of line and insert
r   - replace single character
R   - Enter Replace mode
```

{{</cheatsheet-section>}}


{{<cheatsheet-section>}}

### Clipboard

``` 
u     - undo
<c-r> - redo
```
{{</cheatsheet-section>}}

{{</two-column>}}

## More Vim


{{<two-column>}}

{{<cheatsheet-section>}}
### Select within (), \{}

```
:vi(  - select text within ()
:vib  - select text within ()

:vi{  - select text within {}
:viB  - select text within {}

```

{{</cheatsheet-section>}}

{{</two-column>}}
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


