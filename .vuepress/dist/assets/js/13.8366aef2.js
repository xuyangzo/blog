(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{162:function(e,i,s){"use strict";var t=s(91);s.n(t).a},190:function(e,i,s){"use strict";s.r(i);var t={props:{intros:{type:Array,default:function(){return[]}}},data:function(){return{isVisible:!1,setFalse:!1}},methods:{visibilityChanged:function(e){this.isVisible=e}}},n=(s(162),s(1)),a=Object(n.a)(t,(function(){var e=this,i=e.$createElement,s=e._self._c||i;return e.intros.length?s("div",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:{callback:e.visibilityChanged,intersection:{threshold:.2},once:!0},expression:"{\n    callback: visibilityChanged,\n    intersection: {\n      threshold: 0.2\n    },\n    once: true\n  }"}],staticClass:"resume-intro",class:{"resume-intro-appear":e.isVisible}},[s("v-switch",{attrs:{label:"抽烟"},model:{value:e.setFalse,callback:function(i){e.setFalse=i},expression:"setFalse"}})],1):e._e()}),[],!1,null,null,null);i.default=a.exports},91:function(e,i,s){}}]);