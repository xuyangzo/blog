---
tags: ['DOM相关', '工具的使用']
date: '09.23.2019'
---

# 浏览器中 console.log 的打印问题

> Posted: 09.23.2019

<Tag />

## 发现问题

考虑以下的代码：

```javascript
const obj = {
  a: 1
};
console.log(obj);

obj.a = 2;
console.log(obj);
```

很显然，控制台应该打印 '{ a: 1 }' and then '{ a: 2 }' 因为 `console.log` 是同步的。

当然，在 Node 环境下确实是这么打印的：

![node](/node.png)

但在浏览器环境下，包括 Chrome，Firefox 等一系列浏览器，其控制台打印的东西似乎不太对...

Chrome:

![chrome](/chrome.png)

Firefox:

![firefox](/firefox.png)

## 问题和解释

### 问题

问题是，浏览器的控制台的确会正确地打印 '{ a: 1 }' and '{ a: 2 }'

但是当我们点击下箭头，想要查看具体的对象时，其展示的值是不对的  
—— 或者更准确地说，其所展示的值是最终的值，而不是该对象被打印时候的值。

### 解释

这是因为当浏览器想要追踪一个对象时，它会记录该对象的地址，而不是值。

在打印的时候，一切的确是同步的，因此打印的结果没有问题。

但是当查看具体的对象时，浏览器通过该对象的地址，找到了它，然后展示它的值。  
在这个时候，该对象的值已经是它 final state 的值了，而不是打印时的值。

## 解决方案

### 代码

如果想要在打印时，查看该对象当时的属性，则需要深拷贝该对象。

关于深拷贝，可以参考：[深拷贝](/js-basics/deepcopy.md)

```javascript
const obj = {
  a: 1
};
// 深拷贝
console.log(Object.assign({}, obj));

obj.a = 2;
console.log(obj);
```

### 结果

Chrome:

![chrome-2](/chrome2.png)

Firefox:

![firefox-2](/firefox2.png)


<Disqus />