---
tags: ['DOM相关', '面试问题 - JS']
date: 10.08.2019
image: /counter-intro.jpeg
description: setInterval + requestAnimationFrame，都安排好了
---

# 倒计时器

> Posted: 10.08.2019

<Tag />

## 介绍

今天废话不多说，直接给大家写俩计时器。

至于为什么要写，因为这是面试题啊。

## setInterval

先用 setInterval 来实现。

一般面试的话都从这玩意儿起手。

```javascript
// 设置目标日期，并开始定时器
var target = new Date('2021/01/14 23:30:00');
var timer = setInterval(countDown, 1000);

function countDown() {
  // 计算
  var current = new Date();
  var diff = Math.floor((target - current) / 1000);
  var day = Math.floor(diff / 24 / 3600);
  var hour = Math.floor((diff / 3600) % 24);
  var minute = Math.floor((diff / 60) % 60);
  var second = Math.floor(diff - 3600 * 24 * day - hour * 3600 - minute * 60);

  // 判断是否需要添加 0 
  hour = hour < 10 ? '0' + hour: hour;
  minute = minute < 10 ? '0' + minute: minute;
  second = second < 10 ? '0' + second: second;
  
  document.getElementById('timer').innerHTML = 
    `${day}天 ${hour}小时 ${minute}分 ${second}秒`
}
```

### 结果

::: demo vue
<template>
  <div id="timer-interval">{{ time }}</div>
</template>

<style>
  #timer-interval {
    width: 220px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background: ghostwhite;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
</style>
:::

## requestAnimationFrame

首先，什么是 requestAnimationFrame？以及为什么要用它？

请参考我的这篇文章：[requestAnimationFrame](/js-basics/raf.md)

总之，简单来说，如果你用 requestAnimationFrame 写，那面试官就会觉得你很牛逼。

```javascript
var stopID;
var target = new Date("2021/01/14 23:30:00");

// 添加浏览器兼容支持 
var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame;
	
function repeat() {
  var current = new Date();
  var seconds = Math.floor((target - current) / 1000);
  
  // 计算，这是包含了毫秒的版本
  var day = Math.floor(seconds / 3600 / 24);
  var hour = Math.floor((seconds / 3600) % 24);
  var minute = Math.floor((seconds / 60) % 60);
  var second = Math.floor(seconds - day * 24 * 3600 - hour * 3600 - minute * 60);
  var mili = Math.floor(
  (
    target -
    current -
    day * 24000 * 3600 -
    hour * 3600000 -
    minute * 60000 -
    second * 1000) /
    10
  );
  
  // 检查是否需要添加 0 
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  mili = mili < 10 ? "0" + mili : mili;
  
  document.getElementsByClassName(
    "container"
  )[0].innerHTML = `${day}天 ${hour}小时 ${minute}分 ${second}秒 ${mili}毫秒`;
	
  // 通过 requestAnimationFrame 调用自己
  stopID = requestAnimationFrame(repeat);
}

// 开启复读
stopID = requestAnimationFrame(repeat);
```

### 结果

::: demo vue
<template>
  <div id="timer-request">{{ mytime }}</div>
</template>

<script>
  export default {
    data() {
      return {
        time: '初始',
        mytime: '初始',
        target: new Date('2021/01/14 23:30:00'),
        stopID: null
      }
    },
    methods: {
      countDown() {
        const current = new Date();
        const diff = Math.floor((this.target - current) / 1000);
        const day = Math.floor(diff / 24 / 3600);
        let hour = Math.floor((diff / 3600) % 24);
        let minute = Math.floor((diff / 60) % 60);
        let second = Math.floor(diff - 3600 * 24 * day - hour * 3600 - minute * 60);

        hour = hour < 10 ? '0' + hour: hour;
        minute = minute < 10 ? '0' + minute: minute;
        second = second < 10 ? '0' + second: second;
        
        this.time = `${day}天 ${hour}小时 ${minute}分 ${second}秒`;
        setTimeout(this.countDown, 1000);
      },
      repeat() {
        const current = new Date();
        const seconds = Math.floor((this.target - current) / 1000);
        
        // 计算，这是包含了毫秒的版本
        const day = Math.floor(seconds / 3600 / 24);
        let hour = Math.floor((seconds / 3600) % 24);
        let minute = Math.floor((seconds / 60) % 60);
        let second = Math.floor(seconds - day * 24 * 3600 - hour * 3600 - minute * 60);
        let mili = Math.floor(
        (
          this.target -
          current -
          day * 24000 * 3600 -
          hour * 3600000 -
          minute * 60000 -
          second * 1000) /
          10
        );
        
        // 检查是否需要添加 0 
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        mili = mili < 10 ? "0" + mili : mili;
        
        this.mytime = `${day}天 ${hour}小时 ${minute}分 ${second}秒 ${mili}`;
        
        // 通过 requestAnimationFrame 调用自己
        this.stopID = requestAnimationFrame(this.repeat);
      }
    },
    mounted() {
      // 添加浏览器兼容支持 
      var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame;
      this.stopID = requestAnimationFrame(this.repeat);
      this.countDown();
    }
  }
</script>

<style>
  #timer-request {
    width: 260px;
    text-align: left;
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    border-radius: 5px;
    background: ghostwhite;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
</style>
:::

<Disqus />