---
tags: ['LeetCode', 'Top 100 Liked']
---

# Maximum Product Subarray

> Posted: 09.20.2019

<Tag />

## Description

![Maximum Product Subarray](/maxProductSubarr.png)

## Algorithm

> This algorithm is invented on my own, different from LeetCode's given solutions

- Key idea is keep track of both positive and negative values up to current point
  - Because it is product, at each index, after times with current element, either the total positive
  values or the total negative values will increase for absolute value (besides 0/-1/1)
- Set posCurr = negCurr = 1 at the beginning to keep track of both values
- During the iteration, at each index
  - First, check posCurr and negCurr to see if they are valid
    - If posCurr < 0, set posCurr = 1
    - If negCurr > 0, set negCurr = 1
  - If current element is positive
    - posCurr = posCurr * curr
    - negCurr = negCurr * curr
  - If current element is negative
    - posCurr = negCurr * curr
    - negCurr = posCurr * curr
  - Check if posCurr > max, if so, update

## Code

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    // edge case
    if (!nums || !nums.length) return 0;
    
    let posCurr = negCurr = 1,
        _max = -Number.MAX_VALUE;
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        posCurr = posCurr <= 0 ? 1 : posCurr;
        negCurr = negCurr >= 0 ? 1 : negCurr;
        if (num === 0) {
            posCurr = negCurr = 0;
        } else if (num < 0) {
            const temp = negCurr;
            negCurr = posCurr * num;
            posCurr = temp * num;
        } else {
            posCurr = posCurr * num;
            negCurr = negCurr * num;
        }

        _max = Math.max(posCurr, _max);
    }
    
    return _max;
};
```

<Disqus />