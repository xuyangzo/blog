---
tags: ['JS基础', '面试问题 - JS']
date: 09.21.2019
image: /array-intro.jpeg
description: 检查一个对象是否为数组是很场景的情景哦
---

# 检查一个对象是否为数组

> Posted: 09.21.2019

<Tag />

## 一些事实

1. 数组其实本质上就是对象
2. JS没有一种名叫 `Array` 的类型

## 检查对象是否为数组的方法

### Array.isArray

```javascript
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({ 1: 'x', 2: 'y' })); // false
```

### instanceof

```javascript
// 该方法会搜索 array 的 __proto__ chain（原型链），去寻找 Array.prototype
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
```

### constructor

```javascript
console.log([].constructor == Array); // true
console.log({}.constructor == Object); // true
console.log(''.constructor == String); // true
```

### Object.prototype.toString.call
```javascript
console.log(Object.prototype.toString.call([]) === '[object Array]'); // true
console.log([].toString() === '[object Array]'); // false
```

<Disqus />