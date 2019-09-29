---
tags: ['JS基础', '面试问题 - JS']
---

# 对象深拷贝

> Posted: 09.28.2019

<Tag />

## 介绍

我们知道 JS 的数据类型分为两类。

1. 基本数据类型：存储在栈内存中
2. 引用数据类型：栈内存中存储一个指针，该指针指向堆内存中的 buffer，而这 buffer 存储的就是该对象的内容（值）

因此，当我们复制一个对象的时候，我们复制的其实是该对象指针所指的地址。

```javascript
const obj = {
  a: 1
}
console.log(obj.a); // 1

const copy = obj;
copy.a = 2;
console.log(obj.a); // 2
```

因此，我们经常会用到深拷贝。

## 使用 JSON 的方法

- 该方法效率贼低，如果可以的话，不要用来做深拷贝
- 该方法限制贼大，并非对所有对象都适用
  - Undefined、Function、Symbol，这三种类型的数据并不是合法的 JSON 数据，因此在 JSON.stringify 无法正确地转换它们
  - 如果在 Object 中发现这三种数据，则会直接忽视
  - 如果在 Array 中发现这三种数据，则会将它们转换成 null。

```javascript
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 测试
const obj = {
  a: ['test', 1],
  b: {
    color: 'blue'
  },
  greet: function () {
    console.log('hello!');
  },
  nothing: null,
  noone: undefined,
  symbol: Symbol()
}

// 会打印 { a: [ 'test', 1 ], b: { color: 'blue' }, nothing: null }
console.log(deepCopy(obj));
```

## Object.assign

- 该方法效率很高，而且对于所有对象都适用，基本上可以无脑用
- 但还是有个问题，那就是无法获取到不可枚举的属性

```javascript
function deepCopy(obj) {
  // 如果是 Array 的话，需要用 []
  if (Array.isArray(obj)) {
    return Object.assign([], obj);
  }
	return Object.assign({}, obj);
}

// 测试
const obj = {
  a: ['test', 1],
  b: {
    color: 'blue'
  },
  greet: function () {
    console.log('hello!');
  },
  nothing: null,
  noone: undefined,
  symbol: Symbol()
}
Object.defineProperty(obj, 'readonly', { value: 'fuckyou', enumerable: false });

/**
 * 会打印：
 * { a: [ 'test', 1 ],
 * b: { color: 'blue' },
 * greet: [Function: greet],
 * nothing: null,
 * noone: undefined,
 * symbol: Symbol() }
 */
console.log(deepCopy(obj));
console.log(deepCopy(obj).readonly); // 会打印 undefined
```

## 手动实现

没办法，有的面试官就会叫你手动写。那就写吧。

为了解决上面那位老哥的问题，需要用一些特殊的手段。

```javascript
function deepCopy(obj) {
  const obj2 = {};

  // 该方法可以获取到所有属性，包括不可枚举的属性
  Object.getOwnPropertyNames(obj).forEach(key => {
    // 如果该子元素是对象，递归使用深拷贝
    if (typeof key === 'object') {
      // 如果该属性是不可枚举的，把他设置成不可枚举的属性
      if (!obj.propertyIsEnumerable(key)) {
        Object.defineProperty(obj2, key, { value: deepCopy(obj[key]), enumerable: false });
      } else {
        obj2[key] = deepCopy(obj[key]);
      }
    } else {
      // 如果该子元素不是对象，直接浅拷贝
      // 如果该属性是不可枚举的，把他设置成不可枚举的属性
      if (!obj.propertyIsEnumerable(key)) {
        Object.defineProperty(obj2, key, { value: obj[key], enumerable: false });
      } else {
        obj2[key] = obj[key];
      }
    }
  });

  return obj2;
}

// 测试
const obj = {
  a: ['test', 1],
  b: {
    color: 'blue'
  },
  greet: function () {
    console.log('hello!');
  },
  nothing: null,
  noone: undefined,
  symbol: Symbol()
}
// readonly 属性是不可枚举的
Object.defineProperty(obj, 'readonly', { value: 'fuckyou', enumerable: false });

/**
 * 会打印：
 * { a: [ 'test', 1 ],
 * b: { color: 'blue' },
 * greet: [Function: greet],
 * nothing: null,
 * noone: undefined,
 * symbol: Symbol() }
 */
console.log(deepCopy(obj));
console.log(deepCopy(obj).readonly); // 会打印 fuckyou
```

<Disqus />