---
tags: ['LeetCode', 'Top 100 Liked', '滑动窗口', '面试问题 - 算法']
date: 09.20.2019
description: 说是滑动窗口，但和一般滑动窗口题用两个指针的算法不太一样
---

# 滑动窗口最大值

> Posted: 09.20.2019

<Tag />

## 描述

![Sliding Window Maximum](/images/slidingWindowMax.png)

## 算法

- 核心思想是保持一个滑动窗口，然后用一个递减的双向队列来记录最大值（并非典型的滑动窗口题）
- 对于双向队列来说，它所记录的是元素的**INDEX**，而不是元素本身
- 添加一个名叫 cleanDequeue 的函数，在这个函数里，做如下的事情：
  - 如果当前位置 i - k === nums[front]（i 代表了滑动窗口结束的位置）
    - 那么就说明该元素已经在窗口之外了，需要进行移除双向队列开头的元素
  - 一直移除双向队列结尾的元素，直到 dequeue[end] >= nums[i]
    - 这么做的目的是保证双向队列开头的元素为最大的元素（的位置）
- 对于前 k 个元素来说，我们只会有一个最大值
- 从 0 一直 遍历到 k - 1（包含 k - 1）
  - 调用 cleanDequeue
  - 将当前元素的位置 push 到双向队列里
  - 查看双向队列的开头 dequeue[front] 是否 > maxIdx，如果是的话，则更新 maxIdx
- 在遍历结束后，前 k 个元素的最大值就在双向队列的开头
- 接下来从 k 一直遍历到 nums.length - 1（包含 nums.length - 1）
  - 调用 cleanDequeue
  - 将当前元素的位置 push 到双向队列里
  - 将双向队列开头的元素作为该窗口的最大值，添加到答案里
    - 之所以双向队列开头的元素便是最大值，是因为：
      - 该双向队列会根据窗口滑动的位置，移除窗口外的元素，因此在双向队列里的元素，都是该窗口范围内的元素，这也就意味着最大值就在双向队列里
      - 该双向队列是递减的，因此最大值就是最前面的元素

## 代码

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    // edge case
    if (!k || !nums || !nums.length) return [];
    
    // 存储在 dequeue 里的是 index
    const dequeue = [],
          ans = [];
    let maxIdx = 0;
    // 遍历前 k 个元素
    for (let i = 0; i < k; ++i) {
        cleanQueue(nums, dequeue, i, k);
        dequeue.push(i); // push index
        if (nums[dequeue[0]] > nums[maxIdx]) maxIdx = dequeue[0];
    }
    ans.push(nums[maxIdx]);
    
    // 遍历剩下的元素
    for (let i = k; i < nums.length; ++i) {
        cleanQueue(nums, dequeue, i, k);
        dequeue.push(i); // push index
        maxIdx = dequeue[0];
        ans.push(nums[maxIdx]);
    }
    
    return ans;
};

function cleanQueue(nums, dequeue, i, k) {
    // 移除窗口范围外的元素
    if (dequeue.length && dequeue[0] === i - k) {
        dequeue.shift();
    }
    
    // 从后面移除小的元素，保证递减（或者 =）
    while (dequeue.length && 
           nums[dequeue[dequeue.length - 1]] < nums[i])
    {
        dequeue.pop();
    }
}
```

<Disqus />