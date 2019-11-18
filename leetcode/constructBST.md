---
tags: ['LeetCode', 'Top 100 Liked', '树', '面试问题 - 算法']
date: 09.28.2019
description: 这道题需要对前序和中序遍历有一个极为清楚的认识
---

# 从前序与中序遍历序列构造二叉树

> Posted: 09.28.2019

<Tag />

## 描述

![Construct Binary Tree from Preorder and Inorder Traversal](/images/constructBST.png)

## 算法

- 核心思想一共有两点：
  - 对于前序遍历来说，当前数组的第一个元素便是这棵树的根节点，剩下的则是左侧子树与右侧子树（分别形成一个组）
    - 这个时候我们拿到了根节点，而这个根节点对于中序遍历来说，也是适用的
  - 对于中序遍历来说，根节点左侧的部分便是左侧子树，根节点右侧的部分便是右侧子树
- 因此，在每次递归的时候
  - 从前序遍历的数组中，选择第一个元素，该元素便是当前子树的根节点
  - 在中序遍历的数组中，找到根节点所在的位置
    - 该位置左侧便是 inorderLeft，右侧便是 inorderRight（下一层递归的俩中序遍历数组）
  - 然后再回到前序遍历的数组，根据 inorderLeft 的长度，可以确定 preorderLeft 的长度（这俩长度一样）
    - 然后再根据长度进行 slice，得到 preorderLeft 和 preorderRight
  - 最后再分别将左侧子树与右侧子树利用递归实现

## 代码

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
    
    // 在中序遍历的数组中找到 rootIndex，然后分割
    const node = new TreeNode(preorder[0]);
    const rootIndex = inorder.indexOf(preorder[0]);
    const inorderLeft = inorder.slice(0, rootIndex);
    const inorderRight = inorder.slice(rootIndex + 1);

    // 递归
    node.left = constructTree(preorder.slice(1, 1 + inorderLeft.length), inorderLeft);
    node.right = constructTree(preorder.slice(1 + inorderLeft.length), inorderRight);
    return node;
}
```

<Disqus />