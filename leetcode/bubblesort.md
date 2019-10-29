---
tags: ['排序算法', '面试问题 - 算法']
date: 10.01.2019
image: /bubblesort-intro.jpeg
description: 这年头还有人不会冒泡排序？（对，就是我）
---

# 冒泡排序

> Posted: 10.01.2019

<Tag />

## 介绍

最简单的排序方法，时间复杂度为 `O(n^2)`

稳定性（两个数值一样的元素，在排序后，其相对的顺序有没有改变，没有就是稳定）：稳定

## 代码实现

> 核心思想，如果相邻的两个数顺序相反，就 swap，然后一直重复该操作

```javascript
function bubbleSort(arr) {
  // edge case
  if (!arr || !arr.length) return [];

  /**
   * 第一个for loop（i）用来记录遍历的次数
   * 每次都将那个遍历里最大的 element 移到末尾
   * 所以需要 length-1 次
   */
  for (let i = 0; i < arr.length - 1; i++) {
    /**
     * 第二个for loop（j）用来记录当前遍历的，当前元素
     * 如果该元素比下一个元素大，那么便 swap 他们
     */
    for (let j = 0; j < arr.length - 1 - i; j++) {
      /**
       * 这里因为是 > 而不是 >=，所以是稳定的
       * 否则就是不稳定的（所以稳定性是相对的）
       */
      if (arr[j] > arr[j + 1]) {
        arr = swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}
```

<Disqus />