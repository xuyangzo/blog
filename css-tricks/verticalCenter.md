---
tags: ['CSS Layout']
---

# Vertically Align Center

> Posted: 09.22.2019

<Tag />

## Line-Height

Restrictions:
1. Only works for inline element
2. Must know the exact number of container's height

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

## Table-Cell

Advantages:

1. Works for block, inline, inlink-block elements

Restrictions:

1. Will change the display pattern, might affect layout

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

## Absolute Position

Advantages:

1. Works for block, inline, inlink-block elements

Restrictions:

1. Little compatibility issue with IE 6~8 and Opera Mini browsers not supporting

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

Advantages:

1. Works for block and inline-block elements

Restrictions:

1. Does not work for inline elements

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

## Flexbox

Advantages:

1. Works for block, inline, inlink-block elements

Restrictions: 

1. Have compatibility issue with IE
  - IE 6~9 does not support 
  - IE 10, 11 partially support

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