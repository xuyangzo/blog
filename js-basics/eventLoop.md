---
tags: ['JS基础', '面试问题 - JS']
date: 09.26.2019
image: /images/event-loop.png
description: 面试必问，不会就倒闭
---

# Event Loop 事件轮询

> Posted: 09.26.2019

<Tag />

## 介绍

> 这篇文章讲得比我好多了：[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

众所周知，JS 是一门单线程的语言。（关于JS的多线程，请参考[Web Worker](/js-basics/webWorker.md)）

这是为什么呢？因为 JS 会直接操作 DOM，如果多线程的话，DOM 操作会出现问题。

所以 JS 会有事件轮询机制。

## 事件轮询机制

这里放一张从别人那里偷来的图。（详见参考资料部分）

![event loop](/images/event-loop.png)

其实浏览器的事件轮询看上去还是比较简单的。

其可以用以下文字来描述：

**任务进入执行栈的时候，判断是同步还是异步任务**

- 如果是同步任务
  - 扔到主线程里，给同步执行了
  - 在这期间，就只做这个同步任务，别的什么也不做
- 如果是异步任务
  - 扔到 Event Table 里注册回调函数
  - 满足触发条件后，被推入到 Event Queue
    - 不同类型的事件，会被推入不同的 Event Queue 中
  - 主线程空闲时，去 Event Queue 中查看是否有可执行的异步任务，有就推入主进程中

## 微任务 vs. 宏任务

**宏任务**：script（整体代码），setTimeout，setInterval  
**微任务**：Promise，process.nextTick

在把异步任务扔到 Event Queue 里时：

- 宏任务会被扔到宏任务的 Event Queue 里
- 微任务会被扔到微任务的 Event Queue 里

而微任务与宏任务的执行顺序如下：

1. 执行一个宏任务
2. 执行所有微任务
3. 重复1~2直到没有宏任务需要执行（这就是一个 Loop）

![microtask and macrotask](/images/microtask.png)

## 事件执行顺序

面试中，需要记住以下函数的执行顺序。

从上至下依次执行：

1. **process.nextTick**：在当前执行栈的尾部（下个 Event Loop，主线程读取 Event Queue）之前触发
2. **Promise.resolve**：本轮 Event Loop 结束前触发
3. **setImmediate**：在当前 Event Queue 的尾部添加事件，因此总是在下一次 Event Loop 时执行
4. **setTimeout**：在宏任务的 Event Queue 尾部添加一个事件，因此要等到下个 Event Loop 开始后，当同步任务和宏任务 Event Queue 现有的事件都处理完，才会得到执行

## 面试题：代码输出顺序

直接摘自：[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

答案和详细的解释也在这篇文章里。写得真的很好，别看我这破玩意儿了，看大佬的去。

```javascript
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    });
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    });
});
process.nextTick(function() {
    console.log('6');
});
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8');
});

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    });
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12');
    });
});
```

## 参考资料

[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

[这可能是2019年最全的前端面试题](https://github.com/javascriptchen/interviews)

<Chirpy />