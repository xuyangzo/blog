---
tags: ['JS基础', '面试问题 - JS']
---

# 内存泄漏

> Posted: 09.28.2019

<Tag />

## 内存泄漏的定义

<span v-red>应用程序不再需要占用内存的时候，由于某些原因，内存没有被操作系统或可用内存池回收。</span>

这句话到底是什么意思？

**其实可以这样理解：**

假如说你一开始分配了一块内存，用来存一个名叫”新垣结衣“的字符串。

然后你用这个字符串进行了一系列操作，比如说摸、亲、啪……

玩完了以后，你很爽，然后进入了贤者模式，觉得”新垣结衣“也就那样，没什么用了。

于是你摇身一变成为了渣男，从此以后对”新垣结衣“不理不睬。

你没有再临幸她的想法了，于是就让她一个字符串孤零零地呆在内存里。

这种情况下就出现了内存泄漏。

为什么？因为内存必然是有限的。就算你能够一夜七次，次次换人，也只能有七个老婆。

而”新垣结衣“这个字符串在这里，就是占着茅坑不拉…… 

你只能有七个老婆，而”新垣结衣“占了一个名额，因此你只能再找六个老婆，可是你又不想啪”新垣结衣“，这就导致你老婆的上限莫名其妙地从七个变成了六个。

因此你需要一脚把”新垣结衣“踢了。这样的话被占据的内存就会被释放，你又可以找七个新的老婆了。

<span v-red>**所以说程序本质上就是渣男。什么情意不情意的，没有利用价值了就得抛弃。**</span>


## 垃圾回收机制

要明白 JS 的内存泄漏究竟是怎么产生的，首先得明白 JS 的垃圾回收机制。

详情可以参考这篇文章：[JS 的垃圾回收机制](/zh/js-basics/gc.md)

## 意外的全局变量

我们先来看以下这段代码。

```javascript
function foo(arg) { 
  bar = "this is a hidden global variable"; 
  this.name = "lynch";
}
```

这段代码等同于：


```javascript
function foo(arg) { 
  window.bar = "this is a hidden global variable";
  window.name = "lynch"; // 如果通过 foo() 来调用的话
}
```

为什么这玩意儿会导致内存泄漏呢？

如果你看过了我之前关于垃圾回收机制的文章，你就会知道，目前的标记清除机制会从 root 对象开始（在这里就是 window 对象）
，执行深度遍历/广度遍历。而 bar 和 name 显然可以通过 window 对象而到达，也就是说他们不会被垃圾回收器回收，会一直留在内存里。

一直留存在内存里，导致的问题就是：除非你刷新页面，否则被占据的内存不会被释放。

这意味着，接下来执行的脚本，可用的内存就会减少，直接影响性能。

而这还是浏览器，页面一刷新，内存就会重新分配。

可如果是一个一直在运行的 Node 服务器呢？

每次发生内存泄漏，可用的内存就会减少一部分。而因为服务器一直在运行，如果你不主动清理内存，
被占用的内存就会一直被占用。到最后就会出现没有内存可用的情况。

是不是很可怕。

### Use Strict

在 JavaScript 文件头部加上 'use strict'，可以避免此类错误发生。

至于严格模式究竟能干些什么，可以参考这篇文章：[严格模式](/zh/js-basics/strict.md)

## 被遗忘的计时器或回调函数

```javascript
var timer = setInterval(function() {
  console.log('+1s');
}, 1000);

// clearInterval(timer);
```

这个其实也很好理解。

计时器的作用是什么？每隔一段时间执行回调函数。

对于 `setTimeout` 来说，如果你使用匿名函数，那么在 setTimeout 执行完之后，该函数就用不到了，然后就变成了 unreachable（从 root 开始执行深度遍历/广度遍历到不到），于是就被垃圾回收机制给清理掉了。

不过对于 `setInterval` 来说，其回调函数一直都不会被清理。

（当然这也是 setInterval 的必然性，你一直开着这玩意儿，它当然一直占据内存）

### Event Listener

老的 IE 6 无法处理循环引用。

如今，即使没有明确移除它们，一旦观察者对象变成不可达，大部分浏览器可以回收观察者处理函数，不必非要调用 removeEventListener

