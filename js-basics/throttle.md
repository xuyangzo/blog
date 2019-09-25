---
tags: ['DOM', 'Interview Problems']
---

# Throttle and Debounce

> Posted: 09.23.2019

<Tag />

## Throttle

> Purpose: limit number of events triggered in a certain amount of time

### When to Use

When you want to restrict the trigger of events within a certain amount of time.

For example, trigger `onscroll` events once per second

### Code

With setTimeout:
```javascript
var canRun = true;
document.onscroll = function() {
  if (!canRun) return;
  
  canRun = false;
  setTimeout(function() {
    console.log('throttle');
    canRun = true;
  }, 1000);
}
```

<br />

Without setTimeout:
```javascript
var startTime = new Date();
document.onscroll = function() {
  var currTime = new Date();
  if (currTime - startTime < 1000) return;
  
  console.log('throttle');
  startTime = currTime;
}
```

## Debounce

> Execute certain code after an event stop being triggered for a certain amount of time

### When to use

When you want to postpone an event until it is not repeatedly triggered.

For example, when the user keeps typing in the search bar, show nothing.  
As long as he/she finishes typing for 1 second, show the result.

### Code

```javascript
var timer = false;
document.onscroll = function() {
  clearTimeout(timer);
  timer = setTimeout(function() {
    console.log('debounce');
  }, 1000);
}
```

## Reference

[JavaScript函数节流和函数防抖之间的区别](https://www.cnblogs.com/walls/p/6399837.html)

<Disqus />