---
tags: ['ES6', '面试问题 - JS']
---

# WeakMap 和 WeakSet

> Posted: 10.24.2019

<Tag />

## 介绍

我们知道 ES6 引入了 Map 和 Set 这两个数据结构。

但一般人不知道，ES6 还引入了 WeakMap 和 WeakSet。

那么问题来了，这俩数据结构比起 Map 和 Set，到底 weak 在哪里了呢？

很简单，WeakMap 里存储的 key 以及 WeakSet 里对象，都是<span v-red>**弱引用**</span>。

那么问题来了，什么是 `弱引用`？

## WeakMap 和 WeakSet 的特性

在谈弱引用前，首先，我们必须要了解一下 WeakMap 和 WeakSet 的特性。

**对于 WeakMap 来说：**

- WeakMap 只接受对象作为 key（null除外），不接受其他类型的值作为 key
- 这也就意味着，所有基本数据类型的值，都无法作为 WeakMap 的 key
- 但是 WeakMap 的 value 是不做任何限制的

**对于 WeakSet来说：**

- WeakSet 的成员只能是对象，而不能是其他的值
- 这也就意味着，WeakSet 不接受所有基本数据类型的值

聪明的小伙伴可能已经发现了，WeakMap 和 WeakSet，都只接受对象。

这是为什么？

这就与我们接下来要谈的 `弱引用` 有关了。

<span v-line>因为基本类型的值不存在引用，更别提弱引用</span>

## 前提条件

在这里，我强烈建议大家先去看我关于垃圾回收机制的文章：[JS 的垃圾回收机制](/zh/js-basics/gc.md)。

如果不了解 JS 的垃圾回收机制，接下来的东西可能会显得很迷。

当然，如果你觉得很迷也没关系，那就继续看下去吧。

## 弱引用

不走程序，直接问，什么是弱引用？

弱引用就是……弱的引用。<span v-line>废话</span>

这里需要把 WeakMap 和 WeakSet 分开来讲。

因为 WeakSet 比较容易理解，所以我们先看 WeakSet

### WeakSet

对于 WeakSet 来说，其包含的对象如果在别的地方没有对于该对象的引用了，那么该对象就可以被垃圾回收机制回收。

而对于一般的 Set 来说，由于其一直包含了这些对象，因此垃圾回收器从 root 出发是能看见它们的，因此会一直停留在内存中。而有的时候，这就会导致内存泄漏。

我们来举一个小🌰：

```javascript
// 给 WeakSet 添加对象
let arr = [1, 2, 3];
const ws = new WeakSet();
ws.add(arr);
// 删除对于该对象的引用
arr = null;
// 猜猜看会打印什么...
for (let i = 0; i < 10; ++i) {
  console.log(ws);
}
```

最后打印了 10 个如下的对象：

![weakset result 1](/weakset-1.png)

...等一哈，这不对啊？不是说好垃圾回收器会回收分配给这玩意儿的内存吗？

其实是因为垃圾回收器这个时候还没有运行。不信的话，我们循环 100 遍试试。

```javascript
// 给 WeakSet 添加对象
let arr = [1, 2, 3];
const ws = new WeakSet();
ws.add(arr);
// 删除对于该对象的引用
arr = null;
// 猜猜看会打印什么...
for (let i = 0; i < 100; ++i) {
  console.log(ws);
}
```

![weakset-2](/weakset-2.png)

看见没有，在垃圾回收器开启一个新的 cycle 后，WeakSet 里的弱引用对象被清除了。

那么，如果是普通的 Set 呢？

```javascript
let arr = [1, 2, 3];
const set = new Set();
set.add(arr);
arr = null;
for (let i = 0; i < 100; ++i) {
  console.log(set);
}
```

结果如下：

![set](/set.png)

毫不意外，在 Set 中，对于该对象的引用还保留着。

看到这里，大家应该已经对 `弱引用` 有了一个初步的了解了。

我们再来看看 WeakMap。

### WeakMap

对于 WeakMap 来说，如果没有对于 key 的引用，那么就会清除 key 所占据的内存。

并且会将该键值对从 WeakMap 中移除。

但是这对 value 没有任何影响。

```javascript
// 插入到 WeakMap 里
let key = [1, 2, 3];
let value = { sb: 'lynch' }
const wm = new WeakMap();
wm.set(key, value);
// 清除对 key 的引用
key = null;
// 等待垃圾回收器执行后，查看结果
setTimeout(() => {
  console.log(wm);
  console.log(value.sb);
}, 5000);
```

结果如下：

![weakmap](/wm.png)

毫不意外，该键值对从 WeakMap 里被移除了。

但是当我们打印 value.sb 的时候，结果正常。

所以，我们可以发现，value 的引用依旧存在，并没有被垃圾回收器给回收。

对于普通的 Map 来说，自然是保留着引用。

![map](/map.png)

## 应用场景

如果你想保存一些引用，但是又怕出现内存泄漏，就用 WeakMap/WeakSet。

1. 以 DOM 节点作为 key（比如说记录一个节点被点击的次数）

```javascript
const wm = new WeakMap();
const node = document.querySelector('#container');
wm.set(node, 0);
node.addEventListener('click', () => {
  const count = wm.get(node);
  wm.set(node, count + 1);
});
```

2. 部署私有属性

```javascript
const _counter = new WeakMap();
const _action = new WeakMap();
class Countdown {
  constructor(counter,action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }

  dec(){
    let counter = _counter.get(this);
    if(counter < 1){
        return ;
    }
    counter --;
    _counter.set(this, counter);
    if(counter === 0){
      _action.get(this)();
    }
  }
}
const c = new Countdown(2, () => console.log('DOWM'));
c.dec();
c.dec(); 
```

上面代码中，Countdown 类的两个内部属性 _counter 和 _action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

## 具体用法

具体用法我就不讲了，讲了也大概率记不住。

反正等到了真要用到的时候，去看文档就行了。

我在这里就不做搬运工了。

## 参考资料

[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

[WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

[What are the actual uses of ES6 WeakMap?](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap)

[JavaScriptES6Map与WeakMap](https://blog.csdn.net/c__dreamer/article/details/82182649)

[JavaScriptES6的Set与WeakSet](https://blog.csdn.net/c__dreamer/article/details/82182200)

<Disqus />