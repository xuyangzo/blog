---
tags: ['JS Basics', 'Interview Problems']
---

# ES5 Inheritance

> Posted: 09.23.2019

<Tag />

## Preparation

Create a parent object to use for all the following situations.

```javascript
function Animal(type) {
  // basic type
  this.type = type;
  // reference type
  this.features = [];
  // method
  this.greeting = function() {
    console.log(this.type + ' greets you!');
  }
}

// method on prototype
Animal.prototype.eat = function() {
  console.log(this.type + ' is eating!');
}
```

## Prototype Inheritance

> Key idea: use parent's instance as child's prototype

**Advantages:**

1. Easy to write
2. All child instances can have access to parent's newly added prototype attributes/methods

**Disadvantages:**

1. All attributes from parent's prototype will be shared by all instances, so if we change the reference type of values in one instance, all values in all instances will be changed
2. If want to add new attributes/methods to prototype, has to do that after `new`
3. Cannot implement multiple inheritance (an instance has more than one parent)
4. When creating child instance, cannot pass parameters to parent function

```javascript
function Cat(color, type) {
  /**
   * Disadvantage 4
   * Cannot do something like: super(type);
   * Has to manually set this.type
   */
  this.type = type;
  this.color = color;
}
Cat.prototype = new Animal('cat');

/**
 * Disadvantage 2
 * Has to add attributes/methods to prototype after new operation
 */
Cat.prototype.greeting = function() {
  console.log(this.color + ' cat says hello');
};

// instantiate 1
var cat = new Cat('blue', 'big-cat');
// will log 'Cat {type: "big-cat", color: "blue"}'
console.log(cat);

// instantiate 2
var cat2 = new Cat('red', 'small-cat');
// will log 'red cat says hello'
cat2.greeting();

/**
 * Disadvantage 1
 * Will log ['cute'], but that's cat1's feature, not cat2's
 * 
 * Because by setting cat.features, 
 * it is actually setting Cat.prototype.features
 * 
 * And when logging cat2.features,
 * it is actually logging Cat.prototype.features
 */
cat.features.push('cute');
console.log(cat2.features);

console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true
```

## Constructor Inheritance

> Key idea: call parent's constructor, namely copy parent's instance to child

**Advantages:**

1. Solve the shared reference problem in Prototype Inheritance
2. Solve the inability for multiple inheritance problem in Prototype Inheritance
3. Able to pass parameters to parent for instantiation

**Disadvantages:**

1. Child's instance is only its instance, not parent's instance
2. Cannot inherit parent's prototype's methods/attributes
3. Every child has a copy of parent's instance, which affects the efficiency

```javascript
function Cat(type, age) {
  /**
   * Advantage 1
   * Able to pass parameters to parent's constructor
   * Same as: Animal.prototype.constructor.call(this, type)
   */
  Animal.call(this, type);
  this.age = age;
}

var cat = new Cat('big-cat', 2);
// will log 'Cat {type: "big-cat", features: Array(0), greeting: ƒ, age: 2}'
console.log(cat);

/**
 * Disadvantage 1
 * cat is only the instance of Cat, not Animal
 */
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

/**
 * Disadvantage 2
 * Cannot inherit parent's prototype's methods/attributes
 * Will throw a TypeError, 'cat.eat is not a function'
 */
cat.eat();
```

## Instance Inheritance

> Key Idea: Add new attributes/methods to parent's instance, return as child's instance

**Advantages:**

1. Does not need `new` keyword, Child() = new Child()
2. Solve the shared reference problem in Prototype Inheritance
3. Able to pass parameters to parent for instantiation
4. All child instances can have access to parent's newly added prototype attributes/methods

**Disadvantages:**

1. The instance is parent's instance not child's instance
2. Does not support multiple inheritance

```javascript
function Cat(type) {
  var instance = new Animal(type);
  instance.color = 'pink';
  return instance;
}

var cat = new Cat('dog-cat');
// will log '{type: "dog-cat", features: Array(0), greeting: ƒ, color: "pink"}'
console.log(cat);

/**
 * Disadvantage 1
 * cat is only the instance of Cat, not Animal
 */
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false
```

## Copy Inheritance

> Key idea: copy every enumerable properties in parent to child's prototype

**Advantages:**

1. Solve the shared reference problem in Prototype Inheritance
2. Able to pass parameters to parent for instantiation
3. Support multiple inheritance

**Disadvantages:**

1. The instance is parent's instance not child's instance
2. The efficiency is low because need to copy most properties
3. Cannot obtain parent's non-enumerable properties

```javascript
function Cat(type){
  var animal = new Animal(type);
  /**
   * Disadvantage 2
   * for ... in only counts for enumerable properties
   */
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.type = type;
}


var cat = new Cat('dinosaur-cat');
// will log '{type: "dinosaur-cat", features: Array(0),
//             greeting: ƒ, eat: ƒ, constructor: ƒ}'
console.log(cat.__proto__);

/**
 * Disadvantage 1
 * cat is only the instance of Cat, not Animal
 */
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```

## Combination Inheritance

> Key idea: combine Prototype Inheritance and Constructor Inheritance

**Advantages:**

1. Solve the shared reference problem in Prototype Inheritance
2. Able to pass parameters to parent for instantiation
3. All child instances can have access to parent's newly added prototype attributes/methods
4. Instance of both parent's instance and child's instance
5. The function can be used more than once

**Disadvantages:**

1. Calls parent's constructor twice, thus created 2 instances, which is unnecessary

```javascript
function Cat(type, age) {
  Animal.call(this, type);
  this.age = age;
}

Cat.prototype = new Animal();
/**
 * At this time, Cat's constructor points to Animal's constructor
 * Because Cat inherits Animal's prototype
 * Therefore, need to redirect the constructor
 */
Cat.prototype.constructor = Cat;

var cat = new Cat('dinosaur-cat-2', 3);
// will log 'Cat {type: "dinosaur-cat-2", features: Array(0), greeting: ƒ, age: 3}'
console.log(cat);

console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

## Parasitic Combination Inheritance

> Based on Combination Inheritance, 

**Advantages:**

1. Solve the shared reference problem in Prototype Inheritance
2. Able to pass parameters to parent for instantiation
3. All child instances can have access to parent's newly added prototype attributes/methods
4. Instance of both parent's instance and child's instance
5. The function can be used more than once
6. Parent's constructor is called only once

**Disadvantages:**

1. Complicated to write

```javascript
function Cat(type, age) {
  Animal.call(this, type);
  this.age = age;
}

// what we are trying to accomplish: Cat.prototype = new Animal();
// use IIFE, so the memory will be released right after function executes
(function() {
  // create a class with no instance methods
  var temp = function() {};
  Temp.prototype = Animal.prototype;
  Cat.prototype = new Temp();
})();

/**
 * At this time, Cat's constructor points to Animal's constructor
 * Because Cat inherits Animal's prototype
 * Therefore, need to redirect the constructor
 */
Cat.prototype.constructor = Cat;

var cat = new Cat('jellyfish-cat', 100);
// will log 'Cat {type: "jellyfish-cat", features: Array(0), greeting: ƒ, age: 100}'
console.log(cat);

console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

## Reference

[JS实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html#!comments)

<Disqus />