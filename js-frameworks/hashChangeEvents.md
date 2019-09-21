---
tags: ['Vue']
---

# Hash Change Events

> Posted: 09.19.2019

<Tag />

## Issue

The problem is, when the hash tag changes, vue router cannot detect the change and thus cannot  
re-render the page. For example, when the url changes from `/tags.html#Top%20100%20Liked` to  
`/tags.html#Dynamic%20Programming`, vue will not re-render the page.

Usually, typical tasks are done by updating the path rather than hash tag.

But for this website, in order to display articles based on given tag, we should and almost have to  
use a single template(component) for rendering. 

VuePress's routers will automatically append suffix to the url, so we cannot use query string, because  
it will make `a.com?b=c` to be `a.com?b=c.html`, which is undesired. Also, it will make `/a/b` to be  
`/a/b.md` and looks for b.md rather than the router, so it is most convenient to use hash tags.

## Solution

The key idea is to trigger re-render when hash tag changes.

- Vue-router will not automatically listen to the hash change events, so we need to actively listen to it.  
- When hash change events occur, we need a way to trigger the re-render
  - The case here is a little more complicated as it also needs to re-render v-for. Normally setting a key is
  enough, but in this case key will not be updated as vue-router thinks there is no need to update the page

=> <span style='color: palevioletred'>Therefore, we have to force an update!</span>

The way to force an update is calling `vm.$forceUpdate()`, but this method will not recalculate computed attributes but will only re-execute methods. So we cannot put stuff that we want to update through $forceUpdate 
in computed attributes. Put them in methods will make sense.

## Code

To listen to hash change events, add a watch property:

```javascript
watch: {
  $route: function() {
    // doing update here
    this.$forceUpdate();
  }
}
```

<br />
And put updates in methods:

```javascript
methods: {
  tags() {
    const tag = window.location.hash.slice(1).replace(/%20/g, " ");
    let articles = [];
    
    // update here...

    return articles;
  }
}
```

<br />
In template, call the function rather than pass it directly:

```javascript
<ul>
  <li v-for="page in tags()" v-bind:key="page.path + tag">
    <router-link
      v-bind:to="{ path: page.path}">{{page.title}}</router-link>
  </li>
</ul>
```


<Disqus />

