---
tags: ['网络基础', '面试问题 - 网络']
date: 11.06.2019
image: /hybrid-model-intro.jpg
description: 之前讲了 OSI 七层模型，这次讲一下具体应用的模型
---

# 混合模型

> Posted: 11.06.2019

<Tag />

## 介绍

之前在 [OSI 七层模型](/network/osi.md) 的文章里，我们说过，表示层和会话层从未被独立实现过，而是和应用层一起实现的。

没错，在实际应用中，应用层、表示层和会话层这三层一般都是结合起来的。

废话不多说，看图：

![hybrid model](/hybrid-model.png)

最左侧的是 OSI 七层模型，而在中间的是…… TCP/IP 的四层模型。

## TCP/IP 模型

我们可以看见，在 TCP/IP 的模型中，上三层被整合成了一个应用层。

传输层不变。

Network 和 Internet 只是名字不一样而已，本质上都是网络层。

而数据链路层和物理层则是被整合成了网络接口层。

## 混合模型

我们说的混合模型，其实就是 OSI 七层模型与 TCP/IP 模型的混合。

在前三层，我们使用一个整体的应用层来代替 OSI 七层模型里的上三层。

而下面的四层则是不变，继续使用 OSI 七层模型的下面四层。

因此，在实际应用中，我们一般使用的是一个五层的模型。

## 参考资料

[OSI Model - TCP/IP versus OSI model](https://www.udemy.com/course/complete-networking-fundamentals-course-ccna-start/learn/lecture/4481960#overview)

<Disqus />