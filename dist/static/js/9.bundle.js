(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{88:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex flex:wrap"},[e("server",{staticClass:"w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 sm:py:1 px:1"}),this._v(" "),e("directory",{staticClass:"w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 sm:py:1 px:1"}),this._v(" "),e("transmission",{staticClass:"w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 sm:py:1 px:1"}),this._v(" "),e("plex",{staticClass:"w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 sm:py:1 px:1"}),this._v(" "),e("trakt",{staticClass:"w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 sm:py:1 px:1"}),this._v(" "),e("subtitles",{staticClass:"w:full sm:flex:6/12 md:flex:4/12 xl:flex:3/12 sm:py:1 px:1"})],1)};r._withStripped=!0;var l=s(47),i=s(48),o=s(50),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.error?s("alert",{attrs:{color:"red"}},[t._v(t._s(t.error))]):t._e(),t._v(" "),s("div",[s("div",{staticClass:"text:white text:3/2"},[t._v("Server")]),t._v(" "),s("div",{staticClass:"text:grey-dark"},[t._v("Restart needed at any change.")]),t._v(" "),t.settings?s("form",[s("div",{staticClass:"relative mx:2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.host,expression:"settings.host"}],attrs:{id:"host",type:"text",placeholder:"localhost"},domProps:{value:t.settings.host},on:{input:function(e){e.target.composing||t.$set(t.settings,"host",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"host"}},[t._v("Host")])]),t._v(" "),s("div",{staticClass:"relative mx:2"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.port,expression:"settings.port"}],attrs:{id:"port",type:"text",placeholder:"8080"},domProps:{value:t.settings.port},on:{input:function(e){e.target.composing||t.$set(t.settings,"port",e.target.value)}}}),t._v(" "),s("label",{attrs:{for:"port"}},[t._v("Port")])]),t._v(" "),s("div",{staticClass:"relative mx:2"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.settings.cron,expression:"settings.cron"}],attrs:{id:"cron"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.settings,"cron",e.target.multiple?s:s[0])}}},t._l(t.list,function(e){return s("option",{key:e.key,domProps:{value:e.key}},[t._v(t._s(e.value))])}),0),t._v(" "),s("label",{attrs:{for:"cron"}},[t._v("Search new files every")])])]):t._e()])],1)};a._withStripped=!0;var n={computed:{message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,settings:null,list:[{key:"",value:"never"},{key:"* */1 * * *",value:"hour"},{key:"* */2 * * *",value:"2 hours"},{key:"* * */1 * *",value:"day"}]}},created:function(){this.getAll()},watch:{"settings.host":function(t,e){this.update()},"settings.port":function(t,e){this.update()},"settings.cron":function(t,e){this.update()},message:function(t){if("server"===t.object)switch(this.error=null,t.method){case"getAll":case"update":t.error?this.error=t.error:this.settings=Object.assign({},t.results);break;default:console.log("Unknow method : ".concat(t.method))}}},methods:{getAll:function(){this.$store.commit("webSocket/send",{object:"server",method:"getAll"})},update:function(){this.$store.commit("webSocket/send",{object:"server",method:"update",params:this.settings})}}},c=s(1),u=Object(c.a)(n,a,[],!1,null,null,null);u.options.__file="src/frontend/components/settings/server.vue";var v=u.exports,p=s(46),d=s(49),m={components:{Directory:l.a,Transmission:i.a,Plex:o.a,Server:v,Trakt:p.a,Subtitles:d.a}},f=Object(c.a)(m,r,[],!1,null,null,null);f.options.__file="src/frontend/pages/Settings.vue";e.default=f.exports}}]);