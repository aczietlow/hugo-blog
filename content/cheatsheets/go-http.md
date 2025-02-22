---
title: "Go Http"
date: 2025-02-21T15:04:20-05:00
tags: [
  "go",
  "Cheatsheet"
]
languages: [
  "go"
]
teaser: "Some handy small snippets for when working with go's net/http"
summary: "Some handy small snippets for when working with go's net/http"
codeLineNumbers: false
---

## GO HTTP handy cheats 

{{<two-column>}}

{{<cheatsheet-section>}}
### Unmarshal JSON into a struct 

Mapping json data directly into a defined struct
```go
type Book struct {
  Title string `json:"title"`
  Author string `json:"author"`
}

const bookUrl = "https://api.examplebooks.com/q=\"Pat+Rothfuss\""

func getBooks() ([]Book, error) {
    res, err := http.Get(url)
    if err != nil {
	return nil, fmt.Errorf("error creating request: %w", err)
    }
    defer res.Body.Close()

    data, err := io.ReadAll(res.Body)
    if err != nil  {
    	return nil, fmt.Errorf("error reading response body: %w", err)
    }

    books := []Book{}

    if err = json.Unmarshal(data, &books); err != nil {
	return nil, err
    }	

    return books, nil
}
```
{{</cheatsheet-section>}}


{{<cheatsheet-section>}}
### Unmarshal JSON into a map

If the structure of the response resource is unknown or doesn't map to a defined struct, a `map[string]any` can be used as a catch all.
```go
const bookUrl = "https://api.examplebooks.com/q=\"Pat+Rothfuss\""

func getBooks() ([]map[string]any, error) {
    // any is an alias for interface{}
    // var book []map[string]interface{} is the same
    var books []map[string]any

    res, err := http.Get(url)
    if err != nil {
	return books, fmt.Errorf("error creating request: %w", err)
    }
    defer res.Body.Close()

    data, err := io.ReadAll(res.Body)
    if err != nil  {
    	return books, fmt.Errorf("error reading response body: %w", err)
    }
 
    if err = json.Unmarshal(data, &books); err != nil {
	return books, err
    }	

    return books, nil
}
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Use a json decoder 

Decoders accept a io.Reader, allowing data to be streamed which is better for large data sets. The Response body is an io.Reader already.

```go
type Book struct {
  Title string `json:"title"`
  Author string `json:"author"`
}
const bookUrl = "https://api.examplebooks.com/q=\"Pat+Rothfuss\""

func getBook() (Book, error) {
    res, err := http.Get(url)
    if err != nil {
	return Book{}, fmt.Errorf("error creating request: %w", err)
    }
    defer res.Body.Close()

    var book Book
    decoder := json.NewDecoder(res.Body)
    err = decoder.Decode(&book)
    if err != nil {
	return Book{}, nil
    }

    return book, nil
}
```
{{</cheatsheet-section>}}

{{</two-column>}}
