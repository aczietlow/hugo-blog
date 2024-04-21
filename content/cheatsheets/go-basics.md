---
title: "Go Basics"
date: 2021-09-12
tags: [
  "go",
  "Cheatsheet"
]
languages: [
  "go"
]
teaser: "A brief teaser description to provide a lead in on content of the cheatsheet."
codeLineNumbers: false
---

{{< three-column>}}

{{<cheatsheet-section>}}
### Variables

Strictly Typed and Compiled

```go
var a bool
a = false
b := true

fmt.Println(a, "and", b) // false and true
```

```go
type banana int
var b banana
fmt.Println(b)
// 0
fmt.Printf("%T\n", b)
// main.banana
```
{{</ cheatsheet-section>}}




{{< cheatsheet-section>}}
### Functions

function singature `func functionname(parametername type) returntype {`
```go
func addNum(a int, b int) int {
  var sum = a + b
  return sum
}
```
{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}
### hello world

```go
package main

import (
  "fmt"
)

func main() {
  fmt.Printf("Hello, Chris.\n")
}
```

{{</ cheatsheet-section>}}
{{< /three-column>}}

## Composite Data Types

{{< three-column>}}
{{< cheatsheet-section>}}

### Arrays

Arrays are fixed length

`ArrayType = [length]ElementType`

```go
var list [5]int
fmt.Println(list)
// [0 0 0 0 0]
```

### Slices

Numbered lists of a single type. They can be resized. Slices are built on top of arrays and passed by reference

Composite literal syntax `t := type{values}`

```go
listX := []int{1, 2, 5, 8}
fmt.Println(listX)
// [1 2 5 8]
```

### Iterate through slice
```go
// range allows looping through slices 
// (as well as arrays, maps, strings, 
// and reading from channels)
for index, value := range listX {
    fmt.Println(index, value)
}
//0 1
//1 2
//2 5
//3 8
```

{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}

### Working with Slices

Make function will create a new slice
```go
var listY = make([]string, 3, 5)
```

Shorthand for creating a new slice and iterating through it
```go
for i, v := range []string{"foo", "bar", "baz"} {
    listY[i] = v
}
```

### Append items to slice.
```go
listOdd := []int{1, 3, 5, 7, 8}
listOdd = append(listOdd, 9, 11, 13, 15)
fmt.Println(listOdd)

newOddNumbers := []int{17, 19, 21}
listOdd = append(listOdd, newOddNumbers...)
```

`...` will unfurl a list. It is useful for passing in variadic parameters from list data types (like above.)

### Slicing a slice

```go
fmt.Println(listOdd[0])
// 1
fmt.Println(listOdd[1])
// 2
fmt.Println(listOdd[2:5])
// [5 7 8]
// From the beginning to the specified index
fmt.Println(listOdd[:5])
// [1 3 5 7 8]
// From the specified index to the end
fmt.Println(listOdd[5:])
// [9 11 13 15 17 19 21]
```

### Deleting from a slice

```go
// Deleting element from slice.
listOdd = append(listOdd, 22, 24, 23, 25)
fmt.Println(listOdd)
// [1 3 5 7 8 9 11 13 15 17 19 21 22 24 23 25]
realOdd := append(listOdd[:12], listOdd[14:]...)
fmt.Println(realOdd)
// [1 3 5 7 8 9 11 13 15 17 19 21]


```
{{</ cheatsheet-section>}}

{{< /three-column>}}