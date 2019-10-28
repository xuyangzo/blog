---
tags: ['LeetCode', 'Top 100 Liked', '面试问题 - 算法']
date: '09.21.2019'
---

# 任务调度器

> Posted: 09.21.2019

<Tag />

## 描述

![Task Scheduler](/taskScheduler.png)

## 算法

- 核心思想是，在每次轮询的时候，用优先队列来记录任务的出现次数
- 首先用一个哈希表来存储每个任务的出现次数
- 然后把这些出现次数都 push 到优先队列里面
  - 注意了，这里 push 的是次数，而不是任务本身
- While 优先队列不为空
  - 从 0 遍历 到 n（包含 n，因为每一轮都有一个 idle，所以一共 n+1 个元素）
    - 执行 pop，然后把 pop 出来的次数存到一个 temp 数组里
    - 这个时候，temp 里面存的，就是在当前轮询，每个任务的出现次数
  - 对于 temp 数组里的每个次数来说
    - 把这个次数--，这样就意味着经过了这个轮询，这个任务需要执行的次数少了 1
    - 然后检查该次数是否 > 0，如果是的话，就 push 回优先队列，这表示这个任务接下来还需要执行
  - 增加 counter
    - 如果优先队列不为空（意味着这并不是最后一个轮询），所以 counter += n + 1
    - 如果优先队列为空（意味着这就是最后一个轮询），那么 counter += temp.length

## 代码

> 对于优先队列，可以参考我的这篇文章：[用 ES6 实现优先队列](/js-basics/pq.md)

```javascript
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    // edge case
    if (!tasks || !tasks.length) return 0;
    
    // 用哈希表来存储任务次数
    const map = {};
    tasks.forEach(task => {
        if (map[task]) map[task]++;
        else map[task] = 1;
    });
    
    
    // 把次数 push 到优先队列里
    const maxheap = new PriorityQueue();
    Object.values(map).forEach(val => maxheap.add(val));
    
    let counter = 0;
    while (!maxheap.empty()) {
        const temp = [];
        // 每次进入 while，就相当于是开启了一轮新的轮询
        for (let i = 0; i < n + 1; ++i) {
            if (!maxheap.empty()) {
                temp.push(maxheap.pop());
            }
        }
        
        temp.forEach(taskNum => {
            if (--taskNum > 0) {
                // 如果任务还没处理完，就 push 回优先队列
                maxheap.add(taskNum);
            } 
        });
        
        counter += maxheap.empty() ? temp.length : n + 1; 
    }
    
    return counter;
};
```

<Disqus />