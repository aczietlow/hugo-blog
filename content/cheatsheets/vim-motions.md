---
title: "Vim Motions"
date: 2025-01-22T10:45:51-05:00
tags: [
  "neovim",
  "Cheatsheet"
]
codeLineNumbers: false
teaser: "Cheatsheet of vim motions"
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
{{<cheatsheet-section>}}
### Visual Modes

```
v - visual mode
V - line visual mode
```
{{</cheatsheet-section>}}

{{</two-column>}}


