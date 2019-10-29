---
tags: ['DOM相关', '面试问题 - JS']
date: 09.23.2019
image: /throttle-intro.png
description: 节流和防抖在日常情况下用得挺多的，这还能不会？
---

# 节流和防抖函数

> Posted: 09.23.2019

<Tag />

## 节流函数

> 目的：限定一定时间内，某个特定事件触发的次数

### 什么时候用

当你想要限制某个特定事件，在某段时间内的触发次数时。

例如，在1秒内，仅仅触发一次`onscroll`

### 代码

使用 setTimeout:
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

不使用 setTimeout:
```javascript
var startTime = new Date();
document.onscroll = function() {
  var currTime = new Date();
  if (currTime - startTime < 1000) return;
  
  console.log('throttle');
  startTime = currTime;
}
```

## 防抖函数

> 在某个事件停止触发后的一段时间后，执行代码

### 什么时候用

在某个事件一直被触发时，你不想执行特定的代码。  
而当该事件停止触发一段时间后，你想要执行该代码。

例如，当用户在搜索框输入的时候，不要展示搜索的结果。  
在用户输完1秒后，展示搜索的结果。

### 代码

```javascript
var timer = false;
document.onscroll = function() {
  clearTimeout(timer);
  timer = setTimeout(function() {
    console.log('debounce');
  }, 1000);
}
```

## 节流与防抖相结合

那么问题来了，节流函数与防抖函数可以结合吗？

答案是肯定的，因为这两者其实负责的是完全不同的东西，没有任何冲突。

那么，如果将两者结合，实现的是什么效果呢？

那就是：在一定时间内，如果连续触发的话，只会生效一次，并且只有最后一次触发生效。

```javascript
function hello() {
  console.log('hello');
}

var timer = false;
var start = new Date();

function throttle(method, delay, atleast) {
  var current = new Date();
  var context = this;
  var args = arguments;

  return function() {
    if (current - start > atleast) {
      // 函数节流
      method.call(context, args);
      start = current;
    } else {
      // 函数防抖
      clearTimeout(timer);
      timer = setTimeout(function() {
        method.call(context, args);
      }, delay);
    }
  }
}

document.getElementById('app').onscroll = throttle(hello, 200, 1000);
```

## 参考资料

[JavaScript函数节流和函数防抖之间的区别](https://www.cnblogs.com/walls/p/6399837.html)

<Disqus />