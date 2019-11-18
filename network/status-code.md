---
tags: ['网络协议', 'HTTP', '面试问题 - 网络']
date: 10.26.2019
image: /images/http-status-intro.png
description: 从别人的文章里搬运来了各大 HTTP 状态码
---

# HTTP 状态码

> Posted: 10.26.2019

<Tag />

## 介绍

虽然这边列出了无数的 Http 状态码，但并不是所有的状态码都是需要记住的。

需要记住的只有一些比较核心的状态码，已经用红色标出来了。

并且我这里并没有包含所有的 HTTP 状态码，有些还未实行的我就没加进去。

## 1XX

代表请求已被接受，需要继续处理。

| 状态码 | 代表状态 | 解释 |
| :---:| :---: | :---: |
| <span v-red>**100**</span> | Continue | 客户端部分请求已被接收，继续发送请求 |
| 101 | Switching Protocol | 服务器理解客户端请求，并将通过 Upgrade 消息头通知客户端采用不同的协议来完成这个请求（只能切换到更高的协议，比如从 HTTP/1.0 切换到 HTTP/1.1） |
| 102 | Processing | 处理将被继续执行 |

## 2XX

请求已成功被服务器接收、理解、并接受。

| 状态码 | 代表状态 | 解释 |
| :---:| :---: | :---: |
| <span v-red>**200**</span> | OK | 请求成功 | 
| 201 | Created | 请求已经被实现，而且有一个新的资源已经根据请求的需要而建立，且其 URI 已经随 Location 头信息返回。假如需要的资源无法及时建立，应当返回“202 Accepted” |
| 202 | Accepted | 服务器接受请求，但尚未处理 |
| 203 | Non-Authoritative Information | 服务器成功处理请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。只有不返回203就得返回200的情况下合适|
| <span v-red>**204**</span> | No Content | 服务器成功处理请求，但不需要返回任何内容 |
| 205 | Reset Content | 同204，但要求重置表单 |
| 206 | Partial Content | 服务器已经成功处理了部分GET请求 |

## 3XX

这类状态码代表需要客户端采取进一步的操作才能完成请求。

通常，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的 Location 域中指明。

当且仅当后续的请求所使用的方法是 GET 或者 HEAD 时，用户浏览器才可以在没有用户介入的情况下自动提交所需要的后续请求。

客户端应当自动监测无限循环重定向（例如：A->A，或者A->B->C->A），因为这会导致服务器和客户端大量不必要的资源消耗。

按照 HTTP/1.0 版规范的建议，浏览器不应自动访问超过5次的重定向。

| 状态码 | 代表状态 | 解释 |
| :---:| :---: | :---: |
| 300 | Multiple Choice | 被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。用户或浏览器能够自行选择一个首选的地址进行重定向 |
| <span v-red>**301**</span> | Moved Permanently |  被请求的资源意永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干URI之一 |
| <span v-red>**302**</span> | Moved Temporarily | 请求的资源临时从不同的URI响应请求。由于是临时的，客户端应当继续向原有地址发送以后的请求 | 
| 303 | See Other | 对应当前请求的响应可以在另一个URL上被找到，而且客户端应当采用GET的方式访问那个资源 |
| <span v-red>**304**</span> | Not Modified | 客户端发送了一个带条件的GET请求且该请求已被允许，而文档的内容并没有改变，服务器应当返回这个状态码 | 
| 305 | Use Proxy | 被请求的资源必须通过指定的代理才能访问 |
| 307 | Temporary Redirect | 请求的资源临时从不同的URI响应请求 |

## 4XX

表示请求错误（是请求的问题，不是服务器的问题）。

| 状态码 | 代表状态 | 解释 |
| :---:| :---: | :---: |
| <span v-red>**400**</span> | Bad Request | 语义有误，当前请求无法被服务器理解，除非进行修改，否则客户端不应该重复提交这个请求；请求参数有误 |
| <span v-red>**401**</span> | Unauthorized | 当前请求需要验证（WWW-Authenticate） |
| <span v-red>**403**</span> | Forbidden | 服务器已经理解请求，但是拒绝执行 |
| <span v-red>**404**</span> | Not Found | 请求失败，资源未在服务器上发现 |
| 405 | Method Not Allowed | 指定的请求方法不能用于请求资源 |
| 406 | Not Acceptable | 请求的资源内容特性无法满足请求头中的条件，因而无法生成响应实体 |
| 408 | Request Timeout | 请求超时。可以随时再次提交 |
| 409 | Conflict | 由于和被请求资源的当前状态冲突，请求无法完成 |
| 411 | Length Required | 服务器拒绝在没有定义Content-Length头的情况下接受请求。客户端可以再次提交该请求 |
| 412 | Precondition Failed | 请求头字段的先决条件不满足 |
| 413 | Request Entity Too Large | 请求数据太大 |
| 414 | Request-URI Too Long | 请求的URI长度超过服务器解释长度 |
| 415 | Unsupported Media Type | 不支持格式 |
| 416 | Request Range Not Satisfied | 如果请求中包含了 Range 请求头，并且 Range 中指定的任何数据范围都与当前资源的可用范围不重合，同时请求中又没有定义 If-Range 请求头 |
| 417 | Expectation Failed | 请求头Expect中指定的预期内容无法满足 |

## 5XX

服务器的错误。

| 状态码 | 代表状态 | 解释 |
| :---:| :---: | :---: |
| <span v-red>**500**</span> | Internal Server Error | 服务器出现未曾预料的状况 |
| 501 | Not Implemented | 服务器不支持请求所需要的某个功能 |
| 502 | Bad Gateway |  上游服务器收到无效的响应 |
| <span v-red>**503**</span> | Service Unavailable | 临时的服务器维护或者过载 |
| <span v-red>**504**</span> | Gateway Timeout | 未能及时从上游服务器收到响应 |
| 505 | HTTP Version Not Supported | 服务器不支持HTTP版本 |


## 参考资料

[HTTP状态码详解](http://tool.oschina.net/commons?type=5)

<Disqus />