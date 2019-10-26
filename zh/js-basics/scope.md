---
tags: ['ES6', '面试问题 - JS']
---

# 块级作用域

> Posted: 10.21.2019

<Tag />

## 在块级作用域之前……

在 ES6 之前，我们知道，JS 是没有块级作用域的。

在 ES5 的时代，我们只有全局作用域和函数作用域。

### 全局作用域

顾名思义，就是全局作用域。

简单来说，在 ES5 里，除去函数作用域，那就是全局作用域。

并且在全局作用域里，会出现 `变量提升` 的现象。如下：

```javascript
console.log('变量提升：', a);
var a = 'test';
```

打印出来的结果是这样：

![hoist](/hoist.png)

等一下，很奇怪，不是应该报错吗？为什么会打印 undefined？

因为发生了 `变量提升` 的现象。

就是关于变量和函数的声明，会被提升到作用域的顶部。

上面那部分代码就相当于是这样：

```javascript
var a;
console.log('变量提升：', a);
a = 'test';
```

关于变量 a 的声明会被提升到作用域顶部。

- 变量提升的顺序是：变量声明在函数声明上面，而赋值的操作位置不变
- 并且如果是在浏览器的全局作用域下（node 不行），用 var 声明变量的时候，会导致变量挂载在 window 对象上

因此会打印 undefined，而不是报错。

关于函数的声明也一样，会被提升：

```javascript
console.log('变量提升：', test);
function test() {
  console.log('test');
}
```

![hoist](/hoist-2.png)

对了，还有一道经典的面试题。

```javascript
for (var i = 0; i < 4; ++i) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

这玩意儿会打印 4 个 `4`，原理就是变量提升。

### 函数作用域

函数作用域就是一个独立的作用域。有点像块级作用域。

函数作用域外的作用域，无法获取到函数作用域内的本地变量。

并且在函数作用域内部，也会发生变量提升的现象。

```javascript
function test() {
  console.log(a);
  var a = 'test';
}
test();
```

![hoist](/hoist-3.png)

## 块级作用域的概念

在 ES6 出来后，块级作用域也就诞生了。

在这里，有一个概念要澄清一下。

到底什么是块级作用域？

当你用 let、const 关键词定义一个变量时，该变量和包裹它的 `{}`，形成了一个针对于该变量的块级作用域。

这个听上去是不是有些复杂？别急，看🌰：

```javascript
// console.log(hello);
console.log(test);

if (true) {
  const hello = () => console.log('hello');
  var test = 'test';
}

// console.log(hello);
console.log(test);
```

![scope](/scope.png)

上面注释掉的两行，会报错。

因为 const 和 {} 形成了针对于 hello 这个变量的块级作用域，所以在块级作用域外，我们无法获取到 hello（这一点接下来会讲）。

但是 test 这个变量是用 var 来声明的，也就是对于 test 自身来说，其没有处于块级作用域中，因此出现了变量提升。

看到这里，大家可能比较明白了吧：

<span v-red>**块级作用域的形成，仅仅是针对某个单独的变量来说的！！！**</span>

并不是说当块级作用域形成后，对于包裹的所有变量来说，都是块级作用域！！！

## 块级作用域的特性

1. 外层作用域无法读取内层作用域的变量

```javascript
if(true) {
  const test = 'test';
}
console.log(test); // 会报错
```

2. 内层作用域可以定义外层作用域的同名变量，并且两者互不干扰

```javascript
if(true) {
  const test = 'test';
  if (true) {
    const test = 'test2';
    console.log(test); // 会打印 test2
  }
  console.log(test); // 会打印 test
}
```

3. 不存在变量提升

```javascript
console.log(test); // 会报错
const test = 'test';
```

## let 关键词

let 关键词和 {} 结合起来，可以形成针对单一变量的块级作用域。

### 不允许重复声明

var 关键词允许重复声明，但是 let 关键词不允许<span v-red>在相同作用域内</span>重复声明。

```javascript
if (true) {
  let a = 0;
  let a = 1; // 会报错 
}
```

但是在不同作用域内（包括父子关系的作用域），是可以重复声明的。（上面讲过了）

```javascript
let a = 0;
console.log(a); // 会打印 0
if (true) {
  let a = 1;
  console.log(a); // 会打印 1
}
console.log(a); // 会打印 0

```

### 暂时性死区

只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

注意，这一点和 `没有发生变量提升` 是不一样的。

因为变量提升的确发生了，但你却无法获取到该变量，并且无法使用。

这一点是可以证明的：

```javascript
console.log(typeof a); // 会报错
console.log(typeof b); // 会打印 undefined
let a = 0;
```

从上面的代码我们可以发现，如果一个变量未被声明，那么使用 typeof 会打印 undefined。

但是为什么 `typeof a` 直接报错了？那说明 a 已经被声明了，但我们无法获取。

因此，变量提升的的确确发生了。

### 兼容性

![compatibility let](/comp-let.png)

## const 关键词

const 关键词和 {} 结合起来，可以形成针对单一变量的块级作用域。

### 声明时必须赋值

这个其实很好理解。因为 const 声明后，值不能改，所以一开始不赋值的话，就改不了了。

```javascript
let a; // 合法
const b = 'b'; // 合法
const c; // 不合法
```

### 不允许值/地址的更改

一旦用 const 关键词声明变量后，便不能更改值。

但对于 object 来说，const 关键词仅仅不允许更改 reference 指向的地址，但是该地址指向的值是可以改的。

```javascript
const obj = {};
obj.test = 'test'; // 这是允许的
obj = {}; // 这是不允许的，因为 {} 指向了不同的地址
```

如果想要连值都不允许更改的话，可以用 Object.freeze

```javascript
const obj = {};
Object.freeze(obj);
obj.test = 'test'; // 不会报错，但是操作无效
console.log(obj); // 会打印 {}
```

### 不允许重复声明

这一点和 let 关键词一样，就不提了。

### 暂时性死区

这一点和 let 关键词一样，就不提了。

### 兼容性

![compatibility let](/comp-let.png)

## 参考资料

[浅谈ES6 块级作用域](https://blog.csdn.net/zhouziyu2011/article/details/68484534)

[浅谈ES6 let命令](https://blog.csdn.net/zhouziyu2011/article/details/68067609)

[浅谈ES6的let和const的异同点](https://blog.csdn.net/zhouziyu2011/article/details/71366078)

[这可能是2019年最全的前端面试题](https://github.com/javascriptchen/interviews)

<Disqus />