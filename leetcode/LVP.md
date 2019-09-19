---
tags: ["LeetCode", "Top 100 Liked", "Dynamic Programming"]
---

# Longest Valid Parentheses

> Posted: 09.18.2019

<Tag />

## Description

![Longest Valid Parentheses](/LVP.png)

## Algorithm

> dp[i]: the longest valid parentheses **ending at** i  
> dp array stores the longest valid parentheses at each index

- Iterate from 0 to n
  - If encounters `(`, current string cannot be valid, therefore dp[i] = 0
  - If encounters `)`
    - If encounters `()`, current string depends on string at index i - 2, so dp[i] = d[i - 2] + 2
    - If encounters `))`
      - We look at the character at index (i - 1 - dp[i - 1]). i - 1 means previous character, and then we
      subtract the longest valid parentheses ending at that index, which is dp[i - 1]. Therefore, the index we
      check is the character that should become "pair" with current character s[i]
      - If `s[i - 1 - dp[i - 1]] === '('`, this character can pair with current character, which means from index
      to i, the slice of string is valid, we can always append such length `dp[i - 1] + 2` to former longest valid
      parentheses, which is `dp[i - 2 - dp[i - 1]]`, the character before s[index]. As a result:
        - dp[i] = dp[i - 1] + dp[i - 2 - dp[i - 1]] + 2
      - Otherwise, that s[index] cannot pair with current character, which means from index to i, we cannot form a
      valid parentheses string, therefore dp[i] = 0


## Code

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (!s) return 0;
    
    const dp = [0];
    
    for (let i = 1; i < s.length; i++) {
        // only check when encounters (
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                dp[i] = (dp[i - 2] || 0) + 2;
            } else {
                if (s[i - dp[i - 1] - 1] === '(') {
                    dp[i] = dp[i - 1] + 
                            (dp[i - 2 - dp[i - 1]] || 0) + 2;
                } else {
                    dp[i] = 0;
                }
            }
        } else {
            dp[i] = 0;
        }
    }
    
    return Math.max.apply(Math, dp);
};
```

<Disqus />