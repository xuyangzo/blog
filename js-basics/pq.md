---
tags: ['数据结构', 'ES6']
date: 09.20.2019
image: /images/pq-intro.jpg
description: 虽然不是面试题，但刷题会用到优先队列，JS 的话只能自己写了不是吗？
---

# 用 ES6 实现优先队列

> Posted: 09.20.2019

<Tag />

## 需要实现的方法

```javascript
/** 
 * Add to priority queue 
 * @param {number} val
 * @return {void}
 */
PriorityQueue.prototype.add(val);

/** 
 * Pop from stack and return popped value
 * @param {void}
 * @return {number}
 */
PriorityQueue.prototype.pop();

/** 
 * Return top value of Priority Queue
 * @param {void}
 * @return {number}
 */
PriorityQueue.prototype.top();

/** 
 * Return if Priority Queue is empty
 * @param {void}
 * @return {boolean}
 */
PriorityQueue.prototype.isEmpty();
```

## 实现

```javascript
// default comparator, minHeap
function defaultCompare(a, b) {
    return a < b ? true : false;
}

class PriorityQueue {
  constrcutor(compare = defaultCompare) {
    this.heap = [];
    this.compare = compare;
  }

  // 交换优先队列里两个元素的位置
  _swap(i, j) {
    const { heap } = this;
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  // trickle up
  _up(i) {
    const { heap } = this;
    const child = i,
          parent = Math.floor((i - 1) / 2);

    /**
     * 如果该节点 < 父节点（对于最小堆来说），需要交换该节点与其父节点
     * 然后通过递归反复执行，直到该节点 > 父节点 
     */
    if (parent >= 0 && this.compare(heap[child], heap[parent])) {
      this._swap(child, parent);
      this._up(parent);
    }
  }

  // trickle down from index i
  _down(i) {
    const { heap } = this;
    let parent = i,
        leftChild = i * 2 + 1,
        rightChild = i * 2 + 2;

    // 和左侧子节点比较
    if (leftChild < heap.length && 
        this.compare(heap[leftChild], heap[parent])) 
    {
      parent = leftChild;
    }

    // 和右侧子节点比较
    if (rightChild < heap.length &&
        this.compare(heap[rightChild], heap[parent]))
    {
      parent = rightChild;
    }

    /**
     * 如果该节点 > 左侧或者右侧的子节点，需要将它和较大的子节点交换
     * 通过递归一直执行，直到该节点 < 左侧以及右侧的子节点
     */
    if (parent !== i) {
      this._swap(parent, i);
      this._down(parent);
    }
  }

  top() {
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  add(val) {
    // 在 heap 的尾端添加新的节点
    this.heap.push(val);
    // 然后 trickle up
    this._up(this.heap.length - 1);
  }

  pop() {
    const { heap } = this;
    if (heap.length === 1) return heap.pop();

    // 获得 root，然后用最后的节点代替 root
    const top = heap[0];
    heap[0] = heap.pop();
    // 从 root 开始，trickle down
    this._down(0);
    return top;
  }
}
```

## 结果

```javascript
// 默认 comparator
input: [ -5, 4, 3, -2, 1, -1, 0, 5, -3, 2, -4 ]
output: [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5 ]
```

```javascript
// 自定义的 comparator，最大堆
function compare(a, b) {
  return a > b ? true : false;
}

input: [ -5, 4, 3, -2, 1, -1, 0, 5, -3, 2, -4 ]
output: [ 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5 ]
```

```javascript
// 自定义的 comparator
function compare(a, b) {
  if (a[0] === b[0]) {
    return a[1] < b[1] ? true : false;
  } else {
    return a[0] < b[0] ? true : false;
  }
}

input: [ [-1, 2], [-2, 3], [1, 2], [-1, 1], [-2, -4] ]
output: [ [-2, -4], [-2, 3], [-1, 1], [-1, 2], [1, 2] ]
```

<Disqus />