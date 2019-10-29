---
tags: ['CSS布局', '面试问题 - CSS']
date: 09.29.2019
description: 一切 CSS 的起始问题，这都不懂你还学 CSS 呢？
---

# 标准文档流

> Posted: 09.29.2019

<Tag />

## 定义

文档流指的是：

- 元素排版布局过程中，元素会默认自动从左往右，从上往下的流式排列方式
- 并最终窗体自上而下分成一行行，并在每行中从左至右的顺序排放元素

## 微观现象

- 空白折叠现象
- 高矮不齐，底边对齐
- 自动换行，一行写不完时，换行写

后面两条比较容易理解，第一条<span v-red>**空白折叠现象**</span>是需要好好看一下的

### 空白折叠现象

这种现象会发生在行内元素和行内块级元素上。

**行内元素：**

<button class="an">按我</button><button class="ri">日我</button>

<button class="an">按我</button>
<button class="ri">日我</button>

<style>
  .an {
    border: 1px solid black;
    outline: none;
    cursor: pointer;
  }
  .ri {
    border: 1px solid red;
    outline: none;
    cursor: pointer;
  }
</style>

```html
<!-- 这里两个元素紧紧贴在一起 -->
<button class="an">按我</button><button class="ri">日我</button>

<!-- 这里两个元素分成了两行 -->
<button class="an">按我</button>
<button class="ri">日我</button>
```

```css
.an {
  border: 1px solid black;
}
.ri {
  border: 1px solid red;
}
```

大家可以看见，HTML 标签紧紧贴在一起的元素，中间是没有空格的。

而 HTML 标签分成两行的元素，中间竟然多出了一个空格！？

那么**行内块状元素**呢？

<button class="an-block">按我</button><button class="ri-block">日我</button>

<button class="an-block">按我</button>
<button class="ri-block">日我</button>

<style>
  .an-block {
    display: inline-block;
    border: 1px solid black;
    outline: none;
    cursor: pointer;
  }
  .ri-block {
    display: inline-block;
    border: 1px solid red;
    outline: none;
    cursor: pointer;
  }
</style>

```html
<!-- 这里两个元素紧紧贴在一起 -->
<button class="an-block">按我</button><button class="ri-block">日我</button>

<!-- 这里两个元素分成了两行 -->
<button class="an-block">按我</button>
<button class="ri-block">日我</button>
```

```css
.an-block {
  display: inline-block;
  border: 1px solid black;
}
.ri-block {
  display: inline-block;
  border: 1px solid red;
}
```

也一样，中间有一个空格。足以杀死强迫症。

### 空白折叠的解决方案

- 父元素设置 font-size: 0
  - 子元素需要手动设置 font-size
- 改用 float
</style>

## 元素类别

### 行内元素

- 设置宽高无效
- margin 仅设置左右方向有效，上下无效
- padding 设置上下左右都有效，即会撑大空间
- 不会自动进行换行

**标签：**

- `<a>` `<img>` `<script>` `<span>`
- `<button>` `<input>` `<label>` `<select>` `<textarea>`
- `<b> <big>` `<small>`
- `<cite>` `<code>` `<em>` `<strong>`

### 块级元素

- 能够识别宽高
- margin 和 padding 的上下左右均对其有效
- 可以自动换行
- 多个块状元素标签写在一起，默认排列方式为从上至下

**标签：**

- `<address>` `<article>` `<audio>` `<blockquote>` `<canvas>`
- `<dd>` `<div>` `<dl>` `<fieldset>` `<footer>` `<header>`
- `<form>` `<hr>` `<ol>` `<ul>` `<pre>` `<section>` `<table>` `<video>`

### 行内块级元素

- 不自动换行
- 能够识别宽高
- 默认排列方式为从左到右

### 可替换元素

- 浏览器根据元素的标签和属性，来决定元素的具体显示内容
- 例如浏览器会根据标签的 src 属性的值来读取图片信息并显示出来，而如果查看(X)HTML 代码，则看不到图片的实际内容
- 又例如根据 `<input>` 标签的 type 属性来决定是显示输入框，还是单选按钮等
- 替换元素一般有内在尺寸，所以具有 width/height，可以设定
  - 当不指定 img 的 width 和 height 的时候，就按照其内在尺寸显示，也就是图片被保存的时候的宽度和高度

