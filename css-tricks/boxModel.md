---
tags: ['CSS布局', '面试问题 - CSS']
date: 10.16.2019
image: /box-model-intro.jpg
description: 盒模型是 CSS 的重中之重，不会就回家养猪吧
---

# 盒模型

> Posted: 10.16.2019

<Tag />

## 介绍

CSS 有两种盒模型。

分别是 content-box 和 border-box，通过 box-sizing 属性来设置。

这两种盒模型所形成的布局是不一样的。

今天我们就来特地看一下这俩盒模型有啥不一样的。

## content-box

这是默认的盒模型。

我们知道，CSS 的盒模型具有如下的结构：

![box](/box.png)

从外到内分别是：

- margin box
- border box
- padding box
- content box

接下来，我们用实际的例子来说明一下。

<div class="outer-container">
  <div class="inner-layer">
    <div class="inner-inner-layer">真正的内容在这里</div>
  </div>
  <div class="marker margin-marker"><------------ 200px ------------></div>
  <div class="marker border-marker"><--------- 160px --------></div>
  <div class="marker padding-marker"><------ 120px -----></div>
  <div class="marker content-marker"><-- 80px --></div>
</div>

<style>
.outer-container {
  width: 200px;
  height: 200px;
  background: lightcoral;
  position: relative;
}

.marker {
  font-size: 12px;
  height: 15px;
  position: absolute;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.margin-marker {
  top: 202px;
  width: 200px;
}

.border-marker {
  top: 182px;
  width: 160px;
  left: 20px;
}

.padding-marker {
  top: 162px;
  width: 120px;
  left: 40px;
}

.content-marker {
  top: 142px;
  width: 80px;
  left: 60px;
}

.inner-layer {
  margin: 20px;
  width: 80px;
  height: 80px;
  background: lightgreen;
  position: relative;
  top: 20px;
  border: 20px solid pink;
  text-align: center;
  box-sizing: content-box;
  padding: 20px;
}

.inner-inner-layer {
  width: 100%;
  height: 100%;
  background: lightcyan;
}
</style>

<br />

就这玩意儿，整个盒模型一共是 200x200px。

- <span style="color: lightcoral">margin: 20px</span>
- <span style="color: pink">border: 20px</span>
- <span style="color: lightgreen">padding: 20px</span>
- <span style="color: cyan">content: 80 x 80px</span>

我们可以看见，对于 content-box 来说，padding、border、margin 都增加了其范围。

如果你看到这里觉得有些不明所以的话，就继续往下看吧。

### 老司机带你走一遍 content-box

简单来说，首先我们有一个普通的 80x80px 的盒子，别的啥也没加

```css
.box {
  width: 80px;
  height: 80px;
  background: lightcyan;
}
```

<div class="ill-line ill-line-80">80px</div>

<br />

<div class="normal-box">这里是内容</div>

<style>
.ill-line {
  text-align: center;
  border-bottom: 1px solid black;
}

.ill-line-80 {
  width: 80px;
}

.normal-box {
  width: 80px;
  height: 80px;
  background: lightcyan;
}
</style>

<span v-red>**1. 首先，我们给这个盒子加了一个 padding: 20px，然后这个盒子变成了 120x120px**</span>

```css
.box {
  width: 80px;
  height: 80px;
  background: lightcyan;
  padding: 20px;
}
```

<div class="ill-line ill-line-80">80px</div>
<div class="ill-line ill-line-120">120px</div>

<br />

<div class="padding-box">这里是内容</div>

<style>
.ill-line-120 {
  width: 120px;
}

.padding-box {
  width: 80px;
  height: 80px;
  background: lightcyan;
  padding: 20px;
  box-sizing: content-box;
}
</style>

在这个时候，padding 并不是由外向内添加的，而是由内向外添加的。  

因此，盒子本质上其实是变大了，变大的范围就是添加的 padding。

<span v-red>**2. 然后，我们给盒子添加一个 border: 20px，然后这个盒子变成了 160x160px**</span>

 ```css
.box {
  width: 80px;
  height: 80px;
  background: lightcyan;
  padding: 20px;
  border: 20px solid pink;
}
```

<div class="ill-line ill-line-80">80px</div>
<div class="ill-line ill-line-120">120px</div>
<div class="ill-line ill-line-160">160px</div>

<br />

<div class="border-box">这里是内容</div>

<style>
.ill-line-160 {
  width: 160px;
}

.border-box {
  width: 80px;
  height: 80px;
  background: lightcyan;
  padding: 20px;
  box-sizing: content-box;
  border: 20px solid pink;
}
</style>

同样的，border 也不是由外向内添加的，而是由内向外添加的。

因此，盒子变大了，变大的范围就是添加的 border。

<span v-red>**3. 最后，我们给盒子添加一个 margin: 20px，然后这个盒子变成了 200x200px**</span>

 ```css
.box {
  width: 80px;
  height: 80px;
  background: lightcyan;
  padding: 20px;
  border: 20px solid pink;
  margin: 20px;
}
```

<div class="ill-line ill-line-80">80px</div>
<div class="ill-line ill-line-120">120px</div>
<div class="ill-line ill-line-160">160px</div>
<div class="ill-line ill-line-200">200px</div>

<br />

<div class="margin-box">这里是内容</div>

<style>
.ill-line-200 {
  width: 200px;
}

.margin-box {
  width: 80px;
  height: 80px;
  background: lightcyan;
  padding: 20px;
  box-sizing: content-box;
  border: 20px solid pink;
  margin: 20px;
}
</style>

这个就没啥好说的了。

### 总结

总结下来就一句话。

<span v-red>**对于 content-box 来说，内容的盒子该多大就是多大，padding、border、margin 只是在其范围上扩张。**</span>

## border-box

border-box 显然和 content-box 不一样。

对于 border-box 来说，padding 和 border 都是由外向内扩张的。

是不是对这句话不太明白？往下看就是了。

### 老司机带你走一遍 border-box

首先我们有一个普通的 160x160px 的盒子，别的啥也没加

```css
.normal-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
}
```

<div class="ill-line ill-line-160">160px</div>

<br />

<div class="border-normal-box">内容，可以一行放下</div>

<style>
.border-normal-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
}
</style>

