---
tags: ['DOM操作', '面试问题 - JS']
---

# 跨域请求

> Posted: 10.08.2019

<Tag />

## 同源策略

只要协议、域名、端口

- 页面中的链接，重定向以及表单提交是不会受到同源策略限制的
- 跨域资源的引入是可以的。但是js不能读写加载的内容
  - 如嵌入到页面中的`<script src=“...”></script>`，`<img>`，`<link>`，`<iframe>`等

注意了，同源策略是<span style="color: palevioletred">**浏览器**</span>的策略，而且是在

<Disqus />