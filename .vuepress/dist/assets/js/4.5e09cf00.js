(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{100:function(t,e,n){var r=n(3),o=n(23),i=n(43),u=n(101),a=n(18).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},101:function(t,e,n){e.f=n(27)},102:function(t,e){e.f=Object.getOwnPropertySymbols},142:function(t,e,n){n(100)("asyncIterator")},143:function(t,e,n){"use strict";var r=n(3),o=n(9),i=n(5),u=n(16),a=n(19),s=n(144).KEY,f=n(4),c=n(24),l=n(81),p=n(22),y=n(27),h=n(101),v=n(100),g=n(145),b=n(89),m=n(6),S=n(7),d=n(42),O=n(20),w=n(25),L=n(28),x=n(45),_=n(146),k=n(32),P=n(102),T=n(18),j=n(41),E=k.f,A=T.f,N=_.f,M=r.Symbol,F=r.JSON,I=F&&F.stringify,C=y("_hidden"),D=y("toPrimitive"),G={}.propertyIsEnumerable,R=c("symbol-registry"),V=c("symbols"),$=c("op-symbols"),J=Object.prototype,z="function"==typeof M&&!!P.f,H=r.QObject,B=!H||!H.prototype||!H.prototype.findChild,K=i&&f((function(){return 7!=x(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=E(J,e);r&&delete J[e],A(t,e,n),r&&t!==J&&A(J,e,r)}:A,U=function(t){var e=V[t]=x(M.prototype);return e._k=t,e},W=z&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},Y=function(t,e,n){return t===J&&Y($,e,n),m(t),e=w(e,!0),m(n),o(V,e)?(n.enumerable?(o(t,C)&&t[C][e]&&(t[C][e]=!1),n=x(n,{enumerable:L(0,!1)})):(o(t,C)||A(t,C,L(1,{})),t[C][e]=!0),K(t,e,n)):A(t,e,n)},q=function(t,e){m(t);for(var n,r=g(e=O(e)),o=0,i=r.length;i>o;)Y(t,n=r[o++],e[n]);return t},Q=function(t){var e=G.call(this,t=w(t,!0));return!(this===J&&o(V,t)&&!o($,t))&&(!(e||!o(this,t)||!o(V,t)||o(this,C)&&this[C][t])||e)},X=function(t,e){if(t=O(t),e=w(e,!0),t!==J||!o(V,e)||o($,e)){var n=E(t,e);return!n||!o(V,e)||o(t,C)&&t[C][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=N(O(t)),r=[],i=0;n.length>i;)o(V,e=n[i++])||e==C||e==s||r.push(e);return r},tt=function(t){for(var e,n=t===J,r=N(n?$:O(t)),i=[],u=0;r.length>u;)!o(V,e=r[u++])||n&&!o(J,e)||i.push(V[e]);return i};z||(a((M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===J&&e.call($,n),o(this,C)&&o(this[C],t)&&(this[C][t]=!1),K(this,t,L(1,n))};return i&&B&&K(J,t,{configurable:!0,set:e}),U(t)}).prototype,"toString",(function(){return this._k})),k.f=X,T.f=Y,n(44).f=_.f=Z,n(46).f=Q,P.f=tt,i&&!n(43)&&a(J,"propertyIsEnumerable",Q,!0),h.f=function(t){return U(y(t))}),u(u.G+u.W+u.F*!z,{Symbol:M});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)y(et[nt++]);for(var rt=j(y.store),ot=0;rt.length>ot;)v(rt[ot++]);u(u.S+u.F*!z,"Symbol",{for:function(t){return o(R,t+="")?R[t]:R[t]=M(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in R)if(R[e]===t)return e},useSetter:function(){B=!0},useSimple:function(){B=!1}}),u(u.S+u.F*!z,"Object",{create:function(t,e){return void 0===e?x(t):q(x(t),e)},defineProperty:Y,defineProperties:q,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:tt});var it=f((function(){P.f(1)}));u(u.S+u.F*it,"Object",{getOwnPropertySymbols:function(t){return P.f(d(t))}}),F&&u(u.S+u.F*(!z||f((function(){var t=M();return"[null]"!=I([t])||"{}"!=I({a:t})||"{}"!=I(Object(t))}))),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(S(e)||void 0!==t)&&!W(t))return b(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!W(e))return e}),r[1]=e,I.apply(F,r)}}),M.prototype[D]||n(17)(M.prototype,D,M.prototype.valueOf),l(M,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},144:function(t,e,n){var r=n(22)("meta"),o=n(7),i=n(9),u=n(18).f,a=0,s=Object.isExtensible||function(){return!0},f=!n(4)((function(){return s(Object.preventExtensions({}))})),c=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return"F";if(!e)return"E";c(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!s(t))return!0;if(!e)return!1;c(t)}return t[r].w},onFreeze:function(t){return f&&l.NEED&&s(t)&&!i(t,r)&&c(t),t}}},145:function(t,e,n){var r=n(41),o=n(102),i=n(46);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,a=n(t),s=i.f,f=0;a.length>f;)s.call(t,u=a[f++])&&e.push(u);return e}},146:function(t,e,n){var r=n(20),o=n(44).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(r(t))}},152:function(t,e,n){},264:function(t,e,n){"use strict";var r=n(152);n.n(r).a},278:function(t,e,n){"use strict";n.r(e);n(142),n(143),n(84),n(47);var r={data:function(){return{tag:decodeURI(window.location.hash.slice(1))}},methods:{checkLanguage:function(t,e){return"English"===t&&-1===e.indexOf("/zh/")||"简体中文"===t&&-1!==e.indexOf("/zh/")},tags:function(){var t=decodeURI(window.location.hash.slice(1));this.tag=t;var e=[],n=!0,r=!1,o=void 0;try{for(var i,u=this.$site.pages[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var a=i.value;for(var s in a.frontmatter.tags){if(a.frontmatter.tags[s]===this.tag&&this.checkLanguage(this.$lang,a.regularPath)){e.push(a);break}}}}catch(t){r=!0,o=t}finally{try{n||null==u.return||u.return()}finally{if(r)throw o}}return e}},watch:{$route:function(){this.$forceUpdate()}}},o=(n(264),n(0)),i=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.tag?n("div",[n("h2",{attrs:{id:t.tag}},[t._v("\n      "+t._s(t.tag)+"\n    ")]),t._v(" "),n("ul",t._l(t.tags(),(function(e){return n("li",{key:e.path+t.tag},[n("router-link",{attrs:{to:{path:e.path}}},[t._v(t._s(e.title))])],1)})),0)]):n("div",[n("img",{attrs:{src:t.$withBase("/apology.jpeg")}}),t._v(" "),n("br"),t._v(" "),-1===t.$page.regularPath.indexOf("/zh/")?n("h3",[t._v("Because of technical issue, \n      you have to manually go to the corresponding page for another language")]):n("h3",[t._v("老子技术不够，在tags.html中切换语言，你得自己点击链接")])])])}),[],!1,null,"6436fbbe",null);e.default=i.exports},80:function(t,e){t.exports={}},81:function(t,e,n){var r=n(18).f,o=n(9),i=n(27)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},84:function(t,e,n){for(var r=n(93),o=n(41),i=n(19),u=n(3),a=n(17),s=n(80),f=n(27),c=f("iterator"),l=f("toStringTag"),p=s.Array,y={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=o(y),v=0;v<h.length;v++){var g,b=h[v],m=y[b],S=u[b],d=S&&S.prototype;if(d&&(d[c]||a(d,c,p),d[l]||a(d,l,b),s[b]=p,m))for(g in r)d[g]||i(d,g,r[g],!0)}},85:function(t,e,n){var r=n(27)("unscopables"),o=Array.prototype;null==o[r]&&n(17)(o,r,{}),t.exports=function(t){o[r][t]=!0}},89:function(t,e,n){var r=n(21);t.exports=Array.isArray||function(t){return"Array"==r(t)}},93:function(t,e,n){"use strict";var r=n(85),o=n(94),i=n(80),u=n(20);t.exports=n(95)(Array,"Array",(function(t,e){this._t=u(t),this._i=0,this._k=e}),(function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])}),"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},94:function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},95:function(t,e,n){"use strict";var r=n(43),o=n(16),i=n(19),u=n(17),a=n(80),s=n(96),f=n(81),c=n(97),l=n(27)("iterator"),p=!([].keys&&"next"in[].keys()),y=function(){return this};t.exports=function(t,e,n,h,v,g,b){s(n,e,h);var m,S,d,O=function(t){if(!p&&t in _)return _[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",L="values"==v,x=!1,_=t.prototype,k=_[l]||_["@@iterator"]||v&&_[v],P=k||O(v),T=v?L?O("entries"):P:void 0,j="Array"==e&&_.entries||k;if(j&&(d=c(j.call(new t)))!==Object.prototype&&d.next&&(f(d,w,!0),r||"function"==typeof d[l]||u(d,l,y)),L&&k&&"values"!==k.name&&(x=!0,P=function(){return k.call(this)}),r&&!b||!p&&!x&&_[l]||u(_,l,P),a[e]=P,a[w]=y,v)if(m={values:L?P:O("values"),keys:g?P:O("keys"),entries:T},b)for(S in m)S in _||i(_,S,m[S]);else o(o.P+o.F*(p||x),e,m);return m}},96:function(t,e,n){"use strict";var r=n(45),o=n(28),i=n(81),u={};n(17)(u,n(27)("iterator"),(function(){return this})),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},97:function(t,e,n){var r=n(9),o=n(42),i=n(31)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}}}]);