---
tags: ['JS题目', '面试问题 - 算法']
date: 10.01.2019
image: /js-problem-intro.jpg
description: 阿里笔试原题，当时我没做出来，希望能够给大家一些启发
---

# 平铺节点数组转嵌套树

> Posted: 10.01.2019

<Tag />

## 介绍

这道题是我碰见的，阿里笔试的原题。

当时没做出来，后来又花了一个多小时仔细钻研了一下，研究出了一个较为完美的答案。

然后把答案发给了面试官（这已经是笔试结束后的第二天了）。

面试官说“很好”。（但真的有多好我也不知道）

总之这道题的要求是这样的：

```javascript
/**
 * 平铺节点数组转嵌套树
 * 说明：将一个包含深度信息的节点数组转换成一棵树，要求只能遍历一次该数组
 * 输入值：TreeNode数组 TreeNode为包含title, depth(正整数，深度不限)字段的Object
 * 输出值：组装好的嵌套树，子节点挂载在对应父节点的children字段上
 */

/*
举例 (title字段仅为便于理解，实际无固定规则)
输入：[
  { title: '1', depth: 1 },
  { title: '1-1', depth: 2 },
  { title: '1-1-1', depth: 3 },
  { title: '1-1-2', depth: 3 },
  { title: '1-2', depth: 2 },
  { title: '2', depth: 1 },
  { title: '2-1', depth: 2 },
]
输出：[
  {
    "title": "1",
    "depth": 1,
    "children": [
      {
        "title": "1-1",
        "depth": 2,
        "children": [
          {
            "title": "1-1-1",
            "depth": 3
          },
          {
            "title": "1-1-2",
            "depth": 3
          }
        ]
      },
      {
        "title": "1-2",
        "depth": 2
      }
    ]
  },
  {
    "title": "2",
    "depth": 1,
    "children": [
      {
        "title": "2-1",
        "depth": 2
      }
    ]
  }
]
*/
```

## 代码实现

我这个实现，可以应对任意顺序的 input。

就相当于是把输入的数组顺序打乱，瞎鸡儿排，我这算法都能给他nen出来。

并且我的算法可以处理任意属性名（例子中是 title，但我的算法啥都行）。

