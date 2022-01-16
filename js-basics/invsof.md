---
tags: ['ES6', '面试问题 - JS']
date: 11.09.2019
image: /images/invsof-intro.jpg
description: 讲一下 for...in 与 for...of 之间的区别
---

# for...in vs. for...of

> Posted: 11.09.2019

<Tag />

## 介绍

讲道理这其实不是面试题啊，因为一般不会有面试官直接问 for...in 和 for...of 之间的区别。

但是你写码的时候，总会用到循环吧？当你用了个 for...of，面试官顺便问你和 for...in 有啥区别。

你如果不会的话，岂不是倒闭了？尤其是 for..in 和 for...of 差别还挺大的。

而且 for...of 还是 ES6 的特性，是有必要掌握的。

## for...in

for...in 是 ES5 的写法。

它返回的是，对象中以及原型链上，可枚举的 key。

这么说可能有点迷，所以直接来看🌰：

```javascript
const obj = {
  '0': 'a',
  1: 'b',
  key: 'value'
}

for (const key in obj) {
  console.log(key);
}
```

由于 for...in 返回的是 key，大家应该猜到了会返回什么东西了吧？

答案是：

![for..in](/images/for-in.png)

也就是说，如果我们需要的是值，我们需要这么写：

```javascript
for (const key in obj) {
  console.log(obj[key]);
}
```

结果如下：

![for..in-value](/images/for-in-val.png)

那么问题来了，什么是 `可枚举` 的 key？

字面意思。

举个🌰，我们都知道数组有一个属性名叫 length，但我们使用 for 循环的时候，从来没有获得过这个属性对吧？

那是因为 length 这个属性默认是不可枚举的，因此无法进行枚举。

废话不多说了，直接看例子：

```javascript
const obj = {
  '0': 'a',
  1: 'b',
  key: 'value'
}

// 可以枚举
obj.name = 'lynch';
// 可以枚举
obj.__proto__.length = 18;
// 可以枚举
Object.prototype.color = function () { return 'red' };
// 不可枚举
Object.defineProperty(obj, 'no', {
  value: 'not enumerable',
  enumerable: false
});

for (const key in obj) {
  console.log(key);
}
```

猜一下结果是怎样的？如下：

![for-in-all](/images/for-in-all.png)

很显然，no 这个属性是不可枚举的，因此无法被 for...in 获取到。

可为什么 for...in 能够获取到定义在 \_\_proto\_\_ 和 prototype 原型链上的属性？

（\_\_proto\_\_ 和 prototype 指向同一个对象，可以参考我的这篇文章：[prototype 和 __proto__ 的区别](/js-basics/prototype.md)）

很简单，那是因为我们新添加的属性是可枚举的。

不对啊？prototype 上那么多属性和方法，我们都不能获取，但是自定义却可以获取？

是的，这是因为 prototype 上默认的方法都是无法枚举的。

MDN 上是这么说的：

![mdn-for-in](/images/mdn-for-in.png)

举个小例子：

```javascript
const result = Object.prototype.propertyIsEnumerable.call({}, 'defineProperty');
console.log(result); // 会打印 false
```

## for...of

for...of 和 for...in 完全不一样。

for...of 返回的是 `可迭代` 的对象的属性的值。

注意了，这里的 `可迭代` 与上面提到的 `可枚举` 是不一样的。

MDN 是这么说的：

![mdn-for-of](/images/mdn-for-of.png)

我们可以看见，能够迭代的数据结构，基本上就是数组与类数组。

也就是说，我们是无法用 for...of 去迭代一个普通对象的。

如果我们尝试用 for...of 去迭代上面的 obj，会报错：

![for-of-err](/images/for-of-err.png)

但是我们可以迭代一个 Set 对象：

```javascript
const set = new Set([1, 2, 3]);
for (const value of set) {
  console.log(value);
}
```

结果如下：

![for-of-set](/images/for-of-set.png)

那么问题来了，究竟什么是 `可迭代` 的呢？

ES6 引入了迭代器（Iterator）。

如果学过 C++/Java 之类的语言，应该会对迭代器很熟悉。

这里就不详细讲了，具体的请见：[迭代器](/js-basics/iterator.md)

总之，ES6 引入了迭代器，而 for...of 就是基于迭代器的。

对于 for...of，大家需要记住的是如下的情况：

```javascript
const arr = [1, 2];
// 可迭代
arr['2'] = 3;
// 不可迭代
arr.color = "yellow";
// 不可迭代
arr.__proto__.name = 'lynch';
// 不可迭代
Array.prototype.hello = function () { return 'hello'; }
for (const value of arr) {
  console.log(value);
}
```

由于新添加的属性是不可迭代的，因此 for...of 不会打印出来。

最终的结果如下：

![for-of-set](/images/for-of-set.png)

## Bonus: forEach

那么问题来了，如果是数组的 forEach 方法呢？

```javascript
const arr = [1, 2];
// 可迭代
arr['2'] = 3;
// 不可迭代
arr.color = "yellow";
// 不可迭代
arr.__proto__.name = 'lynch';
// 不可迭代
Array.prototype.hello = function () { return 'hello'; }
arr.forEach(item => console.log(item));
```

结果如下：

![for-of-set](/images/for-of-set.png)

由此可见，数组的 forEach 方法也只会考虑可以迭代的属性。

## 参考资料

[Iterators and Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)

[Object.prototype.propertyIsEnumerable()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)

[for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

<Chirpy />