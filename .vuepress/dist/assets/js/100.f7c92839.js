(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{323:function(t,a,s){"use strict";s.r(a);var n=s(1),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"vue-的-hashchange-事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-的-hashchange-事件","aria-hidden":"true"}},[t._v("#")]),t._v(" Vue 的 Hashchange 事件")]),t._v(" "),s("blockquote",[s("p",[t._v("Posted: 09.19.2019")])]),t._v(" "),s("Tag"),t._v(" "),s("h2",{attrs:{id:"问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 问题")]),t._v(" "),s("p",[t._v("问题是，当 hash tag 发生更改的时候，vue router 无法监听到该事件（react-router也一样），因此无法重新渲染页面。")]),t._v(" "),s("p",[t._v("例如，当 url 从 "),s("code",[t._v("/tags.html#Top%20100%20Liked")]),t._v(" 变为 "),s("code",[t._v("/tags.html#Dynamic%20Programming")]),t._v(" 时，vue 不会重新渲染页面。")]),t._v(" "),s("p",[s("span",{staticStyle:{color:"palevioletred"}},[t._v("但是一般来说，hash tag 的作用也不是决定页面渲染的内容，而是作为页面内容的定位。")])]),t._v(" "),s("p",[t._v("但是对于这个网站来说，由于用的是 VuePress，还是会不可避免地遇见这个问题。因为 VuePress 的 router 会自动在 url 上添加后缀，\n比如 "),s("code",[t._v("a.com?b=c")]),t._v(" 就会变成 "),s("code",[t._v("a.com?b=c.html")]),t._v("，"),s("code",[t._v("/a/b")]),t._v(" 会变成 "),s("code",[t._v("/a/b.md")]),t._v(" ，所以无法使用 route 和 query string 来确定页面的内容。")]),t._v(" "),s("p",[t._v("Hash tag 肯定不是最好的方案，但的确是最简单的方案。")]),t._v(" "),s("h2",{attrs:{id:"解决方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案","aria-hidden":"true"}},[t._v("#")]),t._v(" 解决方案")]),t._v(" "),s("blockquote",[s("p",[t._v("核心思想是：在 hashchange 事件被触发时，触发重渲染")])]),t._v(" "),s("ul",[s("li",[t._v("Vue-router 不会被动监听 hashchange 事件，因为我们需要主动监听")]),t._v(" "),s("li",[t._v("当 hashchange 事件发生时，我们需要重新渲染整个页面")])]),t._v(" "),s("p",[s("span",{staticStyle:{color:"palevioletred"}},[t._v("=> 因此，我们必须要进行强制更新！")])]),t._v(" "),s("p",[t._v("Vue 有一个强制更新的方法 "),s("code",[t._v("vm.$forceUpdate()")]),t._v("，但是该方法并不会重新计算 computed 属性下的内容，只会重新执行 methods 里的方法。所以我们必须把需要更新的内容放在 methods 里，而不是 computed 里。")]),t._v(" "),s("h2",{attrs:{id:"代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码","aria-hidden":"true"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),s("p",[t._v("通过 watch 来监听 hashchange 的事件：")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("watch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("$route")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在这里强制更新")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$forceUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("br"),t._v("\n把更新放在 methods 里：\n"),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("methods"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("tags")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" tag "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("location"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hash"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/%20/g")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('" "')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" articles "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在这里更新...")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" articles"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("br"),t._v("\n在 template 里，调用函数\n"),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("ul"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("li v"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"page in tags()"')]),t._v(" v"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("bind"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"page.path + tag"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("router"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("link\n      v"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("bind"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("to"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{ path: page.path}"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" page"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("title "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("router"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("link"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("li"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("ul"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),s("Disqus")],1)}),[],!1,null,null,null);a.default=e.exports}}]);