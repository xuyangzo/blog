---
tags: ['Data Structure']
---

# Priority Queue with ES6

> Posted: 09.20.2019

<Tag />

## Methods to Implement

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

## Implementation

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

  // swap elements in pq
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

    // need to recursively swap with parent
    // if parent is greater than current element
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

    // compare with left child
    if (leftChild < heap.length && 
        this.compare(heap[leftChild], heap[parent])) 
    {
      parent = leftChild;
    }

    // compare with right child
    if (rightChild < heap.length &&
        this.compare(heap[rightChild], heap[parent]))
    {
      parent = rightChild;
    }

    // need to recursive swap current node with the greater child until end
    // or both children are greater than current node
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
    // push to heap (add to end)
    this.heap.push(val);
    // then trickle up
    this._up(this.heap.length - 1);
  }

  pop() {
    const { heap } = this;
    if (heap.length === 1) return heap.pop();

    // pop top element and replace it with the last element
    const top = heap[0];
    heap[0] = heap.pop();
    // trickle down from root
    this._down(0);
    return top;
  }
}
```

## Result

```javascript
// default comparator
input: [ -5, 4, 3, -2, 1, -1, 0, 5, -3, 2, -4 ]
output: [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5 ]
```

```javascript
// custom comparator
function compare(a, b) {
  return b > a ? true : false;
}

input: [ -5, 4, 3, -2, 1, -1, 0, 5, -3, 2, -4 ]
output: [ 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5 ]
```

```javascript
// another example of custom comparator
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