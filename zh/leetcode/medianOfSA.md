---
tags: ['LeetCode', 'Top 100 Liked', 'Divide and Conquer']
---

# Median of Two Sorted Arrays

> Posted: 09.20.2019

<Tag />

## Description

![Median of Two Sorted Arrays](/medianOfSA.png)

## Algorithm

- The key idea is still binary search in order to get O(logn) runtime
  - But in this case, we need to apply binary seach on both arrays at the same time
  - Each time, we divide the left part and right part to equal size (or left - right = 1)
- If nums1.length > num2.length, return same funciton with inversely ordered parameters
- Calculate `total = (len1 + len2 + 1) / 2`, number of left part elements should equal to total
- While `l <= r || r < 0 || l >= len1`
  - Apply binary search based on nums1, calculate four corners first
    - topLeft = (l + r) / 2, if < 0, set nums[topLeft] to -∞ (make sure it < bottomRight)
    - topRight = topLeft + 1, if >= len1, set nums[topRight] to ∞ (make sure it > bottomLeft)
    - bottomLeft = total - topLeft - 2, if < 0, set nums[bottomLeft] to -∞
    - bottomRight = bottomLeft + 1, if >= len2, set nums[bottomRight] to ∞
  - After that, compare four corners
    - If nums1[topLeft] <= nums2[bottomRight] && nums2[bottomLeft] <= nums1[topRight], found
      - If their total length is odd, return `max(nums1[topLeft], nums2[bottomLeft])`
      - If their total length is even, return `(max(nums1[topLeft], nums2[bottomLeft]) + min(nums1[topRight],
       nums2[bottomRight])) / 2`
    - Else if nums1[topLeft] > nums2[bottomRight], r = topLeft - 1
    - Else if nums2[bottomLeft] > nums1[topRight], l = topLeft + 1

## Code

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // edge case
    if (!nums1.length) {
        const len = nums2.length;
        if (len % 2 === 0) return (nums2[len/2-1] + nums2[len/2]) / 2;
        else return nums2[parseInt(len / 2)];
    }
    if (!nums2.length) {
        const len = nums1.length;
        if (len % 2 === 0) return (nums1[len/2-1] + nums1[len/2]) / 2;
        else return nums1[parseInt(len / 2)];
    }
    
    const len1 = nums1.length, len2 = nums2.length;
    // reverse order
    if (len1 > len2) return findMedianSortedArrays(nums2, nums1);
    
    const total = parseInt((len1 + len2 + 1) / 2);
    // do binary search based on nums1
    let l = 0, r = len1 - 1;
    while (l <= r || r < 0 || l >= len1) {
        const topMid = Math.floor((l + r) / 2);
        const botMid = total - topMid - 2;
        
        const topLeft = topMid >= 0 ? nums1[topMid] : -Number.MAX_VALUE;
        const topRight = topMid+1 < len1 ? nums1[topMid+1] : Number.MAX_VALUE;
        const botLeft = botMid >= 0 ? nums2[botMid] : -Number.MAX_VALUE;
        const botRight = botMid+1 < len2 ? nums2[botMid+1] : Number.MAX_VALUE;

        // if satisfy requirement
        if (topLeft <= botRight &&
            botLeft <= topRight) 
        {
            // if the merged array is odd length
            if ((len1 + len2) % 2 === 1) {
                return Math.max(topLeft, botLeft);
            } else {
                return (Math.max(topLeft, botLeft) +
                        Math.min(topRight, botRight)) / 2;
            }
        } else if (botLeft > topRight) {
            l = topMid + 1;
        } else {
            r = topMid - 1;
        }
    }
};
```


<Disqus />