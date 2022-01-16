---
tags: ['设计模式', 'TypeScript', '面试问题 - 设计模式']
date: 09.28.2019
image: /images/singleton-intro.png
description: 单例模式用得贼多，讲道理这得学吧？
---

# TypeScript 实现单例模式

> Posted: 09.28.2019

<Tag />

## 介绍

### 特性

每个类都只有一个唯一的实例化的对象，并提供一个全局访问点。

### 应用场景

1. 需要生成唯一序列的环境
2. 需要频繁实例化然后销毁的对象。
3. 创建对象时耗时过多或者耗资源过多，但又经常用到的对象。
4. 方便资源相互通信的环境

<span v-red>**例子1：**</span>

在我们的 Windows 桌面上，我们打开了一个回收站，当我们试图再次打开一个新的回收站时，Windows 系统并不会为你弹出一个新的回收站窗口。也就是说在整个系统运行的过程中，系统只维护一个回收站的实例。新建一个新的回收站是没有意义的，因为回收站间资源共享，因此需要单例模式。

<span v-red>**例子2：**</span>

再举一个例子，网站的计数器，一般也是采用单例模式实现，如果你存在多个计数器，每一个用户的访问都刷新计数器的值，这样的话你的实计数的值是难以同步的。但是如果采用单例模式实现就不会存在这样的问题，而且还可以避免线程安全问题。同样多线程的线程池的设计一般也是采用单例模式，这是由于线程池需要方便对池中的线程进行控制。

## 代码实现

### 饿汉式

在初始化的时候，直接创建实例。

```typescript
class Singleton {
  // 实例作为静态的私有属性
  private static instance: Singleton = new Singleton();
  public name: string;

  // 构造函数为私有的
  private constructor(name: string = 'Lynch') {
    this.name = name;
  }

  // 向外输出实例的，只有这一个静态的方法
  public static getInstance() {
    return this.instance;
  }
}

// 输出 Lynch
let single = Singleton.getInstance();
console.log(single.name);

// 输出 true，因为 single 和 single2 指向同一个实例
let single2 = Singleton.getInstance();
console.log(single === single2);

// 都会输出 Sucker
single.name = 'Sucker';
console.log(single.name);
console.log(single2.name);
```

### 懒汉式

在初始化类的时候，不创建实例，而是等到真正需要用到的时候才创建。

Java 由于多线程的存在，需要设置 synchronized 或者加锁，JS 就不需要这么做了。

```typescript
class Singleton {
  // 实例作为静态的私有属性
  private static instance: Singleton;
  public name: string;

  // 构造函数为私有的
  private constructor(name: string) {
    this.name = name;
  }

  // 向外输出实例的，只有这一个静态的方法
  public static getInstance(name: string = 'Lynch') {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }
}

// 输出 Alice
let single = Singleton.getInstance('Alice');
console.log(single.name);

// 输出 true，因为 single 和 single2 指向同一个实例
let single2 = Singleton.getInstance();
console.log(single === single2);

// 都会输出 Sucker
single.name = 'Sucker';
console.log(single.name);
console.log(single2.name);
```

## 参考资料

[单例模式，懒汉饿汉，线程安全，double checked locking的问题](https://blog.csdn.net/shichao1470/article/details/89323606#_11)

[单例模式的应用场景及优缺点](https://www.cnblogs.com/shoshana-kong/p/9633144.html)

<Chirpy />

