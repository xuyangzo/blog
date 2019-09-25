---
tags: ['LeetCode', 'Top 100 Liked', 'Tree']
---

# Validate Binary Search Tree

> Posted: 09.18.2019

<Tag />

## Description

![Validate Binary Search Tree](/validateBST.png)

## Algorithm

- The key idea is, during each recursion, pass upper and lower bounds
- In main function, call helper function without lower and upper (foor root)
- In helper function, check current node and upper and lower
  - If val > upper, set result to false
  - If val < lower, set result to false
- When calling function on children
  - Left child: pass val as upper, and current lower
  - Right child: pass val as lower, and current upper

## Code

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    return compare(root);
};

function compare(root, lower, upper) {
    if (!root) return true;

    if (lower !== undefined && root.val <= lower) return false;
    if (upper !== undefined && root.val >= upper) return false;
    
    return compare(root.left, lower, root.val) && compare(root.right, root.val, upper);
}
```

<Disqus />