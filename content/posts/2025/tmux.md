---
title: "Tmux" # Title of the blog post.
date: 2025-06-29T17:42:18-04:00 # Date of post creation.
description: "Experimenting with tmux" # Description used for search engine.
categories:
  - development workflow
tags:
  - tmux
---


Working from neovim and writing go code I find myself often cycling through multiple terminal windows while working on projects. This cycles between iterm and ghostty terminal and splits within neovim itself depending on my environment. Often resulting in a cacophony of windows, panes, and red yarn connecting the dots... There has to be a better way. Or moreover I'm tired of relying on a different set of application keybindings, alt-tab, and my mouse. The overall design of my workflow is to keep laser focus by keeping everything within a single window, and reducing the amount of time switching between different programs or reaching for the mouse. [Tmux](https://github.com/tmux/tmux) has always been the obvious answer for improvement.

Tmux is a terminal multiplexer, or a program run from within a terminal that allows for running multiple terminals, all accessed from a single terminal. Tmux is also useful for running detached commands. Detached commands are particularly useful for long running commands, or commands running over SSH, where a break in connection could terminate the running command.

## My Tmux newborn Workflow

Goals
> - quickly navigate between writing, executing, and testing code
> - group projects together by context (e.g. leave side project Bookworm and main work projects in a state where I can easily jump between them)

### Tmux sessions 

- `tmux` - makes a new tmux session and drops you into the session. Session will be giving a numeric, autoincrementing name, starting with 0
- `tmux new -s <session-name>` - Creates a new session with the provided name 
- `tmux a -t <session-name>` - Reattaches to a session by name 
- `prefix + d` - detach from a tmux session, and keep it running for later

Note: I've remapped my tmux prefix from c-b to c-a

### Window Management

- `prefix + c` - makes a new window
- `prefix + [0-9]` - jump to specific window
- `prefix + w` - a select list of all windows

### My Custom tmux config

```
# My brain does better with base index 1 when pressing `prefix [0-9]
set -g base-index 1

# Set the prefix to Ctrl+a
set -g prefix C-a

# Remove the old prefix
unbind C-b

# Send Ctrl+a to applications by pressing it twice
bind C-a send-prefix

# Better colors
set -g status-style 'bg=#333333 fg=#5eacd3'

# vim-like pane switching
bind -r ^ last-window
```

## Hello World Example

{{< gallery >}}
  {{< gallery-item src="/images/blogs/2025/tmux-session/tmux.png" alt="tmux session" >}}
  {{< gallery-item src="/images/blogs/2025/tmux-session/tmux-go-execute.png" alt="executing code in tmux window" >}}
  {{< gallery-item src="/images/blogs/2025/tmux-session/tmux-test.png" alt="testing code in tmux window" >}}
{{< /gallery >}}

## What's next

Look more into [tmux sessionizer](https://github.com/ThePrimeagen/tmux-sessionizer) and continue to improve my local tmux config.
