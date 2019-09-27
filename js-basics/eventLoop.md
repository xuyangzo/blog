---
tags: ['JS Basics', 'Interview Problems']
---

# Browser's Event Loop

> Posted: 09.26.2019

<Tag />

## Introduction

> The content is most from: [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)  
> If you understand Chinese, please directly read this article

JS is single-threaded. (For multi-thread, please refer to [Web Worker](/js-basics/webWorker.md)）.

That's why JS has Event Loop.

## Event Loop

![event loop](/event-loop.png)

**When a task enters execution stack, check whether it is synchronous or asynchronous**

- If synchronous
  - Push to main thread and execute
  - During such period, only execute this task
- If asynchronous
  - Push to Event Table, and register callback functions
  - When triggered, push to Event Queue
    - Different types of tasks will be pushed to different Event Queues
  - When main thread is idlem, check if there are asynchronous tasks in Event Queue. If so, push them to main thread

## Microtask vs. Macrotask

**Macrotask**：script(overall code)，setTimeout，setInterval  
**Microtask**：Promise，process.nextTick

When pushing asynchronous events to Event Queue:

- Macrotasks will be pushed into Event Queue for macrotasks
- Microtasks will be pushed into Event Queue for microtasks

Their execution order is the following:

1. Execute **ONE** macrotask
2. Execute all microtasks
3. Repeat 1~2 until there is no macrotask

![microtask and macrotask](/microtask.png)

## Execution Order

The execution order is top first from top to bottom

1. **process.nextTick**：Before end of execution stack
2. **Promise.resolve**：Before end of this Event Loop
3. **setImmediate**：Push to current Event Queue, so always execute at next Event Loop
4. **setTimeout**：Push to current Event Queue for macrotasks, so always execute at next Event Loop, after synchronous tasks and all other tasks in Event Queue are finished

## Reference

[这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

<Disqus />