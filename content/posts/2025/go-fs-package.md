---
title: "Go Fs Package" # Title of the blog post.
date: 2025-12-29T09:33:43-05:00 # Date of post creation.
description: "WTF is Go's FS package" # Description used for search engine.
draft: true
toc: false # Controls if a table of contents should be generated for first-level links automatically.
# menu: main
# featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
# thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
# thumbnail_byline: "Byline under thumbnail image" # Sets a byline under the thumbnail image
# shareImage: "/images/path/share.png" # Designate a separate image for social media sharing.
codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: false # Override global value for showing of line numbers within code block.
# figurePositionShow: true # Override global value for showing the figure label.
tags:
  - blogumentation
  - go
# comment: false # Disable comment if false.
---

In 1.16 Go added the [`io/fs`](https://go.dev/doc/go1.16#fs) package. It was added as a filesystem abraction to between code and the filesystem. What is the "filesystem"? It can be provided by the host operating system, but can also be provided by other packages such as zip archives, in memory, or templates. It separates the logic in such a way that consumer code can specify "I want to read `config.json`" without specifying explicitly where that is located. Why would we ever want to do this? It allows code to be decoupled from the operating system backend, allowing better interoptability as well as testing.

Let's examine a traditional example where we load `config.json` file

```go
type Config struct {
	Token    string
}

var osReadFile = os.ReadFile

func LoadConfig(filepath string) (*Config, error) {
	configFile, err := osReadFile(filepath)

	if err != nil {
		return nil, err
	}

	var conf Config
	if err := json.Unmarshal(configFile, &conf); err != nil {
		return nil, err
	}

	return &conf, nil
}

func main() {
conf, _ := config.LoadConfig("./config.json")
}


```
