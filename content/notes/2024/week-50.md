---
title: "Week 50" # Title of the blog post.
date: 2024-12-15
description: "Life happens, working through the advent of code"
tags:
  - weekly-notes
  - aoc-2024
---

- Reading
  - Digital Minimalism - Cal Newport
  - The Witcher The Last Wish - Andrzej Sapkowski
  - Flow: The Psychology of Optimal Experience - Mihaly Csikszentmihalyi
- Grieving a death in the family
- Being extremely reflective on life I want to live
- Catching up Car maintenace
- Finishing puttin Christmas up


A little late to the party but starting on the [advent of code](https://adventofcode.com/2024) for the year. 


## Day 1 - Problem

compare 2 lists of numbers. 
- Order the both lists of numbers smallest to largest
- find the difference between each item in both ordered lists
- Sum this the total of the absolute value from the above step
- Find the frequency at which each item in left list occurs in the right list
- mulitply frequency by the numeric value of the list item
- sum the total 

### Approach

Load data input memory, and creat 2 sorted lists

- copied provided file into txt file
- Read raw text input
- parse the input input to slices of ints
- reorder the lists each time a new value is added to it
``` go
	file, err := os.ReadFile("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	inputTxt := fmt.Sprintf("%s", file)
	lists := strings.Split(inputTxt, "\n")
	var listA, listB []int
	for _, v := range lists {
		output := strings.Split(v, "   ")
		if len(v) > 0 {
			outputA, _ := strconv.Atoi(output[0])
			outputB, _ := strconv.Atoi(output[1])
			listA = appendToOrdered(listA, outputA)
			listB = appendToOrdered(listB, outputB)
		}
	}
	return listA, listB
```
The ordering of the list took me way to long to implement, and in the end, my solution was more or less brute force 

- range through the slice, comparing the to be inseted int to each element within the slice 
- after finding the first occurence of a value greater or equal to the new element, Add the new element at the current indexed position 
- create a slice of slice of all the remaining elements within the slice, after the entry point
- append the slice of slice

The way go handles slice length and capacity was a sticking point for me here. Mulitple times I got tripped up working a a slice that didn't have enough capacity, or would have erronous length added, leading to 0 values incorrectly added to the list.

> Learned that `append()` willnot increase a slice cap unless it is required for the new elements.
```go
func appendToOrdered(list []int, number int) []int {
	var newList = make([]int, len(list), cap(list)+1)
	if len(list) < 1 {
		return append(list, number)
	}
	for i, v := range list {
		if v >= number {
			newList[i] = number
			newList = newList[:i+1]
			count := 1
			for _, v2 := range list[i:] {
				if i+count+1 >= len(newList) {
					newList = append(newList, v2)
				} else {
					newList[i+count] = v2
				}
				count++
			}
			return newList
		} else {
			newList[i] = v
		}
	}
	return append(list, number)
}
```
Summing the total and toatlFrequency was straight forward enough since I was already iterating through the slices.

```go
	left, right := getInput()
	total, similarity := 0, 0
	for i, v := range left {
		distance := right[i] - v
		d := math.Abs(float64(distance))
		total += int(d)
		similarity += findSimilarity(v, right)

	}
	fmt.Printf("total: %v\n", total)
	fmt.Printf("Similarity: %v\n", similarity)
```
### Learnings

- poked around the os package in the stdlib for reading files on the filesystem
- Go HAS A SORT [PACKAGE](https://pkg.go.dev/sort#Ints) 
  - of course it does.

alt approach without custom sorting algorithm

```go
file, err := os.ReadFile("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	inputTxt := fmt.Sprintf("%s", file)
	lists := strings.Split(inputTxt, "\n")
	var listA, listB []int
	for _, v := range lists {
		output := strings.Split(v, "   ")
		if len(v) > 0 {
			outputA, _ := strconv.Atoi(output[0])
			outputB, _ := strconv.Atoi(output[1])
			listA = append(listA, outputA)
			listB = append(listB, outputB)
		}
	}
	slices.Sort(listA)
	slices.Sort(listB)
	return listA, listB
}
```

