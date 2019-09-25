---
tags: ['LeetCode', 'Top 100 Liked']
---

# Min Stack

> Posted: 09.20.2019

<Tag />

## Description

![Min Stack](/minStack.png)

## Algorithm

- Key idea is track min value
- For push method
  - If current value <= min, push min to stack and update min
  - Then, always push current value
  - After this step, if current value is a new min value, we always push one extra item
  to the stack, right before current value, and we need to deal with this extra item later
    - The extra item is previous min value, which means if current min value does not exist 
    (or popped), this extra item will be this.min
- For pop method
  - First pop once and check if it equals min
    - If so, pop again and set this.min to the new popped value
      - Because if current value equals to this.min, then the previous min is right before it
      - By popping again, we get previous min, and this previous min is the min value of current 
      stack, therefore we need to set this.min to this previous min
- For getMin method
  - Just return this.min
    - Because during the push process, we keep updating this.min, so this.min is min value
- For top method
  - Just return top of stack
    - Top of stack will not have extra items we push to the stack because every time we pop
    current min from the stack, we will then pop the extra item immediately

## Code

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
    // only push the old min value when current min value changes after
    // pushing the new value x
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
    // if pop operation could result in the changing of the current 
    // min value, pop twice and change the current minimum value 
    // to the last minimum value.
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