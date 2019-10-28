---
tags: ['CSS布局', '面试问题 - CSS']
---

# 垂直居中

> Posted: 09.22.2019

<Tag />

## 设置 Line-Height

限制：
1. 只对行内元素有限
2. 必须知道 container 具体的高度才行

```html
<div class="container">
  <h1>test</h1>
</div>

<style>
  .container {
    width: 300px;
    height: 300px;
    background: skyblue;
  }

  h1 {
    line-height: 300px;
  }
</style>
```

## 使用 Table-Cell

优点：

1. 对于块状元素，行内元素和块状行内元素，都有效

限制：

1. 会改变 display 的模式，可能对布局产生影响

```html
<div class="container">
  <div class="center"></div>
</div>

<style>
  .container {
    width: 300px;
    height: 300px;
    background: skyblue;
    display: table-cell;
    vertical-align: middle;
  }

  .center {
    width: 50px;
    height: 50px;
    background: lightgreen;
  }
</style>
```

## 绝对位置

优点：

1. 对于块状元素，行内元素和块状行内元素，都有效

限制：

1. IE 6~8 和 Opera Mini 不支持（用到了 transform）

```html
<div class="container">
  <div class="center"></div>
</div>

<style>
  .container {
    width: 300px;
    height: 300px;
    background: skyblue;
    position: relative;
  }

  .center {
    width: 100px;
    height: 100px;
    background: lightgreen;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

## Margin Auto

优点：

1. 对于块状元素，和行内块状元素，有效

限制：

1. 对于行内元素无效

```html
<div class="container">
  <div class="center"></div>
</div>

<style>
  .container {
    width: 300px;
    height: 300px;
    background: skyblue;
    position: relative;
  }

  .center {
    width: 100px;
    height: 100px;
    background: lightgreen;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
```

## 弹性盒

优点：

1. 对于块状元素，行内元素和块状行内元素，都有效

限制：

1. IE 会有兼容性问题
  - IE 6~9 不支持
  - IE 10, 11 部分支持

```html
<div class="container">
  <div class="center"></div>
</div>

<style>
  .container {
    width: 300px;
    height: 300px;
    background: skyblue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .center {
    width: 100px;
    height: 100px;
    background: lightgreen;
  }
</style>
```

<Disqus />