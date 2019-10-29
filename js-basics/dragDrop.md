---
tags: ['DOM相关', '面试问题 - JS']
date: 09.22.2019
image: /drag-intro.png
description: 虽然一般都用库，但最简单的拖拽还是得会的吧？
---

# DOM 元素的拖拽实现

> Posted: 09.22.2019

<Tag />

## 拖拽事件

- ondragstart 事件：当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上
- ondragenter 事件：当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上
- ondragover 事件：拖拽元素在目标元素上移动的时候触发的事件，此事件作用在目标元素上
- ondrop 事件：被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上
- ondragend 事件：当拖拽完成后触发的事件，此事件作用在被拖曳元素上


<span v-red>**据说腾讯会有类似的笔试题**</span>

## 实战

实现以下的拖拽功能（老子原创的）:

1. 有一个outer container
2. Container里有两个 200px * 200px 的盒子
3. 被拖拽的 100px * 100px 的元素会首先在第一个盒子里
4. 该元素被拖拽到盒子中时，其位置自动黏着到左上角
5. 该元素被拖拽到盒子外时，其位置便是松开鼠标时的位置

这是 demo:

::: demo vue
<template>
  <div
    class="test-container"
    @dragover="dragOver"
    @drop="dropInContainer"
  >
    <div
      class="box1"
      id="box1"
      @dragover="dragOver"
      @drop="dropInBox"
    >
      <div 
        id="drag-item"
        class="drag-item"
        draggable="true"
        @dragstart="dragStart"
      ></div>
    </div>
    <div
      id="box2"
      class="box2"
      @dragover="dragOver"
      @drop="dropInBox"
    ></div>
  </div>
</template>

<style>
  .test-container {
    width: 100%;
    height: 500px;
    position: relative;
    background: ghostwhite;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .drag-item {
    width: 100px;
    height: 100px;
    background: skyblue;
    position: absolute;
  }

  .box1 {
    width: 200px;
    height: 200px;
    background: pink;
    position: absolute;
    left: 100px;
    top: 100px;
  }

  .box2 {
    width: 200px;
    height: 200px;
    background: palegreen;
    position: absolute;
    right: 100px;
    top: 200px;
  }
</style>

<script>
  export default {
    data() {
      return {
        offsetX: 0,
        offsetY: 0,
        target: null
      }
    },
    methods: {
      dragStart: function(e) {
        this.target = e.target;
        this.offsetX = e.offsetX; // 记录下鼠标拖拽时
        this.offsetY = e.offsetY; // 鼠标相对于被拖拽元素的位置
      },
      dragOver: function(e) {
        e.preventDefault();
      },
      dropInContainer: function(e) {
        e.target.appendChild(this.target); // append拖拽元素到container
        this.target.style.left = e.offsetX - this.offsetX + 'px';
        this.target.style.top = e.offsetY - this.offsetY + 'px';
      },
      dropInBox: function(e) {
        e.stopPropagation(); // 阻止冒泡，否则container的drop也会触发
        e.target.appendChild(this.target); // append拖拽元素到box1
        this.target.style.left = '0px'; 
        this.target.style.top = '0px'; // 取
      }
    }
  }
</script>

:::


## 代码

HTML:

```html
<div class="container" ondragover="dragOver" ondrop="dropInContainer">
  <div class="box1" ondragover="dragOver" ondrop="dropInBox">
    <div class="drag-item" draggable="true" ondragstart="dragStart"></div>
  </div>
  <div class="box2" ondragover="dragOver" ondrop="dropInBox"></div>
</div>
```

CSS:

```css
.container {
  width: 100%;
  height: 500px;
  position: relative;
  background: ghostwhite;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.drag-item {
  width: 100px;
  height: 100px;
  background: skyblue;
  position: absolute;
}

.box1 {
  width: 200px;
  height: 200px;
  background: pink;
  position: absolute;
  left: 100px;
  top: 100px;
}

.box2 {
  width: 200px;
  height: 200px;
  background: palegreen;
  position: absolute;
  right: 100px;
  top: 200px;
}
```

JavaScript:

```javascript
// offsetX/offsetY 是相对于被拖拽元素的鼠标位置
var offsetX = 0;
var offsetY = 0;

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.id);
  // 记录下鼠标的位置
  offsetX = e.offsetX;
  offsetY = e.offsetY;
}

function dragOver(e) {
  /**
   * 对于 ondragenter 和 ondragover 事件来说
   * 一定要记得 preventDefault，不然 ondrop 事件无法触发
   */
  e.preventDefault();
}

function dropInContainer(e) {
  // 在 container 上 append 该元素
  var data = e.dataTransfer.getData('text');
  var node = document.getElementById(data);
  e.target.appendChild(node);
  
  /**
   * 开始拖拽时，假设鼠标的位置是（x，y）
   * 松开鼠标时，该元素落地的位置不是松开前的位置，而是其左上角会移动到鼠标的位置
   * 所以我们会有一个（x，y）的坐标偏移，大家可以自己去试一下
   * 所以需要减掉那个（x，y）的坐标偏移
   */
  node.style.left = e.offsetX - offsetX + 'px';
  node.style.top = e.offsetY - offsetY + 'px';
}

function dropInBox(e) {
  /**
   * 防止冒泡，不然 container 上的 ondrop 事件也会触发
   */
  e.stopPropagation();

  // 在 box 上 append 该元素
  var data = e.dataTransfer.getData('text');
  var node = document.getElementById(data);
  e.target.appendChild(node);

  /**
   * 设置 left/top = 0
   * 因为当从 container 移动到 box 时，left/right 属性会保留
   */
  node.style.left = '0px'; 
  node.style.top = '0px';
}
```

<Disqus />