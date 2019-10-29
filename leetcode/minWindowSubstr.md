---
tags: ['LeetCode', 'Top 100 Liked', '滑动窗口', '面试问题 - 算法']
date: 09.18.2019
description: 这才是典型的滑动窗口的题目，用两个指针，一前一后
---

# 最小窗口子序列

> Posted: 09.18.2019

<Tag />

## 描述

![Minimum Window Substring](/minWindowStr.png)

## 算法

- 核心思想就是保持着一个滑动窗口
- 用 l 和 r 来表示窗口的范围
- 在每一个时间点，我们其实只有两种选择
  - 移动 l：如果当前窗口是合法的，移动 r 只会让它合法，因此需要移动 l
  - 移动 r：如果当前窗口不合法，移动 l 只会让它不合法，因此需要移动 r
- 设置 l = r = 0， counter = s.length
  - 在这里，counter 就代表了要满足当前的窗口，还需要包括多少数量的字符
  - 因此，当 counter === 0 的时候，就说明当前窗口是合法的
- 建立一个哈希表，将每个字符的出现次数记录下来
- While r < s.length
  - 在每次进入这个循环的时候，窗口都不合法，因此我们需要移动 r
  - 查看当前的元素 s[r] 在哈希表里的次数是否 > 1
    - 如果是的话，就 counter--，代表了当前窗口包含该元素后，还需要包括多少数量的字符才能合法
  - 接着，map[s[r]]-- 并且 r++，这一步是一直要做的，代表了当前窗口已经包含了该元素
  - While counter === 0，也就是说窗口合法，我们需要移动 l
    - 查看当前的窗口是否最小，是的话就更新长度，并且记录下 l
    - map[s[l]]++，意味着我们舍去了窗口最左侧的元素
    - 然后查看 map[s[l]] 是否 > 0，如果是的话，则意味着我们舍去了一个合法窗口所需要的元素，因此当前的窗口就变得不合法了，因此需要 counter++
    - 最后，l++，意味着我们舍去了窗口最左侧的元素
- 通过最小的窗口和记录下的起始位置，slice 最后返回的答案

## 代码

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    // edge case
    if (!s || !s.length || !t || !t.length) return "";
    
    // 创建哈希表
    const map = {};
    for (let i = 0; i < t.length; i++) {
        const letter = t[i];
        if (map[letter]) map[letter] += 1;
        else map[letter] = 1;
    }
    
    
    // 设置两个指针，l 与 r，开始的时候都为 0
    let l = r = 0, 
        head = s.length, 
        count = t.length, 
        _min = Number.MAX_VALUE;
    
    while (r < s.length) {
        // 查看当前元素时候在哈希表里 > 0
        if (map[s[r]] > 0) count--;
        map[s[r]]--;
        r++;
            
        // 如果当前的窗口是合法的
        while (!count) {
            // 查看它是否为最小的窗口
            if (r - l < _min) {
                _min = r - l;
                head = l;
            }
            
            map[s[l]]++;
            // 查看移除该元素后是否还合法
            if (map[s[l]] > 0) count++;
            l++;
        }
    }
    
    return s.slice(head, _min + head);
};
```

<Disqus />