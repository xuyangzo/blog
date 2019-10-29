---
tags: ['LeetCode', 'Top 100 Liked', '树', '面试问题 - 算法']
date: 09.18.2019
description: 这道题不难，但还是要多想一下的
---

# 验证二叉搜索树

> Posted: 09.18.2019

<Tag />

## 描述

![Validate Binary Search Tree](/validateBST.png)

## 算法

- 核心思想是，在每次递归的时候，传递下一层递归所要比较的上下限
- 在主函数里，调用辅助函数，并且不传递任何上下限
- 在辅助函数里，比较当前节点和传递来的上下限
  - 如果 val > upper，设置 result = false
  - 如果 val < lower，设置 result = false
  - 接着，在传递参数给下一层递归的时候的
    - 对于左侧的子节点来说，传递 val 为上限，当前的下限为下限
    - 对于右侧的子节点来说，传递 val 为下限，当前的上限为上限

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