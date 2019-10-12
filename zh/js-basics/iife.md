---
tags: ['JS基础', '面试问题 - JS']
---

# 立即执行函数

> Posted: 10.12.2019

<Tag />

## 背景知识

### 函数声明 vs. 函数表达式

我们先来看一下函数声明与函数表达式的不同。

```javascript
function test() {
  console.log('函数声明');
}

var test2 = function() {
  console.log('函数表达式');
}
```

### 匿名函数

那么，接下来的问题是，什么是匿名函数？

```javascript
function() {
  console.log('匿名函数');
}
```

如果你按照上面那个方式直接声明函数，会报错。为什么？

因为在你声明一个函数后，系统会分配一块内存给这个函数。如果你没有指明函数的名字，那么你怎么获取到这块内存？你根本没有办法获取这块内存，那么就是说会发生内存泄漏。当然，JS 的编译器会阻止这一切发生，因此你在这么做的时候就会报错。

再看上面的函数表达式。这玩意儿先是声明了一个匿名函数，然后赋值给 test2。这样，test2 就指向了这块分配给匿名函数的内存，这样你就有办法到达这块内存，就不会发生内存泄漏。

### 表达式 vs. 语句

其实就是 expression 和 statement 的区别。

我不太清楚中文的翻译是什么，就自己翻译成了表达式和语句。

- expression：形成了一个值
- statement：干了一件事

这么看可能会有些迷，所以废话不多说，直接看🌰：

```javascript
// expression
Math.pow(10, 2) + parseInt('123', 10) > 223 ? 'greater' : 'smaller';

// statement
var a = Math.pow(10, 2) + parseInt('123', 10) > 223 ? 'greater' : 'smaller';
console.log(a); // 打印 smaller
```

看第一行，噼里啪啦地干了一大堆事，最终得到了什么？

最终得到了一个值：一个字符串 'smaller'。

可是这个值用来干嘛了呢？什么都没干。

是的，你只得到了一个值，别的什么都没干。

这就是 expression。每个 expression 都是一个值。

那么要怎么利用这个值呢？这个时候就需要 statement。

statement 干了一件事。在上面的🌰里，statement 就干了<span v-red>**赋值**</span>这件事。

= 的右边是一个 expression，这个 expression 形成了一个字符串。= 则是把这个字符串赋值给了变量 a。

而且 statement 本身就是一个完整的 statement，无法再与别的 statement 结合在一起。

比如说，你无法这么做：`console.log(var a = 123);`。

### 总结

讲到这里，背景知识已经补充得差不多了。

接下来我们就来看一下立即执行函数的定义。

## 立即执行函数的定义

立即执行函数就是一个立即执行的函数。<span v-line>废话</span>

我们知道，一般的函数被执行，要经历两个步骤：声明函数（statement） -> 调用函数（statement）。

这意味着什么？你在声明函数后，无法在同一时间直接调用，因为声明函数本身就是一个 statement，你无法再同时执行另一个 statement 来调用。

而函数表达式被执行，则是要经历三个步骤：声明匿名函数（expression） -> 赋值变量（statement）--> 变量（expression） -> 调用变量（statement）。

而在函数表达式里，我们调用变量时，变量本身是一个 expression，因此是合法的。

所以你明白立即执行函数的核心是什么了吗？

那就是：<span v-red>**将匿名函数转化为函数表达式**</span>

## 立即执行函数的形式

立即执行函数的形式很多，但一般用的话，也就一两种。

在匿名函数前面加！、+、 -甚至是逗号等到都可以起到函数定义后立即执行的效果。

而（）、！、+、-、= 等运算符， 都将匿名函数转换成函数表达式。

转化为函数表达式后，这个值就是一个 expression，可以通过（）来直接调用

```javascript
(function(a){
	console.log(a);
})(123);

// 最合适的形式，一般用这个
(function(a){
	console.log(a);
}(1234));

!function(a){
	console.log(a);
}(12345);

+function(a){
	console.log(a);
}(123456);

-function(a){
	console.log(a);
}(1234567);

/**
 * 为什么这个例子是合法的？它难道不是进行了赋值吗？
 * 已经执行了一个 statement？为什么还能同时执行另一个？
 * 因为 = 这个符号将匿名函数转化成了函数表达式，
 * 然后函数表达式被调用，执行，因为没有返回值，所以返回 undefined
 * 赋值是最后执行的。这个时候，等号右边不是一个 statement，
 * 而是一个 expression（undefined），因此赋值是合法的，编译器不会报错
 */
var fn = function(a){
  console.log(a);
}(12345678)
console.log(fn); // 会打印 undefined

// 通过下面的代码，我们可以很轻易地证明上面的猜想
var fn2 = function(a){
  console.log(a);
  return a;
}(12345678)
console.log(fn2); // 会打印 12345678
```

## 为什么要用立即执行函数？

简单来说就五个字：<span v-red>**作用域隔离**</span>

我们知道 JS 有函数作用域，出函数作用域的时候，本地变量会被销毁。

这个时候，函数作用域外的作用域，是无法获取到函数作用域内的本地变量的。

这就是使用立即执行函数的目的：我们在立即执行函数之外，不想获取立即执行函数之内的变量。

就比如说 jQuery。jQuery 这个库在外面套了一层立即执行函数。这样当你调用 jQuery 的时候，其本地的变量不会对你自己添加的变量形成任何干扰，因为你无法在函数作用域外获取到函数作用域内的变量。

此时若是想访问全局对象，将全局对象以参数形式传进去即可

## 参考资料

[深入理解js立即执行函数](https://www.cnblogs.com/cnfxx/p/7337889.html)

<Disqus />