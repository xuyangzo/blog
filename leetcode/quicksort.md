---
tags: ['排序算法', '面试问题 - 算法']
date: 10.04.2019
image: /images/quicksort-intro.jpg
description: 和别人的菜鸡代码不一样，老子带你优化空间
---

# 快速排序（空间优化）

> Posted: 10.04.2019

<Tag />

## 介绍

较为复杂的排序方法，时间复杂度为 `O(nlogn)`。

时间复杂度的计算方式：递归 logn 层，每层比较 O(n) 次。

但这只是平均和最好的时间复杂度。

在最坏的情况下，快排的时间复杂度为 O(n^2)

- 最坏的情况就是每次 partition 都只能分成 pivot + 剩余数组，这样就是冒泡排序
- 最好的情况就是每次 partition 都能均分，时间复杂度为 O(nlogn)

稳定性：不稳定

## 代码实现

> 核心思想：分治法（Divide and Conquer）

有一说一，你能在百度上搜到的用 JS 做快速排序的代码，都tm用的 slice 和 concat。

这样完全就是在浪费空间，因为这么做的空间复杂度为 O(nlogn)。

然而最优的写法，空间复杂度为是 O(logn)。

至于空间复杂度的计算方式，和时间复杂度一样，递归 logn 层，乘以每层花费的空间。

也就是说，对于空间最优的算法来说，在每层都花费 O(1) 的空间。

```javascript
// 对于这种空间复杂度优化的算法来说，swap 是必须的
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * 对于这种空间复杂度优化的算法来说，helper 函数是必须的
 * 因为我们需要用两个指针来指明当前数组开始和结束的位置
 */
function quickSortHelper(arr, l, r) {
  // base case
  if (r - l < 1) return;
  if (r - l === 1) {
    if (arr[l] > arr[r]) swap(arr, l, r);
  }

  /**
   * 这个时候我们需要 partition 了
   * 先选择 pivot（选择 pivot 的方法也有讲究）
   * 
   * 选择三个点：头、尾、中间，取这三者的中位数作为pivot
   * 这也是一种优化，比直接选【头/中间/尾】的算法要牛逼
   * 可以用来向面试官展示你的与众不同之处
   */
  const mid = Math.floor((l + r) / 2);
  if (arr[l] > arr[mid]) swap(arr, l, mid);
  if (arr[l] > arr[r]) swap(arr, l, r);
  if (arr[mid] > arr[r]) swap(arr, mid, r);

  /**
   * 现在，arr 的三个点已经排序完毕了，pivot 就在 mid 的位置
   * 然后把 mid 上的元素（pivot）给 swap 到数组的末尾
   * 这么做是为了在 partition 的过程中更加方便
   */
  swap(arr, mid, r);
  const pivot = arr[r];

  /**
   * 接下来开始区分左侧的部分与右侧的部分
   * 算法是这样的：
   * 
   * - 从位置 l 开始，先设置 s(start) = e(end) = l
   * - while e < r 
   *   - 如果当前的元素（arr[e]）>= pivot，那就 e++
   *   - 否则，就 swap(s, e)，然后 s++, e++
   * - 在最后，还需要 swap(s, e)
   * 
   * 该算法正确，是因为
   * 1. 在当前元素比 pivot 大的时候 e++，因此当下次碰见比 pivot 小的元素时，
   *    [s, ..., e-1] 这一部分的数组都比 pivot 大（或者等于）
   * 2. 然后，在碰见比 pivot 小的元素时，swap(s, e) ，也就是把比 pivot 小的元素
   *    给 swap 到了比 pivot 大的元素左边，而当前 s 的位置，就是区分左右部分的位置
   * 3. 接着，s++，e++，此时 s 所在的位置就是右侧部分的开始，e 所在的位置则是“遇见”
   *    了一个之间没见过的元素，然后又需要从步骤1开始做起
   * 4. 在这些杂七杂八的都做完后，s 所在的位置就是右侧部分的开始，s 所在位置左边的所有
   *    元素都比 pivot 小，而 e 则是已经抵达了 pivot 的位置。这个时候 swap(s, e)，
   *    就相当于把 pivot 给 swap 到了左侧部分结束位置的下一个位置
   * 5. 因此，pivot 现在在正确的位置上，其左侧的内容比它小，右侧的内容比它大
   * 6. 所有的操作就是在原数组上操作，没有新建空间，但 swap 的操作会消耗空间（每次都要建temp），
   *    而在每一层都有 O(n) 次 swap，所以在每一层的空间复杂度都是 O(n)....真的是这样吗？
   * 7. 想知道答案的话，请往下看
   */
  let s = e = l;
  while (e < r) {
    if (arr[e] >= pivot) e++;
    else {
      swap(arr, s, e);
      s++;
      e++;
    }
  }

  swap(arr, s, e);
  /**
   * 现在，pivot 就在 s 的位置
   * partition 完成了，pivot 左侧比其小，右侧比其大
   * 因此，继续递归，递归的方式就是传递 l 和 r
   */
  quickSortHelper(arr, l, s - 1);
  quickSortHelper(arr, s + 1, r);
}

function quickSort(arr) {
  // edge case
  if (!arr || !arr.length) return [];

  // 调用 helper 函数
  quickSortHelper(arr, 0, arr.length - 1);

  return arr;
}
```

