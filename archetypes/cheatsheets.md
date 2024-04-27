---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
tags: [
  "tag1",
  "Cheatsheet"
]
languages: [
  "lang1"
]
draft: true
teaser: "A brief teaser description to provide a lead in on content of the cheatsheet."
codeLineNumbers: false
---

## Introduction

## 3 Column Layout

{{< three-column>}}

{{<cheatsheet-section>}}
### 3 Column: Column 1

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```

```go
// Second example blog for "Brief Description"
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```

{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 3 Column: Column 2

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```

{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 3 Column: Column 3

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```

```go
// Second example blog for "Brief Description"
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```

{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 3 Column: Column 4

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```

{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 3 Column: Column 5

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```

{{</ cheatsheet-section>}}

{{< /three-column>}}

## 2 Column Layout

{{< two-column>}}

{{<cheatsheet-section>}}
### 2 Column: Section 1

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```
{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 2 Column: Section 2

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```
{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 2 Column: Section 3

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```
{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 2 Column: Section 4

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```
{{</ cheatsheet-section>}}

{{<cheatsheet-section>}}
### 2 Column: Section 5

Brief Description

```go
// Add code here
var str string
str = "World"
fmt.Printf("Hello %s!", str)
```
{{</ cheatsheet-section>}}

{{< /two-column>}}
