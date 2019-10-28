---
tags: ['CSS布局', '面试问题 - CSS']
---

# BFC

> Posted: 10.16.2019

<Tag />

## 介绍

BFC = Blocking Format Contexts，块级格式化上下文

那么问题来了，究竟什么是 BFC？

简单来说，BFC 就是一个盒子。

一个有着自己的渲染规则的，独立的盒子。

里面不影响外面，外面不影响里面。

而在这个盒子里面，也会有别的一些盒子之类的东西。

或者换一种想法，可以把 BFC 当成是一块区域。

## 特性

简单来说，BFC 具有以下的特性。

1. 内部的box会在垂直方向，从顶部开始一个接着一个地放置
2. 同一个 BFC 内，垂直方向上，会发生 margin 重叠现象
3. BFC 的区域不会与浮动元素的区域重叠
4. 计算BFC高度时，浮动元素也参与计算


### 垂直放置

BFC 内部的 box 会在垂直方向，从顶部开始一个接着一个地放置。

```html
<div class="bfc-box bfc-box-1"></div>
<div class="bfc-box bfc-box-2"></div>
<div class="bfc-box bfc-box-3"></div>
```

<div class="bfc-box bfc-box-1"></div>
<div class="bfc-box bfc-box-2"></div>
<div class="bfc-box bfc-box-3"></div>

<style>
.bfc-box {
  width: 100px;
  height: 100px;
}

.bfc-box-1 {
  background: lightyellow;
}

.bfc-box-2 {
  background: lightcyan;
}

.bfc-box-3 {
  background: pink;
}
</style>

你可能会问，这 tmd 不就是普通的布局吗？

就是啊。但 IFC 就不是这么排，所以这也算是一个特性。

### margin 重叠

同一个 BFC 内，垂直方向上，会发生 margin 重叠现象。

但两个不同的 BFC 之间不会发生 margin 重叠。

```css
.box-1 {
  margin-bottom: 20px;
}

.box-2 {
  margin-top: 100px;
}
```
<div class="bfc-container">
  <div class="bfc-box bfc-box-1 margin-overlap-1"></div>
  <div class="bfc-box bfc-box-2 margin-overlap-2"></div>

  <div class="ruler">100px</div>
</div>

<style>
  .bfc-container {
    position: relative;
  }

  .ruler {
    height: 100px;
    width: 60px;
    text-align: center;
    line-height: 100px;
    border-left: 1px solid black;
    position: absolute;
    left: 105px;
    top: 100px;
  }
  .margin-overlap-1 {
    margin-bottom: 20px;
  }

  .margin-overlap-2 {
    margin-top: 100px;
  }
</style>

我们可以看见，margin 的区域发生了重叠。

我们原来期待是一共有 120px 的空白区域。

但是 100px 的 margin 覆盖了 20px 的 margin。

<span v-red>**这玩意儿只发生在垂直方向上。**</span>

### 无视浮动

这个副标题其实有点问题的。准确来说不是无视。

准确来说，BFC 的区域不会与浮动元素的区域重叠。

我们知道设置浮动后，元素会脱离文档流。关于这一点，可以参考我的这篇文章：[标准文档流](/css-tricks/documentFlow.md)。

脱离文档流后，接下去的元素会占据该元素本来的位置。

```css
.box-1 {
  float: left;
  opacity: 0.5;
}
```

<div class="bfc-box bfc-box-1 bfc-float"></div>
<div class="bfc-box bfc-box-2"></div>

<div style="clear: both"></div>

<style>
  .bfc-float {
    float: left;
    opacity: 0.5;
  }
</style>

我们发现，box2 占据了 box1 原本的文档流。

但是当我们把接下去的元素搞成 BFC，就不会出现这样的情况。

```css
.box-2 {
  display: inline-block;
}
```

<div class="bfc-box bfc-box-1 bfc-float"></div>
<div class="bfc-box bfc-box-2 bfc-non-float"></div>

<style>
  .bfc-non-float {
    /* 把 box2 变成 BFC，具体的方法参见下个 section */
    display: inline-block;
  }
</style>

完美。这玩意儿可以用来做两栏布局。

### 计算 BFC 高度时，浮动元素也参与计算

在标准文档流，当我们计算一个盒子高度的时候，其内部的浮动元素不会被计算进去。

```html
<div class="bfc-large">
  <div class="bfc-small"></div>
</div>
<div class="bfc-box"></div>
```

```css
.bfc-small {
  width: 50px;
  height: 120px; /* 父元素高度 100px */
  background: pink;
  float: left;
}
```

<div class="bfc-box bfc-box-1">
  <div class="bfc-small"></div>
</div>
<div class="bfc-box bfc-box-2 bfc-test"></div>

<style>
  .bfc-small {
    width: 50px;
    height: 120px;
    background: pink;
    float: left;
  }
</style>

我们可以发现，尽管内部的粉色盒子高度比它的父元素高，但由于其浮动了，因此在计算高度的时候，没有把它计算进去。

`计算高度` 是什么意思呢？就是设置黄色盒子的高度。黄色盒子有多高，下面的蓝色盒子就会从哪接上去。

这个时候，如果我们把黄色盒子转化成 BFC...

```css
.bfc-large {
  /* 触发 BFC */
  display: inline-flex;
}
```

<div class="bfc-box bfc-box-1 bfc-large">
  <div class="bfc-small"></div>
</div>
<div class="bfc-box bfc-box-2 bfc-test"></div>

<style>
  .bfc-large {
    display: inline-flex;
  }
</style>

我们可以看见，由于黄色盒子成为了 BFC，其内部浮动的红色盒子的高度也被计算在内。

### box 左边接触

