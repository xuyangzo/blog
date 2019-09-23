---
tags: ['DOM', 'Interview Problems']
---

# DOM Element Drag and Drop

> Posted: 09.22.2019

<Tag />

## Drag Events

- ondragstart: when draggable item starts to be dragged, target is draggable item
- ondragenter: when draggable item enters particular element, target is that element
- ondragover: when draggable item moves within particular element, target is that element
- ondrop: when draggable item is released on destination element, target is destination element
- ondragend: when dragging finishes, target is element being dragged

<span style='color: palevioletred'>**As far as I know, Tencent might have problems of dragging and dropping!**</span>

## Assignment

Complete the following drap/drop functionalities:

1. There is an outer container
2. There are two 200px * 200px boxes inside the container
3. The 100px * 100px element being dragged is inside the first box
4. That element can be dragged into each box and its position inside box is top left corner
5. When outside the box, its position can be set to any point

Here is the demo:

::: demo vue
<template>
  <div
    class="container"
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
  .container {
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


## Code

HTML:

```html
<div class="container" ondragover="dragOver" ondrop="dropInContainer">
  <div class="box1" ondragover="dragOver" ondrop="dropInBox">
    <div class="drag-item" draggable="true" ondragstart="dragStart"></div>
  </div>
  <div class="box2" ondragover="dragOver" ondrop="dropInBox"></div>
</div>
```

<br />

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

<br />

JavaScript:

```javascript
// offsetX/offsetY represents the cursor position relative to the element
var offsetX = 0;
var offsetY = 0;

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.id);
  // Record the cursor position for dragging
  offsetX = e.offsetX;
  offsetY = e.offsetY;
}

function dragOver(e) {
  /**
   * For ondragenter and ondragover events
   * Has topreventDefault，otherwise ondrop will not trigger
   */
  e.preventDefault();
}

function dropInContainer(e) {
  // append node to outer container
  var data = e.dataTransfer.getData('text');
  var node = document.getElementById(data);
  e.target.appendChild(node);
  
  /**
   * When dragging, suppose cursor position is (x, y) relative to element
   * When dropping, the top left corner will drop to current cursor position
   * So we have a (x, y) distance offset relative to original cursor position
   * Need to subtract that (x, y) offset
   */
  node.style.left = e.offsetX - offsetX + 'px';
  node.style.top = e.offsetY - offsetY + 'px';
}

function dropInBox(e) {
  /**
   * Prevent propagation, otherwise the ondrop method attached to 
   * outer container will also trigger
   */
  e.stopPropagation();

  // append node to box
  var data = e.dataTransfer.getData('text');
  var node = document.getElementById(data);
  e.target.appendChild(node);

  /**
   * Set left/top to 0
   * Because if move from outer container to box, left/right still remains same
   */
  node.style.left = '0px'; 
  node.style.top = '0px';
}
```

<Disqus />