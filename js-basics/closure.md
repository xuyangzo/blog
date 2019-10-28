---
tags: ['JS基础', '面试问题 - JS']
---

# 闭包

> Posted: 10.11.2019

<Tag />

## 定义

那么问题来了，什么是闭包？

我们现在给一个定义：<span v-red>**闭包就是能够读取其他函数内部变量的函数**</span>。

等等，这是什么意思？别急，往下看。

## 为什么要用闭包？

我们知道 JS 有函数作用域。

函数作用域就相当于是一个闭合的盒子。

函数作用域外的作用域，无法获取函数作用域内的本地变量。

举个🌰：

```javascript
function test() {
  var a = 'sb';
}

// 这里不会打印 undefined，而是直接报错
console.log(a); 
```

那么，我们如果想要获取到 a，就得用一些特殊的手段。

这个手段就是：**闭包**。

## 闭包究竟是什么？

所以，闭包究竟是什么呢？

废话不多说，直接来一个🌰：

```javascript
function test() {
  var a = 'sb';

  /**
   * 这里不一定需要返回匿名函数
   * 可以先声明一个普通的函数
   * 然后再返回那个函数
   */
  return function() {
    console.log(a);
  }
}

var hasA = test();
hasA(); // 会打印 sb
```

在这里，我们因为没有办法拿到 a，所以返回了一个能拿到 a 的函数。

这就是闭包。

## 深入一点

<span v-line>标题并没有在搞黄色</span>

在上面的代码中，我们成功打印出了 a。

这说明什么？

说明 a 还保存在内存中，没有被垃圾处理器给清除掉。

然而，在出函数作用域的时候，本地变量应该是被销毁的。

因此，通过闭包，我们其实实现了这么一个功能：<span v-red>**本地变量持久化（让本地变量停留在内存中）**</span>

因为当垃圾处理器从 root 出发，到达 hasA，发现 hasA 有对 a 的引用，因此不会释放 a 的内存。

那么怎么证明 a 一直停留在内存中呢？

我们反复调用 hasA，然后看看结果。

![hasA](/hasa.png)

我们可以看见 sb 一直在被打印，这就说明 a 一直停留在内存中。

但这不是我们想要的好吧！！！因为我们只想打印一次，打印完就跑路。

### 解决闭包的内存泄漏问题

解决这个问题的方法也很简单。

我们知道出函数作用域的时候，本地变量会被销毁。

于是，我们只需要在闭包外套一层立即执行函数就行了。

```javascript
function test() {
  var a = 'sb';

  function sb() {
    console.log(a);
  }
  return sb;
}

(function() {
  var hasA = test();
  hasA(); // 会打印 sb
}());

// 这里会报错
hasA();
```

之所以之前 a 会停留在内存中，你可以认为整个脚本就是一个函数。

内存中的 a 只会在脚本执行完毕后被释放。

而这里通过立即执行函数，我们在出函数作用域的时候，垃圾处理器从 root 出发，无法达到 hasA，因此 hasA 以及它所引用的 a 都会被释放。

## 再深入一点

<span v-line>标题真没有在搞黄色</span>

那么问题来了，闭包所获取的 a，是引用吗？

我们先看下面这个🌰：

```javascript
function test() {
  var a = 'sb';

  function sb() {
    a = 'my name is sb';
  }
  return [sb, a];
}

const [hasA, a] = test();
console.log(a); // 打印 sb
hasA();
console.log(a); // 打印 sb
```

这里 a 是基本类型，返回的自然是 copy，因此两次打印的都是 sb。

那么，如果 a 是引用类型呢？

```javascript
function test() {
  var a = { name: 'sb' }

  function sb() {
    a.name = 'not sb';
  }
  return [sb, a];
}

const [hasA, a] = test();
console.log(a);
hasA();
console.log(a);
```

打印的结果如下：

![closure-2](/closure-2.png)

发现了吧，hasA 获取的，是对 a 的引用。

所以，使用闭包的时候一定要谨慎。（虽然你有可能干一辈子都不会出现这种情况）

## 参考资料

[深入理解JS闭包](https://www.cnblogs.com/duanlianjiang/p/5036671.html)

<Disqus />


