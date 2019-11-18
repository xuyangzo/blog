---
tags: ['JS基础', '面试问题 - JS']
date: 09.21.2019
image: /images/type-intro.png
description: sb 才用 ==，但你好歹得会 == 的原理吧
---

# 类型比较

> Posted: 09.21.2019

<Tag />

## JS类型

这篇文章不是关于JS类型的细节的，所以只会简单地涉及到JS的类型。 

更多关于JS类型的内容，可以参考：[JS类型详解](/js-basics/moreTypes.md)


### 基本类型

> 基本类型的对象是无法更改的。它们可以被替换，但是无法被更改

- String
- Number
- Boolean
- Undefined
- Null
- Symbol

1. 所有基本类型的对象都有 `valueOf` 方法，该方法会返回它的 primitive value
2. 所有基本类型的对象都有 `toString` 方法，该方法会返回一个指定了其 value(类型)的字符串

```javascript
'test'.valueOf(); // returns 'test'
'test'.toString(); // returns 'test'
```

### 引用类型

> 引用类型的对象式可以更改的

JS只有一种引用类型: `Object`

数组是Object, 函数是Object  
任何JS的类型都可以被认为是Object

1. 所有对象都有 `toString` 方法，但只有基本类型的对象有 `valueOf` 方法
2. 所有对象的指针都存在栈内存中，其指向的 value 则是存在堆内容中

```javascript
const obj = {
  a: 'hello',
  b: 'test'
}
obj.toString(); // prints '[object Object]'
```

```javascript
function say() { console.log('yeah'); }
/**
 * prints same function: 
 * function say() { console.log('yeah'); }
 */
say.toString();
```

## `==` vs. `===`

### 比较符号 `==`

1. 将左侧与右侧的内容转换成相同类型的 value
2. 调用 `valueOf` 方法，然后比较两侧的 value

### 比较符号 `===`

1. 首先比较两者的类型（对于对象来说，比较它们的地址）
2. 执行 `==`

## `==` 中的类型转换

JS `==` 导致的类型转换，有5条原则：

1. 如果有一侧是 Boolean，将其转换为： true -> 1/false -> 0
2. 如果有一侧是 String， 另一侧是Number，将 String 转换为 Number（调用 `Number(str)`）
3. 如果有一侧是 Object，另一侧不是，那么调用 `Object.prototype.valueOf`。如果该对象没有 valueOf 方法（不是基本类型），调用 `Object.prototype.toString` 方法
4. 如果两侧都是 Object，那么比较它们的地址
5. NaN 和任何数据比较(用 == 或者 === 比较)，都会返回 false，甚至和它自己比较也是

## 例子

```javascript
// rule 1
console.log(1 == true); // true
console.log(0 == false); // true
console.log(-1 == false); // true
```

```javascript
// rule 2
console.log(1 == '1'); // true
console.log(2 == '1'); // false
console.log(1 == '1test'); // false
```

```javascript
// rule 3
console.log(new Number(1) == 1); // true
console.log({ a: 1 } == '[object Object]'); // true
console.log({ a: 1 } == '{a:1}'); // false
```

```javascript
// rule 4
const obj = { a: 1 };
const temp = obj;
obj.a = 2;
console.log(obj == temp); // true
console.log(obj == { a: 2 }); // false
```

```javascript
// complex examples

/**
 * 前提：非 == 比较下的类型转换
 */
if ([]) { /* will execute */ } 
if ({}) { /* will execute */ } 

/**
 * 1. rule 1: false -> 1, equation becomes: '' == 0
 * 2. rule 4: [].toString() -> '', equation becomes: '' == 0
 * 3. rule 2: Number('') -> 0, equation becomes 0 == 0
 */
console.log([] == false); // true

/**
 * 1. rule 1: false -> 0, equation becomes: {} == 0
 * 2. rule 4: {}.toString() -> '[object Object]', equation becomes: '[object Object]' == 0
 * 3. rule 2: Number('[object Object]') -> NaN, equation becomes NaN == 0
 * 4. rule 5: Always false
 */
console.log({} == true); // false
console.log({} == false); // false

/**
 * 1. Premise: [] -> true, equation becomes: [] == !true
 * 2. Not Sign: !true -> false, equation becomes: [] == false
 * 3. rule 1: false -> 0, equation becomes: [] == 0
 * 4. rule 4: [].toString() -> '', equation becomes: '' == 0
 * 5. rule 2: Number('') -> 0, equation becomes 0 == 0
 */
console.log([] == ![]); // true

/**
 * 1. Premise: {} -> true, equation becomes: {} == !true
 * 2. Not Sign: !true -> false, equation becomes: {} == false
 * 3. rule 1: false -> 0, equation becomes: {} == 0
 * 4. rule 4: {}.toString() -> '[object Object]', equation becomes: '[object Object]' == 0
 * 5. rule 2: Number('[object Object]') -> NaN, equation becomes NaN == 0
 * 6. rule 5: Always false
 */
console.log({} == !{}); // false
```

## 参考资料

[为什么 \[\] 是 false 而 !!\[\] 是 true](https://www.h5jun.com/post/why-false-why-true.html)

<Disqus />