---
tags: ['LeetCode', 'Top 100 Liked', 'Tree']
---

# Construct Binary Tree from Preorder and Inorder Traversal

> Posted: 09.28.2019

<Tag />

## Description

![Construct Binary Tree from Preorder and Inorder Traversal](/constructBST.png)

## Algorithm

- The key is two facts
  - For a preorder array, the first element is the root, the rest are left and right part separately
  - For an inorder array, elements left to root form left subtree, right to root form right subtree
- Therefore, during each recursion
  - Pick the first element from preorder array
  - Find corresponding elements in inorder array
    - Slice the array to construct inorderLeft and inorderRight, as params for next functions
  - For preorder array, slice the length of inorderLeft starting at index 1 as preorderLeft and slice
  the rest as preorderRight, as params for next functions


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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    // edge case
    if (!preorder.length || !inorder.length) return null;
    
    return constructTree(preorder, inorder);
};

function constructTree(preorder, inorder) {
    if (!preorder.length) return null;
    
    // pick rootIndex in preorder
    // divide them into left subtree and right subtree in inorder
    // back to preorder, find rootIndex for left and right subtree again
    const node = new TreeNode(preorder[0]);
    const rootIndex = inorder.indexOf(preorder[0]);
    const inorderLeft = inorder.slice(0, rootIndex);
    const inorderRight = inorder.slice(rootIndex + 1);
    node.left = constructTree(preorder.slice(1, 1 + inorderLeft.length), inorderLeft);
    node.right = constructTree(preorder.slice(1 + inorderLeft.length), inorderRight);
    return node;
}
```

<Disqus />