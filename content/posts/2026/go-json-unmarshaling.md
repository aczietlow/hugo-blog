---
title: "Go JSON Unmarshaling" # Title of the blog post.
date: 2026-02-08T11:38:28-05:00 # Date of post creation.
description: "Tips when working with inconsistent API responses" # Description used for search engine.
tags:
  - blogumentation
  - go
  - json
  - api
---
 
## TL;DR

When working with an API that returned json with inconsistent types, json.Unmarshal would fail because it was mapped to a matching Go type via tags in the struct. The solution was to create a new type to support any permutation of data the API might return, and have that type implement `Unmarshaler` or `UnmarshalerFrom` interfaces to add the logic to decode this correctly.

## Problem

When working writing an API client, I was relying on Go's standard library `encoding/json` in order to decode JSON object to a Go struct. This works wonderfully, as by default `json.Unmarshal()` will decode the json data; mapping the json type to Go type. e.g. `string <> string`, `int <> int`, `object <> struct`.  I'm working with book data from the API. 

```json
{
  "title": "The Fellowship of the Ring",
  "description": "One Ring to rule them all."
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

 
 All tests are passed and it works as intended during testing. I deploy to production and go about my day. Later I started seeing errors reported in the logs. After some investigation I find the fault lies with the API responses. According to the documentation, `description` is a string field. However some entries return:

```json
{
  "title": "The Fellowship of the Ring",
  "description": {
    "type": "string",
    "value": "One Ring to rule them all."
  }
}
```

The unmarshaller throws an error when it encounters an unexpected json value that doesn't map to a Go type. Looking more closely at the encoding/json [documentation](https://pkg.go.dev/encoding/json/v2#Unmarshal)

> The input is decoded into the output according the following rules:
>  - If any type-specific functions in a WithUnmarshalers option match the value type, then those functions are called to decode the JSON value. If all applicable functions return SkipFunc, then the input is decoded according to subsequent rules.
> 
>  - If the value type implements UnmarshalerFrom, then the UnmarshalJSONFrom method is called to decode the JSON value.
>
>  - If the value type implements Unmarshaler, then the UnmarshalJSON method is called to decode the JSON value.
>
>  - If the value type implements encoding.TextUnmarshaler, then the input is decoded as a JSON string and the UnmarshalText method is called with the decoded string value. This fails with a SemanticError if the input is not a JSON string. 

The third bullet point looks promising. The `book` field Description is currently string type. Let's create a new type, create an unmarshaler, and add checks for both types of JSON.

```go
type book struct {
    Title       string `json:"title"`
    Description descriptionField `json:"description"`
}

type description struct {
      Type  string `json:"type"`
      Value string `json:"value"`
}

type descriptionField struct {
      Description *description
      Value       string
}

func (d *descriptionField) UnmarshalJSON(data []byte) error {
	var value string
	if err := json.Unmarshal(data, &value); err == nil {
		d.Value = value
		d.Description = nil
		return nil
	}
	var desc description
	if err := json.Unmarshal(data, &desc); err == nil {
		d.Value = desc.Value
		d.Description = &desc
		return nil
	}
	return fmt.Errorf("description field must be either type string or {type: string, value: string}, got %s", string(data))
}
func parseJson(jsonData []byte) book {
  var b book
  json.Unmarshal(jsonData, &b) // completely ignoring errors
  return b
}
```

[go playground](https://go.dev/play/p/40jO8VMs3yQ)

Now when the Unmarshaler attemps to decode description, the UnmarshalJSON method will get called. This ensures that `book.Description.Value` will always have a value regardless of which type is returned. In the future we could implement `UnmarshalerFrom` instead as it's more flexible and more performant since it deals with the decoder and allows for streaming of data via `*jsontext.Decoder`. 
