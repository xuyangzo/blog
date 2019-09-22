---
tags: ['JS Basics']
---

# Type Comparison

> Posted: 09.21.2019

<Tag />

## JS Types

First, we need to understand variable types of JS.

This article is not just about types, so I will just give a brief introduction on type itself.  
For more information, please refer to [More JS Types](/js-basics/moreTypes.md)


### Primitive Types

> Primitive types are immutable, which means they can be replaced, but not mutated

- String
- Number
- Boolean
- Undefined
- Null
- Symbol

1. All primitive type objects have `valueOf` method, which returns its primitive value  
2. And all primitive type obecjts have `toString` method, which returns a string that indicates it

```javascript
'test'.valueOf(); // returns 'test'
'test'.toString(); // returns 'test'
```

### Complex Types

> Complex types are mutable

JS only has one complex type: `Object`

Array is an object, Function is an object.  
Everything in JS can be considered as an object.

1. All objects have `toString` method, but only primitive type objects have `valueOf` method
2. All objects have address that are stored in stack memory which points to values in heap memory

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

### comparator `==`

1. Cast the left part and right part to the same type
2. Call `valueOf` method and compare both sides' values

### comparator `===`

1. Compare type first (for object, compare their address)
2. Execute `==`

## Type Castc During `==`

JS's `==` has 5 rules for type casting before comparison

1. If a party is Boolean, cast it to true -> 1/false -> 0 before comparison
2. If a party is String and another is Number, cast String to Number (call `Number(str)`)
3. If a party is Object and another is not, call `Object.prototype.valueOf`. If object does 
not have valueOf method (not primitive type), call `Object.prototype.toString` instead
4. If both parties are Object, compare their address
5. NaN compares with anything (using == or ===) will be false, even itself

## Examples

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
 * Premises, type casts without ==
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

## Reference

[为什么 \[\] 是 false 而 !!\[\] 是 true](https://www.h5jun.com/post/why-false-why-true.html)

<Disqus />