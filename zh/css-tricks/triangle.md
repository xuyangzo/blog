---
tags: ['CSS小技巧', '面试问题 - CSS']
---

# 画三角形

> Posted: 10.16.2019

<Tag />

## 介绍

那么问题来了，怎么用 CSS 来画三角形？

首先，我们先来看一下 CSS 的盒模型。

![box](/box.png)

这张图如果看不懂的话，可以参考：[CSS 盒模型](/zh/css-tricks/cssBox.md)

画三角形的核心，就是利用 border 那一圈。

我们先来看一下，一个普通的盒子，加上厚的 border 长啥样

```css
.container {
  width: 100px;
  height: 100px;
  border-style: solid;
  border-width: 100px 100px 100px 100px;
  border-color: lightblue pink lightgreen gold;
  box-sizing: content-box;
}
```

<div class="box-container"></div>

<style>
.box-container {
  border-style: solid;
  border-width: 100px 100px 100px 100px;
  border-color: lightblue pink lightgreen gold;
  width: 100px;
  height: 100px;
  box-sizing: content-box;
}
</style>

我们可以看见，中间是一个 100 x 100 的盒子，外面套了一层 border。

每个方向的 border 都是一个梯形。

那么，如果我们把中间 100 x 100 的盒子给设置成 0 x 0 呢？

<div class="box-container-0"></div>

<style>
.box-container-0 {
  border-style: solid;
  border-width: 100px 100px 100px 100px;
  border-color: lightblue pink lightgreen gold;
  width: 0;
  height: 0;
  box-sizing: content-box;
}
</style>

可以发现，四个梯形变成了四个三角形。

聪明的小朋友应该已经发现了，我们需要画的四个方向的三角形，就隐藏在这里。

但是注意了，border 是不占据文档流的。

## 上

想要画方向朝上的三角形，很简单。

保留底部的 border，然后把左右两个方向的 border 给设置成透明的。

上面的 border 不需要设置，因为上面的 border 对下面的 border 没有影响。

```css
.triangle-up {
  height: 0;
  width: 0;
  position: absolute;
	
  /* 设成透明的 */
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
	
  /* 设置下方的 border */
  border-bottom: 50px solid lightgreen;
}
```

实现的效果：

<div class="triangle-up"></div>
<br />

<style>
.triangle-up {
  height: 0;
  width: 0;
	
  /* 设成透明的 */
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
	
  /* 设置下方的 border */
  border-bottom: 50px solid lightgreen;
}
</style>

## 下

保留上方的 border，然后把左右两个方向的 border 给设置成透明的。

```css
.triangle-down {
  height: 0;
  width: 0;
	
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 50px solid lightblue;
}
```

实现的效果：

<div class="triangle-down"></div>

<style>
.triangle-down {
  height: 0;
  width: 0;
	
  border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	border-top: 50px solid lightblue;
}
</style>

<br />

## 左

保留右侧的 border，然后把上下两个方向的 border 给设置成透明的。

```css
.triangle-left {
  height: 0;
  width: 0;

  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent; 
  border-right: 50px solid pink;
}
```

实现的效果：

<div class="triangle-left"></div>

<style>
.triangle-left {
  height: 0;
  width: 0;

  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent; 
  border-right: 50px solid pink;
}
</style>

<br />

## 右

保留左侧的 border，然后把上下两个方向的 border 给设置成透明的。

```css
.triangle-right {
  height: 0;
  width: 0;
	
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 50px solid gold;
}
```

实现的效果：

<div class="triangle-right"></div>

<style>
.triangle-right {
  height: 0;
  width: 0;
	
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 50px solid gold;
}
</style>

<br />

## 参考资料

[css如何将div画成三角形](https://www.cnblogs.com/v-weiwang/p/5057588.html)

<Disqus />