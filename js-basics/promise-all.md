---
tags: ['ES6', '面试问题 - JS']
date: 08.25.2020
image: /images/promise-all.jpeg
description: 很 tricky 的一个问题
---

# 手动实现 Promise.all

> Posted: 08.25.2020

<Tag />

## 介绍

Promise 大家应该都懂，Promise.all 相信大家也都用过。本来我以为会用就够了，结果在刷面经的时候偶然发现了这么一个问题：

**怎么手动实现 Promise.all ？**

我想了一下，没有想到什么好的方法。后来专门去研究了一下。

仔细分析一下，我们要实现的功能，本质上就是一个大的 Promise。在这个 Promise 里，我们需要在所有的小 Promise 被 resolve 的时候，
resolve 这个大的 Promise。并且在一个小的 Promise 被 reject 之后，reject 大的 Promise。

因此，问题的关键就在于，<span v-red>怎么确定什么时候该 resolve，什么时候该 reject。</span>

从一个宏观的层面上来说，我们可以这么做：

1. 设置一个变量 len 来记录当前有多少个 Promise 还没处理
2. 当一个小的 Promise resolve/reject 之后，记录其的输出，并且 len--
3. 当 len === 0 的时候，我们判断究竟要 resolve 还是 reject 整个大的 Promise

那么问题其实就被拆分成了很多小的部分，其中最大的问题是：我要怎么知道 len 变成 0 了？

这个时候就需要引入 ES6 一种新的 API，`Proxy`。


## 代码实现

```javascript
Promise.myall = function () {
  /**
   * 读取参数
   * 这里就不做校验了，感兴趣的可以自己做
   */
  const promises = arguments[0];

  return new Promise((resolve, reject) => {
    // 如果最后所有的小 Promise resolve 了，ans 就是我们需要 resolve 的内容
    const ans = new Array(promises.length);
    /**
     * len 代表了还剩多少 Promise 没被处理
     * errFlag 代表了是否有 Promise 被 reject 了
     */
    let len = {
      len: promises.length,
      errFlag: false
    };
    /**
     * 创建一个 Proxy 来监控 len 的改变
     * 每当 len 这个对象被 update 时，setter 会被触发
     * 注意，proxy 必须在迭代 Promise 之前创建，因为接下来要用
     */
    const proxy = new Proxy(len, {
      set: function (target, key, value) {
        // 进行 update
        target[key] = value;

        // 如果某个 Promise 被 reject 了，那么我们立刻 reject 大的 Promise
        if (key === 'errFlag' && value === true) {
          reject(errObject);
        }

        /**
         * 如果所有 Promise 都已经 resolve/reject 了
         * 我们就可以 resolve 最后的数组了
         */
        if (value === 0) {
          resolve(ans);
        }
      }
    });

    // 设置一个 errObject 来记录 reject 的内容
    let errObject;
    for (let i = 0; i < promises.length; ++i) {
      promises[i]
        .then(data => {
          ans[i] = data;
          // 这里通过 proxy 进行 update
          proxy.len--;
        })
        .catch((err) => {
          if (!errObject) errObject = err;
          proxy.errFlag = true;
          proxy.len--;
        });
    }
  });
}
```

## 检查

我们将利用 async await 来检查我们上面的方法。

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 5000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 3000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
});

// record time
const hrstart = process.hrtime();

(async function () {
  try {
    const data = await Promise.myall([promise1, promise2, promise3]);

    console.log('resolve!');
    console.log(data);
    console.log('================');

    // measure time
    const hrend = process.hrtime(hrstart);
    console.info('所花时间: %ds %dms', hrend[0], hrend[1] / 1000000);


  } catch (e) {
    console.log('reject!');
    console.log(e);
    console.log('================');

    // measure time
    const hrend = process.hrtime(hrstart);
    console.info('所花时间: %ds %dms', hrend[0], hrend[1] / 1000000);
  }
}())
```

resolve:

![promise-all-resolve](/images/promise-all-resolve.png)

reject:

![promise-all-reject](/images/promise-all-reject.png)

完美！

<Chirpy />