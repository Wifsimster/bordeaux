(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{361:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex flex:wrap"},[e("server",{staticClass:"flex:1 min-w:xs max-w:sm py:1"}),this._v(" "),e("directory",{staticClass:"flex:1 min-w:xs max-w:sm py:1"}),this._v(" "),e("transmission",{staticClass:"flex:1 min-w:xs max-w:sm py:1"}),this._v(" "),e("plex",{staticClass:"flex:1 min-w:xs max-w:sm py:1"}),this._v(" "),e("trakt",{staticClass:"flex:1 min-w:xs max-w:sm py:1"})],1)};r._withStripped=!0;var n=s(346),i=s(344),o=s(345),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.error?s("alert",{attrs:{color:"red"}},[t._v(t._s(t.error))]):t._e(),t._v(" "),s("div",{staticClass:"px:1"},[s("div",{staticClass:"text:white text:3/2"},[t._v("Server")]),t._v(" "),t.settings?s("form",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.host,expression:"settings.host"}],attrs:{type:"text",placeholder:"localhost"},domProps:{value:t.settings.host},on:{input:function(e){e.target.composing||t.$set(t.settings,"host",e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.port,expression:"settings.port"}],attrs:{type:"text",placeholder:"8080"},domProps:{value:t.settings.port},on:{input:function(e){e.target.composing||t.$set(t.settings,"port",e.target.value)}}})]):t._e()])],1)};a._withStripped=!0;var l={computed:{message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,settings:null}},created:function(){this.getAll()},watch:{"settings.host":function(t,e){e&&this.update()},"settings.port":function(t,e){e&&this.update()},message:function(t){if("server"===t.object)switch(this.error=null,t.method){case"getAll":case"update":t.error?this.error=t.error:this.settings=Object.assign({},t.results);break;default:console.log("Unknow method : ".concat(t.method))}}},methods:{getAll:function(){this.$store.commit("webSocket/send",{object:"server",method:"getAll"})},update:function(){this.$store.commit("webSocket/send",{object:"server",method:"update",params:this.settings})}}},c=s(14),p=Object(c.a)(l,a,[],!1,null,null,null);p.options.__file="src/frontend/components/settings/server.vue";var m=p.exports,u=s(343),d={components:{Directory:n.a,Transmission:i.a,Plex:o.a,Server:m,Trakt:u.a}},v=Object(c.a)(d,r,[],!1,null,null,null);v.options.__file="src/frontend/pages/Settings.vue";e.default=v.exports}}]);