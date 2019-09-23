---
tags: ['JS Basics', 'Interview Problems']
---

# What NEW Keyword Does

> Posted: 09.23.2019

<Tag />

## Description

What underlying process has been gone through for the following code?

```javascript
var a = new B();
```

## Create Empty Object

1. Create an empty object a

```javascript
var a = {};
```

## Inherit prototype

1. Set B's prototype to a's \_\_proto\_\_

```javascript
a.__proto__ = B.prototype;
```

## Call constructor

1. Call B's constructor with `this` points to a (change binding)

```javascript
B.call(a);
// same as: B.prototype.constructor.call(a);
```

## In A Whole

```javascript
function B () {
  this.name = 'lynch';
}

// var a = new B();
var a = {};
a.__proto__ = B.prototype;
B.call(a); 
// same as: B.prototype.constructor.call(a);

// will log B {name: "lynch"}
console.log(a);
```

## Reference

[js中的new()到底做了些什么？](https://www.cnblogs.com/faith3/p/6209741.html)

<Disqus />