---
tags: ['排序算法', '面试问题 - 算法']
date: 10.01.2019
image: /images/insertionsort-intro.jpg
description: 插入排序用得还是挺多的，学会很重要
---

# 插入排序

> Posted: 10.01.2019

<Tag />

## 介绍

较为简单的排序方法，时间复杂度为 `O(n^2)`

但这是 Big-O Notation，在实际的应用场景中，对于比较小的数组来说，插入排序是比快排之类的 O(nlogn) 的排序算法要快的。  

因为快排在递归中的消耗还是比较大的，所以很多时候，快排递归到比较短的数组了，就用插入排序，这样的效率非常高。

稳定性：稳定

## 代码实现

> 核心思想：选择没有排序的子数组里第一个元素，然后插入到排序好了的子数组里

```javascript
function insertionSort(arr) {
  // edge case
  if (!arr || !arr.length) return null;

  // 每次遍历，i 都指向了未排序的子数组的开头
  for (let i = 0; i < arr.length; i++) {
    /**
     * 把未排序的子数组的开头设置成 key
     * 目的就是把 key 插入到排序的子数组中，合适的位置
     */
    let key = arr[i];
    // j 用来记录排序的子数组的末尾
    let j = i - 1;

    /**
     * 对于排序的子数组，从后往前遍历
     * 如果当前元素比 key 大，那么就把该元素向后移一位
     * 这样如果当前元素比 key 小，那么就说明 key 到了正确的位置
     */
    while (j >= 0 && arr[j] > key) {
      /** 
       * 因为最后一位是 i（key），所以不需要担心被覆盖
       * 在这过程中，排序的子数组和未排序的子数组的顺序都没变
       * 所以是稳定的
       */
      arr[j + 1] = arr[j];
      j--;
    }

    /**
     * 此时 j+1 就是 key 需要被插入的位置
     * 注意，不是 j，而是 j+1
     */
    arr[j + 1] = key;
  }

  return arr;
}
```

<Chirpy />