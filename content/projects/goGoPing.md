---
title: "GoGoPing"
date: 2021-08-21
tags: [
  "go"
]
teaser: "For fun and freedom, rewriting ping.c in go"
codeLineNumbers: true
thumbnail: "images/projects/git-logo.png"
source: https://github.com/aczietlow/goGoPing
#license: Apache-2.0
#latest: 2024.4.3 # Latest Release
activity: 2022-10-22
---

A rewrite of the ping application from C to go. Create a tool that is useful in debugging connections to the Internet.

At the time of writing this I had a specific use case that allowing ping to utilize concurrency for very specific testing (scaling network pings to multiple hosts in as efficient a way as possible). This later turned into nothing more than an opportunity for me to write more Go code and build a better understanding of berkley sockets and UDP. 

![Network Diagram of Ping](/images/projects/go-ping-networking.jpg)

![Ping Echo Flow Request](/images/projects/go-ping-echo-flow-request.jpg)