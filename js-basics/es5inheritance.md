---
tags: ['JS基础', '面试问题 - JS']
---

# ES5 的继承

> Posted: 09.23.2019

<Tag />

## 开始前的准备

创建一个接下来所有例子都会共享的父类

```javascript
function Animal(type) {
  // 基本类型
  this.type = type;
  // 引用类型
  this.features = [];
  // 方法
  this.greeting = function() {
    console.log(this.type + ' greets you!');
  }
}

// 加在 prototype 上的方法
Animal.prototype.eat = function() {
  console.log(this.type + ' is eating!');
}
```

## 原型链继承

> 核心思想：把父类的实例用作子类的 prototype

**优点：**

1. 写起来简单
2. 所有子类的实例，都能够获取父类 prototype 上新增的属性和方法

**缺点：**

1. 所有来自父类 prototype 的属性都会被子类的实例共享，所以如果我们在某个实例中更改了来自父类的某个引用类型的属性，所有子类的实例都会共享这个改变
2. 如果我们想要在子类的 prototype 上添加属性/方法，必须在 `new` 之后做
3. 无法实现多继承（一个子类继承多个父类）
4. 创建子类实例时，无法把参数传入到父类的构造函数

```javascript
function Cat(color, type) {
  /**
   * 缺点 4
   * 无法实现类似这样的效果: super(type);
   * 必须手动设置 this.type
   */
  this.type = type;
  this.color = color;
}
Cat.prototype = new Animal('cat');

/**
 * 缺点 2
 * 必须在 `new` 之后，添加属性/方法
 */
Cat.prototype.greeting = function() {
  console.log(this.color + ' cat says hello');
};

// 实例化 - 1
var cat = new Cat('blue', 'big-cat');
// 会打印 'Cat {type: "big-cat", color: "blue"}'
console.log(cat);

// 实例化 - 2
var cat2 = new Cat('red', 'small-cat');
// 会打印 'red cat says hello'
cat2.greeting();

/**
 * 缺点 1
 * 会打印 ['cute']，但这是 cat1 的 feature，而不是 cat2 的
 * 
 * 因为当我们设置 cat.features 时，
 * 我们本质上在设置 Cat.prototype.features
 * 
 * 而当我们打印 cat2.features 时，
 * 我们本质上在打印 Cat.prototype.features
 */
cat.features.push('cute');
console.log(cat2.features);

console.log(cat instanceof Animal); // true 
console.log(cat instanceof Cat); // true
```

## 构造函数继承

> 核心思想：调用父类的构造函数, 简单来说就是把父类的实例复制给子类

**优点：**

1. 解决了原型链继承中，共享引用类型的问题
2. 可以实现多继承（调用多个父类的构造函数）
3. 实例化时，可以给父类的构造函数传递参数

**缺点：**

1. 子类的的实例只是子类的实例，而不是父类的实例
2. 无法继承父类 prototype 的属性及方法
3. 每个子类都有父类的复制，影响了效率

```javascript
function Cat(type, age) {
  /**
   * 优点 1
   * 可以给父类的构造函数传递参数
   * 等同于: Animal.prototype.constructor.call(this, type)
   */
  Animal.call(this, type);
  this.age = age;
}

var cat = new Cat('big-cat', 2);
// 会打印 'Cat {type: "big-cat", features: Array(0), greeting: ƒ, age: 2}'
console.log(cat);

/**
 * 缺点 1
 * cat 不是 父类 Animal 的实例
 */
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

/**
 * 缺点 2
 * 无法继承父类 prototype 的属性及方法
 * 会 throw 一个 TypeError, 'cat.eat is not a function'
 */
cat.eat();
```

## 实例继承

> 核心思想：在父类的实例上添加属性/方法，然后作为子类的实例返回

**优点：**

1. 不需要 `new` 关键字，Child() = new Child()
2. 解决了原型链继承中，共享引用类型的问题
3. 实例化时，可以给父类的构造函数传递参数
4. 所有子类的实例，都能够获取父类 prototype 上新增的属性和方法

