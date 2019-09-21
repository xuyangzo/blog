---
tags: ['LeetCode', 'Top 100 Liked', 'Backtracking']
---

# Remove Invalid Parentheses

> Posted: 09.20.2019

<Tag />

## Description

![Remove Invalid Parentheses](/removeInvalidParen.png)

## Algorithm

- Key idea is backtracking
- Use `l` to denote the number of left parentheses to remove and `r` for right parentheses
- First, we need a function to check if current str is valid
  - During iteration, before reaching end, l >= r should always be valid
  - At the end, l === r should be valid
- Then, we need a function to count l and r
  - `l += (ch === '(')`
  - `if (l === 0) r += (ch === ')') // counts for ')('`
  - `l -= (ch === ')')`
- Use DFS, set start position to be 0
  - If l = r = 0 and string is valid, push current string to answer
  - If r > 0, remove right parentheses first
    - Search from start for right parentheses
      - If encoutners multiple consecutive `)`, skip to the last one
    - Create a copy, remove that character from copy
    - For next recursion, pass copy rather than original array, and pass start = i - 1
  - Else if l > 0, remove left parentheses

## Code

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
    // edge case
    if (!s || !s.length) return [""];
    
    // check if input string is valid
    if (isValid(s)) return [s];
    
    // calculate left/right parens to remove 
    let l = r = 0;
    for (let i = 0; i < s.length; ++i) {
        // if ( simply increase l
        l += (s[i] === '(');
        // if single ), increase r
        if (l === 0) r += (s[i] === ')');
        // if ) with (, decrease l
        else l -= (s[i] === ')');
    }
    
    // dfs
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
    
    // remove r first
    if (r > 0) {
        // find first ) and parse to end for duplicates
        // starting from start
        for (let i = start; i < s.length; ++i) {
            if (s[i] === ')' && 
                (i === s.length - 1 || s[i] !== s[i + 1]))
            {
                // remove current element and continue dfs
                const temp = s.slice(0, i).concat(s.slice(i + 1));
                dfs(temp, l, r - 1, ans, i - 1);
            }
        }
    } else if (l > 0) {
        // find first ( and parse to end for duplicates
        // starting from start
        for (let i = start; i < s.length; ++i) {
            if (s[i] === '(' && 
                (i === s.length - 1 || s[i] !== s[i + 1]))
            {
                // remove current element and continue dfs
                const temp = s.slice(0, i).concat(s.slice(i + 1));
                dfs(temp, l - 1, r, ans, i - 1);
            }
        }
    }
}

// check if a string is valid
function isValid(s) {
    let l = r = 0;
    for (let i = 0; i < s.length; ++i) {
        // at each time, number of ( should <= number of )
        if (l < r) return false;
        
        // update after check to skip the last one
        if (s[i] === '(') l++;
        else if (s[i] === ')') r++;
    }
    
    // check for the last one
    if (l !== r) return false;
    return true;
}
```

<Disqus />