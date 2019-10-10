(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{334:function(t,a,s){"use strict";s.r(a);var n=s(1),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"内存泄漏"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存泄漏","aria-hidden":"true"}},[t._v("#")]),t._v(" 内存泄漏")]),t._v(" "),s("blockquote",[s("p",[t._v("Posted: 09.28.2019")])]),t._v(" "),s("Tag"),t._v(" "),s("h2",{attrs:{id:"内存泄漏的定义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存泄漏的定义","aria-hidden":"true"}},[t._v("#")]),t._v(" 内存泄漏的定义")]),t._v(" "),s("p",[s("span",{staticStyle:{color:"palevioletred"}},[t._v("应用程序不再需要占用内存的时候，由于某些原因，内存没有被操作系统或可用内存池回收。")])]),t._v(" "),s("p",[t._v("这句话到底是什么意思？")]),t._v(" "),s("p",[s("strong",[t._v("其实可以这样理解：")])]),t._v(" "),s("p",[t._v("假如说你一开始分配了一块内存，用来存一个名叫”新垣结衣“的字符串。")]),t._v(" "),s("p",[t._v("然后你用这个字符串进行了一系列操作，比如说摸、亲、啪……")]),t._v(" "),s("p",[t._v("玩完了以后，你很爽，然后进入了贤者模式，觉得”新垣结衣“也就那样，没什么用了。")]),t._v(" "),s("p",[t._v("于是你摇身一变成为了渣男，从此以后对”新垣结衣“不理不睬。")]),t._v(" "),s("p",[t._v("你没有再临幸她的想法了，于是就让她一个字符串孤零零地呆在内存里。")]),t._v(" "),s("p",[t._v("这种情况下就出现了内存泄漏。")]),t._v(" "),s("p",[t._v("为什么？因为内存必然是有限的。就算你能够一夜七次，次次换人，也只能有七个老婆。")]),t._v(" "),s("p",[t._v("而”新垣结衣“这个字符串在这里，就是占着茅坑不拉……")]),t._v(" "),s("p",[t._v("你只能有七个老婆，而”新垣结衣“占了一个名额，因此你只能再找六个老婆，可是你又不想啪”新垣结衣“，这就导致你老婆的上限莫名其妙地从七个变成了六个。")]),t._v(" "),s("p",[t._v("因此你需要一脚把”新垣结衣“踢了。这样的话被占据的内存就会被释放，你又可以找七个新的老婆了。")]),t._v(" "),s("p",[s("span",{staticStyle:{color:"palevioletred"}},[s("strong",[t._v("所以说程序本质上就是渣男。什么情意不情意的，没有利用价值了就得抛弃。")])])]),t._v(" "),s("h2",{attrs:{id:"垃圾回收机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收机制","aria-hidden":"true"}},[t._v("#")]),t._v(" 垃圾回收机制")]),t._v(" "),s("p",[t._v("要明白 JS 的内存泄漏究竟是怎么产生的，首先得明白 JS 的垃圾回收机制。")]),t._v(" "),s("p",[t._v("详情可以参考这篇文章："),s("router-link",{attrs:{to:"/zh/js-basics/gc.html"}},[t._v("JS 的垃圾回收机制")])],1),t._v(" "),s("h2",{attrs:{id:"意外的全局变量"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#意外的全局变量","aria-hidden":"true"}},[t._v("#")]),t._v(" 意外的全局变量")]),t._v(" "),s("p",[t._v("我们先来看以下这段代码。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("arg")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  bar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"this is a hidden global variable"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lynch"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("这段代码等同于：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("arg")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("bar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"this is a hidden global variable"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lynch"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果通过 foo() 来调用的话")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("为什么这玩意儿会导致内存泄漏呢？")]),t._v(" "),s("p",[t._v("如果你看过了我之前关于垃圾回收机制的文章，你就会知道，目前的标记清除机制会从 root 对象开始（在这里就是 window 对象）\n，执行深度遍历/广度遍历。而 bar 和 name 显然可以通过 window 对象而到达，也就是说他们不会被垃圾回收器回收，会一直留在内存里。")]),t._v(" "),s("p",[t._v("一直留存在内存里，导致的问题就是：除非你刷新页面，否则被占据的内存不会被释放。")]),t._v(" "),s("p",[t._v("这意味着，接下来执行的脚本，可用的内存就会减少，直接影响性能。")]),t._v(" "),s("p",[t._v("而这还是浏览器，页面一刷新，内存就会重新分配。")]),t._v(" "),s("p",[t._v("可如果是一个一直在运行的 Node 服务器呢？")]),t._v(" "),s("p",[t._v("每次发生内存泄漏，可用的内存就会减少一部分。而因为服务器一直在运行，如果你不主动清理内存，\n被占用的内存就会一直被占用。到最后就会出现没有内存可用的情况。")]),t._v(" "),s("p",[t._v("是不是很可怕。")]),t._v(" "),s("h3",{attrs:{id:"use-strict"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#use-strict","aria-hidden":"true"}},[t._v("#")]),t._v(" Use Strict")]),t._v(" "),s("p",[t._v("在 JavaScript 文件头部加上 'use strict'，可以避免此类错误发生。")]),t._v(" "),s("p",[t._v("至于严格模式究竟能干些什么，可以参考这篇文章："),s("router-link",{attrs:{to:"/zh/js-basics/strict.html"}},[t._v("严格模式")])],1),t._v(" "),s("h2",{attrs:{id:"被遗忘的计时器或回调函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#被遗忘的计时器或回调函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 被遗忘的计时器或回调函数")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" timer "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setInterval")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'+1s'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// clearInterval(timer);")]),t._v("\n")])])]),s("p",[t._v("这个其实也很好理解。")]),t._v(" "),s("p",[t._v("计时器的作用是什么？每隔一段时间执行回调函数。")]),t._v(" "),s("p",[t._v("对于 "),s("code",[t._v("setTimeout")]),t._v(" 来说，如果你使用匿名函数，那么在 setTimeout 执行完之后，该函数就用不到了，然后就变成了 unreachable（从 root 开始执行深度遍历/广度遍历到不到），于是就被垃圾回收机制给清理掉了。")]),t._v(" "),s("p",[t._v("不过对于 "),s("code",[t._v("setInterval")]),t._v(" 来说，其回调函数一直都不会被清理。")]),t._v(" "),s("p",[t._v("（当然这也是 setInterval 的必然性，你一直开着这玩意儿，它当然一直占据内存）")]),t._v(" "),s("h3",{attrs:{id:"event-listener"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#event-listener","aria-hidden":"true"}},[t._v("#")]),t._v(" Event Listener")]),t._v(" "),s("p",[t._v("老的 IE 6 无法处理循环引用。")]),t._v(" "),s("p",[t._v("如今，即使没有明确移除它们，一旦观察者对象变成不可达，大部分浏览器可以回收观察者处理函数，不必非要调用 removeEventListener")]),t._v(" "),s("h2",{attrs:{id:"脱离-dom-的引用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#脱离-dom-的引用","aria-hidden":"true"}},[t._v("#")]),t._v(" 脱离 DOM 的引用")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("container"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("测试"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" elements "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n  container"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'container'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" container "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'container'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("container "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'container'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("elements"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("container "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'container'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在 DOM 上移除节点")]),t._v("\ndocument"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeChild")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'container'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("container"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 原 container 节点")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("elements"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("container"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 原 container 节点")]),t._v("\n")])])]),s("p",[t._v("上面这段代码说明了什么？")]),t._v(" "),s("ol",[s("li",[t._v("document.getElementById 以及其一系列的亲戚，返回的就是指向 DOM 节点的指针")]),t._v(" "),s("li",[t._v("移除节点之后，指向 DOM 节点的指针，竟然没有指向 null！？这是为什么？节点都没了啊！")])]),t._v(" "),s("p",[t._v("兄dei，你仔细想想，为什么这个指针能够指向一个已经被删除的节点？")]),t._v(" "),s("p",[t._v("这说明那个节点还在内存里，并且还存在相同的地址上，否则指针应该指向 null。")]),t._v(" "),s("p",[t._v("——等一下，不对啊，这个节点不是明明已经被删除了吗？")]),t._v(" "),s("p",[t._v("所以，内存泄漏就发生了啊。")]),t._v(" "),s("p",[t._v("当你引用的 DOM 节点后，该节点就占据了一块内存。接着，即便你删除了该节点，对于该节点的引用并没有消失，垃圾回收机制从 root 出发后，依旧能够到达该节点。因此该节点占据的内存不会被释放，它也会一直存在于内存中，引发内存泄漏。")]),t._v(" "),s("h2",{attrs:{id:"闭包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#闭包","aria-hidden":"true"}},[t._v("#")]),t._v(" 闭包")]),t._v(" "),s("p",[t._v("不知道闭包是什么的小伙伴可以参考这篇文章："),s("router-link",{attrs:{to:"/zh/js-basics/closure.html"}},[t._v("闭包")])],1),t._v(" "),s("p",[t._v("以下是一段关于闭包导致内存泄漏的代码。")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" theThing "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("replaceThing")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" originalThing "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" theThing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("unused")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("originalThing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n      console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hi"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n  \n  theThing "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    longStr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("someMethod")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n      console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("someMessage"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" \n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setInterval")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("replaceThing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n")])])]),s("p",[t._v("可能很多小伙伴都没看懂。于是我来讲解一下。")]),t._v(" "),s("p",[t._v("每隔一秒，就会发生如下的事情：")]),t._v(" "),s("ol",[s("li",[t._v("originalThing 指向 theThing")]),t._v(" "),s("li",[t._v("分配内存给 unused，unused 存了 originalThing 的引用")]),t._v(" "),s("li",[t._v("分配内存给 theThing，theThing 指向这片新的内存")])]),t._v(" "),s("p",[s("strong",[t._v("我们先来看看，如果把第二步去掉，会发生什么？")])]),t._v(" "),s("ol",[s("li",[t._v("originalThing 指向 theThing")]),t._v(" "),s("li",[t._v("分配内存给 theThing，theThing 指向这片新的内存")]),t._v(" "),s("li",[t._v("出函数作用域，本地变量 originalThing 被删除，其指向的内存无法抵达，因此该内存被删除")]),t._v(" "),s("li",[t._v("theThing 是全局变量，其指向的内存一直可达，因此该内存不会被删除")]),t._v(" "),s("li",[t._v("内存泄漏没有发生（假设接下来还要用到 theThing）")])]),t._v(" "),s("p",[s("span",{staticStyle:{color:"palevioletred"}},[s("strong",[t._v("一切看起来很正常是吧。那么如果加上第二步呢？")])])]),t._v(" "),s("ol",[s("li",[t._v("originalThing 指向 theThing")]),t._v(" "),s("li",[t._v("分配内存给 unused，unused 需要用到 originalThing 的引用")]),t._v(" "),s("li",[t._v("分配内存给 theThing，theThing 指向这片新的内存")]),t._v(" "),s("li",[t._v("出函数作用域，本地变量 originalThing…… 本来应该被删除，但是这里并没有，因为在这个时候 unused 所指向的内存还没有被删除，而 unused 包含了对 originalThing 的引用，因此垃圾收集器其实可以抵达 originalThing，因此其内存不会被删除")]),t._v(" "),s("li",[t._v("出函数作用域，本地变量 unused 被删除，其指向的内存无法抵达，因此该内存被删除")]),t._v(" "),s("li",[t._v("theThing 是全局变量，其指向的内存一直可达，因此该内存不会被删除")]),t._v(" "),s("li",[t._v("内存泄漏发生了，泄露的就是 originalThing 指向的内存")])]),t._v(" "),s("p",[s("strong",[t._v("那么，解决方法呢？")])]),t._v(" "),s("p",[t._v("既然 originalThing 指向的内存泄漏。")]),t._v(" "),s("p",[t._v("那么在 replaceThing 的底部，把 originalThing 指向 null，不就行了。")]),t._v(" "),s("h2",{attrs:{id:"参考资料"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考资料","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),s("p",[t._v("这玩意儿贼搞笑，下面两个链接本质上是同一篇文章。")]),t._v(" "),s("p",[t._v("英文的是2016年写的，中文的则是2018年写的。")]),t._v(" "),s("p",[t._v("如果你仔细看了两篇文章的内容，你会发现，中文的就是对英文的翻译而已。")]),t._v(" "),s("p",[t._v("然后这哥们还敢写自己是原创，忒不道德了。")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/",target:"_blank",rel:"noopener noreferrer"}},[t._v("4 Types of Memory Leaks in JavaScript and How to Get Rid Of Them"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/qappleh/article/details/80337630",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript内存泄露的4种方式及如何避免"),s("OutboundLink")],1)]),t._v(" "),s("Disqus")],1)}),[],!1,null,null,null);a.default=e.exports}}]);