---
tags: ['JS基础', '面试问题 - JS']
date: 11.14.2019
image: /images/call-intro.png
description: 讲一下 call、apply 和 bind
---

# call，apply，bind

> Posted: 11.13.2019

<Tag />

## 介绍

我们都知道 JS 的 this 指向……很迷。

尤其是在普通函数和箭头函数同时出现的时候。

而 call/apply/bind 三剑客就能够改变 this 的指向。

## call / apply

call 和 apply 是同一类型的，都在 `Function.prototype` 上。

call 的话，`function.call(thisArg, arg1, arg2, ...)`，第一个参数是 this，之后是要执行的函数的参数。

apply 的话，`function.apply(thisArg, [argsArray])`，第一个参数也是 this，之后是一个包含了执行函数参数的数组。

call 和 apply 唯一的区别就是第二个参数了，别的其实都一样。

本来的话，一个对象调用函数的时候，this 会指向调用函数的对象。举个🌰：

```javascript
Array.prototype.back = function () {
  // 这里的 this 就指向了调用 back 函数的数组
  return this[this.length - 1];
}

const arr = [1, 2, 3];
console.log(arr.back()); // 会打印 3
```

如果我们用 call/apply 绑定了一个新的数组，那么 this 就会指向那个新的数组。

```javascript
const arr2 = [4, 5, 6];
console.log(Array.prototype.back.call(arr2)); // 会打印 6
console.log(Array.prototype.back.apply(arr2)); // 会打印 6
```

在上面的例子里，this 指向了 arr2。

## bind

bind 的定义如下：`function.bind(thisArg[, arg1[, arg2[, ...]]])`。

bind 和 call 以及 apply 不太一样。

call 和 apply 都是在指定的 this 环境下执行函数。

但 bind 会返回一个绑定了指定 this 的函数，并不会立即执行函数。

```javascript
var obj = {
  name: "lynch",
  length: 18
};

function test(sex, duration) {
  console.log(this.name, this.length, sex, duration);
}

// 这里返回了一个新的函数 mytest
const mytest = test.bind(obj);
// 会打印 lynch 18 male 30min
mytest("male", "30min");

// 在这里，返回的新的函数绑定了 test 的第一个参数
const mytestWithParam = test.bind(obj, "male");
// 会打印 lynch 18 male 30min
mytestWithParam("30min");
```

bind 一个典型的用例就是 React。可以参考这这篇文章：[为什么 React 需要 bind this](/js-frameworks/react-bind.md)

## 手动实现 call

首先来观察一下 call 的参数：`function.call(thisArg, arg1, arg2, ...)`

第一个是 this，剩下可能有无数个参数。

```javascript
Function.prototype.mycall = function(obj) {
  /**
   * 得到所有参数
   * 因为 arguments 是伪数组，所以 slice 需要用 call
   */
  var args = Array.prototype.slice.call(arguments, 1);
  /**
   * 目前，this 指向的便是调用 mycall 的函数本身
   * 建立一个暂时的fn，用来存储 this，并且用它来执行 this 这个函数
   */
  obj.fn = this;
  obj.fn(...args);
  // 删除对象的属性
  delete obj.fn;
};
```

测试一下看看：

```javascript
var obj = {
  name: "lynch",
  length: 18
};

function test(sex, duration) {
  console.log(this.name, this.length, sex, duration);
}

test.mycall(obj, "male", "30min"); // lynch 18 male 30min
```

## 手动实现 apply

实现 apply 和实现 call 的思路是一样的，但是 call 和 apply 的参数不太一样。

apply 的第二个参数是一个数组：`function.apply(thisArg, [argsArray])`。

```javascript
Function.prototype.myapply = function(obj, arr) {
  // 建立一个暂时的fn，用来存储 this，并且用它来执行 this 这个函数
  obj.fn = this;
  // 检查第二个参数是否被传进来了
  if (!arr) {
    obj.fn();
  } else {
    obj.fn(...arr);
  }
  // 删除对象的属性
  delete obj.fn;
};
```

最后测试的结果如下：

```javascript
var obj = {
  name: "lynch",
  length: 18
};

function test(sex, duration) {
  console.log(this.name, this.length, sex, duration);
}

test.myapply(obj, "male", "30min"); // lynch 18 male 30min
```

## 手动实现 bind

最终要实现的效果：`const mytest = test.bind(obj, sex, duration)`。

```javascript
Function.prototype.mybind = function(oThis) {
  // 检查绑定的对象是否是函数，不是的话throw TypeError
  if (typeof this !== "function") {
    throw new TypeError("Can only bind to functions!");
  }

  /**
   * var foo = function.mybind(this, time, num, people);
   * 1. args 包含了调用 foo 时所需要传进去的参数（因为是类数组所以不能直接用slice）
   *    调用的时候就像这样：foo(...args) = foo(time, num, people)
   * 2. fToBind 就是 function to bind，也就是需要被绑定的函数
   * 3. fNOP 是中转函数，下面会提到
   * 3. fBound 是最终要绑定到的函数，因为最终要返回一个函数，所以 fBound 是一个函数
   */
  var args = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function() {},
    fBound = function() {
      // 返回一个函数
      return fToBind.apply(
        /**
         * apply 的第一个参数
         * this instanceof fBound 的目的就是检查 this 是不是最终需要绑定到的函数的实例
         * 如果是的话，就相当于在执行构造函数：const xxx = new fBound()，需要绑定的就是 fBound 的实例
         * 如果不是的话，就相当于在执行普通的函数：fBound()，因此需要绑定传入的参数
         */
        this instanceof fBound ? this : oThis,
        /**
         * 这里 arguments 是这个返回函数执行的时候传递的一系列参数
         * 所以是从第一个参数开始，只有两者合并了之后才是返回函数的完整参数
         * 在上个部分的 bind 的例子里，我一开始绑定了一个参数，然后再传递另一个参数
         * 这两个参数合起来，形成一个数组，然后作为 apply 的第二个参数
         */
        args.concat(Array.prototype.slice.call(arguments, 0))
      );
    };

  /**
   * 因为被 new 了以后要继承原型链上的方法，所以需要 fNOP 这个中转函数
   * 目的是把 this 上面的原型链给继承下来
   * 在这一步后，fNOP 的 prototype 指向了需要绑定的函数的 prototype
   */
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }

  /**
   * 下行的代码将 fBound.prototype 指向了 fNOP 的实例
   * 因此，fBound.prototype.__proto___ = this.prototype
   * 最简单的原型链继承，fBound 的实例可以获取到 this.prototype 的方法和属性
   */
  fBound.prototype = new fNOP();
  return fBound;
};
```

## 参考资料

[原生实现call、apply方法](https://blog.csdn.net/smallsun_229/article/details/80721758)

[Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

[javascript原生一步步实现bind分析](https://segmentfault.com/a/1190000007342882)

[This is why we need to bind event handlers in Class Components in React](https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/)

<Disqus />