---
tags: ['LeetCode', 'Top 100 Liked', '回溯算法', '面试问题 - 算法']
date: 09.20.2019
description: 算法不是很难，但是真的写起来很容易出 bug
---

# 删除无效的括号

> Posted: 09.20.2019

<Tag />

## 描述

![Remove Invalid Parentheses](/images/removeInvalidParen.png)

## 算法

- 核心思想是回溯算法
- 用 l 来表示还有多少个左括号需要移除
- 用 r 来表示还有多少个右括号需要移除
- 首先，我们需要一个函数来检查当前的字符串是否合法
  - 在遍历字符串的时候
    - 在最后一个字符之前，l 必须 >= r
    - 在最后一个字符的时候，l 必须 === r
  - 如果都满足，字符串就是合法的
- 然后，我们需要一个函数来计算 l 和 r
  - l += (ch === '(')，如果碰见左括号，就 l++
  - if (l === 0) r += (ch === ')')，如果碰见额外的右括号，就 r++
  - l -= (ch === ')')，如果碰见右括号，就 l--
- 使用深度遍历的算法，将起始位置设置成 0
  - 如果 l = r = 0，并且字符串是合法的，那么就添加到答案里
  - 如果 r > 0，那么我们就先移除右括号（必须先移除右括号，再考虑左括号）
    - 从起始位置开始，寻找第一个右括号
      - 如果碰见了重复的右括号，那么则取重复的里面的最后一个
    - 建立一个字符串的复制，然后把这个右括号从复制里移除
    - 对于下一层遍历来说，传递复制下去，而不是原来的字符串，并且传递的起始位置为 i - 1
      - 传递 i - 1 的目的，是因为刚才我们跳到了重复的右括号的最后一个的位置，如果传递 i，那么该部分重复的右括号就会被忽视，也就是说只会被处理一次，而这显然是不对的
  - 如果 l > 0，做同样的操作

## 代码

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
    // edge case
    if (!s || !s.length) return [""];
    
    // 检查当前字符串是否合法
    if (isValid(s)) return [s];
    
    // 计算 l 和 r
    let l = r = 0;
    for (let i = 0; i < s.length; ++i) {
        l += (s[i] === '(');
        if (l === 0) r += (s[i] === ')');
        else l -= (s[i] === ')');
    }
    
    // 深度遍历
    const ans = [];
    dfs(s, l, r, ans, 0);
    
    return ans;
};

function dfs(s, l, r, ans, start) {
    const valid = isValid(s);
    // base case
    if (!l && !r && valid) {
        ans.push(s);
        return;
    }
    
    // 先移除右括号
    if (r > 0) {
        for (let i = start; i < s.length; ++i) {
            if (s[i] === ')' && 
                (i === s.length - 1 || s[i] !== s[i + 1]))
            {
                const temp = s.slice(0, i).concat(s.slice(i + 1));
                dfs(temp, l, r - 1, ans, i - 1);
            }
        }
    } else if (l > 0) {
        // 再移除左括号
        for (let i = start; i < s.length; ++i) {
            if (s[i] === '(' && 
                (i === s.length - 1 || s[i] !== s[i + 1]))
            {
                const temp = s.slice(0, i).concat(s.slice(i + 1));
                dfs(temp, l - 1, r, ans, i - 1);
            }
        }
    }
}

// 检查字符串是否合法
function isValid(s) {
    let l = r = 0;
    for (let i = 0; i < s.length; ++i) {
        if (l < r) return false;
        
        if (s[i] === '(') l++;
        else if (s[i] === ')') r++;
    }
    
    if (l !== r) return false;
    return true;
}
```

<Disqus />