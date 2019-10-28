---
tags: ['ES6', '面试问题 - JS']
---

# Promise

> Posted: 09.30.2019

<Tag />

## 介绍

Promise 是一个 ES6 的对象，用来解决异步的问题。

可能大家都听说过 **回调地狱** 这个词。

Promise 可以较为完美地解决回调地狱的问题。

## Promise 的状态

Promise 一共有三种状态：Pending，Resolved/Fulfilled，Rejected

其状态改变只有以下两种方向：

1. Pending -> Resolved
2. Pending -> Rejected

并且一旦当 Promise 的状态改变之后，它不能再进行第二次改变。

## 语法

`new Promise( function(resolve, reject) {...} /* executor */  );`

我们可以看见，Promise 这个对象的构造函数，其接受的参数是一个 executor 函数。

这个 executor 函数有两个参数，一个是 resolve，一个是 reject。

- 当我们在这个函数里调用 resolve 的时候，就会让 Promise 进入 resolved 状态
- 当我们在这个函数里调用 reject 的时候，就会让 Promise 进入 rejected 状态

这个听上去似乎有些迷，所以不如直接看代码

```javascript
const mypromise = new Promise((resolve, reject) => {
  // 用 setTimeout 来模拟异步请求
  setTimeout(() => {
    resolve();
  }, 3000);
});

// mypromise 会在3秒后，进入 resolved 状态
// 而当 mypromise 进入 resolved 状态后，then 方法的回调函数会被调用
mypromise.then(() => {
  // 三秒后，会打印 '进入 resolved 状态！'
  console.log('进入 resolved 状态！');
});
```

在上面，我们成功地在三秒后打印了文字。

但一般情况下，我们会想要打印异步请求得到的内容。

而这个时候，我们是可以传参数给 resolve 函数的。

```javascript
const mypromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    /**
     * 给 resolve 函数传递参数
     * 但 resolve 函数只会接受第一个参数，
     * 所以你会发现，第二个传进去的 'hello2' 无法被打印
     * 因此，如果想要传递多个维度的数据，一边用对象作为参数
     * 直接返回结果（比如说 return 1）后，会被下面的 then 抓住
     */
    resolve('hello', 'hello2');
  }, 3000);
});

mypromise.then((data, data2) => {
  console.log(data); // 三秒后，会打印 'hello'
  console.log(data2); // 三秒后，会打印 'undefined'
});
```

Reject 的用法也是类似的，只不过 Reject 是通过 catch 来捕捉的。

而且注意了，如果调用了 reject 方法，但是没有调用 catch 来捕捉，是会报错的。

所以一般来说，就算你知道 Promise 十有八九会进入 resolved 状态，也最好加一个 catch。

```javascript
const mypromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject({ name: 'lynch', greeting: 'fuck you' });
  }, 3000);
});

mypromise.catch(error => {
  const { name, greeting } = error;
  // 三秒后，会打印 'lynch says: fuck you'
  console.log(name + ' says: ' + greeting);
});
```

一般情况下，我们都是 resolve 和 reject 一起使用的。  
具体调用哪一个方法，则是取决于回调函数的结果。

```javascript
const mypromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    /**
     * 三秒后，随机生成 0 和 1
     * 如果是 1，resolve
     * 如果是 0，reject
     * 以此来模拟正式的请求
     */
    let num = Math.floor(Math.random() * 2);
    if (num) resolve('resolved!');
    else reject('rejected!');
  }, 3000);
});

mypromise
  .then(result => {
    // 会打印 resolved
    console.log(result);
  })
  .catch(error => {
    // 会打印 rejected
    console.log(error);
  });
```

## 链式调用

1. 比如我们想要在3秒后随机生成一个 0~9 的整数，然后查看这个数究竟是不是 >5，是的话打印成功，否则打印错误的原因，然后 reject
2. 然后我们想要在2秒后随机生成 true 还是 false，true 的话展示成功的语句，false 的话打印错误的原因，然后 reject

```javascript
var mypromise = new Promise((resolve, reject) => {
  setTimeout(function() {
    var randomNum = Math.floor(Math.random() * 10);
    if (randomNum > 5) resolve({ status: 1, log: 'Promise1 resolved!' });
    else reject({ error: 'Promise1 rejected!' });
  }, 3000);
});

mypromise
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);

    /**
     * 在这里不是必须要返回一个 Promise
     * 我在这里返回了一个 Promise 的目的，
     * 是因为第二个任务也是异步的，
     * 所以需要 Promise 来处理
     * 否则可以直接返回结果，不需要 Promise
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const num = Math.floor(Math.random() * 2);
        if (num) resolve({ status: 1, log: 'Promise1 resolved!' });
        else reject({ error: 'Promise2 rejected!' });
      }, 3000);
    });
  })
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);
  })
  .catch(err => {
    console.log(err.error)
  });
```

