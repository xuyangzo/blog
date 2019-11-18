---
tags: ['JS基础', '面试问题 - JS']
date: 09.23.2019
image: /images/prototype-intro.jpeg
description: 极少出现的面试题，但理解这玩意儿至关重要
---

# prototype 和 \_\_proto\_\_ 的区别

> Posted: 09.23.2019

<Tag />

## prototype

- `prototype` 是一个特殊的<span v-red>**指针**</span>，其指向了一个只有函数（Function）才具有的对象
- 当函数被声明时，该对象被创建
- `prototype` 包含了以下的对象：
  - 所有实例共享的属性和方法
  - `constructor` 对象：初始化实例的函数
  - `__proto__` 对象：下面会讲为啥 prototype 会包含了 \_\_proto\_\_

```javascript
function test() {
  this.name = 'lynch';
}
/**
 * 在这里，prototype 应该只包含了 constructor 和 __proto__
 * 图片是不准确的，具体原因请见最下方的解释
 */
console.log(test.prototype);

/**
 * 给 prototype 对象添加属性
 * prototype 在这里应该包含了 constructor， __proto__ 和 length
 */
test.prototype.length = 18;
console.log(test.prototype);

// 实例化
var a = new test();
/**
 * a 是 test 的实例，所以它没有 prototype
 * 这里会打印 undefined
 */
console.log(a.prototype);
/**
 * a.__proto__ = test.prototype
 * 这一点接下来在 __proto__ 里会讲
 */
console.log(a.__proto__);
```

<br />

最终的输出如下: 

![constructor](/images/constructor.png)

这张图里第一次打印的值其实是有问题的。  
可以参考这篇文章：[浏览器中console.log的打印问题](/js-basics/consolelog.md)

```javascript
var obj = { a: 1 };
// 会打印 undefined, 因为只有 Function 有 prototype
console.log(obj.prototype);
```

## \_\_proto\_\_

- `__proto__` 是一个特殊的<span v-red>**指针**</span>，每个对象都有 \_\_proto\_\_
  - `prototype` 本身是一个对象，所以它也会有 `__proto__` 这个属性
- 其所属的对象被创建时，\_\_proto\_\_ 也被创建
- 其默认值是一个指针，指向创建其的函数的 `prototype` 对象

```javascript
function test() {
  this.name = 'lynch';
}
// 会打印 test 它自己，而不是 test 的 prototype
console.log(test.__proto__);

var a = new test();
var b = new test();
// 会打印 test 的 prototype，因为它们指向相同的地址
console.log(a.__proto__);
// 会打印 true，因为它们指向相同的地址
console.log(test.prototype === a.__proto__);
// 会打印 true，因为它们指向相同的地址
console.log(test.prototype === b.__proto__);
// 会打印 true，因为它们指向相同的地址
console.log(a.__proto__ === b.__proto__);

/**
 * 如果我们更改了 a 的 __proto__，那么 b 的 __proto__ 也会改变
 * 因为它们指向相同的地址
 */
a.__proto__.length = 18;
console.log(b.__proto__);
```

<br />

这是最终的输出:

![__proto__](/images/proto.png)

## Reference

[js里的__proto__和prototype到底有什么区别？](https://www.jianshu.com/p/80bcf8b2004e)

[JS原型（显式原型+隐式原型）](https://www.jianshu.com/p/79f5549fa1e7)

<Disqus />
