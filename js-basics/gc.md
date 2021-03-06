---
tags: ['JS基础', '面试问题 - JS']
date: 09.25.2019
image: /images/garbage-intro.jpg
description: JS 的垃圾回收机制，对于我们接下来要讲的许多话题至关重要
---

# JS 的垃圾回收机制

> Posted: 09.25.2019

<Tag />

## 简单描述

学过C++的人肯定知道，在分配内存后，需要手动去回收内存。

Java有垃圾收集器，这玩意儿会自动处理内存的回收。

JS也有。JS的垃圾回收机制一共有两种算法。

## 标记清除算法

> 从2012年起，所有现代浏览器都使用了标记清除垃圾回收算法

该算法本质上就是广度遍历（或者深度遍历，结果是一样的）。

在每个周期内，做如下的工作：

1. 从全局对象开始（对于浏览器来说是 window 对象，对于Node来说是 global 对象）
2. 对全局对象使用广度遍历/深度遍历，从该对象开始，标记该对象，以及该对象可以访问到的对象
3. 在遍历结束时，所有被引用的对象都被标记，而<span v-red>**无法触达**</span>的对象则没有被标记
4. 清除所有没有标记的对象

![mark and sweep](/images/mark-sweep.png)

如果两个对象互相引用，而且没有其余指针指向它们，它们就无法被访问，因此会被清除，其占用的内存被释放。就像是上图的红圈。

## 引用计数算法

> 这是最初级的垃圾收集算法，存在着很重大的问题，因此目前已经被废弃了

其核心是：跟踪记录每个值被引用的次数

- 当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是 1
- 相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数就减 1
- 当这个引用次数变成 0 时，则说明没有办法再访问这个值了，因而就可以将其所占的内存空间给收回来。这样，垃圾收集器下次再运行时，它就会释放那些引用次数为 0 的值所占的内存

<span v-red>但是这样会出现互相引用的问题！！！</span>

```javascript
objA.someOtherObject = objB;
objB.anotherObject = objA;
```

如同上面的代码，objA 和 objB 相互引用，这意味着它们的引用次数永远不会为0。

而当 objA 和 objB 离开作用域，并且函数执行完成之后，它们还将会继续存在，因为它们的引用次数不为0，垃圾清理机制不会清除它们！！

于是，内存泄漏就出现了！！！

## 参考资料

[Garbage collection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

[Garbage collection](https://javascript.info/garbage-collection)

[JavaScript垃圾回收机制](https://www.cnblogs.com/zhwl/p/4664604.html)