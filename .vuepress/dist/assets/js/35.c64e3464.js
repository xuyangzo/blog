(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{331:function(e,t,r){"use strict";r.r(t);var s=r(0),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"browser-s-event-loop"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#browser-s-event-loop","aria-hidden":"true"}},[e._v("#")]),e._v(" Browser's Event Loop")]),e._v(" "),r("blockquote",[r("p",[e._v("Posted: 09.26.2019")])]),e._v(" "),r("Tag"),e._v(" "),r("h2",{attrs:{id:"introduction"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#introduction","aria-hidden":"true"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),r("blockquote",[r("p",[e._v("The content is most from: "),r("a",{attrs:{href:"https://juejin.im/post/59e85eebf265da430d571f89",target:"_blank",rel:"noopener noreferrer"}},[e._v("这一次，彻底弄懂 JavaScript 执行机制"),r("OutboundLink")],1),r("br"),e._v("\nIf you understand Chinese, please directly read this article")])]),e._v(" "),r("p",[e._v("JS is single-threaded. (For multi-thread, please refer to "),r("router-link",{attrs:{to:"/js-basics/webWorker.html"}},[e._v("Web Worker")]),e._v("）.")],1),e._v(" "),r("p",[e._v("That's why JS has Event Loop.")]),e._v(" "),r("h2",{attrs:{id:"event-loop"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#event-loop","aria-hidden":"true"}},[e._v("#")]),e._v(" Event Loop")]),e._v(" "),r("p",[r("img",{attrs:{src:"/event-loop.png",alt:"event loop"}})]),e._v(" "),r("p",[r("strong",[e._v("When a task enters execution stack, check whether it is synchronous or asynchronous")])]),e._v(" "),r("ul",[r("li",[e._v("If synchronous\n"),r("ul",[r("li",[e._v("Push to main thread and execute")]),e._v(" "),r("li",[e._v("During such period, only execute this task")])])]),e._v(" "),r("li",[e._v("If asynchronous\n"),r("ul",[r("li",[e._v("Push to Event Table, and register callback functions")]),e._v(" "),r("li",[e._v("When triggered, push to Event Queue\n"),r("ul",[r("li",[e._v("Different types of tasks will be pushed to different Event Queues")])])]),e._v(" "),r("li",[e._v("When main thread is idlem, check if there are asynchronous tasks in Event Queue. If so, push them to main thread")])])])]),e._v(" "),r("h2",{attrs:{id:"microtask-vs-macrotask"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#microtask-vs-macrotask","aria-hidden":"true"}},[e._v("#")]),e._v(" Microtask vs. Macrotask")]),e._v(" "),r("p",[r("strong",[e._v("Macrotask")]),e._v("：script(overall code)，setTimeout，setInterval"),r("br"),e._v(" "),r("strong",[e._v("Microtask")]),e._v("：Promise，process.nextTick")]),e._v(" "),r("p",[e._v("When pushing asynchronous events to Event Queue:")]),e._v(" "),r("ul",[r("li",[e._v("Macrotasks will be pushed into Event Queue for macrotasks")]),e._v(" "),r("li",[e._v("Microtasks will be pushed into Event Queue for microtasks")])]),e._v(" "),r("p",[e._v("Their execution order is the following:")]),e._v(" "),r("ol",[r("li",[e._v("Execute "),r("strong",[e._v("ONE")]),e._v(" macrotask")]),e._v(" "),r("li",[e._v("Execute all microtasks")]),e._v(" "),r("li",[e._v("Repeat 1~2 until there is no macrotask")])]),e._v(" "),r("p",[r("img",{attrs:{src:"/microtask.png",alt:"microtask and macrotask"}})]),e._v(" "),r("h2",{attrs:{id:"execution-order"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#execution-order","aria-hidden":"true"}},[e._v("#")]),e._v(" Execution Order")]),e._v(" "),r("p",[e._v("The execution order is top first from top to bottom")]),e._v(" "),r("ol",[r("li",[r("strong",[e._v("process.nextTick")]),e._v("：Before end of execution stack")]),e._v(" "),r("li",[r("strong",[e._v("Promise.resolve")]),e._v("：Before end of this Event Loop")]),e._v(" "),r("li",[r("strong",[e._v("setImmediate")]),e._v("：Push to current Event Queue, so always execute at next Event Loop")]),e._v(" "),r("li",[r("strong",[e._v("setTimeout")]),e._v("：Push to current Event Queue for macrotasks, so always execute at next Event Loop, after synchronous tasks and all other tasks in Event Queue are finished")])]),e._v(" "),r("h2",{attrs:{id:"reference"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#reference","aria-hidden":"true"}},[e._v("#")]),e._v(" Reference")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://juejin.im/post/59e85eebf265da430d571f89",target:"_blank",rel:"noopener noreferrer"}},[e._v("这一次，彻底弄懂 JavaScript 执行机制"),r("OutboundLink")],1)]),e._v(" "),r("Disqus")],1)}),[],!1,null,null,null);t.default=o.exports}}]);