每个元素的 margin box 的左边， 与其父元素 border box 的左边相接触（对于从左往右的格式化，否则相反）。

即使存在浮动也是如此。

不知道啥是 margin box 和 border box 的，可以参考我这篇文章：[CSS盒模型](/css-tricks/boxModel.md)

```css
.bfc-parent {
  width: 200px;
  height: 200px;
  border: 20px solid pink;
  display: inline-block;
}

.bfc-child {
  margin: 20px;
  float: left;
}
```

<div class="bfc-parent bfc-box-1">
  <div class="bfc-box bfc-child bfc-box-2"></div>
  <div class="marker-line-20">20</div>
  <div class="marker-line-40">40</div>
</div>

<style>
  .marker-line-20 {
    position: absolute;
    width: 20px;
    border-bottom: 1px solid black;
  }
  .marker-line-40 {
    position: absolute;
    width: 40px;
    top: 30px;
    left: -20px;
    border-bottom: 1px solid black;
  }
  .bfc-parent {
    width: 200px;
    height: 200px;
    border: 20px solid pink;
    position: relative;
    /* padding: 20px; */
    display: inline-block;
  }

  .bfc-child {
    margin: 20px;
    box-sizing: content-box;
    z-index: 100;
    float: left;
  }
</style>

我们可以看见，即便内部的元素浮动了，其 margin box 的左侧还是与父元素 border box 的左侧相接触。

这里的 `左侧` 并不是指 border box 的左侧，而是指 `左侧 border 的右边线`。

大家可以从上面的例子中看见。

## 怎么触发 BFC

1. 设置 float: none 以外 (left、right)
2. 设置 overflow: visible 以外 (hidden、auto、scroll)
3. 设置 display: (inline-block、flex、infline-flex、table-cell、table-caption)
4. 设置 position: (absolute、fixed)
5. 设置 fieldset 元素

有一点，很多人都没提到。

那就是：<span v-red>**以上的方法，并不是每个方法在任何场景下都能生效的**</span>

有的时候，想要触发 BFC，上述的有些属性会失效，只能设置其中一些特定的属性。

举个🌰，上面讲述 BFC 高度的时候，我用 `display: inline-flex` 来触发 BFC。

但如果设置 `overflow: hidden` 或者 `display: inline-block`，在这个例子里是没办法成功触发 BFC 的。

并且在下面的例子中，解决 margin 重叠时，`oveflow: hidden` 无效，但是 `display: inline-block` 有效。

总之，面试的时候不需要把这点说出来（也可以说，如果你的确试过），但实际运用的时候得注意一下。

## 应用

### 解决 margin 重叠的问题

上面已经展示了 margin 重叠的问题。

那么有些小伙伴肯定要问了，既然 BFC 会导致 margin 重叠，我们又怎么用 BFC 来解决呢？

这两者其实不冲突。

BFC 导致的 margin 重叠，是对于 BFC 内部的子元素来说的。

而我们解决 margin 重叠的问题，也是基于这些子元素，把它们变成 BFC。

也就是说，父元素其实没有变过，它一直是 BFC。

```css
.margin-overlap-1-bfc {
  margin-bottom: 20px;
  display: inline-block;
}

.margin-overlap-2 {
  margin-top: 100px;
}
```

<div class="bfc-container">
  <div class="bfc-box bfc-box-1 margin-overlap-1-bfc"></div>
  <div class="bfc-box bfc-box-2 margin-overlap-2"></div>

  <div class="ruler-120">120px</div>
</div>

<style>
  .bfc-container {
    position: relative;
  }

  .ruler-120 {
    height: 120px;
    width: 60px;
    text-align: center;
    line-height: 120px;
    border-left: 1px solid black;
    position: absolute;
    left: 105px;
    top: 100px;
  }
  .margin-overlap-1-bfc {
    margin-bottom: 20px;
    display: inline-block;
  }

  .margin-overlap-2 {
    margin-top: 100px;
  }
</style>

<br />

### 解决父元素高度塌陷

这里的 `高度塌陷` 和上面的 `计算高度` 不太一样。

我们知道，如果父元素没有设置 height，那么其高度就是由内部的子元素撑开的。

如果这个时候，内部的子元素浮动了，脱离了文档流，父元素就没办法被撑开了。

举个🌰：

```css
.bfc-parent-collapse {
  width: 200px;
  background: pink;
}

.bfc-child-float {
  width: 100px;
  height: 100px;
  background: lightcyan;
  float: left;
}
```

<div class="bfc-parent-collapse">
  <div class="bfc-child-float"></div>
</div>

<div style="clear: both"></div>

<style>
.bfc-parent-collapse {
  width: 200px;
  background: pink;
}

.bfc-child-float {
  width: 100px;
  height: 100px;
  background: lightcyan;
  float: left;
}
</style>

我们可以发现，父元素的高度塌陷了。

这个时候，如果把父元素给变成 BFC...

```css
.bfc-parent-collapse {
  overflow: auto;
}
```

<div class="bfc-parent-collapse bfc-parent-setbfc">
  <div class="bfc-child-float"></div>
</div>

<div style="clear: both"></div>

<style>
.bfc-parent-setbfc {
  overflow: auto;
}
</style>

我们可以看见，父元素被撑开了。

### 两栏布局

这一点在上面已经展示过了，这里就不重复展示了。

核心思想就是，两栏，一栏 float，另一栏设置 BFC。

## 参考资料

[BFC特性及其简单应用](https://www.cnblogs.com/web-record/p/10320056.html)

[BFC——一个我们容易忽视掉的布局神器](https://www.cnblogs.com/lzbk/p/6057097.html)

[BFC的布局规则以及触发条件](https://www.cnblogs.com/CafeMing/p/6252286.html)


<Disqus />