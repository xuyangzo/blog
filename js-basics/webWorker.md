---
tags: ['DOM', 'Interview Problems']
---

# Web Worker

> Posted: 09.27.2019

<Tag />

## Introduction

We know JS is single-threaded.

But sometimes we want to use the multi-thread functionality.

Because large scale of computation will severely affect the efficiency: sometimes, if the page does not respond for a long time, it might becase it is doing computation.

Web Worker is a isolated thread from the main thread (this is one of the features of HTML5).

The main thread can create Worker thread, and assign some tasks to it.

The Worker thread runs behind the scene and does not interfere with the main thread.

It will not be interfered also by events triggered in main thread, like button click, form submit, etc.

Once the Worker thread finishes its task, it returns the result back to the main thread.

The advantage is, for computation intensive tasks, the Worker thread is responsible for that, which makes the main thread smooth.

## Limitations

1. Same Origi: the script Worker thread uses should have the same origin as the main thread
2. DOM: the global object of Worker thread is different from that of the main thread, so it cannot have access to the window object of the main thread. But it can have access to navigator and location object (namely BOM objects)。<span style="color: palevioletred">**（Therefore, Worker is mostly used for calculation）**</span>
3. Transmission: Main thread and Worker thread cannot directly communicate with each other
4. Script: Worker thread cannot execute alert() and confirm() method, but it can send AJAX with XMLHttpRequest
5. File: Worker thread cannot load local files, so the script should have a protocol of http

## Real Example

### Setup Environment

We first create an HTML file and display a simple animation

<div class="container"></div>
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
.container {
  width: 0px;
  height: 100px;
  animation: flashAndGrow 2s ease-in-out infinite;
}
</style>

We can see that the animation is smooth.

Then we calculate prime numbers up to 100 and print them on the DOM.

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

Result:

![prime 100](/prime-100.gif)

We can see that the animation is smooth (the image might looks not smooth, but it is because of the fps limitation during convert from video to gif. The page itself is completely smooth).

We can see that calculation of primes numbers up to 100 does not affect the page at all.

So, what about we raise the number from 100 to 600,000? (We will only calculate here and do not append the result on DOM)

![prime 60w](/prime-60w.gif)

We can see that, at the beginning the animation is smooth, but after we raised the number from 100 to 600,000, the page is just stuck.

The animation stuck and we cannot do anything.

This is because the browser is calculating, all other tasks are blocked.

After 30 seconds, the calculation finished and the page recovers.

### Using Web Worker

First we create a file named `worker.js`

#### Main Thread

```javascript
/**
 * Create Worker thread
 * The paramter of constructor of Worker() is a script
 * Worker cannot read local files, so this script must use http protocol
 * I use liver server here
 */
var worker = new Worker('worker.js');

// Send message to Worker thread, parameter is the up to target
worker.postMessage(600000);

// Listen to events through the onmessage method
worker.onmessage = function (event) {
  for (let i = 0; i < 50; ++i) {
    document.querySelector('.result').innerHTML += 'Received message! <br/>';

    // append 50 prime numbers in reverse order
    document.querySelector('.result').innerHTML += event.data[event.data.length - i - 1] + '<br/>';
  }
  
  // After finishing, need to terminate the thread in order to save resources
  worker.terminate();
}
```

#### Worker Thread

```javascript
/**
 * Use onmessage method to listen to events from the main thread
 */
this.onmessage = function (e) {
  this.postMessage(countPrimeNumber(e.data));

  // Close worker in order to save resources
  this.close();
};
```

#### Result

![worker 60w](/worker-60w.gif)

We can see, first we calculate prime numbers up to 100, then we change it to 600,000.

The calculation also takes about 30 seconds.

But during such process, the page is not affected and the animation is smooth all the time.

<span style="color: palevioletred">**This is when you should use web worker**</span>

## Reference

[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

<Disqus />