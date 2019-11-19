---
tags: ['CSS小技巧', '面试问题 - CSS']
date: 11.16.2019
image: /images/selector-intro.jpeg
description: 讲一下 CSS 最重要的部分，选择器
---

# CSS 选择器

> Posted: 11.16.2019

<Tag />

## 介绍

CSS 选择器可以说是 CSS 最重要的一环了。

用对选择器，可以很轻易地实现事半功倍的效果。

不过有些选择器平时用得比较少，对于它们的优先级也比较迷。

在这里先讲一下一些平时用得比较少的选择器。

## 属性选择器

讲道理，属性选择器用得还是很多的。不过刚开始学 CSS 的人大概率不会。

语法如下：`选择器[属性=?]`。

好吧，这么看确实很迷，还是直接例子走起吧。

```html
<div id="the-test"></div>
```

如果有这么一个 HTML 元素，我们要怎么用属性选择器选择呢？

```css
div[id="the-test"] {
  width: 100px;
  height: 100px;
  background: pink;
}
```

<div id="the-test"></div>

<style>
div[id="the-test"] {
  width: 100px;
  height: 100px;
  background: pink;
}
</style>

成功了。

`div[id="the-test"]` 就是在说，对于所有 div 标签，选择<span v-red>**所有**</span> id 为 the-test 的标签。

如果把 div 去掉，`[id="the-test"]`，我们就是在选择所有 id 为 the-test 的标签，同样也能选择到这个标签。

如果把 the-test 去掉，`div[id]`，我们就是在选择所有具有 id 这个属性的标签，自然也能选择到这个标签。

### Vue 的 scoped

Vue style 的 scoped 属性我想大家都应该用过。这玩意儿就是靠属性选择器实现的。

![vue selector](/images/vue-selector.png)

Vue 会给 scoped 的标签添加一个额外的属性，然后通过属性选择器来选择这个属性，如下：

![vue selector2](/images/vue-selector-2.png)

## 子元素选择器

这玩意儿其实选择的就是直接的下一代，简单来说就是下一层子元素里的标签。

```html
<ul>
  <li class="test-sb">a</li>
  <li>b</li>
  <li class="test-sb">c</li>
  <div>
    <!-- 隔代了，所以无效 -->
    <li class="test-sb">d</li>
  </div>
</ul>
```

```css
ul > .test-sb {
  color: crimson;
}
```

猜猜看结果是怎样的？

<ul>
  <li class="test-sb">a</li>
  <li>b</li>
  <li class="test-sb">c</li>
  <div>
    <li class="test-sb">d</li>
  </div>
</ul>

<style>
ul > .test-sb {
  color: crimson;
}
</style>

## 相邻兄弟选择器

可选择<span v-red>**紧接**</span>在另一元素后的元素，且二者有相同父元素。

```html
<div id="adj-test">
  <ul>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色，自己没有被染色 -->
    <li>List item 1</li>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色 -->
    <li>List item 2</li>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色，但是没有下一个 li 了 -->
    <li>List item 3</li>
  </ul>
  <ol>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色，但接下来不是 li -->
    <li>List item 1</li>
    <!-- 不是接着 li 的 li 标签，因此无法染色 -->
    <span>List item 2</span>
    <!-- 不是接着 li 的 li 标签，因此无法染色 -->
    <li>List item 3</li>
  </ol>
</div>
```

```css
li + li {
  color: crimson;
}
```

猜猜看结果？

<div id="adj-test">
  <ul>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色，自己没有被染色 -->
    <li>List item 1</li>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色 -->
    <li>List item 2</li>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色，但是没有下一个 li 了 -->
    <li>List item 3</li>
  </ul>
  <ol>
    <li>List item 1</li>
    <span>List item 2</span>
    <li>List item 3</li>
  </ol>
</div>

<style>
#adj-test li + li {
  color: crimson;
}
</style>

## 普通兄弟选择器

这个选择器算是出现得比较少的。和相邻兄弟选择器比起来，它会选择后面所有的兄弟，而不是紧接的兄弟。

```html
<div id="adj-test">
  <ul>
    <!-- 作为第一个 li 被选中，让接下来所有的 li 被染色，自己没有被染色 -->
    <li>List item 1</li>
    <!-- 作为第一个 li 被选中，让接下来所有的 li 被染色 -->
    <li>List item 2</li>
    <!-- 作为第一个 li 被选中，让接下来所有的 li 被染色 -->
    <li>List item 3</li>
  </ul>
  <ol>
    <!-- 作为第一个 li 被选中，让接下来所有的 li 被染色，自己没有被染色 -->
    <li>List item 1</li>
    <!-- 不是接着 li 的 li 标签，因此无法染色 -->
    <span>List item 2</span>
    <!-- 因为是第一个 li 的兄弟，因此被染色 -->
    <li>List item 3</li>
  </ol>
</div>
```

