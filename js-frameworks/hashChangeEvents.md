---
tags: ['Vue']
date: 09.19.2019
image: /hash-intro.png
description: 刚开始学 Vue 时候写的傻卵文章，大家随便看看
---

# Vue 的 Hashchange 事件

> Posted: 09.19.2019

<Tag />

## 问题

问题是，当 hash tag 发生更改的时候，vue router 无法监听到该事件（react-router也一样），因此无法重新渲染页面。

例如，当 url 从 `/tags.html#Top%20100%20Liked` 变为 `/tags.html#Dynamic%20Programming` 时，vue 不会重新渲染页面。

<span v-red>但是一般来说，hash tag 的作用也不是决定页面渲染的内容，而是作为页面内容的定位。</span>

但是对于这个网站来说，由于用的是 VuePress，还是会不可避免地遇见这个问题。因为 VuePress 的 router 会自动在 url 上添加后缀，
比如 `a.com?b=c` 就会变成 `a.com?b=c.html`，`/a/b` 会变成 `/a/b.md` ，所以无法使用 route 和 query string 来确定页面的内容。

Hash tag 肯定不是最好的方案，但的确是最简单的方案。

## 解决方案

> 核心思想是：在 hashchange 事件被触发时，触发重渲染

- Vue-router 不会被动监听 hashchange 事件，因为我们需要主动监听
- 当 hashchange 事件发生时，我们需要重新渲染整个页面

<span v-red>=> 因此，我们必须要进行强制更新！</span>

Vue 有一个强制更新的方法 `vm.$forceUpdate()`，但是该方法并不会重新计算 computed 属性下的内容，只会重新执行 methods 里的方法。所以我们必须把需要更新的内容放在 methods 里，而不是 computed 里。

## 代码

通过 watch 来监听 hashchange 的事件：

```javascript
watch: {
  $route: function() {
    // 在这里强制更新
    this.$forceUpdate();
  }
}
```

<br />
把更新放在 methods 里：

```javascript
methods: {
  tags() {
    const tag = this.$route.hash.slice(1).replace(/%20/g, " ");
    let articles = [];
    
    // 在这里更新...

    return articles;
  }
}
```

<br />
在 template 里，调用函数

```javascript
<ul>
  <li v-for="page in tags()" v-bind:key="page.path + tag">
    <router-link
      v-bind:to="{ path: page.path}">{{ page.title }}</router-link>
  </li>
</ul>
```


<Disqus />

