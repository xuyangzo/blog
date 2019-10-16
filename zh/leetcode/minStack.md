---
tags: ['LeetCode', 'Top 100 Liked', '面试问题 - 算法']
---

# 最小栈

> Posted: 09.20.2019

<Tag />

## 描述

![Min Stack](/minStack.png)

## 算法

- 核心思想是用聪明的方式记录最小值
- push 方法
  - 如果当前元素 <= 最小值，把最小值 push 到栈里，并且更新最小值 = 当前元素
  - 接着，把当前元素 push 到栈里（这一步是不管怎样都要做的）
  - 在这么做之后，如果当前元素 <= 最小值，我们就会多 push 一个元素到栈里
    - 这个额外的元素就是前一个最小值
    - 也就是，如果当前元素（新的最小值）被 pop 后，最小的就是这个额外的元素
- pop 方法
  - 首先 pop 一次，然后查看它是否等于当前的最小值
  - 如果是的话，就再 pop 一次，然后把 pop 出来的值设置成新的最小值
    - 因为如果 pop 出来的元素等于当前的最小值，这意味着下一次 pop 出来的值就是我们之前 push 的时候，额外 push 进去的，之前的最小值
    - 当我们第二次 pop 的时候，首先我们去掉了这个额外 push 进去的元素，这样就不会影响接下来的 pop 操作
    - 然后，我们得到的 pop 的值，就是当前元素被移除了之后，新的最小值
    - 因此我们需要把当前的最小值给设置成这个新的最小值
- getMin 方法
  - 只需要返回 this.min
    - 因为我们 push 的时候，都会把 this.min 给更新成最小的值，因此可以保证 this.min 就是最小值
- top 方法
  - 只需要返回栈的 top
    - 我们可以保证栈的顶端没有重复的元素
    - 因为我们每次 pop 的时候都会额外 pop 一次，把之前 push 进去的额外的元素给 pop 掉

## 代码

```javascript
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.min = Number.MAX_VALUE;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if (x <= this.min) {
        this.stack.push(this.min);
        this.min = x;
    }
    this.stack.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if(this.stack.pop() === this.min) this.min = this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min;
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

<Disqus />