**标签：**

- `<img>` `<input>` `<textarea>` `<select>` `<object>`

## 脱离文档流

脱离文档流的意思，就是字面意思。

脱离文档流后，就相当于浮空了，不占据页面的部分。

- position: absolute/fixed
- float

### Absolute Position

<div class="flow-container">
  <div class="box1"></div>
  <div class="box2"></div>
</div>

<style>
.flow-container {
  margin-top: 30px;
  position: relative;
}

.flow-container .box1, .flow-container .box2 {
  width: 100px;
  height: 100px;
  display: inline-block;
  position: static;
}

.flow-container .box1 {
  background: pink;
}

.flow-container .box2 {
  background: lightgreen;
  opacity: 0.5;
}
</style>

上面两个盒子目前正以 inline-block 的形式排列，各自占据了一部分的文档流。

左侧的文档流被红色盒子占据了，所以绿色盒子只能排在红色盒子的右边。

那么，如果这个时候我们把红色盒子的 position 设置成 absolute 呢？

<div class="flow-container">
  <div class="box1 box1-absolute"></div>
  <div class="box2"></div>
</div>

<style>
.flow-container .box1-absolute {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

我们会发现，原本被红色盒子占据的文档流空出来了，因此绿色盒子能够占据那部分的文档流。

而红色盒子脱离了文档流，就相当于是漂浮在文档上，而且还是原来的位置。

因此红色盒子与绿色盒子重合了。但绿色盒子占据文档流，红色盒子不占据。

由于我给绿色盒子设置了 opacity: 0.5，两者的颜色现在合体了。

### Float

还是刚才的两个盒子，单独给绿色盒子一个 float: left

但是要注意，这里不能使用 inline-block，否则会形成 BFC

<div class="flow-container">
  <div class="box1 box1-float"></div>
  <div class="box2 box2-float"></div>
</div>

<style>
.flow-container .box1-float {
  /**
   * 如果你有幸看到这段注释
   * 你会发现我这里用的还是 absolute
   * 这是因为不知道为啥 float 出问题了
   * 但我可以保证结论是对的，float 后的确不占据文档流
   */
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<div style="clear: both"></div>

可以看见绿色盒子和红色盒子重叠了。

## 半脱离文档流

半脱离文档流的意思，就是还是会占据文档流，但是位置并不遵循普通的文档流。

- position: relative
- transform

### position: relative

还是那两个盒子，这次把红色盒子的 position 设置成 relative。

并且给她一个 top & left 的值。

```css
.box1-relative {
  position: relative;
  top: 20px;
  left: 20px;
}
```

<div class="flow-container">
  <div class="box1 box1-relative"></div>
  <div class="box2"></div>
</div>

<style>
.flow-container .box1-relative {
  position: relative;
  top: 20px;
  left: 20px;
}
</style>

<br />
<br />

这下有的同学就很迷了吧。

其实很简单。

relative position 依旧会让红色盒子占据文档流。

其占据的文档流，就是其”原来“位置的文档流，独立于 top/left/bottom/right 这四个属性。

所以你会发现绿色盒子的位置没有变，这是因为红色盒子占据的文档流没有变。

而在占据文档流之外，top/left/bottom/right 使红色盒子在原本占据文档流的那个位置的基础上，进行移动。有点类似于 absolute position，只不过 absolute position 的位置，是相对于最近的不是 static 的父元素来说的，而 relative position 的位置是相对于它自己一开始占据的文档流来说的。

### transform

transform 本质上和 position: relative 是类似的。

占据原来的文档流，然后在该位置上进行移动变幻，但是最终的形态不影响其占据的文档流。

这里就不详细描述了，感兴趣的小伙伴们可以自己去尝试。

## 参考资料

[CSS标准文档流](https://www.jianshu.com/p/4921ba9e101d)

<Disqus />