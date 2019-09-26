---
tags: ["CSS动画"]
---

# Mouseleave 和 Rotate 之间的问题
> Posted: 09.18.2019

<Tag />

## 环境

当我创建这个网站时，我碰见了一个很古怪的问题。代码如下：

```css
img {
  transition: transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.do-flip {
  transform: rotateY(360deg);
}
```

```javascript
<img
  v-bind:class="{ 'do-flip': doFlip }"
  :src="$withBase(heroImage)"
  @mouseenter="flip"
  @mouseleave="flipBack"
/>

...

// 环境为 vue
methods: {
  flip: function() {
    this.doFlip = true;
  },
  // 想要重新触发动画，需要设置回 false，删除对应的 class
  flipBack: function() {
    this.doFlip = false;
  }
}
```

## 问题

但问题是，当鼠标进入图片，并且停留在图片上时，`mouseleave`依旧被触发了！！

但在这个时候，鼠标根本就没有离开图片！！

![mouseleave](/mouseleave.gif)

从上图可以看出，鼠标的确没有离开图片...

<span style='color: palevioletred'>等等，真的是这样吗？</span>

真正的问题在于... **动画**!

我使用的动画是 `rotateY(360deg)`，这就意味着，在动画执行的过程中，图片会沿着Y轴旋转，并且在转到 90度 以及 270度 的时候，
这张图片会和X轴垂直……

明白问题了吧！在这个时候，图片本质上就只是一条线而已，因此鼠标的确离开了图片！

## 解决方案

解决方案非常简单。

在鼠标离开图片时，什么都不要做。

只在鼠标进入图片时，开启/取消动画。对于transition来说，取消时它会反向执行动画，可以达到和开启动画时一样的效果！

```javascript
<img
  v-bind:class="{ 'do-flip': doFlip }"
  :src="$withBase(heroImage)"
  @mouseenter="flip"
/>

...

methods: {
  flip: function() {
    this.doFlip = !this.doFlip;
  }
}
```

<Disqus />