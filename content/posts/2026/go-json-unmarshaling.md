---
title: "Go Json Unmarshaling" # Title of the blog post.
date: 2026-02-08T11:38:28-05:00 # Date of post creation.
description: "Tips when working with inconsistent api responses" # Description used for search engine.
draft: true
tags:
  - blogumentation
  - go
  - json
  - api
---
 
## Working with Json

## Problem

When working writing an api client, I was relying on go's standard library `encoding/json` in order to decode json object to a go struct. This works wonderful, as by default `json.Unmarshal()` will decode mapping the json type to go type. e.g. `string <> string` `int <> int` `object <> struct`.  I'm working with book data from the api. 

```json
{
  title: "The Fellowship of the Ring",
  description: "One Ring to rule them all."
}
```


```go
type book struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

var b book
json.Unmarshal(jsonData, &b)
return b
```

 
 All tests are passed and it works as intended during testing, I deploy to production. Later I start seeing errors reported in the logs. After some investigation I find the fault lies with the api responses. According to the documentation, description is a string field; However some entries return:

```json
{
  title: "The Fellowship of the Ring",
  description: {
    type: "string",
    value: "One Ring to rule them all."
  }
}
```

Our unmarshaller throws an error when it encounters this.

...
