---
title: Scrivener
date: 2024-04-19
tags: [
  "docker",
  "jellyfin"
]
draft: false
teaser: "Transcoding automation for ripped MKV video containers to MP4 containers"
codeLineNumbers: true
thumbnail: "images/projects/git-logo.png"
source: https://github.com/aczietlow/phishSlapped
#license: MIT License
activity: 2023-09-06
---

## Introduction

A utility to transcode ripped DVD and Blu-ray media MKV into MP4 containers. This would be useful for converting physical DVDs into stream ready media for Jellyfin or Plex

![Flow chart of logic for transcoding physical media](https://raw.githubusercontent.com/aczietlow/scrivener/main/MKV%20conversion.jpg)


### Why

I was struggling with getting [automatic-ripping-machine](https://github.com/automatic-ripping-machine/automatic-ripping-machine) to work for my use case, and I wanted to learn more about video and audio codecs as well as tools like ffmpeg.