## 脱离 DOM 的引用

```html
<div id="container">测试</div>
```

```javascript
var elements = { 
  container: document.getElementById('container'),
};
var container = document.getElementById('container');

console.log(container === document.getElementById('container')); // true
console.log(elements.container === document.getElementById('container')); // true
 
// 在 DOM 上移除节点
document.body.removeChild(document.getElementById('container')); 

console.log(container); // 原 container 节点
console.log(elements.container); // 原 container 节点
```

上面这段代码说明了什么？

1. document.getElementById 以及其一系列的亲戚，返回的就是指向 DOM 节点的指针
2. 移除节点之后，指向 DOM 节点的指针，竟然没有指向 null！？这是为什么？节点都没了啊！

兄dei，你仔细想想，为什么这个指针能够指向一个已经被删除的节点？

这说明那个节点还在内存里，并且还存在相同的地址上，否则指针应该指向 null。

——等一下，不对啊，这个节点不是明明已经被删除了吗？

所以，内存泄漏就发生了啊。

当你引用的 DOM 节点后，该节点就占据了一块内存。接着，即便你删除了该节点，对于该节点的引用并没有消失，垃圾回收机制从 root 出发后，依旧能够到达该节点。因此该节点占据的内存不会被释放，它也会一直存在于内存中，引发内存泄漏。

## 闭包

不知道闭包是什么的小伙伴可以参考这篇文章：[闭包](/zh/js-basics/closure.md)

以下是一段关于闭包导致内存泄漏的代码。

```javascript
var theThing = null; 
var replaceThing = function () {
  var originalThing = theThing; 
  var unused = function () { 
    if (originalThing) 
      console.log("hi"); 
  }; 
  
  theThing = { 
    longStr: new Array(1000000).join('*'), 
    someMethod: function () { 
      console.log(someMessage); 
    } 
  }; 
}; 

setInterval(replaceThing, 1000); 
```

可能很多小伙伴都没看懂。于是我来讲解一下。

每隔一秒，就会发生如下的事情：

1. originalThing 指向 theThing
2. 分配内存给 unused，unused 存了 originalThing 的引用
3. 分配内存给 theThing，theThing 指向这片新的内存

**我们先来看看，如果把第二步去掉，会发生什么？**

1. originalThing 指向 theThing
2. 分配内存给 theThing，theThing 指向这片新的内存
3. 出函数作用域，本地变量 originalThing 被删除，其指向的内存无法抵达，因此该内存被删除
4. theThing 是全局变量，其指向的内存一直可达，因此该内存不会被删除
5. 内存泄漏没有发生（假设接下来还要用到 theThing）

<span v-red>**一切看起来很正常是吧。那么如果加上第二步呢？**</span>

1. originalThing 指向 theThing
2. 分配内存给 unused，unused 需要用到 originalThing 的引用
3. 分配内存给 theThing，theThing 指向这片新的内存
4. 出函数作用域，本地变量 originalThing…… 本来应该被删除，但是这里并没有，因为在这个时候 unused 所指向的内存还没有被删除，而 unused 包含了对 originalThing 的引用，因此垃圾收集器其实可以抵达 originalThing，因此其内存不会被删除
5. 出函数作用域，本地变量 unused 被删除，其指向的内存无法抵达，因此该内存被删除
5. theThing 是全局变量，其指向的内存一直可达，因此该内存不会被删除
6. 内存泄漏发生了，泄露的就是 originalThing 指向的内存

**那么，解决方法呢？**

既然 originalThing 指向的内存泄漏。

那么在 replaceThing 的底部，把 originalThing 指向 null，不就行了。

## 参考资料

这玩意儿贼搞笑，下面两个链接本质上是同一篇文章。

英文的是2016年写的，中文的则是2018年写的。

如果你仔细看了两篇文章的内容，你会发现，中文的就是对英文的翻译而已。

然后这哥们还敢写自己是原创，忒不道德了。

[4 Types of Memory Leaks in JavaScript and How to Get Rid Of Them](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)

[JavaScript内存泄露的4种方式及如何避免](https://blog.csdn.net/qappleh/article/details/80337630)

<Disqus />