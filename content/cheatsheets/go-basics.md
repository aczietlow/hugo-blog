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

{{< two-column>}}
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

{{< cheatsheet-section>}}
### Maps

hash table data type

MAPS CAN ONLY BE INITIATED USING `make()` or A LITERAL. 
cannot append to a zero valued maps!
```go
// m = make(map[string]int)
m["route"] = 66

// receive map value
i := m["route"]

// if value DNE, types zero value is returned
j := m["foo"]
// j == 0

// delete item from map
delete(m, "route")
```
{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}
### Check if map value exist

the second value `ok` is a bool that is true if key exists in map
```go
i, ok := m["route"]
```
{{</ cheatsheet-section>}}
{{< cheatsheet-section>}}

### Maps Passed by reference

Maps are passed by reference;

i.e. when passed to a function, operations are performed on the underlying map

{{</ cheatsheet-section>}}
{{< /two-column>}}

{{< two-column>}}

{{<cheatsheet-section>}}
### Basic Struct 

collections of fields

```go
type person struct {
  first string
  last string
}
```

```go
humanPersona := person{
  first: "James",
  last: "Bond",
}

lName := humanPerson.last
```
{{</ cheatsheet-section>}}
{{< cheatsheet-section>}}
### Nested Struct

Structs can be nested

```go
type car struct {
  brand string
  model string
  doors int
  frontWheel wheel
  readWheel wheel
}
type wheel struct {
  radius int
  material string
}
myCar := car{}
myCar.frontWheel.radius = 5
```

{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}
### Embed Struct

Fake (data-only) inheritence 
```go
type car struct {
  brand string
  model string
}

type truck struct {
  car
  bedSize int
}

// embedded struct fields are accessed at top lvl
redTruck := truck {
  bedSize: 10,
  car: car{
    brand: "dodge",
    model: "ram",
  },
}
redTruck.brand
redTruck.bedSize
```

{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}
### Struct Methods

structs can have methods. methods are funcs that have a receiver
```go
type rect struct {
  width int
  height int
}

func (r rect) area() int {
  return r.width * r.height
}

var r = rect {
  width: 5,
  height: 10,
}
r.area()

```
{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}
### Interfaces

A set of method signatures. A type "implements" an interface just by having those methods
```go
type shape interface {
  area() float64
}

type rect struct{
  width, height float64
}

func (r rect)area() float64 {
  return r.width * r.height
}

func printShape(s shape) {
  fmt.Printf("Area: %v", s.area())
}
```
{{</ cheatsheet-section>}}
{{</ two-column>}}

## Concurrency

{{< two-column>}}
{{< cheatsheet-section>}}
### Fatal errors and defer

When relying on defer to close open connections, close waitgroups, or clear buffered channels be careful with how error handling is approached. For example:

```go
defer func() {
    fmt.Println("defer was triggered")
    // Resolve open connections.
}()

fmt.Println("biz logic")

check := 1
if check == 1 {
    log.Fatalf("something went wrong, will now call os.Exit()")
}
```
log.Fatalf() calls os.Exit() which exits the current program and returns a status code 0-125. This will skip `defer`, `panic()`, and any other resource cleanup.
{{</ cheatsheet-section>}}

{{< cheatsheet-section>}}
### Maps

Obviously writing to maps isn't safe for conncurrency and a mutex lock should be used in this case. Reading can be thread safe, but only if it assured that no modifications could be performed while a thread is attempting to read. If thread is attempting to read a map while it is updated by another thread, this will result in a panic().

In a purely "hypothetical" example

```
fatal error: concurrent map read and map write

goroutine 181 [running]:
internal/runtime/maps.fatal({0x759767?, 0xc000481808?})
	/usr/lib/golang/src/runtime/panic.go:1058 +0x18
main.(*config).crawlPage(0xc0000d33b0, {0xc0002091c0, 0x1e})
	/home/aczietlow/Projects/scrael/crawler.go:55 +0x5d3
created by main.(*config).crawlPage in goroutine 7
	/home/aczietlow/Projects/scrael/crawler.go:57 +0x677
```

This can be solved by implementing logic to ensure that reading is a thread safe operation. e.g.

```go
// Unsafe
if _, exists := cfg.pages[urlNormalized]; !exists {}

// Safe
if cfg.hasPageAlreadyBeenCrawled(urlNormalized) {}

func (cfg *config) hasPageAlreadyBeenCrawled(url string) bool {
	cfg.mu.Lock()
	defer cfg.mu.Unlock()
	_, exists := cfg.pages[url]
	return exists
}
```
{{</ cheatsheet-section>}}
{{</ two-column>}}
