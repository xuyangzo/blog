---
tags: ['DOM相关', '面试问题 - JS']
date: 09.27.2019
image: /web-worker-intro.png
description: Web Worker 也不算是啥新的特性了，讲道理可以学一下
---

# Web Worker

> Posted: 09.27.2019

<Tag />

## 介绍

我们知道 JS 是单线程的。

但有的时候我们就希望实现多线程的功能。

因为大量的计算是很影响性能的：有的时候，页面长时间没有响应，可能就是因为在做计算。

Web Worker 就是一个独立于主线程的，单独的线程（这是 HTML5 的特性）。

主线程可以创建 Worker 线程，将一些任务分配给后者运行。

Worker 线程在后台运行，与主线程互不干扰。

其不会被主线程的事件干扰，比如说：用户点击按钮、提交表单等等。

等到 Worker 线程完成计算任务，再把结果返回给主线程。

这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

## Web Worker 的限制

1. 同源限制：分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
2. DOM 限制：Worker 线程所在的对象与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用 document、window、parent 这些对象。但是，Worker 线程可以读取 navigator 对象和 location 对象。<span v-red>**（因此，Web Worker 一般用于计算）**</span>
3. 通信联系：Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
4. 脚本限制：Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
5. 文件限制：Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络

## 使用实例

### 设置环境

我们先新建一个 HTML 文件，然后展示一个简单的动画。

<div class="anim-container"></div>
<style>
@keyframes flashAndGrow {
  0% {
    width: 0px;
    background: pink;
  }
  50% {
    width: 200px;
    background: mediumseagreen;
  }
  100% {
    width: 0px;
    background: pink;
  }
}
.anim-container {
  width: 0px;
  height: 100px;
  animation: flashAndGrow 2s ease-in-out infinite;
}
</style>

我们可以看见，这个动画很流畅，因为 HTML 文件里只有这么一个动画。

接着，我们在这个页面上计算一下 0~100 之内的质数，然后打印下来。

```javascript
function countPrimeNumber(target) {
  var primes = [2];
  for (let i = 3; i < target; ++i) {
    for (let j = 2; j <= Math.ceil(i / 2); ++j) {
      if (i % j === 0) break;
      if (j === Math.ceil(i / 2)) primes.push(i);
    }
  }
  return primes;
}

// display on dom
var primes = countPrimeNumber(100);
primes.forEach(prime => {
  document.querySelector('.result').innerHTML += prime + '<br/>';
});
```

这是实现的效果：

![prime 100](/prime-100.gif)

我们可以看见，动画并没有变得卡顿（图片看上去可能有点卡，但那是因为fps不足，页面本身没有卡顿）。

也就是说，计算100以内的质数对于页面来说几乎没有影响。

那么，接下来，如果我们把数字从 100 提升到 60万 呢？  
（这里只计算，取消了粘贴到 DOM 上的操作）

![prime 60w](/prime-60w.gif)

我们可以看见，一开始动画是正常的，但当我们把数字从 100 提升到 60万 后，页面直接卡住了。

动画卡在了那里，什么操作都做不了。这是因为浏览器在执行计算，在计算执行完之前处于阻塞状态。

大概过了 30 秒，动画恢复，因为这个时候计算完成了。

### 引入 Web Worker

首先我们新建一个 worker.js

#### 主线程

```javascript
/**
 * 新建 Worker 线程
 * Worker() 构造函数的参数是一个脚本文件，就是 Worker 的任务
 * 由于 Worker 不能读取本地文件，所以这个脚本必须来自网络
 * 这也就意味着该脚本必须使用 http 协议
 * 在这里，我使用了 liver server
 */
var worker = new Worker('worker.js');

// 发送信息给 Worker 线程，参数为计算质数的目标
worker.postMessage(600000);

// 通过 onmessage 来监听事件
worker.onmessage = function (event) {
  for (let i = 0; i < 50; ++i) {
    document.querySelector('.result').innerHTML += 'Received message! <br/>';

    // 反向 append 倒数50个质数，用来证明的确计算完成了
    document.querySelector('.result').innerHTML += event.data[event.data.length - i - 1] + '<br/>';
  }
  
  // 使用完毕，为了节省系统资源，必须关闭 Worker
  worker.terminate();
}
```

#### Worker 线程

```javascript
/**
 * Worker 线程内部需要有一个监听函数，监听message事件
 * self代表子线程自身，即子线程的全局对象（= this）
 */
this.onmessage = function (e) {
  this.postMessage(countPrimeNumber(e.data));

  // 使用完毕，为了节省系统资源，必须关闭 Worker
  this.close();
};
```

#### 结果

![worker 60w](/worker-60w.gif)

我们可以看见，一开始是求 100 以内的质数，然后我们改成 60w。

Worker 的计算同样花了差不多 30 秒左右。

但是在这个过程中，主线程的动画并没有受到影响。

<span v-red>**这下你明白 Web Worker 的牛逼之处了吗？**</span>

## 参考资料

[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

<Disqus />