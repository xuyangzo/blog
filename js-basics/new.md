---
tags: ['JS基础', '面试问题 - JS']
date: 09.23.2019
image: /images/new-intro.jpeg
description: 理解 new 关键词到底干了什么还是挺重要的
---

# new 关键词到底做了什么

> Posted: 09.23.2019

<Tag />

## 问题描述

在如下的代码中，其背后运行的原理是什么？

```javascript
var a = new B();
```

## 创建空对象

创建一个空对象 a

```javascript
var a = {};
```

## 继承 prototype

把 a 的 \_\_proto\_\_ 设置成 B 的 prototype

```javascript
a.__proto__ = B.prototype;
```

## 调用构造函数

调用 B's constructor，并主动让 `this` 指向 a

```javascript
B.call(a);
// 等同于: B.prototype.constructor.call(a);
```

## 整体来看

```javascript
function B () {
  this.name = 'lynch';
}

// var a = new B();
var a = {};
a.__proto__ = B.prototype;
B.call(a); 
// 等同于: B.prototype.constructor.call(a);

// 会打印：B {name: "lynch"}
console.log(a);
```

## 参考资料

[js中的new()到底做了些什么？](https://www.cnblogs.com/faith3/p/6209741.html)

<Chirpy />