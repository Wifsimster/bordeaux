(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{366:function(t,s,e){"use strict";e.r(s);var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"absolute b:1 r:1 p:1 z:50"},[e("transition-group",{attrs:{name:"list"}},t._l(t.list,function(s){return e("div",{key:s.id,staticClass:"rounded shadow p:1",class:{"bg:green":"success"===s.type,"bg:red":"error"===s.type}},[t._v("\n      "+t._s(s.message)+"\n      "),e("span",{staticClass:"text:right cursor:pointer p:1/4",on:{click:function(e){return t.close(s.id)}}},[t._v("x")])])}),0)],1)};n._withStripped=!0;var i=e(25),o={computed:{list:Object(i.b)("notification/list")},methods:{close:function(t){this.$store.dispatch("notification/remove",t)}}},r=e(14),c=Object(r.a)(o,n,[],!1,null,null,null);c.options.__file="src/frontend/components/notification.vue";s.default=c.exports}}]);