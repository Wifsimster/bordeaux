(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{27:function(t,e,n){},46:function(t,e,n){"use strict";var s=n(27);n.n(s).a},83:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"flex flex:wrap relative items:center items:center justify:center sm:p:1/2"},[n("router-link",{staticClass:"relative text:3/2 sm:text:2 text:bold mr:1/2 cursor:pointer glitch",attrs:{to:"/",tag:"div","data-text":"Bordeaux"}},[t._v("Bordeaux")]),t._v(" "),t.isAlive?n("div",[n("div",{staticClass:"md:none p:1/4 rounded:full bg:green"}),t._v(" "),n("div",{staticClass:"none md:block text:green text:7/8"},[t._v("Opened")])]):n("div",{staticClass:"text:red text:7/8 cursor:pointer",on:{click:function(e){return t.connect()}}},[n("div",{staticClass:"none md:block"},[t._v("Closed")])])],1)])};s._withStripped=!0;var i={computed:{isAlive:function(){return this.$store.getters["webSocket/isAlive"]}},methods:{connect:function(){this.$store.dispatch("webSocket/ws",new WebSocket("ws://".concat(location.hostname,":8080")))}}},o=(n(46),n(1)),c=Object(o.a)(i,s,[],!1,null,"1dcd9b40",null);c.options.__file="src/frontend/components/logo.vue";e.default=c.exports}}]);