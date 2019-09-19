---
tags: ['LeetCode', 'Top 100 Liked', 'Tree']
---

# Flatten Binary Tree to Linked List

> Posted: 09.18.2019

<Tag />

## Description

![Flatten Binary Tree to Linked List](/flattenBT.png)

## Algorithm

- Key idea is postorder traversal
- Set a global variable prev = null to track **CURRENT** element
- Doing postorder traversal until last node
  - Set prev to current node 
- During the recursion back to the root
  - Set current node's left child to be null, right child to be prev
  - Then update prev to current node

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    const prev = [null];
    postorder(root, prev);
};

function postorder(root, prev) {
    if (!root) return;
    
    postorder(root.right, prev);
    postorder(root.left, prev);
    
    root.right = prev[0];
    root.left = null;
    prev[0] = root;
}
```

<Disqus />