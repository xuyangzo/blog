---
tags: ['CSS布局', '面试问题 - CSS']
---

# 三栏布局

> Posted: 09.21.2019

<Tag />

## 什么是三栏布局？

### 描述

三栏布局是一种经典的布局。它具有以下规定：

1. 三栏必须在同一行
2. 左侧部分有固定的宽度
3. 右侧部分有固定的宽度
4. 中间部分的宽度随着页面大小而改变
5. （最好能实现）中间部分首先被渲染

### 例子

<div class="three-col-container">
  <div class="three-col-left"></div>
  <div class="three-col-right"></div>
  <div class="three-col-center"></div>
</div>

<style>
  .three-col-container {
    margin-top: 30px;
  }

  .three-col-left {
    float: left;
    width: 200px;
    height: 50px;
    background-color: lightgreen;
  }

  .three-col-right {
    float: right;
    width: 300px;
    height: 50px;
    background-color: pink;
  }

  .three-col-center {
    margin-left: 200px;
    margin-right: 300px;
    height: 50px;
    background-color: skyblue;
  }
</style>

就拿这个作为需求。

我们想要:
1. 左侧部分为 200px
2. 右侧部分为 300px
3. 中间部分的宽度是弹性的

## 浮动

- 该方法并没有优先渲染中间部分
  - 中间部分反而是最后渲染的，请注意查看 HTML 代码
- 中间部分必须排在左侧部分和右侧部分后

```html
<div class="container">
  <div class="left"></div>
  <div class="right"></div>
  <div class="center"></div>
</div>

<style>
  .left {
    float: left;
    width: 200px;
    height: 50px;
    background-color: lightgreen;
  }

  .right {
    float: right;
    width: 300px;
    height: 50px;
    background-color: pink;
  }

  .center {
    margin-left: 200px;
    margin-right: 300px;
    height: 50px;
    background-color: skyblue;
  }
</style>
```

## 绝对位置

- 绝对位置同样没有优先渲染中间部分

```html
<div class='container'>
	<div class='left'></div>
	<div class='center'></div>
	<div class='right'></div>
</div>

<style>
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    background: lightgreen;
    height: 50px;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    background: pink;
    height: 50px;
  }

  .center {
    top: 0;
    margin: 0 300px 0 200px;
    background: skyblue;
    height: 50px;
  }
</style>
```

## 弹性盒

- 最简便的方法，但存在兼容性的问题
  - IE 6~9 不支持
  - IE 10, 11 部分支持
  - 其它浏览器的最新版本都支持
- 没有优先渲染中间部分

```html
<div class='container'>
	<div class='left'></div>
	<div class='center'></div>
	<div class='right'></div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }

  .left {
    flex: 0 0 200px;
    height: 50px;
    background: lightgreen;
  }

  .right {
    flex: 0 0 300px;
    height: 50px;
    background: pink;
  }

  .center {
    flex-basis: 100%;
    height: 50px;
    background: skyblue;
  }
</style>
```

## Table 布局

- 优点是，可以同时使用 `vertical-align`
- 没有优先渲染中间部分

```html
<div class='container'>
	<div class='left'></div>
	<div class='center'></div>
	<div class='right'></div>
</div>

<style>
  .container {
    display: table;
    width: 100%;
  }

  .container > div {
    display: table-cell;
  }

  .left {
    width: 200px;
    height: 50px;
    background: lightgreen;
  }

  .right {
    width: 300px;
    height: 50px;
    background: pink;
  }

  .center {
    height: 50px;
    background: skyblue;
  }
</style>
```

## Grid 布局

- Grid 能做的其实比这要多多了
- 仍然具有兼容性的问题，而且比 flexbox 问题还大
  - IE 6~9 不支持
  - IE 10, 11 部分支持
  - QQ browser, Baidu browser and Opera Mini 不支持
  - 别的浏览器的最新版本都支持
- 没有优先渲染中间部分

```html
<div class='container'>
	<div class='left'></div>
	<div class='center'></div>
	<div class='right'></div>
</div>

<style>
  .container {
    display: grid;
    width: 100%;
    grid-template-rows: 50px;
    grid-template-columns: 200px auto 300px;
  }

  .left {
    background: lightgreen;	
  }

  .center {
    background: skyblue;
  }

  .right {
    background: pink;
  }
</style>
```

