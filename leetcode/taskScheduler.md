---
tags: ['LeetCode', 'Top 100 Liked']
---

# Task Scheduler

> Posted: 09.21.2019

<Tag />

## Description

![Task Scheduler](/taskScheduler.png)

## Algorithm

- Key idea is to use a PQ to sort number of occurrence, cycle by cycle
- Use a hash map to record number of occurrence of each task
- Push all occurrence to a max heap (only occurrence, no task)
- While heap is not empty
  - For 0 ~ n (inclusive), pop from heap if heap is not empty
    - Push the popped value to temp
      - Now temp stores occurrence of tasks in current cycle
  - For each occurrence in temp
    - Decrement it by 1
    - Check if it is greater than 0, if so, push it back to heap
  - Increment counter
    - If heap is not empty (meaning this cycle is not last cycle), counter += n + 1
    - Otherwise, counter += temp.length

## Code

> For Priority Queue, please refer to this article: [JS Priority Queue](/js-basics/pq.md)

```javascript
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    // edge case
    if (!tasks || !tasks.length) return 0;
    
    // store counts in map
    const map = {};
    tasks.forEach(task => {
        if (map[task]) map[task]++;
        else map[task] = 1;
    });
    
    
    // create a max heap, add counters of each task into map
    const maxheap = new PriorityQueue();
    Object.values(map).forEach(val => maxheap.add(val));
    
    let counter = 0;
    while (!maxheap.empty()) {
        const temp = [];
        // within each cycle
        for (let i = 0; i < n + 1; ++i) {
            if (!maxheap.empty()) {
                temp.push(maxheap.pop());
            }
        }
        
        // now temp stores counters of tasks in decreasing order
        temp.forEach(taskNum => {
            if (--taskNum > 0) {
                // this task need to be processed
                // add it back to the heap
                maxheap.add(taskNum);
            } 
        });
        
        // for last cycle (heap is empty), do not need idle
        counter += maxheap.empty() ? temp.length : n + 1; 
    }
    
    return counter;
};
```

<Disqus />