<span v-red>**1. 首先，我们给这个盒子加了一个 padding: 20px，然后这个盒子变成了... 160x160px**</span>

```css
.padding-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
  padding: 20px;
}
```

<div class="ill-line ill-line-160">160px</div>
<div class="ill-line ill-line-120">120px</div>

<br />

<div class="border-padding-box">内容，可以一行放下</div>

<style>
.border-padding-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
  padding: 20px;
}
</style>

在这个时候，padding 是由内向外添加的，因此盒子的大小没变。  

但是内容的部分却因为 padding 而变小了，也就是说 content 的部分变小了。

<span v-red>**2. 首先，我们给这个盒子加一个 border: 20px，然后这个盒子变成了... 160x160px**</span>

```css
.border-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
  padding: 20px;
  border: 20px solid pink;
}
```

<div class="ill-line ill-line-160">160px</div>
<div class="ill-line ill-line-120">120px</div>

<br />

<div class="border-border-box">内容，可以一行放下</div>

<style>
.border-border-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
  padding: 20px;
  border: 20px solid pink;
}
</style>

在这个时候，border 是由内向外添加的，因此盒子的大小还是没有变。  

但是内容的部分却因为 border 更小了，也就是说 content 的部分再一次被压缩。

<span v-red>**3. 最后，我们给这个盒子加一个 margin: 20px，然后这个盒子变成了... 200x200px**</span>

```css
.margin-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
  padding: 20px;
  border: 20px solid pink;
  margin: 20px;
}
```

<div class="ill-line ill-line-200">200px</div>
<div class="ill-line ill-line-160">160px</div>
<div class="ill-line ill-line-120">120px</div>

<br />

<div class="border-margin-box">内容，可以一行放下</div>

<style>
.border-margin-box {
  width: 160px;
  height: 160px;
  background: lightcyan;
  padding: 20px;
  border: 20px solid pink;
  margin: 20px;
}
</style>

margin 没有问题，还是由内向外加在盒子上的。

### 总结

<span v-red>**对于 border-box 来说，padding 和 border 向内扩展，压缩内容空间，不会影响到盒子的大小。**</span>

## 该用哪个模型？

**用 border-box。**

为什么？

因为我们经常会碰见调整 border 或者 padding 的情况，对吧？

如果我们使用 content-box，当我们调整 border 或者 padding 的时候，盒子会变大，因此会影响到周围的布局，一不小心就要重写很多东西，而且还要根据 border 或者 padding 的大小去调整盒子本身的大小，谁用谁sb。

而如果我们使用 border-box，调整 border 或者 padding 不会影响到盒子的大小，因此不会影响到周围的布局。

### 设置 border-box

有一种非常牛逼的，全局设置 border-box 的方法。

以下的方法来自于 CSS TRICKS（身为前端应该都知道吧）：

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

Vuetify 就是这么做的。

![vuetify](/vuetify.png)

而且 border-box 几乎没有兼容性的问题，除了 IE 6~7。放心用。

## 参考资料

[Inheriting box-sizing Probably Slightly Better Best-Practice](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)

<Disqus />