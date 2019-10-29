---
tags: ['LeetCode', 'Top 100 Liked', '树', '面试问题 - 算法']
date: 09.21.2019
description: 不是啥难题，就是我脑子有时候会转不过来
---

# 翻转二叉树

> Posted: 09.21.2019

<Tag />

## 描述

![Invert Binary Tree](/invertBT.png)

## 算法

- 核心思想是后序遍历
  - 后序遍历的顺序是：左侧子节点 -> 右侧子节点 -> 父节点
  - 因此，我们是从最底层一层一层往上遍历的
  - 如果我们在每一层交换左右子节点，那么我们可以保证是从底层开始这么做的
  - 如果你仔细观察图片的话，就会发现，这道题本质上，所有的节点都交换了左右子节点
- 在后序遍历中
  - postorder(node.left)
  - postorder(node.right)
  - 交换左右子节点
  - 这里不需要返回任何东西

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
    
    // 交换左右子节点
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
}
```

<Disqus />