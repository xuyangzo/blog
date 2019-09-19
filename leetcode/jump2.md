---
tags: ['LeetCode', 'Top 100 Liked']
---

# Jump Game ||

> Posted: 09.18.2019

<Tag />

## Description

![Jump Game ||](/jump2.png)

## Algorithm

- Key idea is keep track of the farest point a range can reach
- Set end = farthest = count = 0
- Iterate from beginning
  - At each index, update farthest if i + val > farthest
  - If end === i, means we reach the farest position that last step can reach
    - Increment count
    - Set end = farthest. Now, end is the farthest position next step can reach

## Code

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
        // update where to start another jump
        farest = Math.max(farest, i + nums[i]);
        
        // before i reaches end, it keeps update the farest index
        // next jump can reach if it starts in current range
        if (i === end) {
            count++;
            end = farest;
        }
    }
    return count;
};
```

<Disqus />