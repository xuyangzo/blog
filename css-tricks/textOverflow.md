---
tags: ['CSS Tricks', 'CSS Layout']
---

# Text Overflow

> Posted: 09.23.2019

<Tag />

## Single Line

Single line text overflow does not have any compatibility issue.

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

Multiple line text overflow only works for browsers that have a webkit core.

- Chrome, Safari, Edge, Opera do work
- IE, Firefox do not work

<p class='overflow-2'>
  ThisismyfirsttimethatIwouldliketoinformyouthatasdhjasdyqwgagvsdfqwejhasdftsadbhj123asdgh
</p>

<p class='overflow-2 shorter'>
  ThisismyfirsttimethatIwouldliketoinformyouthatasdhjasdyqwgagvsdfqwejhasdftsadbhj123asdgh
</p>

<div style="clear: both"></div>

<p class='overflow-2'>
  Hello my name is lynch and my hobby is not writing code. I like to find an internship
</p>

<p class='overflow-2 shorter'>
  Hello my name is lynch and my hobby is not writing code. I like to find an internship
</p>

<div style="clear: both"></div>

<span style='color: palevioletred'>As you can see from above, setting text overflow will not
affect the following words, which means if the height is enough high, the user is still able
to see unexpected words (able to see the whole line).</span>

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
  word-wrap: break-word; /* break the word, see examples above */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* line number */
}
```

<Disqus />