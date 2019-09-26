---
tags: ['JS Basics', 'Interview Problems']
---

# Garbage Collection

> Posted: 09.25.2019

<Tag />

## Description

People who learned C++ know that we have to deallocate memory after memory allocation.

Java has garbage collector, which will do this kind of work automatically.

JS does too. 

JS has two garbage collection algorithms.

## Mark-and-Sweep Algorithm

> Starting 2012, all modern browsers use this algorithm for garbage collection

The algorithm is basically DFS/BFS.

During each cycle, do the following work:

1. Starting at the global object (window for browser and global for Node)
2. Apply BFS/DFS to the global object, mark all nodes that have a reference from and to
3. At the end of the iteration, all objects being referenced are marked and all unreachable objects are not marked
4. Clear all unmarked objects from memory

![mark and sweep](/mark-sweep.png)

## Reference Count Algorithm

> This is the inital algorithm for garbage collection, but has severe problems

Key Idea: track the number of references each object has

- When declaring a variable and assign it to a reference type, it's reference count is 1
- On this variable is assigned to another address, the reference count of previosu object -1
- When an object has reference count 0, then it means we cannot access it, so we need to deallocate it.
  - At the beginning of next cycle, garbage collector will release their memory

<span style='color: palevioletred'>The Problem is, doubly referencing!!!</span>

```javascript
objA.someOtherObject = objB;
objB.anotherObject = objA;
```

In above code, objA and objB reference each other, which means their count will never be 0.

When objA and objB leaves the scope and the function finishes execution, they will still exist, because their reference count is not 0, garbage collector will not remove them!!!

Then memory leak occurs!!!

## Reference

[Garbage collection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

[Garbage collection](https://javascript.info/garbage-collection)

[JavaScript垃圾回收机制](https://www.cnblogs.com/zhwl/p/4664604.html)