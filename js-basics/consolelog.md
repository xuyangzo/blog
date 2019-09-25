---
tags: ['DOM', 'Tool']
---

# console.log in Browsers

> Posted: 09.23.2019

<Tag />

## Description

Consider the following code:

```javascript
const obj = {
  a: 1
};
console.log(obj);

obj.a = 2;
console.log(obj);
```

Apparently, it should log '{ a: 1 }' and then '{ a: 2 }' because `console.log` is sequential.

Also, it is correct in Node, which prints the following:

![node](/node.png)

But in Chrome, Firefox and a bunch of browsers, the result is a little unexpected.

Chrome:

![chrome](/chrome.png)

Firefox:

![firefox](/firefox.png)

## Issue and Explanation

### Issue

The issue is, the browser console will print '{ a: 1 }' and '{ a: 2 }' correctly.

But when we click the down arrow in order to view detailed objects, it does not display the correct 
value -- which is to say, it displays the final state of that object rather than middle state.

### Explanation

It is because when the browser wants to track an object, it keeps track of the address of that
object. 

When printing, everything works sequentially.

When you want to check the detailed object, the browser uses that object's address, find it, and display
it's properties. And at this time, it's property is different from the property it was when printed.

## Solution

### Code

Simply deep copy the object and print the copy if you want to view the exact period of that object.

For Deep Copy, please refer to [Deep Copy](/js-basics/deepcopy.md)

```javascript
const obj = {
  a: 1
};
// deep copy the object
console.log(Object.assign({}, obj));

obj.a = 2;
console.log(obj);
```

### Results

Chrome:

![chrome-2](/chrome2.png)

Firefox:

![firefox-2](/firefox2.png)


<Disqus />