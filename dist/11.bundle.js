<<<<<<< HEAD
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{397:function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"p:1"},[e.error?t("alert",{attrs:{color:"red"}},[e._v(e._s(e.error))]):e._e(),e._v(" "),e.isLoading?t("loader",{attrs:{message:e.loadingMessage}}):e._e(),e._v(" "),e.isLoading?e._e():t("div",[e.success?t("alert",{attrs:{color:"green"}},[t("p",[e._v("Files transfert with success :)")])]):e._e(),e._v(" "),e.hasEpisodes?t("div",[t("table",{staticClass:"border:collapse w:full"},[e._m(0),e._v(" "),t("tbody",e._l(e.episodes,function(s){return t("tr",{key:s.directory,staticClass:"hover:bg:grey-darker"},[t("td",[e._v(e._s(s.origin.file))]),e._v(" "),t("td",[e._v(e._s(s.destination.path))]),e._v(" "),t("td",{staticClass:"text:center"},[s.loading?t("loader"):e._e(),e._v(" "),s.transfered?t("span",{staticClass:"text:green"},[e._v("Done")]):e._e()],1)])}),0)])]):t("div",{staticClass:"text:center"},[e._v("No espiode found :(")])],1),e._v(" "),e.isLoading?e._e():t("div",{staticClass:"flex w:full justify:center mt:1"},[t("btn",{staticClass:"mr:1",on:{click:function(s){return e.search()}}},[e._v("Scan")]),e._v(" "),e.hasEpisodes?t("btn",{on:{click:function(s){return e.transfert()}}},[e._v("Transfert")]):e._e()],1)],1)};r._withStripped=!0;var i={name:"Transfert",computed:{hasEpisodes:function(){return this.episodes&&this.episodes.length>0},hasNoEpisode:function(){return this.episodes&&0===this.episodes.length},message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,episodes:null,success:null,isLoading:!1,loadingMessage:null}},created:function(){this.search()},watch:{message:function(e){var s=this;switch(e.object){case"transfert":switch(e.method){case"search":this.isLoading=!1,e.error?this.error=e.error:this.episodes=Object.assign([],e.results);break;case"move":e.error?console.error(error):(this.refreshPlex(),this.episodes.map(function(t,r){e.params.episode.origin.path===t.origin.path&&s.$set(s.episodes,r,Object.assign(t,{loading:!1,transfered:!0}))}))}break;case"plex":switch(e.method){case"refresh":e.error?this.error=e.error:console.log("[Plex] Refresh Tv Shows...")}}}},methods:{search:function(){this.isLoading=!0,this.loadingMessage="Searching new files...",this.$store.commit("webSocket/send",{object:"transfert",method:"search"})},transfert:function(){var e=this;this.episodes&&this.episodes.map(function(s,t){e.move(s,t)})},move:function(e,s){this.$set(this.episodes,s,Object.assign(e,{loading:!0})),this.$store.commit("webSocket/send",{object:"transfert",method:"move",params:{episode:e}})},refreshPlex:function(){this.$store.commit("webSocket/send",{object:"plex",method:"refresh"})}}},o=t(14),n=Object(o.a)(i,r,[function(){var e=this.$createElement,s=this._self._c||e;return s("thead",[s("tr",[s("th",[this._v("Episode found")]),this._v(" "),s("th",[this._v("Episode destination")]),this._v(" "),s("th",[this._v("Status")])])])}],!1,null,null,null);n.options.__file="src/frontend/pages/Transfert.vue";s.default=n.exports}}]);
=======
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{397:function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"p:1"},[e.error?t("alert",{attrs:{color:"red"}},[e._v(e._s(e.error))]):e._e(),e._v(" "),e.isLoading?t("loader",{attrs:{message:e.loadingMessage}}):e._e(),e._v(" "),e.isLoading?e._e():t("div",[e.success?t("alert",{attrs:{color:"green"}},[t("p",[e._v("Files transfert with success :)")])]):e._e(),e._v(" "),e.hasEpisodes?t("div",[t("table",{staticClass:"border:collapse w:full"},[e._m(0),e._v(" "),t("tbody",e._l(e.episodes,function(s){return t("tr",{key:s.directory,staticClass:"hover:bg:grey-darker"},[t("td",[e._v(e._s(s.origin.file))]),e._v(" "),t("td",[e._v(e._s(s.destination.path))]),e._v(" "),t("td",{staticClass:"text:center"},[s.loading?t("loader"):e._e(),e._v(" "),s.transfered?t("span",{staticClass:"text:green"},[e._v("Done")]):e._e()],1)])}),0)])]):t("div",{staticClass:"text:center"},[e._v("No espiode found :(")])],1),e._v(" "),e.isLoading?e._e():t("div",{staticClass:"flex w:full justify:center mt:1"},[t("btn",{staticClass:"mr:1",on:{click:function(s){return e.search()}}},[e._v("Scan")]),e._v(" "),e.hasEpisodes?t("btn",{on:{click:function(s){return e.transfert()}}},[e._v("Transfert")]):e._e()],1)],1)};r._withStripped=!0;var i={name:"Transfert",computed:{hasEpisodes:function(){return this.episodes&&this.episodes.length>0},hasNoEpisode:function(){return this.episodes&&0===this.episodes.length},message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,episodes:null,success:null,isLoading:!1,loadingMessage:null}},created:function(){this.search()},watch:{message:function(e){var s=this;switch(e.object){case"transfert":switch(e.method){case"search":this.isLoading=!1,e.error?this.error=e.error:this.episodes=Object.assign([],e.results);break;case"move":e.error?console.error(error):(this.refreshPlex(),this.episodes.map(function(t,r){e.params.episode.origin.path===t.origin.path&&s.$set(s.episodes,r,Object.assign(t,{loading:!1,transfered:!0}))}))}break;case"plex":switch(e.method){case"refresh":e.error?this.error=e.error:console.log("[Plex] Refresh Tv Shows...")}}}},methods:{search:function(){this.isLoading=!0,this.loadingMessage="Searching new files...",this.$store.commit("webSocket/send",{object:"transfert",method:"search"})},transfert:function(){var e=this;this.episodes&&this.episodes.map(function(s,t){e.move(s,t)})},move:function(e,s){this.$set(this.episodes,s,Object.assign(e,{loading:!0})),this.$store.commit("webSocket/send",{object:"transfert",method:"move",params:{episode:e}})},refreshPlex:function(){this.$store.commit("webSocket/send",{object:"plex",method:"refresh",params:{uuid:"9335dd7e-e8bc-48dd-9dba-0ed416be7c0f"}})}}},o=t(14),n=Object(o.a)(i,r,[function(){var e=this.$createElement,s=this._self._c||e;return s("thead",[s("tr",[s("th",[this._v("Episode found")]),this._v(" "),s("th",[this._v("Episode destination")]),this._v(" "),s("th",[this._v("Status")])])])}],!1,null,null,null);n.options.__file="src/frontend/pages/Transfert.vue";s.default=n.exports}}]);
>>>>>>> master
