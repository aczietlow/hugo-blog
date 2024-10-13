---
title: "Game Streaming With Nginx on a Pi" # Title of the blog post.
date: 2024-09-05T18:49:05-04:00 # Date of post creation.
description: "Article description." # Description used for search engine.
featured: true # Sets if post is a featured post, making appear on the home page side bar.
draft: true
toc: false # Controls if a table of contents should be generated for first-level links automatically.
# menu: main
featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
thumbnail_byline: "Byline under thumbnail image" # Sets a byline under the thumbnail image
shareImage: "/images/path/share.png" # Designate a separate image for social media sharing.
codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: false # Override global value for showing of line numbers within code block.
figurePositionShow: true # Override global value for showing the figure label.
categories:
  - Technology
tags:
  - Tag_name1
  - Tag_name2
# comment: false # Disable comment if false.
---

Install nginx

nginx-extras package isn't available on a pi. 

Check if nginx is configured to use the streaming module
`nginx -V 2>&1 | grep -- '--modules-path'`


If not install [libnginx-mod-stream](https://packages.debian.org/bullseye/libnginx-mod-stream)

```
sudo apt update
sudo apt install libnginx-mod-stream
```

Check where nginx modules are stored

`nginx -V 2>&1 | grep -- '--modules-path'`


validate that the stream module is present `sudo ls /usr/lib/nginx/modules | grep stream`

You should see the following:

`ngx_stream_module.so`


Enable this module to load within the nginx conf
`sudo vim /etc/nginx/nginx.conf`


validate the nginx config

`sudo nginx -t`
