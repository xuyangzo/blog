---
tags: ['LeetCode', 'Top 100 Liked', '树']
date: 09.18.2019
description: 其实不难，只是要额外多想一下
---

# 二叉树层级遍历

> Posted: 09.18.2019

<Tag />

## 描述

![Binary Tree Level Order Traversal](/images/bstLevel.png)

## 算法

- 用队列来进行层级遍历（本质上就是广度优先算法）
- 在开始遍历前，设置 last = root，nlast = null
  - last 指的是在当前这一层，最右侧的那一个节点
  - nlast 指的是在下一层，最右侧的那一个节点，需要在遍历中不断更新
- 在遍历的途中
  - 需要把左侧的子节点和右侧的子节点 push 到队列里
    - 在把左侧的子节点 push 到队列里后，设置 nlast = left child
    - 在把右侧的子节点 push 到队列里后，设置 nlast = right child
  - 这么做的话，每次遇见同一层的节点，nlast 都会被重新设置成为该节点最右侧的子节点
    - 然后，一直到这一层最右侧的节点，nlast 被设置成该节点最右侧的节点
    - 因此，目前的 nlast 是下一层最右侧的节点
  - 然后我们检查当前节点是不是 last（这一层最右侧的节点）
    - 如果是的话，就设置 last = nlast，并且把当前这一层 push 到答案里
    - 在这样的设置后，last 便是下一层最右侧的节点，然后我们开始遍历下一层

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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    
    const queue = [];
    const ans = [];
    
    queue.push(root);
    let temp = [];
    
    let last = root, nlast = null;
    
    // 无论如何，总是要更新 nlast 
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
        // 查看现在到没到这一层的最右侧
        if (last === node) {
            ans.push(temp);
            temp = [];
            last = nlast;
        }
    }
    
    return ans;
};
```

<Chirpy />