(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{84:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"fixed z:50 r:1 b:0"},[e("transition-group",{attrs:{name:"flip",appear:""}},t._l(t.list,function(i,s){return e("div",{key:i.id,staticClass:"m:1/2 rounded shadow:large z:20 relative",class:"bg:"+i.color,attrs:{id:i.id}},[e("div",{staticClass:"flex items:baseline"},[e("div",{staticClass:"text:white px:1 pl:1/2 pr:1/4"},[t._v(t._s(i.message))]),t._v(" "),e("i",{staticClass:"float:right text:white text:3/4 mr:1/2 p:1/4 rounded cursor:pointer",class:"hover:bg:"+i.color+"-light",on:{click:function(i){return t.close(s)}}},[t._v("x")])]),t._v(" "),i.timeout?e("div",{staticClass:"rounded:b m:0 p:0",class:"bg:"+i.color+"-darker",style:"height: 4px; width:calc("+i.width+"% - 0.25rem);"}):t._e()])}),0)],1)};s._withStripped=!0;var o=e(2),r={computed:{list:Object(o.b)("notification/list")},methods:{close:function(t){this.$store.dispatch("notification/remove",t)}}},a=e(1),n=Object(a.a)(r,s,[],!1,null,null,null);n.options.__file="src/frontend/components/notification.vue";i.default=n.exports}}]);