```css
li ~ li {
  color: crimson;
}
```

<div id="sib-test">
  <ul>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色，自己没有被染色 -->
    <li>List item 1</li>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色 -->
    <li>List item 2</li>
    <!-- 作为第一个 li 被选中，让下一个 li 被染色，但是没有下一个 li 了 -->
    <li>List item 3</li>
  </ul>
  <ol>
    <li>List item 1</li>
    <span>List item 2</span>
    <li>List item 3</li>
  </ol>
</div>

<style>
#sib-test li ~ li {
  color: crimson;
}
</style>

## 伪类选择器

这个大家肯定用过，不过又有谁知道一共有多少种伪类呢？

![pseudoclass selector](/images/pseudo-class.png)

具体的链接在这里，感兴趣的朋友可以自己去看：[Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

## 伪元素选择器

伪元素和伪类不一样，伪元素选中的都是某个标签的一部分。

比如 ::before 和 ::after 这俩用得比较多的，::after 就在 [清除浮动](/css-tricks/clearFloat.md) 里会用到。

不过有一点需要提一下，那就是写伪元素选择器的时候，一个冒号或者两个冒号都行。所有的现代浏览器的最新版本，两种都支持，但有的浏览器老的版本是只支持一个冒号的。因此，虽然两个冒号才是正宗的写法，但一般来说，出于兼容性的考虑，都是写一个冒号的。这样比较安全。

具体的兼容性和伪元素种类，可以参考这里：[Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)

![pseudo-element](/images/pseudo-element.png)

## 优先级

接下来就是最重的重头戏了：CSS 选择器的优先级。

首先看看我们一共有哪些选择器：

- 标签选择器
- 类选择器
- ID 选择器
- 属性选择器
- 后代选择器
- 子元素选择器
- 相邻兄弟选择器
- 普通兄弟选择器
- 伪类选择器
- 伪元素选择器
- 全局选择器

<span v-p>**OK，开始排序吧。CSS 选择器的优先级，从最优先的到最不优先的：**</span>

1. ID 选择器
2. 类选择器 = 伪类选择器 = 属性选择器
3. 标签选择器 = 伪元素选择器
4. 全局选择器

但是这么看根本不够，因为很多时候我们都是多个选择器一起用的。

<span v-p>**因此，有一种计算方法是：**</span>

- 给 ID 选择器权重 = 1000
- 给类选择器这一层的权重 = 100
- 给标签选择器这一层的权重 = 10
- 给全局选择器权重 = 1
- 相邻兄弟选择器、普通兄弟选择器、后代选择器、子元素选择器，本身没有权重

<span v-p>**权重的比较规则如下：**</span>

1. 计算多个标签或者选择器的时候，就把这些权重加起来，权重高的优先度就高
2. 如果权重一样，那么后定义的属性会覆盖先定义的属性

比如 `#a .b + c` = 1000 + 100 + 10 = 1110

`#a #b > .c` = 1000 + 1000 + 100 = 2100

因此，下面的选择方法优先度更高。

<span v-p>**但有一点需要注意的是，这只是一种模拟，并不是真的如此。**</span>

给一个元素定义 101 个类，然后全部选择，并不能比单独的 ID 选择器优先度更高。

优先度更高的选择器，优先度永远比优先度低的选择器高。

### 额外需要提一点

<span v-p>**伪类选择器和属性选择器都不是一个单独的标签，因此需要把它们之前的标签也一起计算进去**</span>

`div:nth-of-type(1)` 和 `div[id]` 其实是同一优先级的。

而和 `.abc` 类选择器比起来，它们其实是 div + 自己，比类选择器多一个 div，因此它们的优先度更高。

计算它们的时候，需要把它们之前的标签也一起计算进去，不然就会出错。

### 额外再需要提一点

在普通的选择器之外，还有两个法外狂徒：inline 和 important。

加上它们两个，优先级其实是：important > inline > 所有的选择器。

## 参考资料

[CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

[CSS 相邻兄弟选择器](https://www.w3school.com.cn/css/css_selector_adjacent_sibling.asp)

[Pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

[Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)

<Disqus />