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
{{< /two-column>}}
