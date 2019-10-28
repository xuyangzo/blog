---
tags: ['CSS布局', '面试问题 - CSS']
---

# 清除浮动

> Posted: 10.15.2019

<Tag />

## 介绍

清除浮动是一种很常见的场景。

首先我们建一个 HTML 页面，这个时候先不加任何 float 看看。

```html
<div class="box box1"></div>
<div class="box box2"></div>
<div class="box box3"></div>
```

```css
.box {
  width: 100px;
  height: 100px;
}

.box1 {
  background: pink;
}

.box2 {
  background: lightblue;
}

.box3 {
  background: yellow;
  opacity: 0.5;
}
```

效果：

<div class="f-box f-box1"></div>
<div class="f-box f-box2"></div>
<div class="f-box f-box3"></div>

<style>
.f-box {
  width: 100px;
  height: 100px;
}
.f-box1 {
  background: pink;
}

.f-box2 {
  background: lightblue;
}

.f-box3 {
  background: yellow;
  opacity: 0.5;
}
</style>

然后我们给 box1 和 box2 加上 float 效果：

```css
.box1 {
  float: left;
  background: pink;
}

.box2 {
  float: left;
  background: lightblue;
}
```

效果是这样的：

<div class="f-box ff-box1"></div>
<div class="f-box ff-box2"></div>
<div class="f-box ff-box3"></div>
<div style="clear: both"></div>

<style>
.f-box {
  width: 100px;
  height: 100px;
}
.ff-box1 {
  float: left;
  background: pink;
}

.ff-box2 {
  float: left;
  background: lightblue;
}

.ff-box3 {
  background: yellow;
  opacity: 0.5;
}
</style>

因为施加 float 后，box1 和 box2 脱离了文档流，因此 box3 补上了 box1 的位置。这俩重叠了。

而我们想要的效果，其实是 box1 与 box2 的 float 不会影响到 box3。

<div class="f-box ff-box1"></div>
<div class="f-box ff-box2"></div>
<div style="clear: both"></div>
<div class="f-box ff-box3"></div>

<style>
.f-box {
  width: 100px;
  height: 100px;
}
.ff-box1 {
  float: left;
  background: pink;
}

.ff-box2 {
  float: left;
  background: lightblue;
}

.ff-box3 {
  background: yellow;
  opacity: 0.5;
}
</style>

## 额外标签

这种方法需要添加额外的 HTML 标签，但是不需要设置 CSS（你设个类搞这玩意儿也行）。

可以说是最简单的方法，谁用谁知道。

```html
<div class="f-box ff-box1"></div>
<div class="f-box ff-box2"></div>
<div style="clear: both"></div>
<div class="f-box ff-box3"></div>
```

实现的效果：

<div class="f-box ff-box1"></div>
<div class="f-box ff-box2"></div>
<div style="clear: both"></div>
<div class="f-box ff-box3"></div>

### 缺点

会添加一些无意义的空标签，在后期维护中将是噩梦。

<span v-line>但其实不是噩梦，因为你不会经常用到浮动，除非你真的需要。</span>

一般情况下能用浮动实现的效果，不为什么不用弹性盒实现呢？<span v-line>兼容</span>

## 利用 BFC

关于 BFC 是啥，可以参考我的这篇文章：[BFC](/css-tricks/bfc.md)

简单来说，我们希望在 box1 和 box2 外面套一个 container，然后把那个 container 变成 BFC。

```html
<div class="container">
  <div class="box box1"></div>
  <div class="box box2"></div>
</div>
<div class="box box3"></div>
```

但注意了，<span v-red>**这里并不是所有触发 BFC 的效果都能生效！**</span>

所以我们主要还是看 overflow 和 display 这两种方法。

### overflow

visible 以外（hidden、auto、scroll）的值都可以触发 BFC。

```css
.container {
  overflow: auto;
}
.container {
  overflow: scroll;
}
.container {
  overflow: hidden;
}
```

以上三种设置都可以。最终实现的效果如下：

<div class="f-box ff-box1"></div>
<div class="f-box ff-box2"></div>
<div style="clear: both"></div>
<div class="f-box ff-box3"></div>

### display

如下的情况可以触发 BFC：inline-block，inline-flex，flex，table-cell。

但是具体实现起来，俩 inline 的和俩不 inline 的，还是有差别的。

#### inline

```css
.container {
  display: inline-block;
}
.container {
  display: inline-flex;
}
```

<div class="f-container">
  <div class="f-box ff-box1"></div>
  <div class="f-box ff-box2"></div>
</div>
<div class="f-box ff-box3"></div>

<style>
.f-container {
  display: inline-block;
}
</style>

我们可以发现，在第一行和第二行之间，有一段很小的空白。

至于为什么会有这一段空白，可以参考我的这篇文章：[标准文档流](/css-tricks/documentFlow.md)

而剩下两种方法则没有这样的问题。

```css
.container {
  display: flex;
}
.container {
  display: table-cell;
}
```

<div class="f-box ff-box1"></div>
<div class="f-box ff-box2"></div>
<div style="clear: both"></div>
<div class="f-box ff-box3"></div>

## :after 伪元素

> 目前业界一般都使用这种方法

这玩意儿本质上和额外标签是一样的。

就相当于是在 container 外添加了一层你根本看不见的标签，在那里清除浮动。

但是它不需要添加额外的标签，只需要在 CSS 层面做一些额外的工作。

```css
.container:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}

/* 为了兼容IE */
.container {
  zoom: 1; 
}
```

最终实现的效果：

<div class="f-box ff-box1"></div>
<div class="f-box ff-box2"></div>
<div style="clear: both"></div>
<div class="f-box ff-box3"></div>


## 参考资料

[彻底理解浮动float CSS浮动详解 清除浮动的方法](https://www.cnblogs.com/xiaoqiang001/p/3908257.html)

<Disqus />