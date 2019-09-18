---
tags: ["LeetCode", "Top 100 Liked", "Two Pointers"]
---

# Three Sum
> Posted: 09.18.2019

<Tag />

## Description

![three sum](/three_sum.png)

## Algorithm

- Sort first
- During iteration, skip duplicates
- For each number, search for target = 0 - current number
  - Search with two pointers, start = i + 1, end = nums.length - 1
  - If find target, increment and decrement normally with skipping duplicates
  - Else if start + end > target, decrement end
  - Otherwise, increment start

## Code

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
            
            // search with two pointers
            // since they are sorted
            while (start < end) {
                if (nums[start] + nums[end] === target) {
                    // if equal
                    ans.push([nums[i], nums[start], nums[end]]);
                    while (start < end && nums[end - 1] === nums[end]) end--;
                    while (start < end && nums[start + 1] === nums[start]) start++;
                    end--;
                    start++;
                } else if (nums[start] + nums[end] > target) {
                    // should down to the index with no duplicates
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