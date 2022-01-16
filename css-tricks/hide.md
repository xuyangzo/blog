---
tags: ['CSS小技巧', '面试问题 - CSS']
date: 11.07.2019
image: /images/hide-intro.jpg
description: 讲一下 opacity，display，visibility 三者的区别
---

# 隐藏元素的方式

> Posted: 11.07.2019

<Tag />

## 介绍

我们知道，想要用 CSS 隐藏一个元素，有三种方法。

1. opacity: 0
2. display: none
3. visibility: hidden

那么，这三种方法究竟有什么区别呢？

今天我们还是主要从三个方面进行探究：

1. 是否占据文档流
2. 子元素是否可以继承
3. 事件是否可以触发

在这之前，我们先搞一个基础的模型。

```html
<div class="hide-container">
  <div class="hide-inner"></div>
</div>
<div class="hide-container-2"></div>
```

```css
.hide-container,
.hide-container-2 {
  width: 100px;
  height: 100px;
  display: inline-block;
}

.hide-container {
  background: lightcyan;
}

.hide-container .hide-inner {
  width: 50px;
  height: 50px;
  background: lightgreen;
}

.hide-container-2 {
  background: pink;
}
```

<div class="hide-container">
  <div class="hide-inner"></div>
</div>
<div class="hide-container-2"></div>

<style>
  .hide-container,
  .hide-container-2 {
    width: 100px;
    height: 100px;
    display: inline-block;
  }

  .hide-container {
    background: lightcyan;
  }


  .hide-container .hide-inner {
    width: 50px;
    height: 50px;
    background: lightgreen;
  }

  .hide-container-2 {
    background: pink;
  }
</style>

## opacity

### 文档流

把 opacity 设置成 0 后，依旧会占据文档流。

```css
.hide-container {
  opacity: 0;
}
```

<div class="hide-container opacity-0">
  <div class="hide-inner"></div>
</div>
<div class="hide-container-2"></div>

<style>
.opacity-0 {
  opacity: 0
}
</style>

我们可以看见，红色盒子并没有左移。

### 继承性

opacity 是可以继承的，这个从上个例子中就能看出来。

并且子元素的 opacity 是无法超过父元素的。

这也就意味着，如果父元素的 opacity 为 0，那么子元素的 opacity 不能超过 0，因此就被隐藏了。

```css
.hide-inner {
  opacity: 1;
}
```

<div class="hide-container opacity-0">
  <div class="hide-inner opacity-1"></div>
</div>
<div class="hide-container-2"></div>

<style>
.opacity-1 {
  opacity: 1;
}
</style>

### 事件

绑定一个点击事件和子元素的点击事件。

我这里直接放 vue 的代码了，因为我在这个页面上的实现就是靠 vue 的。

```vue
<template>
  <div>
    <div class="hide-container opacity-0 cursor" @click="click='父元素被点击'">
      <div class="hide-inner" @click.stop="click='子元素被点击'"></div>
    </div>
    <div class="hide-container-2"></div><br /><br />
    <span v-red>{{ click }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        click: '点击没触发'
      }
    }
  }
</script>
```

::: demo vue
<template>
  <div>
    <div class="hide-container opacity-0 cursor" @click="click='父元素被点击'">
      <div class="hide-inner" @click.stop="click='子元素被点击'"></div>
    </div>
    <div class="hide-container-2"></div><br /><br />
    <span v-red>{{ click }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        click: '点击没触发'
      }
    }
  }
</script>

<style>
.cursor {
  cursor: pointer;
}
</style>

:::

大家可以自己试一下。

子元素和父元素的点击事件都能触发。

并且子元素的点击事件会冒泡到父元素。（我这里阻止冒泡了）

## display

### 文档流

设置 display: none 之后，便不会占据文档流。

```css
.hide-container {
  display: none;
}
```

<div class="hide-container display-none">
  <div class="hide-inner"></div>
</div>
<div class="hide-container-2"></div>

<style>
.display-none {
  display: none;
}
</style>

### 继承性

显然是继承了，整个节点都消失了。

但是，这个节点还存在与文档中，而不是和 React/Vue 的条件渲染一样，直接从文档里移除。

![display none](/images/display-none.png)

### 事件

点击事件显然不可能触发了，因为你都点不到。

那么别的事件呢？比如说 `onerror` 事件？

```vue
<template>
  <div>
    <div class="hide-container display-none">
      <div class="hide-inner"></div>
      <img src=null @error="error = '出现 error'">
    </div>
    <div class="hide-container-2"></div><br /><br />
    <span v-red>{{ error }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: '没有 error'
      }
    }
  }
</script>
```

::: demo vue
<template>
  <div>
    <div class="hide-container display-none">
      <div class="hide-inner"></div>
      <img src=null @error="error = '出现 error'">
    </div>
    <div class="hide-container-2"></div><br /><br />
    <span v-red>{{ error }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: '没有 error'
      }
    }
  }
</script>
:::

我们可以发现，事件还是被触发了，毕竟 DOM 里，该元素依旧还在，只是我们看不见了而已。

## visibility

### 文档流

设置 visibility: hidden 之后，依旧会占据文档流。

```css
.hide-container {
  visibility: hidden;
}
```

<div class="hide-container visibility-hidden">
  <div class="hide-inner"></div>
</div>
<div class="hide-container-2"></div>

<style>
.visibility-hidden {
  visibility: hidden;
}
</style>

### 继承性

子元素继承父元素的 visibility，但是可以修改。

```css
.hide-inner {
  visibility: visible;
}
```

<div class="hide-container visibility-hidden">
  <div class="hide-inner visibility-visible"></div>
</div>
<div class="hide-container-2"></div>

<style>
.visibility-visible {
  visibility: visible;
}
</style>

我们可以看见，子元素的 visibility 是有效的。

### 事件

这样看来，onclick 事件应该是可以触发的吧……

真的是这样吗？

```vue
<template>
  <div>
    <div class="hide-container visibility-hidden cursor" @click="click = '父元素被点击'">
      <div class="hide-inner visibility-visible" @click.stop="click = '子元素被点击'"></div>
      <img src=null @error="error = '出现 error'">
    </div>
    <div class="hide-container-2"></div><br /><br />
    <span v-red>{{ click }} - {{ error }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        click: '点击没触发',
        error: '没有 error'
      }
    }
  }
</script>
```

::: demo vue
<template>
  <div>
    <div class="hide-container visibility-hidden cursor" @click="click = '父元素被点击'">
      <div class="hide-inner visibility-visible" @click.stop="click = '子元素被点击'"></div>
      <img src=null @error="error = '出现 error'">
    </div>
    <div class="hide-container-2"></div><br /><br />
    <span v-red>{{ click }} - {{ error }}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        click: '点击没触发',
        error: '没有 error'
      }
    }
  }
</script>
:::

这……

子元素的 onclick 事件有效，但是父元素的 onclick 事件无效。

这么看来，如果设置成 visibility: hidden，那么该元素的 click 事件就会无效。

<Chirpy />