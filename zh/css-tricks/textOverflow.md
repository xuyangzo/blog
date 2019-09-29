---
tags: ['CSS小技巧', 'CSS布局']
---

# 文本溢出

> Posted: 09.23.2019

<Tag />

## 单行文本溢出

单行文本溢出没有兼容性的问题。

<p class='overflow'>
  ThisismyfirsttimethatIwouldliketoinformyouthat
</p>

<p class='overflow'>
  Hello my name is lynch and my hobby is not writing code
</p>

<style>
  .overflow {
    background: ghostwhite;
    padding: 10px;
    border-radius: 5px;
    width: 150px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 20px 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
</style>

```css
.overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

## Multiple Lines

多行文本溢出只适用于使用 webkit 内核的浏览器

- Chrome, Safari, Edge, Opera 有限
- IE, Firefox 无效

<p class='overflow-2'>
  ThisismyfirsttimethatIwouldliketoinformyouthatasdhjasdyqwgagvsdfqwejhasdftsadbhj123asdgh
</p>

<p class='overflow-2 shorter'>
  ThisismyfirsttimethatIwouldliketoinformyouthatasdhjasdyqwgagvsdfqwejhasdftsadbhj123asdgh
</p>

<div style="clear: both"></div>

<p class='overflow-2'>
  Hello my name is lynch and my hobby is not writing code. I like to find a girlfriend
</p>

<p class='overflow-2 shorter'>
  Hello my name is lynch and my hobby is not writing code. I like to find a girlfriend
</p>

<div style="clear: both"></div>

<span style='color: palevioletred'>从上面的例子可以看出，设置多行文本溢出后，剩下的内容并没有消失，而是在下面一行继续展示。</span>

这也就意味着，我们必须控制好 container 的高度。  
如果高度过高，我们会把不希望展示的内容一起展示出来。

<style>
  .overflow-2 {
    background: ghostwhite;
    padding: 10px;
    border-radius: 5px;
    width: 150px;
    height: 150px;
    line-height: 30px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    float: left;
  }

  .shorter {
    height: 118px;
    float: left;
    margin-left: 50px;
  }

</style>

```css
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word; /* 用来打破某个单词 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 行数 */
}
```

<Disqus />