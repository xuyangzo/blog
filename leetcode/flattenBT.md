---
tags: ['LeetCode', 'Top 100 Liked', '树', '面试问题 - 算法']
date: 09.18.2019
description: 懂不懂什么叫反向后序遍历？不懂的话这题也太难了
---

# 二叉树展开为链表

> Posted: 09.18.2019

<Tag />

## 描述

![Flatten Binary Tree to Linked List](/flattenBT.png)

## 算法

- 核心思想是反向后序遍历
  - 为什么需要后序遍历？
  - 因为一般后序遍历的顺序为：左侧子节点 -> 右侧子节点 -> 父节点
  - 而在这里，反向后序遍历：右侧子节点 -> 左侧子节点 -> 父节点
  - 因此，在递归返回的时候，我们首先在右侧子节点，然后到左侧子节点，然后到父节点
    - 这个时候，我们可以形成一条小链表，父节点 -> 左侧子节点 -> 右侧子节点
    - 递归往上的过程，就是在这条小链表的开头添加节点的过程
- 设置一个全局变量 prev = null 来追踪**当前**的节点
- 做后序遍历，直到最后一个节点
  - 设置 prev = 当前节点
- 在返回根节点的过程中
  - 设置当前节点的左侧子节点为 null，右侧子节点为 prev
  - 设置 prev 为当前节点

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