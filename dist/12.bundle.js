(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{87:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"max-w:md my:auto"},[s("div",{staticClass:"fixed t:0 l:0 max-w:full bg:orange transition mb:2",staticStyle:{height:"2px"},style:t.width}),t._v(" "),s("transition",{attrs:{name:"slide:right",mode:"out-in"}},[1===t.step?s("div",{key:"1"},[s("directory",{on:{"is-valid":function(i){return t.isDirectoryValid=i}}})],1):t._e(),t._v(" "),2===t.step?s("div",{key:"2"},[s("transmission",{on:{"is-valid":function(i){return t.isTransmissionValid=i}}})],1):t._e(),t._v(" "),3===t.step?s("div",{key:"3"},[s("plex",{on:{"is-valid":function(i){return t.isPlexValid=i}}})],1):t._e(),t._v(" "),4===t.step?s("div",{key:"4"},[s("trakt",{on:{"is-valid":function(i){return t.isTraktValid=i}}})],1):t._e()]),t._v(" "),s("div",{staticClass:"flex flex:wrap justify:end items:baseline"},[s("a",{staticClass:"cursor:pointer",on:{click:function(i){return t.previous()}}},[t._v("Previous")]),t._v(" "),s("a",{staticClass:"cursor:pointer ml:2",on:{click:function(i){return t.next()}}},[t._v("Skip")]),t._v(" "),s("transition",{attrs:{name:"slide:down"}},[t.isValid?s("btn",{staticClass:"ml:2",on:{click:function(i){return t.next()}}},[t._v("Next")]):t._e()],1)],1)],1)};e._withStripped=!0;var n=s(45),a=s(46),r=s(47),o=s(44),l={components:{Directory:n.a,Transmission:a.a,Plex:r.a,Trakt:o.a},computed:{width:function(){return"width: ".concat(this.step/this.steps*100,"%")},isValid:function(){switch(this.step){case 1:return this.isDirectoryValid;case 2:return this.isTransmissionValid;case 3:return this.isPlexValid;case 4:return this.isTraktValid}}},data:function(){return{isDirectoryValid:!1,isTransmissionValid:!1,isPlexValid:!1,isTraktValid:!1,step:1,steps:4}},methods:{previous:function(){this.step>1&&this.step--},next:function(){this.step<this.steps&&this.step++}},watch:{isTraktValid:function(t){t&&(localStorage.setItem("token","bordeaux"),this.$router.push("/"))}}},c=s(1),u=Object(c.a)(l,e,[],!1,null,null,null);u.options.__file="src/frontend/pages/Wizard.vue";i.default=u.exports}}]);