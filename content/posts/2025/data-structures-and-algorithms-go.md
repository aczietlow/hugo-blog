---
title: "Data Structures and Algorithms Go" # Title of the blog post.
date: 2025-01-29T18:34:12-05:00 # Date of post creation.
description: "Basic data structure and algorithms implemented within go" # Description used for search engine.
featured: true # Sets if post is a featured post, making appear on the home page side bar.
draft: true
toc: true 
math: true
# featureImage: "/images/path/file.jpg" # Sets featured image on blog post.
# thumbnail: "/images/path/thumbnail.png" # Sets thumbnail image appearing inside card on homepage.
# thumbnail_byline: "Byline under thumbnail image" # Sets a byline under the thumbnail image
# shareImage: "/images/path/share.png" # Designate a separate image for social media sharing.
# codeMaxLines: 10 # Override global value for how many lines within a code block before auto-collapsing.
codeLineNumbers: false # Override global value for showing of line numbers within code block.
# figurePositionShow: true # Override global value for showing the figure label.
tags:
  - blogumentation
  - go
---
## Algorithm

### Binary Search

Search an sorted list by bisecting it after every lookup action. The effeciency of binary search increases directed related to the size of the list (a function of logrithmic time)

**Time Complexity:**
$\log_2 n$

#### Example
```go
func binarySearch(list []int, item int) int {
	low := 0
	high := len(list)
	for low <= high {
		// go will round here, bc mid is a type int
		mid := (low + high) / 2
		if item == list[mid] {
			return mid
		} else if item < list[mid] {
			high = mid - 1
		} else {
			low = mid + 1
		}

	}
	return -1
}
```

### Selection Sort

Sort a list of []Type by searching for the smallest (or largest) element of the array, removing the found element from the list, and copying it to a new list.

**Time Complexity:**
$O(n^2)$

#### Example

```go
func selectionSort(list []int) []int {
	newList := []int{}
	for range list {
		smallest, smallestIndex := findSmallest(list)
		list = append(list[:smallestIndex], list[smallestIndex+1:]...)
		newList = append(newList, smallest)
	}
	return newList
}

func findSmallest(list []int) (int, int) {
	var smallest, smallestIndex int = list[0], 0
	for i, number := range list {
		if number < smallest {
			smallest = number
			smallestIndex = i
		}
	}
	return smallest, smallestIndex
}
```

### Bubble Sort 

[Thanks Obama](https://www.youtube.com/watch?v=koMpGeZpu4Q)

Starts with the last item in the array, comparing it to n-1. If item is smaller than the item before it in the array then the two items are swapped. The sorted values are "bubbled up"

**Time Complexity:**
$O(n^2)$

#### Example
```go
func bSort(list []int) []int {
	for start := 0; start < len(list)-1; start++ {
		index := start
		for end := len(list) - 1; end > index; end-- {
			if list[end] < list[end-1] {
				temp := list[end-1]
				list[end-1] = list[end]
				list[end] = temp
			}
		}
	}
	return list
}
```

## Data Structures

### Arrays, Slices, and LinkedLists

Arrays are a collection of values, stored in sequential memory. In go arrays are of a fixed length, and cannot be resized. More often in go developers will interact with the Slice data type, and allow arrays to act as the underlying building block for slices.

```go
testArray := [4]int{2, 4, 6, 8}

for i, value := range testArray {
	fmt.Printf("testArray[%d] memory address: %v\n", i, &value)
}

// testArray[0] memory address: 0xc00011a040
// testArray[1] memory address: 0xc00011a048
// testArray[2] memory address: 0xc00011a060
// testArray[3] memory address: 0xc00011a068
```

Linked lists are a collection of values AND a pointer to the next value contained within the list. They are distinct from arrays in that they are not stored in contiguous memory. As a result appending a new item to the list does not requrie an copying the entire list to a new data structure.

The trade-offs between these two structures should become apparent quickly; 
- Arrays are better for reading items as they allow for <u>random access</u> whereas linked lists require <u>sequential access</u>
- Linked lists more easily allow for insertions and deletions of data in the middle of lists as only one element has to be updated
- Arrays require more memory in reserve, as they cannot be resized after initialize, where linkedlists only require additional memory available to store additional values 

### Tree data structures

a tree is a nonlinear structure (e.g. a list, or queue) in which each node is cdapable of having many successor nodes, called children.

- Trees are recursive structures. every node must have a unique parent, with the exception of the root node.
  - another way of thinking of this is that there must be a unique path to each and every node.

#### Binary trees

a binary tree is a tree where each node is capable of having up to 2 children. 

if a binary tree node has no children, then it is called a leaf

##### Binary search trees

A unique feature of binary search trees is how data is added to the trees

When added data to a binary search tree:
- nodes with smalled data than the root node are inserted in the left subtree
- nodes with larger data than the root node are inserted in the right subtree

There are 3 traversal patterns of a binary search tree
- preorder traversal - visit the root, visit the left subtree, visit the right subtree
- inorder traversal - vist the left most subtree, visit the root, visit the right subtree
  - visits nodes in order of smallest to largest
- postorder traversal - vist the left subtree, visit the right subtree, visit the root


