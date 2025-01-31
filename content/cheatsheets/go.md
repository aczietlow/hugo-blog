---
title: "Go Mark 2"
date: 2021-09-12
tags: [
  "Cheatsheet"
]
languages: [
  "go"
]
teaser: "A bit more of what I've been up too with Go."
---

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
