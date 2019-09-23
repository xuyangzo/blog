---
tags: ['JS Basics', 'Interview Problems']
---

# Check if An Object is Array

> Posted: 09.21.2019

<Tag />

## Facts to Know

1. An array is a kind of object
2. There is no type called `Array`

## Ways to Check if An Object is Array

### Array.isArray

```javascript
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({ 1: 'x', 2: 'y' })); // false
```

### instanceof

```javascript
// will search array's __proto__ chain to look for Array.prototype
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
```

### constructor

```javascript
// each object (including primitive types) has constructor
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