---
tags: ['LeetCode', 'Top 100 Liked', 'Sliding Window']
---

# Minimum Window Substring

> Posted: 09.18.2019

<Tag />

## Description

![Minimum Window Substring](/minWindowStr.png)

## Algorithm

- Typical Sliding Window problem, key idea is keep a window 
- At a certain time point, there will only be two choices
  - Move l: if current window is valid, move r will always make it valid, so need to move l
  - Move r: if current window does not satisfy the requirement, then move left will not make it 
  valid ,therefore need to move r
- Set l = r = 0, counter = s.length
- Create a map, store each character in s in the map
- While r < s.length
  - Check if s[r] is in map and > 0, if so, decrement counter
  - Then, always decrement map[s[r]] and increment r
  - While counter === 0 (the window is valid, so need to move l)
    - Check if current window is minimum, if so, record head = l
    - Increment map[s[l]]
    - Check if map[s[l]] > 0, if so, increment counter
    - Increment l
- Return slice start at head and with length = min

## Code

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    // edge case
    if (!s || !s.length || !t || !t.length) return "";
    
    // construct map
    const map = {};
    for (let i = 0; i < t.length; i++) {
        const letter = t[i];
        if (map[letter]) map[letter] += 1;
        else map[letter] = 1;
    }
    
    
    // set two pointers, left and right, both at beginning
    let l = r = 0, 
        head = s.length, 
        count = t.length, 
        _min = Number.MAX_VALUE;
    
    while (r < s.length) {
        // check if current right element is in map
        // if it is in the map, decrement count and in map
        // otherwise, just increment r
        if (map[s[r]] > 0) count--;
        map[s[r]]--;
        r++;
            
        // while current substring is valid
        while (!count) {
            // check if it's min length first
            if (r - l < _min) {
                _min = r - l;
                head = l;
            }
            
            map[s[l]]++;
            // at this time, move right pointer will not decrease 
            // length, therefore, we need to move left pointer
            if (map[s[l]] > 0) count++;
            l++;
        }
    }
    
    return s.slice(head, _min + head);
};
```

<Disqus />