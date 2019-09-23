---
tags: ['JS Basics', 'Interview Problems']
---

# THIS Keyword Binding

> Posted: 09.22.2019

<Tag />

## this Binding

`this` binds to the object that contains it when it is being called as that object's method

1. Under global environment, `this` refers to the global object (e.g. `window` in browser)
2. Under object environment, `this` refers to the obejct, event in \_\_proto\_\_ chain
3. Under constructor environment, `this` refers to the instance being created
4. For DOM events, `this` refers to the DOM element that triggers the event
5. For nested objects, `this` refers to the closest object method being called belongs to
6. In arrow function, `this` is inherited from its parent scope

## Global Environment

```javascript
console.log(this); // in browser, will log the window object
console.log(this); // in node, will log empty object {}

function callThis() {
  console.log(this);
}
callThis(); // in browser, will log the window object

function callThis() {
  console.log(this);
}
callThis(); // in node, will log the global object
```

## Object Environment

```javascript
const a = { 
  test: function() {
    console.log(this);
  }
};
// will log a object under both browser and node environment
a.test();
// on the contrary, the following this binding will change
// will log window object and global object respectively for browser and node
const b = a.test;
b();
```

## Constructor Environment

```javascript
function Log() {
  console.log(this);
}
// will log Log object under both browser and node environment
const log = new Log();
// on the contrary, given examples above, under global environment
// will log window object and global object respectively for browser and node
Log();
```

## DOM Environment

```javascript
element.addEventListener('click', function() {
  console.log(this); // will log element
});
```

## Nested Object

```javascript
const c = {
  a: {
    test: function() {
      console.log(this);
    }
  },
  test2: function() {
    console.log(this);
  }
}

c.a.test(); // will log c.a object
c.test2(); // will log c object
```

## Arrow Function

```javascript
const d = {
  test: () => {
    console.log(this);
  },
  a: {
    test2: () => {
      console.log(this);
    }
  },
  b: () => {
    this.test3 = () => { 
      console.log(this);
    }
    return this;
  },
  c: function () {
    this.test4 = () => {
      console.log(this);
    }
    return this;
  }
}
// will log window and {} respectively in browser and node
d.test();
// will log window and {} respectively in browser and node
d.a.test2();
// will log window and { test3: [Function] } respectively in browser and node
d.b().test3();
// will log object d under both environment
d.c().test4();
```

## Real Interview Example

```javascript
let a = {
  b: function() {
    console.log(this);
  },
  c: () => {
    console.log(this);
  }
};

a.b(); // will log a
a.c(); // will log window and {} respectively in browser and node
let d = a.b;
d(); // will log window and global respectively in browser and node
```

<Disqus />