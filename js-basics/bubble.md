---
tags: ['DOM相关', '面试问题 - JS']
date: 11.11.2019
image: /images/bubble-intro.png
description: 讲一下事件冒泡与事件委托
---

# 事件委托

> Posted: 11.11.2019

<Tag />

## 介绍

![bubble + capture](/images/bubble.png)

我们经常会看见这一张图。

从外到内捕获，从内到外冒泡。

那么问题来了，什么是 `事件捕获`？什么是 `事件冒泡`？

在讲这玩意儿之前，我们首先得明白 DOM 版本的问题。

## DOM 版本

我们不是经常看见 DOM0，DOM2，DOM3 之类的词吗？

这到底是什么意思呢？

这其实就是 DOM 的版本。

类似于 CSS3 和 HTML5。CSS3 是 CSS 最新的版本。而 HTML5 是 HTML 最新的版本。

DOM3 就是 DOM2 之后，新的 DOM 的版本。

每个新版本的推出，都会包含新的内容。

[DOM Level 1 的规范](https://www.w3.org/TR/REC-DOM-Level-1/) 规定了 Document Object Model 的核心元素。

[DOM Level 2 的规范](https://www.w3.org/TR/DOM-Level-2-Core/) 在 DOM1 规范的基础上，添加了新的元素和事件。

[DOM Level 3 的规范](https://www.w3.org/TR/DOM-Level-3-Core/) 在 DOM2 规范的基础上，添加了新的元素和事件。

### DOM0?

那么问题来了，如果你在百度上搜索，会经常看见 `DOM0 事件`。

可是你去 w3 上搜索，是搜不到 DOM0 规范的，这是为什么？

因为 DOM0 并不是一个具体的规范。而只是一种 `称呼`。因为这个时候 DOM 这个模型还没有出现，自然不存在任何规范。

DOM1 的规范是在 1998 年发布的，因此在这之前，所有和 DOM 有关的内容都属于 DOM0。

很多人在网上说找不到 DOM1，不知道在 DOM1 究竟发生了什么。

这其实就是人云亦云。DOM1 的规范明明就摆在那里，怎么可能找不到？

大家都说 DOM0 和 DOM2 的事件，其实这 tm 根本就是不规范的说法！

要知道，事件模型是在 DOM2 的规范里被定义的，也就是说在一开始根本就没有事件模型。

很多人概念都没有搞清楚就来写博客，这是很不负责的表现。

当然，DOM 版本就说到这里了，有兴趣的小伙伴可以自己去 w3 的官网看。

## DOM0 事件

在 DOM2 规范出来之前，我们知道，事件模型根本不存在。

那么问题来了，事件模型不存在怎么办？我们怎么处理事件？

在 DOM1 规范里其实写清楚了如下的内容：

> The events that are supported in Level 0 are given in the DOM Level 1 HTML ECMAScript binding for completeness; the method of defining and handling events is expected to change

也就是说，在 DOM0 被支持的事件，出于完整性考虑，也被添加到了 DOM1 规范中。但是这种定义和处理事件的方式是需要被改变的。

OK，那其实就很明白了，在 DOM2 的事件模型出来之前，我们都沿用 DOM0 处理事件的方式。

DOM0 定义和处理事件的方式有如下两种：

```html
<input type="button" onclick="console.log('!');" value="Click" />
```

```javascript
document.getElementById('btn').onclick = function() { ... };
```

而在 DOM0 的事件中，只存在冒泡，不存在捕捉（因为事件模型还没被定义）。

冒泡的过程，就是当子元素的某个事件被触发后，该事件会从子元素一直冒泡到父元素，导致父元素的该事件被触发，一直冒泡到最外层的 Document 元素，如下图：

![event bubbling](/images/event-bubbling.png)

但是，并不是所有的事件都支持冒泡。并且有一点需要澄清的是：<span v-red>**某种事件是否冒泡，与该事件的定义方式是 DOM0 还是 DOM2 是无关的！某种事件是够冒泡，是由该事件自己规定的！例如点击事件可以冒泡，失焦事件不行，这和怎么定义事件无关！onclick 和 addEventListener('click') 的核心是 click！**</span>

DOM0 事件只存在冒泡。这也就是说，如果某种事件支持冒泡（这是前提），并且用 DOM0 的方法去定义，就会触发冒泡。

并且在 DOM0 级事件处理中，后定义的事件处理会覆盖前面的事件。

如果同时定义了行内和脚本里的点击事件，脚本里的点击事件会覆盖行内的点击事件。

当然也可以阻止冒泡：

```javascript
document.getElementById('btn').onclick = function(e) {
  // 冒泡被阻止，父元素的点击事件不会被触发
  e.stopPropagation();
}
```

## DOM2 事件

DOM2 的规范定义了事件模型，但是并没有否定 DOM0 的事件定义方式（DOM 规范一直都是对于之前规范的延伸，而并没有废除之前的规范）。因此在 DOM2 规范出来后，DOM0 定义事件的方式依旧存在。

而 DOM2 规范定义的事件模型具有三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

<span v-p>**事件捕获阶段**：</span>

先于冒泡触发，从最外层的 DOM 一直向下捕获。

![event capture](/images/event-capture.png)

<span v-p>**处于目标阶段**：</span>

处于目标阶段就是目前正处于触发事件的原始元素。

<span v-p>**事件冒泡阶段**：</span>

和 DOM0 事件的冒泡一样，从最里层的 DOM 向外冒泡。

![event bubbling](/images/event-bubbling.png)

而 DOM2 定义事件的方式，就是使用 addEventListener。

`target.addEventListener(type, listener[, useCapture])`：第三个参数指定了是否在捕获阶段触发事件。如果设置成 true 的话，那么事件就会在捕获阶段被触发，并且继续发生冒泡。如果设置成 false 的话，那么事件就会在冒泡阶段被触发。

举个🌰：

```vue
<template>
  <div>
    <div class="event-outer" @click.capture="logs.push('outer 捕获！')" @click="logs.push('outer 冒泡！')">
      <div class="event-middle" @click.capture="logs.push('middle 捕获！')" @click="logs.push('middle 冒泡！')">
        <div class="event-inner" @click.capture="logs.push('inner 捕获！')" @click="logs.push('inner 冒泡！')"></div>
      </div>
    </div>
    <div>
      <p v-for="(log, i) in logs" :key="i">{{ log }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logs: []
      }
    }
  }
</script>
```

如果我们点击最内层的元素，首先会从外往内捕获，然后会从内往外冒泡。

捕获与冒泡是互不干扰的，可以同时发生捕获与冒泡。

:::demo vue
<template>
  <div>
    <div class="event-outer" @click.capture="logs.push('outer 捕获！')" @click="logs.push('outer 冒泡！')">
      <div class="event-middle" @click.capture="logs.push('middle 捕获！')" @click="logs.push('middle 冒泡！')">
        <div class="event-inner" @click.capture="logs.push('inner 捕获！')" @click="logs.push('inner 冒泡！')"></div>
      </div>
    </div>
    <div>
      <p v-for="(mylog, i) in logs" :key="i">{{ mylog }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logs: [],
        log: ''
      }
    }
  }
</script>

<style>
.event-outer {
  width: 200px;
  height: 200px;
  background: pink;
  cursor: pointer;
}

.event-middle {
  width: 150px;
  height: 150px;
  background: lightcyan;
}

.event-inner {
  width: 100px;
  height: 100px;
  background: lightgreen;
}
</style>
:::

## 事件委托

JS 的事件委托其实就是利用了事件冒泡的原理。

对于大量要处理的元素，不必为每个元素都绑定事件，只需要在他们的父元素上绑定一次即可，提高性能。

还有一个好处就是可以处理动态插入 DOM 中的元素，直接绑定的方式是不行的。

但需要额外做的是，判断 source element。

```vue
<template>
  <div>
    <div class="event-outer" @click="onclick">
      <div class="event-middle">
        <div class="event-inner"></div>
      </div>
    </div>
    <p>{{ log }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        log: ''
      }
    },
    methods: {
      onclick(e) {
        // 判断 source element
        var target = e.target || e.srcElement;
        if (target.classList.contains("event-outer")) {
          this.log = '点击了 outer'
        } else if (target.classList.contains("event-middle")) {
          this.log = '点击了 middle';
        } else {
          this.log = '点击了 inner';
        }
      }
    }
  }
</script>
```

:::demo vue
<template>
  <div>
    <div class="event-outer" @click="onclick">
      <div class="event-middle">
        <div class="event-inner"></div>
      </div>
    </div>
    <p>{{ log }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        log: '',
        logs: []
      }
    },
    methods: {
      onclick(e) {
        // 判断 source element
        var target = e.target || e.srcElement;
        if (target.classList.contains("event-outer")) {
          this.log = '点击了 outer'
        } else if (target.classList.contains("event-middle")) {
          this.log = '点击了 middle';
        } else {
          this.log = '点击了 inner';
        }
      }
    }
  }
</script>
:::

## 参考资料

[JS-------DOM0级事件处理和DOM2级事件处理-------简单记法](https://www.cnblogs.com/holyson/p/3914406.html)

[DOM0,DOM2,DOM3事件,事件基础知识入门](https://www.cnblogs.com/diligenceday/p/4175721.html)

[What are DOM levels?](https://stackoverflow.com/questions/6629093/what-are-dom-levels)

[What happened to DOM level 1?](https://stackoverflow.com/questions/3239831/what-happened-to-dom-level-1)

[UI Events](https://www.w3.org/TR/uievents/)

<Chirpy />