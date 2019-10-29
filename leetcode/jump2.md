---
tags: ['LeetCode', 'Top 100 Liked', '面试问题 - 算法']
date: 09.18.2019
description: 稍微想一下就明白了，除了我这种菜鸡
---

# 跳跃游戏 ||

> Posted: 09.18.2019

<Tag />

## 描述

![Jump Game ||](/jump2.png)

## 算法

- 核心思想是，记录当然范围内，能够达到的最远的位置
- 设置 end = farthest = count = 0
    - end 代表了这一步的范围的结束
    - farthest 代表了这一步能够到达的，最远的位置
- 遍历数组
  - 在每一个 index，如果在这个位置迈出的步数 + 当前位置比 farthest 更远，就更新 farthest
    - 这样我们保证了，在每一个大的范围里，我们所记录的就是这个范围能够到达的最远的地方
  - 如果 end === i
    - 这意味着我们这一步已经结束了，需要开始下一步，于是 count++
    - 而下一步能够到达的最远的位置，就是当前的 farthest
    - 因此需要设置 end = farthest，然后 end 便是下一步的终点

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    // edge case
    if (!nums || !nums.length) return o;
    
    let farest = 0, end = 0, count = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        // 一路上保持更新 farest（他娘的，这里拼错了）
        farest = Math.max(farest, i + nums[i]);
        
        // 如果到达了这一步的最远点，开始下一步
        if (i === end) {
            count++;
            end = farest;
        }
    }
    return count;
};
```

<Disqus />