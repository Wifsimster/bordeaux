(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{81:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"min-w:full sm:min-w:sm"},[t.error?s("alert",{attrs:{color:"red"}},[t._v(t._s(t.error))]):t._e(),t._v(" "),s("div",[s("div",{staticClass:"text:white text:3/2"},[t._v("Server")]),t._v(" "),s("div",{staticClass:"text:grey-dark"},[t._v("Restart needed at any change.")]),t._v(" "),t.settings?s("form",[s("div",{staticClass:"relative my:3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.host,expression:"settings.host"}],attrs:{id:"host",type:"text",placeholder:"localhost"},domProps:{value:t.settings.host},on:{input:function(e){e.target.composing||t.$set(t.settings,"host",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"host"}},[t._v("Host")])]),t._v(" "),s("div",{staticClass:"relative my:3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.port,expression:"settings.port"}],attrs:{id:"port",type:"text",placeholder:"8080"},domProps:{value:t.settings.port},on:{input:function(e){e.target.composing||t.$set(t.settings,"port",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"port"}},[t._v("Port")])]),t._v(" "),s("div",{staticClass:"relative my:3"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.settings.cron,expression:"settings.cron"}],attrs:{id:"cron"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.settings,"cron",e.target.multiple?s:s[0])}}},t._l(t.list,(function(e){return s("option",{key:e.key,domProps:{value:e.key}},[t._v(t._s(e.value))])})),0),t._v(" "),s("label",{attrs:{for:"cron"}},[t._v("Search new files every")])])]):t._e()])],1)};r._withStripped=!0;var o={computed:{message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,settings:null,list:[{key:"",value:"never"},{key:"* */1 * * *",value:"hour"},{key:"* */2 * * *",value:"2 hours"},{key:"* * */1 * *",value:"day"}]}},created:function(){this.getAll()},watch:{"settings.host":function(t,e){this.update()},"settings.port":function(t,e){this.update()},"settings.cron":function(t,e){this.update()},message:function(t){if("server"===t.object)switch(this.error=null,t.method){case"getAll":case"update":t.error?this.error=t.error:this.settings=Object.assign({},t.results);break;default:console.log("Unknow method : ".concat(t.method))}}},methods:{getAll:function(){this.$store.commit("webSocket/send",{object:"server",method:"getAll"})},update:function(){this.$store.commit("webSocket/send",{object:"server",method:"update",params:this.settings})}}},n=s(1),i=Object(n.a)(o,r,[],!1,null,null,null);i.options.__file="src/frontend/components/settings/server.vue";e.default=i.exports}}]);