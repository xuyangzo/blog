---
tags: ['CSS Layout']
---

# Three Column Layout

> Posted: 09.21.2019

<Tag />

## What is A Three Column Layout?

### Description

A three column layout is a classic layout template that has the following requirements:

1. All three columns are on the row
2. Left part has a fixed width
3. Right part has a fixed width
4. Middle part has flexiable width based on window size
5. Middle part should be loaded first (not always)

### Example

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

Just take the above part as an example.

We want:
1. Left part to be 200px
2. Right part to be 300px
3. Middle part to be flexiable based on window size

## Float

- Float solution does not render middle part first
  - Actually it renders middle part last
- Float solution has the center being last div

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

## Absolute Position

- Absolute position also does not render middle part first

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

## Flexbox

- Most convenient, but not all browser has support
  - IE 6~9 does not support 
  - IE 10, 11 partially support
  - Other browsers' lastest version all support flexbox

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

## Table

- The advantage is you will be able to use `vertical-align`

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

## Grid

- Grid could do much more than this
- But still have compatibility issue, and such issue is severe than flexbox
  - IE 6~9 does not support 
  - IE 10, 11 partially support
  - QQ browser, Baidu browser and Opera Mini do not support
  - Other browsers' lastest version all support grid layout

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

## Holy Grail

- Middle part will be loaded first
- Key idea is to utilize `negative margin`, which will make current part move towards
top left direction. If current row does not satisfy the width that needs to move, current
element will move to the above row. The distance moved is exactly the same as value of margin-left


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

  /* set float for all three parts to occupy document flow */
  /* set relative position to use left/right attribute */
  .col {
    float: left;
    position: relative;
  }

  /**
   * Before apply negative margin, left part is right below middle part
   * 
   * 1. Setting negative left margin will make left part move towards top left
   * 2. In this case, it needs to move 100% width distance, which means it will
   *    be at the same starting position of middle level
   * 3. Then, set left: -200px, to make the element move left 200px, which is why
   *    relative position is needed. Now it occupies the space padding-left makes
   */
  .left {
    left: -200px;
    width: 200px;
    margin-left: -100%;
    height: 50px;
    background: lightgreen;
  }

  /**
   * Before apply negative margin, right part is right below left and middle part
   * 
   * 1. Setting negative left margin will make right part move towards top left 
   * 2. In this case, it needs to move -300px width (right part's width) distance, 
   *    which means it will end at the position where middle part ends
   * 3. Then, set right: -300px, to make the element move right 300px, now it occupies
   *    the space that padding-right makes
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

## Two Wings

- Middle part will be loaded first
- Key idea is also negative margin, similar to Holy Grail layout
- But the structure of HTML is changed, and no left/right needed
  - Because in Holy Grail layout, container has padding left and right, so the starting position
  of left and right part, when negative margin has not yet been applied, is not the edge of container
  , but the position where padding-left starts
    - Under such circumstance, -100% left margin will make left part appear at the same position but at
    above row, which is the starting position of middle part, so we need to set left: -200px. 
    - Same as right part
  - In Two Wings layout, the container has full width and instead the middle has an inner div that
  margins to the left and right to create space for left and right part
    - Therefore, the starting position of left and right part is the edge of container
    - Under such circumstance, -100% left margin will make left part appear at the edge of the container 
    at above row, so there is no need to set left: -200px. Same as right part

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

## Reference

[布局：三栏布局（7种方法）](https://blog.csdn.net/ganyingxie123456/article/details/77054124)

[圣杯布局、双飞翼布局、Flex布局和绝对定位布局的几种经典布局的具体实现示例](https://blog.csdn.net/wangchengiii/article/details/77926868)