```javascript
/**
 * 这道题的核心，就是把数组里的对象插入到合适的位置
 * 在这期间，要适时地添加 children 属性
 */
function arrayToTree(arr) {
  const ans = [];
  // 遍历数组
  for (let obj of arr) {
    // 对于每一个对象来说，拿到其除了 depth 以外的属性名
    let keyName = "";
    for (let key in obj) {
      if (key !== "depth") {
        keyName = key;
        break;
      }
    }

    /**
     * 通过递归来进行转换
     * 这里的 level 用来标记深度，格式就是 "title" 的内容
     */
    let level = obj[keyName];
    arrayToTreeHelper(ans, obj, keyName, level);
  }

  return ans;
}

/**
 * @params {Array} ans - 答案数组对应的对象里，应该包含当前 level 的 children
 * @params {Object} obj - input 数组里每一个单独的对象
 * @params {String} keyName - obj 里内容对应的属性名（相当于是"title"）
 * @params {String} level - 用来记录当前的层数
 * @return {void}
 */
function arrayToTreeHelper(ans, obj, keyName, level) {
  /**
   * level 的长度如果是1，那么则意味着下面之一：
   * 1. 该 level 的 title 一开始就是 "1"，"2" 之类的
   * 2. 或者该 level 原来是 "1-2-3"，然后传递到这一层，只剩下 "3"
   * 无论是那种情况，我们都需要插入到合适的位置
   */
  if (level.length === 1) {
    /**
     * 开始找插入的位置：
     * 这个时候我们已经在正确的 children 数组里了（递归到了这里）
     * 我们需要做的，就是找到我们这个 obj 在 children 数组里的位置
     * - pos 代表了 ans（children） 的 index
     * - currentTitle 代表了目前的 title
     */
    let pos = 0;
    let currentTitle = "";
    /**
     * 查看 ans（children）数组里，第一个元素的 keyName
     * 如果该 key 不是 depth，以及不是 children
     * 那么就把当前的 currentTitle 给设置成这个属性名
     * 这时候的 currentTitle 就相当于在 [2,3,4,6] 数组里按顺序插入5的时候
     * 第一个元素2，因为我们要设置一个在 [2,3,4,6] 里的标记
     * 这个 currentTitle 就相当于是记录了2，3，4，6，然后和当前的 title 比较
     */
    for (let key in ans[pos]) {
      if (key !== "depth" && key !== "children") {
        currentTitle = ans[pos][key];
        break;
      }
    }
    /**
     * 接下来开始遍历 ans，查看 要插入的元素是否比 currentTitle 大
     * 就相当于现在是 "1-2-2"，在 ["1-2-1" "1-2-3"] 里找正确的插入位置
     * 可以直接用字符串来比较大小，因为 "1-2-1" < "1-2-2"
     */
    while (pos < ans.length && obj[keyName] >= currentTitle) {
      /**
       * 这个时候，假设我们所在的 children 是 ['1-2-1']，
       * 然后我们要插入 '1-2-2'，我们遍历所在的 children，找到了位置 index = 1，
       * 然后就可以直接插入了，没有任何问题。
       * 
       * 但是还有一种情况，我们所在的 children 是 ['1-2-1', '1-2-2']，
       * 而我们要插入 '1-2-2'，这个时候在 children 里的 '1-2-2' 就是
       * 我们在上一层新建的一个暂时的对象（这部分建议先看下面的代码，比较好理解）
       * 而这个暂时性的对象（ans[pos]）是这样的
       * {
       *   children: [],
       *   title: '1-2-3'
       * }
       * 我们现在要做的，就是升级这个暂时性的对象为完整的对象
       * 然后把当前对象的属性解构出来，覆盖暂时的对象
       * children 属性则是继续沿用暂时对象的 children 属性
       */ 
      if (obj[keyName] === currentTitle) {
        ans[pos] = { children: ans[pos].children, ...obj };
        return;
      }

      // 遍历 ans， 继续比较
      pos++;
      for (let key in ans[pos]) {
        if (key !== "depth" && key !== "children") {
          currentTitle = ans[pos][key];
          break;
        }
      }
    }

    /**
     * 最后，把对象插入到正确的位置（pos 所在的位置）
     * 因为之前在暂时性对象的时候 return 了
     * 因此如果能到达这部分代码进行插入，就是正确的对象插入到正确的位置
     */
    ans.splice(pos, 0, obj);
    return;
  }

  /**
   * 刚才是已经抵达了底层的情况
   * 现在是还没到达底层的情况，就比如 "1-3-2" 剩下 "3-2"
   * 拿到当前的层数，"3-2" 的话就取3
   */
  const currentLevel = parseInt(level.charAt(0)) - 1;

  /**
   * 这个时候我们就面临了一个问题：
   * 正常的 ans 应该是这样一个数组：[
      {
        "title": "1-1-1",
        "depth": 3
      },
      {
        "title": "1-1-2",
        "depth": 3
      }
    ]
   * 但是我们很有可能先插入了 "1-1-1" 这一层，导致 "1-1-2" 还没有插入
   * ans[currentLevel] 是按照顺序排列的，如果数组里只有一个结果，
   * 而我们要插入到 index = 1 的位置上，那个位置上现在是什么东西都没有的
   * 因此我们需要创建一个暂时的对象，来占据 currentLevel 这个位置
   */
  if (ans[currentLevel] === null || ans[currentLevel] === undefined) {
    /**
     * 分配一个暂时的对象在 ans[currentLevel] 这个位置上
     * 给予这个空的对象一个 children 属性，一个空的数组（因为该路径没到底，必然有 children）
     * 并且把当前的 keyName 设置成当前的路径，例如 "1-3-2" 里的 "1-3"
     * （这里的 obj[keyName] 指向的就是完整的路径，例如 "1-3-2"）
     * （而 level 则是当前的路径，例如 "1-3-2" 剩下了 "3-2"）
     * 
     * 这个时候，我们的数组会变成这样：[
        {
          "title": "1-1-1",
          "depth": 3
        },
        {
          "mytitle": "1-1-2",
          "children": []
        }
      ]
     * 注意，这个时候还没有插入 depth 属性，因为这只是一个暂时的对象
     */
    ans[currentLevel] = { children: [] };
    ans[currentLevel][keyName] = obj[keyName].slice(
      0,
      obj[keyName].length - level.length + 1
    );
  }

  /**
   * 这个时候，当我们到这里的时候，我们可以保证：
   * ans[currentLevel] 有一个对象
   * 这个对象可能已经正确地存在，或者只是一个暂时的对象
   * 
   * 而在这里还要检查 children 属性，如果没有的话添加这个属性的目的
   * 是因为我刚才已经说了，如果我们执行了这段代码，就说明我们不在最后一层
   * 因此，children 是必然存在的
   * 对于刚刚创建的暂时的对象来说，children 属性已经设置好了
   * 但是对于那些普通的对象来说，children 属性还没有添加，因此要检查
   */
  if (ans[currentLevel].hasOwnProperty("children")) {
    arrayToTreeHelper(ans[currentLevel].children, obj, keyName, level.slice(2));
  } else {
    const children = [];
    ans[currentLevel]["children"] = children;
    /**
     * 递归给下一层的是这些东西：
     * children：这一个对象的 children
     * obj：input 数组里，包含了当前对象的那个，完整的对象（最外层的对象）
     * keyName：obj 里对应的属性名
     * level.slice(s)：传递到下一层的 level，比如现在是 "1-3-2"，那就传 "3-2"
     */
    arrayToTreeHelper(children, obj, keyName, level.slice(2));
  }
}
```

## 测试

```javascript
const array = [
  { name: "1-1-1", depth: 3 },
  { hair: "2-1", depth: 2 },
  { hello: "1", depth: 1 },
  { with: "2", depth: 1 },
  { lynch: "1-2", depth: 2 },
  { is: "1-1-2", depth: 3 },
  { my: "1-1", depth: 2 }
];

const fs = require("fs");

fs.writeFile("test.json", JSON.stringify(arrayToTree(array), null, 2), () => {
  console.log("ok");
});
```

最终得到的文件

```json
[
  {
    "children": [
      {
        "children": [
          {
            "name": "1-1-1",
            "depth": 3
          },
          {
            "is": "1-1-2",
            "depth": 3
          }
        ],
        "my": "1-1",
        "depth": 2
      },
      {
        "lynch": "1-2",
        "depth": 2
      }
    ],
    "hello": "1",
    "depth": 1
  },
  {
    "children": [
      {
        "hair": "2-1",
        "depth": 2
      }
    ],
    "with": "2",
    "depth": 1
  }
]
```

<br />

<span v-red>**是不是贼牛逼！**</span>

<Disqus />