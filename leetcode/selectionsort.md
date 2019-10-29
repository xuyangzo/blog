---
tags: ['排序算法', '面试问题 - 算法']
date: 10.01.2019
image: /selectionsort-intro.png
description: 选择排序用得比较少，但会还是要会啊
---

# 选择排序

> Posted: 10.01.2019

<Tag />

## 介绍

较为简单的排序方法，时间复杂度为 `O(n^2)`

稳定性：不稳定

## 代码实现

> 核心思想：从未排序的数组里找到最小的数，然后放到最前面

```javascript
/**
 * 在每个循环执行一次后，选择排序会有如下的保证
 * 1. 左侧的子数组，已经排序好了
 * 2. 右侧的子数组，其中的每一个数都比左侧的子数组大
 * 因此，在最终达到数组结尾的时候，其可以保证整个数组都被排序了
 */
function selectionSort(arr) {
  // edge case
  if (!arr || !arr.length) return [];

  let minIndex = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    // 找到未排序的子数组里，最小的数
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    /**
     * 不稳定，因为把 i 位置的元素 swap 到后面了
     * 因此，i 位置的元素，相对于未排序数组里的其它元素
     * 位置发生了改变，这会导致不稳定性
     */
    arr = swap(arr, i, minIndex);
  }

  return arr;
}
```

<Disqus />