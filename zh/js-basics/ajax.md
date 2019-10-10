---
tags: ['DOM操作', '面试问题 - JS']
---

# 原生 AJAX

> Posted: 10.08.2019

<Tag />

## 介绍

震惊！9102 年了竟然还有人手写 AJAX！

axios 不知道，好歹也知道 jQuery，不然就别搞前端了，养猪去吧。

但是有的面试官就是会叫你手写 AJAX，然后问一些很变态的问题。

如下：XMLHttpRequest 的 readyState 有哪几种状态？

不要觉得这是啥叼问题。年轻人，基础还是要牢牢掌握的啊。

## 状态

| Value | 状态 | 描述 |
| :-- | :-- | :-- |
| 0 | UNSENT | 代理被创建，但尚未调用 open() 方法 |
| 1 | OPENED | open() 方法已经被调用 |
| 2 | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得 |
| 3 | LOADING | 下载中； responseText 属性已经包含部分数据。 |
| 4 | DONE | 下载操作已完成 |

在接下来的代码里，你会发现我们检查 readyState 是否为4，就是这个原因

## GET 方法

```javascript
var xhr = new XMLHttpRequest();
// 第三个参数为是否异步，true 代表异步
xhr.open('get', 'MyServlet', true);
xhr.send();
xhr.onreadystatechange = function () {
  /**
   * readyState 和 status 是不相关的
   * readyState 代表了 AJAX 是否完成
   * status 代表了状态码，就算 AJAX 已完成也可以是 404 之类的
   * 
   * 每次 readyState 改变的时候，都会触发回调函数
   */
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
}
```

## POST 方法

```javascript
var data = { test: 'OK' };

var xhr = new XMLHttpRequest();
// post请求一定要添加请求头才行不然会报错
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.open('post', 'MyServlet', true);
/**
 * 发送的时候，需要将数据转化成字符串的形式
 * 因为这里是 form-urlencoded，不是必须为字符串
 * 具体根据你的 Content-Type 来判断
 */
xhr.send(JSON.stringify(data));

// 每次 readyState 改变的时候，都会触发回调函数
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
}
```


## 参考资料

[XMLHttpRequest.readyState](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)

<Disqus />