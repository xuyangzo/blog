---
tags: ['网络安全', '面试问题 - 网络']
date: '10.21.2019'
image: '/xss-intro.png'
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

简单来说，XSS 攻击的危害就是：任何你通过执行脚本可以达成的危害，都是 XSS 攻击的危害。

这种危害可以简单来说，分成如下几个大类：

1. 通过 document.cookie 盗取 cookie
2. 使用 js 破坏页面正常的结构与样式
3. 流量劫持（通过访问某段具有 window.location.href 跳转到其他页面）
4. DDos攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器响应

然后，最重要的一点是，<span v-red>**XSS 攻击会为接下来我们要讲的 CSRF 攻击，提供执行环境！！！**</span>

关于 CSRF 攻击，可以参考这篇文章：[CSRF 攻击](/network/csrf.md)。

## XSS 攻击的类型

主要有三种类型

1. [反射型](/network/xss.md)
2. [存储型](/network/xssStore.md)
3. [DOM 型](/network/xssDOM.md)

一般文章是不会带你亲自走一遍的。

但是我会。我会详细地教你这三种 XSS 攻击究竟怎么执行。

详见上述的几篇文章。请务必仔细地过一遍。

<span v-red>**这对于理解 XSS 攻击至关重要！！！**</span>

## XSS 攻击的防御

### cookie 设置 HTTPOnly 以及 secure 属性

- HttpOnly：只允许在 HTTP/HTTPS 请求中使用 cookie，禁止脚本获取cookie，如：document.cookie
- secure：只允许在 HTTPS 请求中使用 cookie

以 node 为例（添加一个中间件）

```javascript
app.use((req, res, next) => {
  res.setHeader("Set-Cookie", "cookiename=httponlyTest;Path=/;Domain=domainvalue;Max-Age=seconds;HTTPOnly;secure");
  next();
});
```

但是这么做的话：

1. 只能防止 XSS 攻击盗取 cookie，无法防止其它的攻击效果
2. 仅仅只能针对该服务器的响应所携带的 cookie，无法顾及到别的请求

### 过滤不合法的字符

在服务器端，把输入的一些不合法的东西都过滤掉，从而保证安全性。

如移除用户上传的 DOM 节点，一般来说都是如下的内容：

1. onerror
2. style
3. iframe
4. script
5. 等等...

一般来说，我们不需要自己写这玩意儿，直接用别人写好的库就行了。

3.1k 的 star：[js-xss](https://github.com/leizongmin/js-xss)

6.5k 的 star：[helmet](https://github.com/helmetjs/helmet)

不同的语言自然有不同的库，如果是 node 的话，用上面的这俩中的一个应该就够了（我自己其实没用过...）

### 使用 JS 框架

如果无法直接编辑服务器的代码，我们可以用流行的 JS 框架，并且使用默认的渲染方式。

因为不管是 React 还是 Vue（Angular 不清楚），渲染的时候，都会默认渲染字符串。

```javascript
<div>{ this.someContent }</div> // react
<div>{{ someContent }}</div> // vue
```

以上的操作都会将 someContent 视作普通的字符串进行渲染。

如果要用 React 直接渲染 HTML，需要如下的操作：

```javascript
function createMarkup() {
  return {__html: '<p>lynch is sb</p>'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

而如果要用 Vue 直接渲染 HTML，需要如下的操作：

```vue
<div v-html="'<span>lynch is sb</span>'"></div>
```

如果不进行上述的操作，渲染的就是普通的字符串，即便该字符串是 HTML 也一样。

因此，不直接渲染 HTML 的话，是可以有效地防止 XSS 攻击的。

但如果需要直接渲染 HTML，一定要进行过滤，或者确保输入内容的用户位于白名单中。

## 额外资源

这个网站关于 XSS 攻击讲得特别详细：[Excess XSS](https://excess-xss.com/)

有空的话可以去过一遍。

什么？看不懂英文？

那关我屁事。

## 参考资料

[前端安全之XSS攻击](https://www.cnblogs.com/unclekeith/p/7750681.html)

[Cookie中的httponly的属性和作用](https://blog.csdn.net/qq_38553333/article/details/80055521)

[这可能是2019年最全的前端面试题](https://github.com/javascriptchen/interviews)

<Disqus />