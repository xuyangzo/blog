---
tags: ['LeetCode', 'Top 100 Liked', 'Tree']
---

# Serialize and Deserialize Binary Tree

> Posted: 09.21.2019

<Tag />

## Description

![Serialize and Deserialize Binary Tree](/serializeBST.png)

## Algorithm

- Key idea is to use DFS and preorder traversal
  - BFS will also work here, but BFS requires the whole level to be complete,
  which means the serialized string will contain a lot of unnecessary `null`.
  Such waste can be avoided by DFS
- Serialize
  - Use DFS
  - If current node is null, concat `null` to string
  - Leave the trailing unnecessary `null`
    - Because for the bottom of right subtree, we will always have unnecessary `null`
- Deserialize
  - Use preorder traversal
    - Preorder traversal will work, because for preorder traversal, it goes deep down to
    the bottom first, so the order of values in string is same as the orde of DFS
  - Split the string into list of values
  - During recursion
    - Init current node
    - node.left = preorder(list)
    - node.right = preorder(list)
    - Return current node


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
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    // edge case
    if (!root) return '';
    
    // level order traversal
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
    
    // preorder traversal
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

<Disqus />