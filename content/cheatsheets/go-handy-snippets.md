---
title: "Go Handy Snippets"
date: 2025-01-30T19:21:15-05:00

tags: [
  "Cheatsheet"
]
languages: [
  "go"
]
teaser: "Useful snippets for problems I've previously encourtered in go"
codeLineNumbers: false
---

## Useful Go-isms

{{< two-column>}}
{{<cheatsheet-section>}}
### Popping an element from a slice via cutting
```go
func arrayPop(list []int, index int) []int {
	return append(list[:index], list[index+1:]...)
}
evenNumbers := []int{2,4,6,8,9,10}
evenNumbers = arrayPop(evenNumbers,4)
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Combining 3 slices

```go
list1 := []int{1,2,3}
list2 := []int{4,5,6}
list3 := []int{7,8,9}

megaList := append(append(list1, list2...), list3...)
// [1 2 3 4 5 6 7 8 9]
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Single line array swaps

```go
// Traditional swap
temp := list[0]
list[0] = list[1]
list[1] = temp

// Single line swap
list[0], list[1] = list[1], list[0]
```

{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Maps must be initialized 

Map types are reference types, like pointers or slices, and so the value of m above is nil; it doesn’t point to an initialized map. A nil map behaves like an empty map when reading, but attempts to write to a nil map will cause a runtime panic; don’t do that. To initialize a map, use the built in make function

[docs](https://go.dev/blog/maps)
```go
// go will panic
// error: assignment to entry in nil map
var data map[string]any
data["foo"] = "bar"
```

```go
data := make(map[string]any)
data["foo"] = "bar"
```
{{</cheatsheet-section>}}

{{<cheatsheet-section>}}
### Checking if map key exists
```go
m := map[string]int {
  "one": 1,
  "two": 2,
}

value, ok := m["three"]
if ok {} // ok is a bool and will return true is key exists

// single line alternative.
if value, ok := m["two"]; ok {}
```
{{</cheatsheet-section>}}

{{< /two-column>}}
