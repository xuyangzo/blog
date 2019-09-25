---
tags: ['LeetCode', 'Top 100 Liked', 'Tree']
---

# Binary Tree Level Order Traversal

> Posted: 09.18.2019

<Tag />

## Description

![Binary Tree Level Order Traversal](/bstLevel.png)

## Algorithm

- Use a queue for normal traversal
- Before traversal, set last = root, nlast = null
- During traversal
  - Need to push left child and right child to queue
  - After push left child, set nlast = left child
  - After push right child, set nlast = right child
  - If last === current node, set last = nlast, and push current level
    - At this time, `last` is the last element on current level, therefore
    current nlast (its left child or right child) is the last element for next
    level, which is set to be new `last`. Every time we reaches new `last`, we know 
    that we have reached the end of next level

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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    
    const queue = [];
    const ans = [];
    
    queue.push(root);
    let temp = [];
    
    let last = root, nlast = null;
    
    // keep updating nlast until hit the right most node
    while(queue.length) {
        const node = queue.shift();
        temp.push(node.val);
        if (node.left) {
            queue.push(node.left);
            nlast = node.left;
        }
        if (node.right) {
            queue.push(node.right);
            nlast = node.right;
        }
        // check if need to push
        if (last === node) {
            ans.push(temp);
            temp = [];
            last = nlast;
        }
    }
    
    return ans;
};
```

<Disqus />