---
tags: ['JS Basics', 'Interview Problems']
---

# Array-Like Object

> Posted: 09.25.2019

<Tag />

## Properties

1. The element is of type Object and is not empty
2. It has `length` property
3. The `length` property is a non-negative finite integer

If satisfies the above condition, then the object is an array-like object.

## Check Array-Like Object

> The function is written in Javascript: The Definitive Guide

The most significant idea is: regardless of other properties, the deterministic property is the **LENGTH**!!!

```javascript
// Determine if o is an array-like object.
// Strings and functions have numeric length properties, but are 
// excluded by the typeof test. In client-side JavaScript, DOM text
// nodes have a numeric length property, and may need to be excluded 
// with an additional o.nodeType != 3 test.
function isArrayLike(o) {
    if (o &&                                // o is not null, undefined, etc.
        typeof o === 'object' &&            // o is an object
        isFinite(o.length) &&               // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        o.length===Math.floor(o.length) &&  // o.length is an integer
        o.length < 4294967296)              // o.length < 2^32
        return true;                        // Then o is array-like
    else
        return false;                       // Otherwise it is not
}
```

## Check Function Examples

```javascript
const obj = {
  length: 0
}
console.log(isArrayLike(obj)); // true
```

```javascript
const obj2 = {
  test: 'ok',
  something: 1,
  length: 1
}
console.log(isArrayLike(obj2)); // true
```

```javascript
function arrayLike() {
  console.log(isArrayLike(arguments)); // true
}
arrayLike('test', 1, [-1, 0]);
```

## Typical Array-Like Object: Arguments

### Properties of `arguments`

`arguments` is a typical array-like object.

Let's see what properties it has:

![arguments](/arguments.png)

Basically, the object is like the following:

```javascript
const arguments = {
  0: 'test',
  1: 1,
  2: [-1, 0],
  length: 3,
  callee: arrayLike, // the function that arguments belongs to
  /**
   * see here, the __proto__ does not points to Array's prototype
   * instead, it points to Object's prototype
   */
  __proto__: Object.prototype
}
```

### Properties of Object.prototype

Below is the `__proto__` property of arguments (= Object.prototype)

![arguments __proto__](/args-proto.png)

<br />

Why `arguments` does not have Array methods like forEach, push, pop...?

<span style="color: palevioletred">**That's the reason**</span>: those methods belongs to `Array.prototype`, but arguments' `__proto__` points to `Object.prototype`, which does not have those methods.

It is similar for other array-like objects.

### Properties of A True Array

The `__proto__` of an Array points to Array.prototype

![array __proto__](/array-proto.png)

## Cast Array-Like Object to Array

### Array.prototype.slice.call()

We know that `arr.slice()` will return the array itself if we do not pass parameters to slice method.

The array-like objects do not have `slice` method.

But we can execute the slice method from Array.prototype

```javascript
function arrayLike() {
  const arr = Array.prototype.slice.call(arguments);
  console.log(arr);
}

// will print ["test", 1, Array(2)]
arrayLike('test', 1, [-1, 0]);
```

### Array.from()

There is compatibility issue with IE for this approach.

- IE 11 and all prevous versions do not support
- Other modern browsers all support

```javascript
function arrayLike() {
  const arr = Array.from(arguments);
  console.log(arr);
}

// will print ["test", 1, Array(2)]
arrayLike('test', 1, [-1, 0]);
```

### Spread Operator

This is ES6's feature.

Make sure to compile to ES5 first, otherwise will have large compatibility issues.

```javascript
function arrayLike() {
  const arr = [...arguments];
  console.log(arr);
}

// will print ["test", 1, Array(2)]
arrayLike('test', 1, [-1, 0]);
```

## Reference

[javascript 类数组](https://segmentfault.com/a/1190000000415572)