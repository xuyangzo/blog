---
tags: ['LeetCode', 'Top 100 Liked', 'Tree']
---

# Invert Binary Tree

> Posted: 09.21.2019

<Tag />

## Description

![Invert Binary Tree](/invertBT.png)

## Algorithm

- Key idea is to use postorder traversal
  - Because postorder traversal calls left child and right child first, which means
  at each node, you can swap it's left child and right child and such process starts from bottom level
  - Check the graph in description, you will find each node swaps it's children
- During postorder traversal
  - postorder(node.left)
  - postorder(node.right)
  - Swap left and right children
  - Do not need to return here

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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    invert(root);
    return root;
};

function invert(node) {
    // base case
    if (!node) return null;
    
    invert(node.left);
    invert(node.right);
    
    // swap left and right child
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
}
```

<Disqus />