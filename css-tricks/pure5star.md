---
tags: ['CSS小技巧', '面试问题 - CSS']
date: 09.22.2019
image: /5star-intro.jpeg
description: 一般人都会用 JS 做五星好评，不一般的人都用纯 CSS（并不）
---

# 纯 CSS 五星好评

> Posted: 09.22.2019

<Tag />

## 问题描述

我们想要一个基于纯CSS的五星好评效果。

如下方的 demo：

<div class="five-star-container">
  <div class="bottom"></div>
  <input type="radio" name="star" class="radio-1" /><input
    type="radio"
    name="star"
    class="radio-2"
  /><input type="radio" name="star" class="radio-3" /><input
    type="radio"
    name="star"
    class="radio-4"
  /><input type="radio" name="star" class="radio-5" />
  <div class="middle"></div>
</div>

<style>
  .five-star-container {
    position: relative;
    margin-top: 30px;
    padding-bottom: 40px;
  }

  .bottom {
    background: url(/icon-star-default.png) repeat-x;
    background-size: 20px 20px;
    width: 100px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* 设置点亮星星的基础位置 */
  .middle {
    background: url(/icon-star-active.png) repeat-x;
    background-size: 20px 20px;
    width: 0;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  /* 设置radio button的基础样式 */
  input[type="radio"] {
    position: absolute;
    top: 5px;
    width: 20px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 10; /* radio button的z-index必须要比middle高 */
  }

  /* 设置radio button的位置 */
  .radio-1 {
    left: 0;
  }
  .radio-2 {
    left: 20px;
  }
  .radio-3 {
    left: 40px;
  }
  .radio-4 {
    left: 60px;
  }
  .radio-5 {
    left: 80px;
  }

  /* 设置需要点亮时，middle的宽度 */
  .radio-1:hover ~ .middle,
  .radio-1:checked ~ .middle {
    width: 20px;
  }

  .radio-2:hover ~ .middle,
  .radio-2:checked ~ .middle {
    width: 40px;
  }

  .radio-3:hover ~ .middle,
  .radio-3:checked ~ .middle {
    width: 60px;
  }

  .radio-4:hover ~ .middle,
  .radio-4:checked ~ .middle {
    width: 80px;
  }

  .radio-5:hover ~ .middle,
  .radio-5:checked ~ .middle {
    width: 100px;
  }
</style>

一般来说这是通过JS实现的。

但有的面试题就是如何用纯CSS实现这样的效果。

## Code

> 我参考了另一个人的代码（详见参考资料版块），但我的实现方法和他的是不一样的    
> 而且我解决了他的星级选择只能选择一次的问题，属于完美的版本

```html
<div class="five-star-container">
  <div class="bottom"></div>
  <input type="radio" name="star" class="radio-1" />
  <input type="radio" name="star" class="radio-2" />
  <input type="radio" name="star" class="radio-3" />
  <input type="radio" name="star" class="radio-4" />
  <input type="radio" name="star" class="radio-5" />
  <div class="middle"></div>
</div>
```

```css
<style>
  .five-star-container {
    position: relative;
    margin-top: 30px;
    padding-bottom: 40px;
  }

  /**
   * 底层用来展示未点亮时，灰色的星星
   * 通过设置 background 和 repeat-x 来创建5颗星星
   */
  .bottom {
    background: url(/icon-star-default.png) repeat-x;
    background-size: 20px 20px;
    width: 100px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
  }

  /**
   * 中间层包含了点亮了后，黄色的星星，同样是通过 background 来设置的
   * 这一层与底层完全重叠（如果两者的宽度设置为一样），并且在底层之上
   * 而其一开始的宽度为0，也就是说在一开始是看不见这一层的，只能看见底层
   */
  .middle {
    background: url(/icon-star-active.png) repeat-x;
    background-size: 20px 20px;
    width: 0;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  /**
   * Radio button 用来记录用户到底选择了哪颗星星
   * 它的宽度和每个星星的宽度一样，但是它是隐形的
   * 而我们必须能够选择到它，所以必须设置 opacity 而不是 display
   * 它的 z-index 必须 > 中间层的 z-index
   */
  input[type="radio"] {
    position: absolute;
    top: 5px;
    width: 20px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 10;
  }

  /*
   * 设置 radio button 的位置
   */
  .radio-1 {
    left: 0;
  }
  .radio-2 {
    left: 20px;
  }
  .radio-3 {
    left: 40px;
  }
  .radio-4 {
    left: 60px;
  }
  .radio-5 {
    left: 80px;
  }

  /**
   * ~: 这个css选择器会选择所有，在 .radio-1 之后的 .middle 元素
   * 因此，我们能够通过每个单独的 radio button 选择到中间层
   * 根据不同的 radio button，决定中间层的宽度，就可以点亮星星
   */
  .radio-1:hover ~ .middle,
  .radio-1:checked ~ .middle {
    width: 20px;
  }

  .radio-2:hover ~ .middle,
  .radio-2:checked ~ .middle {
    width: 40px;
  }

  .radio-3:hover ~ .middle,
  .radio-3:checked ~ .middle {
    width: 60px;
  }

  .radio-4:hover ~ .middle,
  .radio-4:checked ~ .middle {
    width: 80px;
  }

  .radio-5:hover ~ .middle,
  .radio-5:checked ~ .middle {
    width: 100px;
  }
</style>
```

## 参考资料

[纯CSS的星级评价效果](https://segmentfault.com/a/1190000009755574)

<Disqus />