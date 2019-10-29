---
tags: ["LeetCode", "Top 100 Liked", "双指针", '面试问题 - 算法']
date: 09.18.2019
description: 来享受超越 2sum 的快感
---

# 三数之和
> Posted: 09.18.2019

<Tag />

## 描述

![three sum](/three_sum.png)

## 算法

- 首先对数组进行排序
- 在遍历的过程中，如果碰见重复的元素，则跳过至重复元素中的最后一个（避免重复）
- 在每一个元素的 index，我们所要寻找的目标就是 target = 0 - 当前元素
    - 寻找的方法就是使用两个指针 l 和 r，一前一后（说是指针，其实就是 index）
    - 如果这俩指针指向的元素之和 = target，那就 l++ 并且 r--
        - 在这过程中，为了避免重复，需要跳过重复元素
    - 如果这俩指针指向的元素之和 > target，那就 r--
    - 如果这俩指针指向的元素之和 < target，那就 l++

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const ans = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] !== nums[i-1] || i === 0) {
            const target = 0 - nums[i];
            let start = i + 1, end = nums.length - 1;
            
            /**
             * 因为之前已经排序过了
             * 所以可以用前后两个指针搜索
             */
            while (start < end) {
                if (nums[start] + nums[end] === target) {
                    ans.push([nums[i], nums[start], nums[end]]);
                    while (start < end && nums[end - 1] === nums[end]) end--;
                    while (start < end && nums[start + 1] === nums[start]) start++;
                    end--;
                    start++;
                } else if (nums[start] + nums[end] > target) {
                    end--;
                } else {
                    start++;
                }
            }
        }
    }
        
    return ans;
};
```

<Disqus />