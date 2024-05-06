---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
tags: [
  "tag1",
  "Project"
]
draft: true
teaser: "A brief teaser description for project"
codeLineNumbers: true
thumbnail: "images/projects/git-logo.png"
thumbnail_byline: "Byline for thumbnail image" # Sets a byline under the thumbnail image
source: https://github.com/aczietlow/goFxSocials
license: Apache-2.0
latest: 2024.4.3 # Latest release
activity: 2024-04-12 # Latest commit to HEAD
---

## Introduction

## Project

To complete this showcase:

1. Write the story about your site in this file.
2. Add a summary to the `bio.md` file in this folder.
3. Replace the `featured-template.png` with a screenshot of your site. You can rename it, but it must contain the word `featured`.
4. Create a new pull request in https://github.com/gohugoio/hugoDocs/pulls

The content of this bundle explained:

index.md
: The main content file. Fill in required front matter metadata and write your story. I does not have to be a novel. It can even be self-promotional, but it should include Hugo in some form.

bio.md
: A short summary of the website. Site credits (who built it) fits nicely here.

featured.png
: A reasonably sized screenshot of your website. It can be named anything, but the name must start with "featured". The sample image is `1500x750` (2:1 aspect ratio).
