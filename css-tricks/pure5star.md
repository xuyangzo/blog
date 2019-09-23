---
tags: ['CSS Tricks', 'Interview Problems']
---

# Pure CSS Five-Star Bar

> Posted: 09.22.2019

<Tag />

## Description

We want to have a five-star bar made of pure css.

Just like the example below:

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

Usually this kind of work is done with JS.

But some interviewers will ask you to write this (or at least talk about ideas) with pure css.

## Code

> I referenced another person's code (see Reference), but my implementation is different from his  
> And my code solves the problem that the radio button cannot be selected multiple times

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
   * This is the bottom layer, tend to display gray unlighted star
   * Set background image and repeat-x to create gray unlight star
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
   * Middle layer contains yellow lighted stars, also set as background image
   * It exactly overwrites the bottom layer when its width is set to 100px
   * However, it's initial width is 0, which means it is 'invisible' at the beginning
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
   * Radio button is the way to record which star user selects
   * Its width is the same as each start, but it is invisible all the time
   * But we still should be able to select it, so its opacity is always 0
   * Its z-index should > middle layer
   */
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

  /*
   * Set positions for radio button correspoding to each star
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
   * ~: this css selector means, select all .middle after .radio-1
   * Therefore, we are able to select middle layer for each radio button
   * We change the width of middle layer based on different radio button
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

## Reference

[纯CSS的星级评价效果](https://segmentfault.com/a/1190000009755574)

<Disqus />