<span v-red>**那么问题就来了，到底为什么这种算法的空间更优呢？**</span>

## 一般人的写法

在解决这个问题前，我们先来看一下一般人的写法。

```javascript
// 为了取 median of three
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function quickSort(arr) {
  // edge case
  if (!arr || !arr.length) return null;

  // base case
  if (arr.length < 2) return arr;

  // 选择三个点：头、尾、中间，取这三者的中位数作为pivot
  const mid = Math.floor(arr.length / 2);
  if (arr[0] > arr[mid]) swap(arr, 0, mid);
  if (arr[0] > arr[arr.length - 1]) swap(arr, 0, arr.length - 1);
  if (arr[mid] > arr[arr.length - 1]) swap(arr, mid, arr.length - 1);

  // 现在，arr的三个点已经排序完毕了，pivot就在mid的位置
  const pivot = arr[mid];
  const left = [];
  const right = [];

  // left
  for (let i = 0; i < mid; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  // right
  for (let i = mid + 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return quickSort(left).concat([pivot], quickSort(right));
}
```

你能百度到的，都是这种算法。

这种算法当然没什么大问题。

这种算法能让面试官满意，但我们更希望面试官觉得 `这崽种还挺有东西`，不是吗？

## 空间，空间！！

我们来做一个简单的实验，用两种算法分别排序一个长度为五千万的数组。

```javascript
const arr = [];
for (let i = 50000000; i >= 0; --i) {
  arr.push(i);
}
quickSort(arr);
```

我的算法所花费的时间：

![quicksort nb](/images/quicksort-nb.png)

这里加上了初始化数组的时间。

emmm...但看这个好像也不知道表现怎么样。

我们再来看看一般人的算法。

![quicksort cai](/images/quicksort-cai.png)

<span v-red>**卧槽！！内存溢出了！！**</span>

这是为啥？？？明明是一模一样的数组啊？？？

好吧，下面来说明为什么我的算法空间复杂度为O(logn)。（当然我估计聪明的读者已经想到了）

因为在我的算法里，虽然每次 swap 的时候都会创建 temp 这个变量，但是每次 swap 函数执行完之后，由于出了函数作用域，本地变量被销毁，垃圾回收器从 root 出发，无法到达 temp，因此分配给 temp 的内存无法被打上标记，会在下个垃圾回收机制的循环开始时被删除。

因此，虽然的确，每层都进行了 O(n) 次比较，但是每次 swap 之前，上一个 swap 时分配给 temp 的内存会被清除，因此每个时间点，其实都只有一个玩意儿占据了 O(1) 的空间。

因此每层递归的所花的空间为 O(1)。

**怎么样，看到这里是不是豁然开朗了？**

<span v-red>**下次面试被问到，就把这玩意儿砸面试官脸上吧（笑**</span>

<Chirpy />