(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{28:function(t,e,a){},47:function(t,e,a){"use strict";var s=a(28);a.n(s).a},86:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.isWizard?t._e():a("div",[a("div",{staticClass:"kebab flex justify:end md:none text:white text:3/2 relative cursor:pointer",on:{click:function(e){t.displayKebab=!0}}}),t._v(" "),a("div",{staticClass:"absolute t:0 r:0 flex flex:col w:0 h:0 z:50 bg:black transition overflow:hidden",class:{"w:full h:full":t.displayKebab}},[t.displayKebab?a("div",{staticClass:"absolute t:0 r:0 text:7/4 cursor:pointer py:1",on:{click:function(e){t.displayKebab=!1}}},[t._v("x")]):t._e(),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 p:1",attrs:{to:"/","exact-active-class":"text:orange",title:"Dashboard"}},[t._v("Dashboard")]),t._v(" "),t.hasTrakt?a("router-link",{staticClass:"text:white text:3/2 p:1",attrs:{to:"/calendar","exact-active-class":"text:orange",title:"Calendar"}},[t._v("Calendar")]):t._e(),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 p:1",attrs:{to:"/transfert","exact-active-class":"text:orange",title:"Transfert"}},[t._v("Transfert")]),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 p:1",attrs:{to:"/subtitles","exact-active-class":"text:orange",title:"Subtitles"}},[t._v("Subtitles")]),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 p:1",attrs:{to:"/activity","exact-active-class":"text:orange",title:"Activities"}},[t._v("Activities")]),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 p:1",attrs:{to:"/settings","active-class":"text:orange",title:"Settings"}},[t._v("Settings")])],1),t._v(" "),a("div",{staticClass:"none md:flex flex:wrap items:center justify:center"},[a("router-link",{staticClass:"text:white text:3/2 py:1",attrs:{to:"/","exact-active-class":"text:orange",title:"Dashboard"}},[t._v("Dashboard")]),t._v(" "),t.hasTrakt?a("router-link",{staticClass:"text:white text:3/2 py:1",attrs:{to:"/calendar","exact-active-class":"text:orange",title:"Calendar"}},[t._v("Calendar")]):t._e(),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 py:1",attrs:{to:"/transfert","exact-active-class":"text:orange",title:"Transfert"}},[t._v("Transfert")]),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 py:1",attrs:{to:"/subtitles","exact-active-class":"text:orange",title:"Subtitles"}},[t._v("Subtitles")]),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 py:1",attrs:{to:"/activity","exact-active-class":"text:orange before:border:orange",title:"Activities"}},[a("i",{staticClass:"activities"})]),t._v(" "),a("router-link",{staticClass:"text:white text:3/2 py:1",attrs:{to:"/settings","active-class":"text:orange",title:"Settings"}},[a("i",{staticClass:"settings"})])],1)])};s._withStripped=!0;var i={computed:{message:function(){return this.$store.getters["webSocket/message"]},isWizard:function(){return"/wizard"===this.$route.path}},data:function(){return{hasTrakt:!1,displayKebab:!1}},created:function(){this.getTrakt()},methods:{getTrakt:function(){this.$store.commit("webSocket/send",{object:"trakt",method:"getAll"})}},watch:{message:function(t){if("trakt"===t.object)switch(this.error=null,t.method){case"getAll":if(t.error)this.error=t.error;else{var e=Object.assign({},t.results);this.hasTrakt=e.code&&e.accessToken&&e.refreshToken}break;case"update":this.getTrakt()}},$route:function(){this.displayKebab=!1}}},r=(a(47),a(1)),c=Object(r.a)(i,s,[],!1,null,"3e399eee",null);c.options.__file="src/frontend/components/navigation.vue";e.default=c.exports}}]);