## 圣杯布局

- 优先渲染中间部分
- 核心思想是利用负边距
  - 设置负边距会让当前的元素朝着左上角的位置移动，整体移动的距离便是负边距指定的距离
  - 如果该行无法满足移动的距离，该元素会移动到上面一行，从右往左继续移动剩下的距离


```html
<div class='container'>
	<div class='center col'></div>
	<div class='left col'></div>
	<div class='right col'></div>
</div>

<style>
  /* padding from right 300px and from left 200px */
  .container {
    height: 50px;
    padding: 0 300px 0 200px;
  }

  /* 这里设置位置为 relative 是为了使用 left/right 属性 */
  .col {
    float: left;
    position: relative;
  }

  /**
   * 在使用负边距前，左侧元素在中间元素的正下方，两者左侧对齐
   * 
   * 1. 设置负边距会让左侧元素朝着左上方的位置移动
   * 2. margin-left: 100%，意味着左侧元素需要移动 100% 的距离（相对于页面），也就是一整行
   * 3. 因此，左侧元素最终的位置是和中间元素重叠的，两者左侧对齐
   * 4. 然后需要设置 left: -200px，这样的话左侧元素就会移动到之前空出来的 padding 空间里
   */
  .left {
    left: -200px;
    width: 200px;
    margin-left: -100%;
    height: 50px;
    background: lightgreen;
  }

  /**
   * 在使用负边距前，右侧元素在中间元素的正下方，两者左侧对齐
   * 
   * 1. 设置负边距会让右侧元素朝着左上方的位置移动
   * 2. margin-left: -300px，意味着右侧元素需要移动 300px 的距离（正好为其的宽度）
   * 3. 因此，右侧元素最终的位置是和中间元素重叠的，两者右侧对齐
   * 4. 然后需要设置 right: -300px，这样的话右侧元素就会移动到之前空出来的 padding 空间里
   */
  .right {
    right: -300px;
    width: 300px;
    margin-left: -300px;
    height: 50px;
    background: pink;
  }

  .center {
    width: 100%;
    height: 50px;
    background: skyblue;
  }
</style>
```

## 双飞翼布局

- 中间的部分会优先渲染
- 核心思想依旧还是负边距，和圣杯布局很类似
- 但是 HTML 的结构变了，而在双飞翼布局里，left/right就不需要了
  - 因为在圣杯布局里，有左侧和右侧的 padding，用来容纳左侧和右侧部分。
  - 这也就意味着，在应用负边距前，左侧部分和右侧部分的起始位置，并不是 container 的边缘，而是 padding 后的位置
    - 因此， -100% 的左侧 margin 会让左侧元素移动到正上方相同的位置，也就是中间元素的位置，左侧对齐
    - 右侧元素也是这个道理
  - 而在双飞翼布局中，container 的宽度是满的，反而是中间部分的两侧有 margin
    - 因此，左侧元素和右侧元素，在应用负边距前的起始位置，就是container的边缘，与其左对齐
    - 在这样的情况下，-100% 的 margin 会让左侧元素移动到正上方相同的位置，也就是中间部分 margin 空出来的位置，因此就不需要设置 left/right 属性
    - 右侧元素也是这个道理

```html
<div class='container'>
  <div class='center col'>
    <div class='center-inner'></div>
  </div>
  <div class='left col'></div>
  <div class='right col'></div>
</div>

<style>
  .container {
    height: 50px;
  }

  .col {
    float: left;
  }

  .center {
    width: 100%;
    height: 50px;
    background: skyblue;
  }

  .center-inner {
    margin: 0 300px 0 200px;
  }

  .left {
    width: 200px;
    height: 50px;
    margin-left: -100%;
    background: lightgreen;
  }

  .right {
    width: 300px;
    height: 50px;
    margin-left: -300px;
    background: pink;
  }
</style>
```

## 参考资料

[布局：三栏布局（7种方法）](https://blog.csdn.net/ganyingxie123456/article/details/77054124)

[圣杯布局、双飞翼布局、Flex布局和绝对定位布局的几种经典布局的具体实现示例](https://blog.csdn.net/wangchengiii/article/details/77926868)