那么问题来了，我们现在的结构是：

```javascript
mypromise
  .then()
  .then()
  .catch()
```

如果第一个 Promise 被 reject 了，catch 会抓到吗？

我们来试试

```javascript
var mypromise = new Promise((resolve, reject) => {
  // 不跟你多bb，直接拒绝
  reject({ error: 'Promise1 rejected!' });
});

// 打印：'Promise1 rejected!'
mypromise
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);

    return new Promise((resolve, reject) => {
      // 直接 resolve
      resolve({ status: 1, log: 'Promise1 resolved' });
    });
  })
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);
  })
  .catch(err => {
    console.log(err.error)
  });
```

看来 catch 能抓到第一个 error。

那么如果我们 reject 两个 Promise 呢？

```javascript
var mypromise = new Promise((resolve, reject) => {
  // 不跟你多bb，直接拒绝
  reject({ error: 'Promise1 rejected!' });
});

// 打印：'Promise1 rejected!'
mypromise
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);

    return new Promise((resolve, reject) => {
      // 这里也不多bb，直接拒绝
      reject({ error: 'Promise2 rejected!' });
    });
  })
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);
  })
  .catch(err => {
    console.log(err.error);
  });
```

我们可以发现，catch 只会抓到第一个 Promise 的 rejection。

那么如果我们再添加一个 catch 方法呢？

```javascript
var mypromise = new Promise((resolve, reject) => {
  // 不跟你多bb，直接拒绝
  reject({ error: 'Promise1 rejected!' });
});

// 打印：'Promise1 rejected!'
mypromise
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);

    return new Promise((resolve, reject) => {
      // 这里也不多bb，直接拒绝
      reject({ error: 'Promise2 rejected!' });
    });
  })
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);
  })
  .catch(err => {
    console.log(err.error);
  })
  .catch(err => {
    console.log(err.error)
  });
```

卧槽，Promise2 的 rejection 还是没有抓到。

那会不会是顺序的问题呢？让我们把一个 catch 移到 then 前面试试。

```javascript
var mypromise = new Promise((resolve, reject) => {
  // 不跟你多bb，直接拒绝
  reject({ error: 'Promise1 rejected!' });
});

/**
 * 打印：'Promise1 rejected!'
 * 然后打印：'Second then!'
 * 然后打印：'Second catch'
 * 然后打印：undefined
 */
mypromise
  .then(result => {
    const { status, log } = result;
    if (status) console.log(log);

    return new Promise((resolve, reject) => {
      // 这里也不多bb，直接拒绝
      reject({ error: 'Promise2 rejected!' });
    });
  })
  .catch(err => {
    console.log(err.error);
  })
  .then(result => {
    console.log('Second then!');
    const { status, log } = result;
    if (status) console.log(log);
    console.log('Second then x2!');
  })
  .catch(err => {
    console.log('Second catch');
    console.log(err.error);
  });
```

等一下，卧槽，这不对啊，为什么打印的结果这么奇怪啊！！！

我们一步一步来看。

首先 Promise1 reject，被第一个 catch 逮住，然后打印 'Promise1 rejected!'，没毛病。

接着，第二个 Promise 应该被拒绝了啊，为什么 then 方法还是会被触发啊？

这是 Promise 的特性。当我们拥有 `mypromise.then().catch().then()` 的链条时，无论之前发生了什么，第二个 then 都会执行。而在这里第二个 Promise reject 了，可是这和我周树人有什么关系呢？因此，'Second then!' 会被打印。

那么问题来了，为什么 'Second then x2!' 没有被打印？

因为对于第二个 then 来说，它虽然执行了，但根本没有拿到东西啊（注意，第二个 then 的参数的函数的参数，也就是 result 能不能拿到东西，和 Promise2 是否为 rejected 还是 resolved 无关，就算 Promise2 resolve 了，它还是拿不到东西）。所以 result 其实等于 undefined。

因为 result === undefined，你想要解构 undefined，这没办法解构啊，会报错的，就相当于 throw 了一个 TypeError。

可是程序没有报错啊…… 因为被下面的 catch 给抓住了。

这也就是为什么第二个 catch 会被执行，'Second catch' 被打印，而 'Second then x2!' 没有被打印。

