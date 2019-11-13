---
tags: ['网络协议', 'TCP', '面试问题 - 网络']
date: 11.13.2019
image: /tcp-rely-intro.jpg
description: 讲一下 TCP 协议为什么是可靠的
---

# TCP 的可靠性

> Posted: 11.12.2019

<Tag />

## 介绍

我们都知道 TCP 比起 UDP，无疑是非常可靠的。

可是 TCP 的可靠性究竟体现在哪些方面呢？

其实主要有如下的方面：

- 校验和
- 序列号
- 确认应答
- 超时重传
- 连接管理
- 流量控制
- 拥塞控制

## 校验和

也就是 Checksum。这玩意儿不仅是 TCP 有，就连 UDP 也有，可以算是 UDP 唯一的可靠性保证了。



## 参考资料

[网络基础：TCP协议-如何保证传输可靠性](https://blog.csdn.net/liuchenxia8/article/details/80428157)

<Disqus />