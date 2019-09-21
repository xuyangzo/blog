---
tags: ["CSS Animations", "CSS Tiny Issues"]
---

# Mouseleave with Rotate Animation
> Posted: 09.18.2019

<Tag />

## Environment

When I was creating this website, I encountered a problem with css animations.  
The animation I decide to use is `rotateY(360deg)` when I hover over the image

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

// written in vue
methods: {
  flip: function() {
    this.doFlip = true;
  },
  // in order to trigger the animation each time mouse enters
  // need to flip it back after the mouse leaves
  flipBack: function() {
    this.doFlip = false;
  }
}
```

## Issue

But the problem is, when the mouse enters the image and stay hovering over the image,  
`mouseleave` still triggers!!! It does not actually leave the edge of the image!

![mouseleave](/mouseleave.gif)

As you can see, the mouse does not leave the image at all!!

<span style='color: palevioletred'>Wait, are you sure? </span>

The Problem is, the **ANIMATION**!

The animation is `rotateY(360deg)`, which means there will be some point during the animation  
that the image is completely vertical to the x-axis... It is basically a line from the perspective  
of the screen. Under such circumstance, mouse is indeed **LEAVING** the image!!

## Solution

The solution is quite simple. Just do nothing when the mouse leaves image.  
Only toggle the animation when mouse enters image.

```javascript
<img
  v-bind:class="{ 'do-flip': doFlip }"
  :src="$withBase(heroImage)"
  @mouseenter="flip"
/>

...

// written in vue
methods: {
  flip: function() {
    this.doFlip = !this.doFlip;
  }
}
```

<Disqus />