听上去很复杂？是很复杂。所以，我们最好不要这么写链式调用。

**请认准链式调用的合理格式：**

`mypromise.then().then().then().catch()`

一个 catch 就能够抓住之前所有的 rejection。

但是这么写的问题就是，当一个 Promise 被 reject 后，之后的 then 全部不会执行。

## Promise.all

`Promise.all(iterable)`

这玩意儿的参数可以不是数组，只要是可迭代的就行。

但很显然用数组最容易理解，所以我们这里就用数组了。

然后只有当这玩意儿作为参数的数组里，所有的 Promise 都 resolve 了，它的 then 方法才会被触发。只要有一个 Promise reject，就会触发它的 catch 方法。

这玩意儿可以用来发送异步请求，然后将返回的内容按发送的顺序返回。

见以下的例子：

```javascript
const promises = [];

for (let i = 0; i < 10; ++i) {
  /**
   * 每次，随机生成 0~9 的整数，然后经过那个整数的时间后，resolve
   * 以此来模拟发送请求，因为每个请求的返回时间都是不同的
   */
  const promise = new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * 10);
    setTimeout(() => {
      resolve({ index: i, time: num });
    }, num * 1000);
  });

  promises.push(promise);
}

Promise
  .all(promises)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
```

最终的结果：

![Promise.all](/promise-all.png)

我们可以看见，每个 Promise 执行的时间不一样，但是它们返回的顺序，还是原来数组的顺序。

同样的效果，如果用 async + await 来实现，所花的时间是这些时间相加。

而如果用 Promise.all，所花的时间是这些时间中的最大值。

## Promise.race

`Promise.race(iterable)`

当 iterable 参数里的任意一个 Promise reject 或者 resolve 后，这玩意儿也会相应地 reject/resolve。

可以用来设置”请求超时“：当我们发送一个请求后，如果5秒后请求还没有响应，那么我们就停止接收该请求的响应，并且发送一个”请求超时“的提醒。

```javascript
// 用 setTimeout 来模拟
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success!');
  }, 3000);
});

/**
 * 设置第二个 Promise
 * 目的是为了和 发送请求 竞速
 */
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Request timeout!');
  }, 2000);
});

Promise
  .race([promise1, promise2])
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    // 在这里，会打印 'Request Timeout'
    console.log(err);
  });
```

## Promise.resolve

`Promise.resolve(value)`

这玩意儿一般来说会返回一个 Promise 的实例，并且已经处于 resolved 状态，value 就是 then 的参数的函数的参数（result）

但是在不同的情况下，这玩意儿返回的东西是不同的。

### 参数是 Promise 实例

Promise.resolve 将不做任何修改、原封不动地返回这个实例

```javascript
// 一秒后执行 reject
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('rejected!');
  }, 1000);
});

/**
 * 一秒后会打印：'rejected'
 * 这里并不是说调用了 Promise.resolve 就会 resolve 这个 Promise
 * 而是不作任何修改，直接返回原来的 promise
 */
Promise
  .resolve(promise)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
```

### 参数是具有 then 方法的对象

Promise.resolve 会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法

```javascript
const thenable = {
  then: (resolve) => {
    setTimeout(() => {
      resolve('resolved!');
    }, 3000);
  }
}

/**
 * 会在三秒后打印：'resolved'
 * 在上面的例子里，then 的值就相当于是 
 * new Promise(callback) 里的 callback 函数
 */
Promise
  .resolve(thenable)
  .then(result => {
    console.log(result);
  });
```

### 其余情况

Promise.resolve 方法返回一个新的 Promise 对象，状态为resolved，result 为参数

```javascript
// 会打印：{ status: 1, log: 'resolved' }
Promise
  .resolve({ status: 1, log: 'resolved' })
  .then(result => {
    console.log(result);
  });
```

### 执行时机

立即 resolve 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

`new Promise(resolve => { console.log(1); })` 比  
`Promise.resolve().then(() => console.log(2))` 要快，  
因为 new Promise 里面的 console.log() 在主线程里被调用（这个其实不难理解）

## Promise.reject

`Promise.resolve(value)`

这位仁兄就没有上面那么多幺蛾子了，直接返回一个状态为 rejected 的 Promise 实例。

```javascript
const thenable = {
  then: (resolve) => {
    setTimeout(() => {
      resolve('resolved!');
    }, 3000);
  }
}

// 会直接打印 thenable 对象：{ then: [Function: then] }
Promise
  .reject(thenable)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
```

## 参考资料

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

<Disqus />