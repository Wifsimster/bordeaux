(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{82:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"min-w:full sm:min-w:sm"},[e.error?s("alert",{attrs:{color:"red"}},[e._v(e._s(e.error))]):e._e(),e._v(" "),s("div",[s("div",{staticClass:"text:white text:3/2"},[e._v("Update")]),e._v(" "),s("div",{staticClass:"text:grey-dark"},[e._v("Restart needed at any change.")]),e._v(" "),e.settings?s("div",[s("div",{staticClass:"relative my:3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.enable,expression:"settings.enable"}],attrs:{id:"enable",type:"checkbox"},domProps:{checked:Array.isArray(e.settings.enable)?e._i(e.settings.enable,null)>-1:e.settings.enable},on:{change:function(t){var s=e.settings.enable,n=t.target,i=!!n.checked;if(Array.isArray(s)){var a=e._i(s,null);n.checked?a<0&&e.$set(e.settings,"enable",s.concat([null])):a>-1&&e.$set(e.settings,"enable",s.slice(0,a).concat(s.slice(a+1)))}else e.$set(e.settings,"enable",i)}}}),e._v(" "),s("label",{attrs:{for:"enable"}},[e._v("Automatic update")])]),e._v(" "),s("div",{staticClass:"relative my:3"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.settings.cron,expression:"settings.cron"}],attrs:{id:"cron"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.settings,"cron",t.target.multiple?s:s[0])}}},e._l(e.list,(function(t){return s("option",{key:t.key,domProps:{value:t.key}},[e._v(e._s(t.value))])})),0),e._v(" "),s("label",{attrs:{for:"cron"}},[e._v("Check for update every")])]),e._v(" "),s("div",{staticClass:"relative my:3"},[s("btn",{on:{click:function(t){return e.pull()}}},[e._v("Manual check")])],1),e._v(" "),s("div",{staticClass:"relative"},[e._v("Version : "+e._s(e.version))]),e._v(" "),s("div",{staticClass:"relative"},[e._v("Build date : "+e._s(e.buildDate))])]):e._e()])],1)};n._withStripped=!0;var i=s(2),a=s(35),r=s(29),l={computed:{message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,settings:null,list:[{key:"* * */1 * *",value:"hour"},{key:"* * */2 * *",value:"2 hours"},{key:"* * */6 * *",value:"6 hours"},{key:"* * * */1 *",value:"day"},{key:"* * * */7 *",value:"week"}],version:"0.1.0",buildDate:Object(r.a)(Object(a.a)("2020-01-23T12:47:56.951Z"),"MM / dd / yyyy - HH:mm:ss")}},created:function(){this.getAll()},watch:{"settings.enable":function(){this.update()},"settings.cron":function(){this.update()},message:function(e){if("git"===e.object)switch(this.error=null,e.method){case"getAll":case"update":e.error?this.error=e.error:this.settings=Object.assign({},e.results);break;case"pull":e.error?this.error=e.error:this.$store.dispatch("notification/add",{type:"success",message:e.results});break;default:console.log("Unknow method : ".concat(e.method))}}},methods:{pull:function(){this.$store.commit("webSocket/send",{object:"git",method:"pull"})},getAll:function(){this.$store.commit("webSocket/send",{object:"git",method:"getAll"})},update:function(){Object(i.b)(this.settings)||this.$store.commit("webSocket/send",{object:"git",method:"update",params:this.settings})}}},o=s(0),c=Object(o.a)(l,n,[],!1,null,null,null);c.options.__file="src/components/settings/update.vue";t.default=c.exports}}]);