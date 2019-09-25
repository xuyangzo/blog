---
tags: ['DOM操作', '面试问题 - JS']
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

## 参考资料

[JavaScript函数节流和函数防抖之间的区别](https://www.cnblogs.com/walls/p/6399837.html)

<Disqus />