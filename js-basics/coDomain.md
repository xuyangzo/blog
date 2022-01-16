---
tags: ['浏览器', '面试问题 - JS']
date: 10.09.2019
image: /images/document-domain-intro.jpg
description: 凑数的跨域方法，谁用谁sb
---

# 跨域请求 - document.domain

> Posted: 10.09.2019

<Tag />

## 介绍

> 核心思想：利用 `<iframe>` 做承接，利用 document.domain 通信

看见上面的核心思想了没有？

既然你两个网页之间没办法直接通信，那我中间再架一层中间层，这两个网页分别和中间层通信。

本质上就是通过 js 强制设置 document.domain 为基础主域，手动实现同域。

## 流程

1. 该方式只能用于二级域名相同的情况下，比如 `a.test.com` 和 `b.test.com`
2. 只需要给页面添加 `document.domain = test.com` 表示二级域名都相同就可以实现跨域
3. 看到这里你是不是发现了一个问题...
4. 那就是，document.domain 都是只不过是让客户端和 iframe 通信而已啊喂！
5. 那服务器怎么办？我放在这里，这么大一个服务器怎么办？假如说服务器的域名是 fuck.com 呢？
6. 没有办法。懂了吧？document.domain 根本就无法用来解决客户端与服务器之间的跨域问题

## 环境准备

准备个屁，老子哪来的两个，一级域名一样，二级域名不一样，但都归我管辖的网站。

有确实可以有，但很麻烦。所以这里就直接照搬别人的代码吧。

## 代码实现

Parent：

```html
<!-- a.zf1.cn:3000/a.html -->
<body>
 helloa
  <iframe src="http://b.zf1.cn:3000/b.html" frameborder="0" onload="load()" id="frame"></iframe>
  <script>
    document.domain = 'zf1.cn'
    function load() {
      console.log(frame.contentWindow.a);
    }
  </script>
</body>
```

Child:
```html
<!-- b.zf1.cn:3000/b.html -->
<body>
   hellob
   <script>
     document.domain = 'zf1.cn'
     var a = 100;
   </script>
</body>
```

## 缺点

1. 无法实现客户端与服务器之间的通信
2. 非常非常麻烦。首先你得有这俩网页的控制权，然后他们的一级域名得一样，端口得一样，协议得一样...
3. 这个方法就是用来凑数的，99.99% 的情况下用不到

## 参考资料

[九种跨域方式实现原理（完整版）](https://juejin.im/post/5c23993de51d457b8c1f4ee1)

<Chirpy />