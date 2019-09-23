---
tags: ['JS Basics']
---

# prototype vs. \_\_proto\_\_

> Posted: 09.23.2019

<Tag />

## prototype

- `prototype` is a special <span style='color: palevioletred'>**pointer**</span> that 
points to an object that only Function has
- Created when declaring a function
- `prototype` contains the following objects:
  - All the attributes and methods that all instances share
  - An object called `constructor`, a function to instantiate the object
  - An object called `__proto__`, we will talk about why it has such property later

```javascript
function test() {
  this.name = 'lynch';
}
/**
 * prototype here should only contain constructor and __proto__
 * The image shows that it also contains length property
 * This is because of the browser, see details below 
 */
console.log(test.prototype);

/**
 * Add property to prototype object
 * prototype here should contain constructor, __proto__ and length
 */
test.prototype.length = 18;
console.log(test.prototype);

// instantiate
var a = new test();
/**
 * a is the instance of test, so it does not have prototype,
 * so the output will be undefined
 */
console.log(a.prototype);
/**
 * a.__proto__ = test.prototype
 * We will talk more about this in next section
 */
console.log(a.__proto__);
```
This is the output: 

![constructor](/constructor.png)

The output for first log is wrong.  
Check details here: [Browser's Async console.log](/js-basics/consolelog.md)

```javascript
var obj = { a: 1 };
// will log undefined, because only Function has prototype
console.log(obj.prototype);
```

## \_\_proto\_\_

- `__proto__` is a special <span style='color: palevioletred'>**pointer**</span> that 
points to an object that every object contains
  - `prototype` is an object, that's why it also has a `__proto__` property
- Created when the object it belongs to is created
- Default value is the pointer that the function's `prototype` <span style='color: palevioletred'>points to</span>

```javascript
function test() {
  this.name = 'lynch';
}
// Will log the function test itself rather than test's prototype
console.log(test.__proto__);

var a = new test();
var b = new test();
// Will log test's prototype because they point to same address
console.log(a.__proto__);
// Will log true because they point to same address
console.log(test.prototype === a.__proto__);
// Will log true because they point to same address
console.log(test.prototype === b.__proto__);
// Will log true because they point to same address
console.log(a.__proto__ === b.__proto__);

/**
 * If we modify a's __proto__, b's __proto__ will also change
 * Because they point to the same address
 */
a.__proto__.length = 18;
console.log(b.__proto__);
```

Here is the output:

![__proto__](/proto.png)

## Reference

[js里的__proto__和prototype到底有什么区别？](https://www.jianshu.com/p/80bcf8b2004e)

[JS原型（显式原型+隐式原型）](https://www.jianshu.com/p/79f5549fa1e7)

<Disqus />
