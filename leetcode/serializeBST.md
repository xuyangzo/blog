---
tags: ['LeetCode', 'Top 100 Liked', '树', '面试问题 - 算法']
date: 09.21.2019
description: 这道题需要你对前序遍历和深度遍历的概念比较熟悉
---

# 序列化和反序列化二叉搜索树

> Posted: 09.21.2019

<Tag />

## 描述

![Serialize and Deserialize Binary Tree](/images/serializeBST.png)

## 算法

- 核心思想是使用深度遍历和前序遍历
  - 广度遍历在这里也可以，但是广度遍历要求每一层都完整地体现
  - 因此，假如说某一层只有一个节点，而别的都是 null，那么广度遍历就会需要你把这一层所有的 null 都算上
  - 因此广度遍历会带有很多不必要的 null，而深度遍历可以避免这一点
- 序列化
  - 使用深度遍历
    - 如果当前节点为 null，那么就添加 null 到字符串里
  - 当我们结束时，字符串的最后会有不必要的 null，这个先不用管
- 反序列化
  - 使用前序遍历
    - 前序遍历的顺序是：父节点 -> 左侧子节点 -> 右侧子节点
    - 这也就意味着，如果左侧子节点一直存在，那么就会先一路走左侧
    - 这和深度遍历的顺序其实是一样的
  - 把字符串给 split 成数组
    - 这一步是必要的，因为数组作为引用对象，是所有递归的函数共享的
    - 因此，每当一个元素从数组中被移除，所有递归的函数共享变化
  - 在递归的过程中
    - 设置当前的节点
    - node.left = preorder(list)
    - node.right = preorder(list)
    - 返回当前的节点


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
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    // edge case
    if (!root) return '';
    
    // 深度遍历
    const stack = [];
    stack.push(root);
    let ans = '';
    
    while (stack.length) {
        const top = stack.pop();
        ans = ans.concat(',', top ? top.val : 'null');
        if (top) {
            stack.push(top.right);
            stack.push(top.left);
        }
    }
    
    console.log(ans.slice(1));
    
    return ans.slice(1);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    // edge case
    if (!data.length) return null;
    
    // 前序遍历
    const lists = data.split(',');
    return deserializeHelper(lists);
};

function deserializeHelper(lists) {
    // base case
    if (lists[0] === 'null') {
        lists.shift();
        return null;
    }
    
    const node = new TreeNode(parseInt(lists.shift()));
    node.left = deserializeHelper(lists);
    node.right = deserializeHelper(lists);
    
    return node;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
```

<Chirpy />