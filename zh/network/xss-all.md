---
tags: ['网络安全', '面试问题 - 网络']
---

# XSS 攻击 - 介绍

> Posted: 10.21.2019

<Tag />

## XSS 介绍

XSS = Cross-Site Scripting（跨站脚本）

那么问题来了，什么是 XSS 攻击？

一句话定义：<span v-red>**于渲染 DOM 的过程中，执行了不在预期内的 JS 代码**</span>。

渲染 DOM 的资源来自于哪里？——服务器。

因此，XSS 攻击的代码很显然，也是来自于服务器的。

那么问题来了，为什么服务器里会有攻击的代码？

抛开中出了叛徒这种情况，只有可能是攻击者注入服务器的。

那么，攻击者是怎么注入服务器的呢？

这就是 XSS 攻击的核心：<span v-red>**将攻击代码注入服务器**</span>。

## XSS 攻击的危害

## XSS 攻击的类型

主要有三种类型

1. [反射型](/zh/network/xss.md)
2. [存储型](/zh/network/xssStore.md)
3. [DOM 型](/zh/network/xssDOM.md)

一般文章是不会带你亲自走一遍的。

但是我会。我会详细地教你这三种 XSS 攻击究竟怎么执行。

详见接下来的几篇文章。

## XSS 攻击的防御

### cookie 设置 httpOnly

以 node 为例（添加一个中间件）

```javascript
app.use((req, res, next) => {
  res.setHeader("Set-Cookie", "cookiename=httponlyTest;Path=/;Domain=domainvalue;Max-Age=seconds;HTTPOnly");
  next();
});
```

## 参考资料

[前端安全之XSS攻击](https://www.cnblogs.com/unclekeith/p/7750681.html)

[Cookie中的httponly的属性和作用](https://blog.csdn.net/qq_38553333/article/details/80055521)

<Disqus />