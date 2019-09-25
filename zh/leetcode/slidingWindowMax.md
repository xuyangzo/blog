---
tags: ['LeetCode', 'Top 100 Liked', 'Sliding Window']
---

# Sliding Window Maximum

> Posted: 09.20.2019

<Tag />

## Description

![Sliding Window Maximum](/slidingWindowMax.png)

## Algorithm

- Key idea is to keep a sliding window, and use a non-increasing dequeue to track max value
- For the dequeue, it keep tracks the **INDEX** of the element
- Write a function called cleanDequeue
  - Remove front element if current index i - k === nums[front]
    - Current index i represents the end of sliding window, so this step is to keep window size
  - Remove end element until dequeue[end] >= nums[i]
- For first k elements, we wikl have only one max value
- Each time during iteration for 0 ~ k - 1 (inclusive)
  - Call cleanQueue
  - Push current element's index to dequeue
  - Check if dequeue[front] > maxIdx (they are indices, need to compare values), update maxIdx
- At the end of iterations of first k elements, the max value is the front element of dequeue
- During iterations for k ~ nums.length - 1
  - Call cleanQueue
  - Push current elements' index to dequeue
  - Push the front element to answer
    - The front element is guaranteed to be max, because 
      1. The dequeue keeps track of the window size and removes elements that are out of bound,
      so for current window, the max value must exist in current dequeue
      2. The dequeue is non-increasing, so the max value must be the front element

## Code

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    // edge case
    if (!k || !nums || !nums.length) return [];
    
    // elements stored in dequeue are indices
    const dequeue = [],
          ans = [];
    let maxIdx = 0;
    // init queue with first k elements
    for (let i = 0; i < k; ++i) {
        // clean queue at each beginning of iteration
        cleanQueue(nums, dequeue, i, k);
        dequeue.push(i); // push index to last
        if (nums[dequeue[0]] > nums[maxIdx]) maxIdx = dequeue[0];
    }
    ans.push(nums[maxIdx]);
    
    // start iteration
    // i tracks the window ends at index i
    for (let i = k; i < nums.length; ++i) {
        cleanQueue(nums, dequeue, i, k);
        dequeue.push(i); // push index to last
        maxIdx = dequeue[0];
        ans.push(nums[maxIdx]);
    }
    
    return ans;
};

function cleanQueue(nums, dequeue, i, k) {
    // remove element not in window
    if (dequeue.length && dequeue[0] === i - k) {
        dequeue.shift();
    }
    
    // remove elements from last that's less than current element
    while (dequeue.length && 
           nums[dequeue[dequeue.length - 1]] < nums[i])
    {
        dequeue.pop();
    }
}
```

<Disqus />