**缺点：**

1. 子类的的实例只是子类的实例，而不是父类的实例
2. 不支持多继承

```javascript
function Cat(type) {
  var instance = new Animal(type);
  instance.color = 'pink';
  return instance;
}

var cat = new Cat('dog-cat');
// 会打印 '{type: "dog-cat", features: Array(0), greeting: ƒ, color: "pink"}'
console.log(cat);

/**
 * 缺点 1
 * cat 不是父类 Animal 的实例
 */
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false
```

## 拷贝继承

> 核心思想：复制父类实例所有可枚举的属性/方法，添加到子类的 prototype 上

**优点：**

1. 解决了原型链继承中，共享引用类型的问题
2. 实例化时，可以给父类的构造函数传递参数
3. 支持多继承

**缺点：**

1. 子类的的实例只是子类的实例，而不是父类的实例
2. 因为需要复制属性，所以效率比较低
3. 无法获取到父类实例无法枚举的属性/方法

```javascript
function Cat(type){
  var animal = new Animal(type);
  /**
   * 缺点 2
   * for ... in 只会遍历可枚举的属性/方法
   */
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.type = type;
}


var cat = new Cat('dinosaur-cat');
// 会打印 '{type: "dinosaur-cat", features: Array(0),
//             greeting: ƒ, eat: ƒ, constructor: ƒ}'
console.log(cat.__proto__);

/**
 * 缺点 1
 * cat 不是父类 Animal 的实例
 */
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```

## 组合继承

> 核心思想：原型链继承与构造函数继承的组合体

**优点：**

1. 解决了原型链继承中，共享引用类型的问题
2. 实例化时，可以给父类的构造函数传递参数
3. 所有子类的实例，都能够获取父类 prototype 上新增的属性和方法
4. 子类的实例同时是父类与子类的实例
5. 函数可以复用

**缺点：**

1. 调用了2次父类的构造函数，生成了两份父类的实例，其中一份不是必须的

```javascript
function Cat(type, age) {
  Animal.call(this, type);
  this.age = age;
}

Cat.prototype = new Animal();
/**
 * 在这时，Cat 的 constructor 指向 Animal 的 constructor
 * 因为 Cat 继承了 Animal 的 prototype
 * 因此，需要将 constructor 指向 Cat 的 constructor
 */
Cat.prototype.constructor = Cat;

var cat = new Cat('dinosaur-cat-2', 3);
// 会打印 'Cat {type: "dinosaur-cat-2", features: Array(0), greeting: ƒ, age: 3}'
console.log(cat);

console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

## 寄生组合继承

> 基于组合继承

**优点：**

1. 解决了原型链继承中，共享引用类型的问题
2. 实例化时，可以给父类的构造函数传递参数
3. 所有子类的实例，都能够获取父类 prototype 上新增的属性和方法
4. 子类的实例同时是父类与子类的实例
5. 函数可以复用
6. 父类的构造函数只被调用了一次

**缺点：**

1. 写起来很复杂

```javascript
function Cat(type, age) {
  Animal.call(this, type);
  this.age = age;
}

// 我们想要实现的效果：Cat.prototype = new Animal();
// 用立即执行函数, 所以出了函数定义域后，内存就被释放了
(function() {
  // create a class with no instance methods
  var temp = function() {};
  Temp.prototype = Animal.prototype;
  Cat.prototype = new Temp();
})();

/**
 * 在这时，Cat 的 constructor 指向 Animal 的 constructor
 * 因为 Cat 继承了 Animal 的 prototype
 * 因此，需要将 constructor 指向 Cat 的 constructor
 */
Cat.prototype.constructor = Cat;

var cat = new Cat('jellyfish-cat', 100);
// 会打印 'Cat {type: "jellyfish-cat", features: Array(0), greeting: ƒ, age: 100}'
console.log(cat);

console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

## 参考资料

[JS实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html#!comments)

<Disqus />