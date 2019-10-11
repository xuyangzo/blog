---
tags: ['DOM相关', '面试问题 - JS']
---

# 跨域请求 - JSONP

> Posted: 10.08.2019

<Tag />

## 介绍

> 核心思想：`<script>` 标签不受同源策略限制

JSONP 就是 JSON with Padding。

## 流程

1. 创建一个回调函数，并且命名其为 mycall（叫什么都行）
2. 动态添加 `<script> `元素，把跨域的 API 数据接口地址，赋值给 script 的 src
3. 向服务器发送请求，请求地址后面加上查询字符串，通过 callback 参数指定回调函数的名字
4. 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串，如 `mycall('this')`
5. 最后服务器把准备的数据通过HTTP协议返回给客户端，客户端再调用执行之前声明的回调函数（mycall），对返回的数据进行操作

## 代码实现

首先是客户端。考虑到兼容性的问题，我这里没有用 Promise 封装。

```javascript
// 设置回调函数的名字
var callback = 'lynchsb';

/**
 * 设置请求的参数
 * 我这里为了简便，直接手写了
 * 但其实可以用 Promise 封装一个 jsonp 的方法
 */
var data = 'hello';
var url = `http://localhost:8081/test?text=${data}&callback=${callback}`;


// 动态创建 script 标签
var script = document.createElement('script');
script.src = url;
document.body.appendChild(script);

/**
 * 接下来，我们需要调用 callback
 * 那么，要怎么监测数据已经返回了呢？
 * 就只需要在 window 对象上添加 callback 方法
 * 当服务器返回的时候，其返回的是一个包含如下代码的 script 文件
 * lynchsb(parameters)
 * 就像用 script 标签调用别的脚本文件一样，就给执行了
 */
window[callback] = function (data) {
  /**
   * console.log(JSON.parse(data));
   * 注意这里不需要 parse，因为 data 不是字符串
   * 服务器传递给 callback 的参数是什么，data 就是什么
   */
  console.log(data);
  document.body.removeChild(script);
}
```

然后是服务器

```javascript
app.get("/test", (req, res) => {
  // 需要发送的数据
  const data = {
    name: "lynch",
    length: "18"
  };
  // 从 query string 上拿到 callback 的名字
  const { text, callback } = req.query;
  // callback 的参数是字符串，因此需要做 stringify
  res.status(200).end(`${callback}(${JSON.stringify({ fromClient: text, ...data })})`);
});
```

## 实现效果

![jsonp](/jsonp.png)

哇，成功了。


## 缺点

1. 只支持 GET 方法，因为 script 标签本质上就是 GET 方法
2. 需要在服务器端对代码做特殊处理，增加了额外的工作量


## 参考资料

[九种跨域方式实现原理（完整版）](https://juejin.im/post/5c23993de51d457b8c1f4ee1)

<Disqus />