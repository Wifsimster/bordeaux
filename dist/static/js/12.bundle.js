(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{82:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"max-w:md my:auto"},[s("div",{staticClass:"fixed t:0 l:0 max-w:full bg:orange transition mb:2",staticStyle:{height:"2px"},style:t.width}),t._v(" "),s("transition",{attrs:{name:"slide:right",mode:"out-in"}},[1===t.step?s("div",{key:"1"},[s("directory",{on:{"is-valid":function(i){return t.isDirectoryValid=i}}})],1):t._e(),t._v(" "),2===t.step?s("div",{key:"2"},[s("subtitles",{on:{"is-valid":function(i){return t.isSubtitlesValid=i}}})],1):t._e(),t._v(" "),3===t.step?s("div",{key:"3"},[s("transmission",{on:{"is-valid":function(i){return t.isTransmissionValid=i}}})],1):t._e(),t._v(" "),4===t.step?s("div",{key:"4"},[s("plex",{on:{"is-valid":function(i){return t.isPlexValid=i}}})],1):t._e(),t._v(" "),5===t.step?s("div",{key:"5"},[s("trakt",{on:{"is-valid":function(i){return t.isTraktValid=i}}})],1):t._e()]),t._v(" "),s("div",{staticClass:"flex flex:wrap justify:end items:baseline"},[s("a",{staticClass:"cursor:pointer",on:{click:function(i){return t.previous()}}},[t._v("Previous")]),t._v(" "),s("a",{staticClass:"cursor:pointer ml:2",on:{click:function(i){return t.next()}}},[t._v("Skip")]),t._v(" "),s("transition",{attrs:{name:"slide:down"}},[t.isValid?s("btn",{staticClass:"ml:2",on:{click:function(i){return t.next()}}},[t._v("Next")]):t._e()],1)],1)],1)};e._withStripped=!0;var n=s(40),a=s(43),r=s(42),o=s(39),l=s(41),c={components:{Directory:n.a,Transmission:a.a,Plex:r.a,Trakt:o.a,Subtitles:l.a},computed:{width:function(){return"width: ".concat(this.step/this.steps*100,"%")},isValid:function(){switch(this.step){case 1:return this.isDirectoryValid;case 2:return this.isSubtitlesValid;case 3:return this.isTransmissionValid;case 4:return this.isPlexValid;case 5:return this.isTraktValid}}},data:function(){return{isDirectoryValid:!1,isSubtitlesValid:!1,isTransmissionValid:!1,isPlexValid:!1,isTraktValid:!1,step:1,steps:5}},methods:{previous:function(){this.step>1&&this.step--},next:function(){this.step===this.steps&&this.goToDashboard(),this.step<this.steps&&this.step++},goToDashboard:function(){localStorage.setItem("token","bordeaux"),this.$router.push("/").catch(function(t){console.warn(t)})}},watch:{isTraktValid:function(t){t&&this.goToDashboard()}}},u=s(1),d=Object(u.a)(c,e,[],!1,null,null,null);d.options.__file="src/frontend/pages/Wizard.vue";i.default=d.exports}}]);