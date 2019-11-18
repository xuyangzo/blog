---
tags: ['JS基础', '面试问题 - JS']
date: 09.22.2019
image: /images/es6-intro.jpeg
description: 开始了，JavaScript 从入门到放弃
---

# this 关键词的指向

> Posted: 09.22.2019

<Tag />

## this 的指向

`this` 指向：包含它的函数，作为方法被调用时，所属的对象

1. 全局环境：`this` 指向全局对象（例如，浏览器中的 `window` 对象）
2. 对象环境：`this` 指向对象本身, 在 \_\_proto\_\_ chain（原型链）中也是如此
3. 构造函数环境：`this` 指向被生成的实例
4. DOM 事件：`this` 指向触发事件的 DOM 元素本身
5. 多层嵌套的对象：`this` 指向该方法被调用时，最近的包含它的对象
6. 箭头函数：`this` 继承了其 parent 的 scope

## 全局环境

```javascript
console.log(this); // 浏览器环境下，会打印 window 对象
console.log(this); // Node 环境下，会打印空对象 {}

function callThis() {
  console.log(this);
}
callThis(); // 浏览器环境下，会打印 window 对象

function callThis() {
  console.log(this);
}
callThis(); // Node 环境下，会打印 global 对象
```

## 对象环境

```javascript
const a = { 
  test: function() {
    console.log(this);
  }
};
// 在浏览器与 Node 环境下，会打印对象 a
a.test();
/**
 * 在下面这个例子中，this的指向会改变
 * 浏览器环境下，会打印 window 对象
 * Node 环境下，会打印 global 对象
 */
const b = a.test;
b();
```

## 构造函数环境

```javascript
function Log() {
  console.log(this);
}
// 在浏览器与 Node 环境下，会打印对象 Log
const log = new Log();
/**
 * 与之相对的，在全局环境下：
 * 浏览器环境下，会打印 window 对象
 * Node 环境下，会打印 global 对象
 */
Log();
```

## DOM 事件环境

```javascript
element.addEventListener('click', function() {
  console.log(this); // 会打印 element 对象
});
```

## 多层嵌套的对象环境

```javascript
const c = {
  a: {
    test: function() {
      console.log(this);
    }
  },
  test2: function() {
    console.log(this);
  }
}

c.a.test(); // 会打印 c.a 对象
c.test2(); // 会打印 c 对象
```

## 箭头函数环境

```javascript
const d = {
  test: () => {
    console.log(this);
  },
  a: {
    test2: () => {
      console.log(this);
    }
  },
  b: () => {
    this.test3 = () => { 
      console.log(this);
    }
    return this;
  },
  c: function () {
    this.test4 = () => {
      console.log(this);
    }
    return this;
  }
}
// 在浏览器与 Node 环境下，分别打印 window 对象和 {}
d.test();
// 在浏览器与 Node 环境下，分别打印 window 对象和 {}
d.a.test2();
// 在浏览器与 Node 环境下，分别打印 window 对象和 { test3: [Function] }
d.b().test3();
// 在浏览器与 Node 环境下，都会打印对象 d
d.c().test4();
```

## 面试中的例子

```javascript
let a = {
  b: function() {
    console.log(this);
  },
  c: () => {
    console.log(this);
  }
};

a.b(); // 会打印对象 a
a.c(); // 在浏览器与 Node 环境下，分别打印 window 对象和 {}
let d = a.b;
d(); // 在浏览器与 Node 环境下，分别打印 window 对象和 global 对象
```

<Disqus />