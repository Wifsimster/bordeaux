(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{344:function(e,t,s){var i=s(384);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,s(68).default)("63e6815b",i,!1,{})},383:function(e,t,s){"use strict";var i=s(344);s.n(i).a},384:function(e,t,s){(e.exports=s(67)(!1)).push([e.i,".arrow[data-v-dff260b2]{border-width:0 2px 2px 0;transform:rotate(-135deg)}\n",""])},389:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"p:1"},[e.error?s("alert",{attrs:{color:"red"}},[e._v(e._s(e.error))]):e._e(),e._v(" "),e.results?s("alert",[s("p",[e._v("Fichiers ajoutés à Transmission :")]),e._v(" "),s("ul",{staticClass:"list-reset pl:1 px:1/2"},e._l(e.message,function(t){return s("li",{key:t.id},[e._v(e._s(t.name))])}),0)]):e._e(),e._v(" "),e.isLoading?s("loader"):e._e(),e._v(" "),s("div",{staticClass:"flex justify:center"},[s("div",{staticClass:"flex:1"},[s("btn",{attrs:{size:"sm"},on:{click:function(t){return e.previous()}}},[e._v("Previous")])],1),e._v(" "),s("div",{staticClass:"flex:1 text:center"},[s("btn",{attrs:{size:"sm"},on:{click:function(t){return e.today()}}},[e._v("Today")])],1),e._v(" "),s("div",{staticClass:"flex:1 text:right"},[s("btn",{attrs:{size:"sm"},on:{click:function(t){return e.next()}}},[e._v("Next")])],1)]),e._v(" "),e.episodes&&e.episodes.length>0?s("div",{staticClass:"mx:1"},[s("transition-group",{attrs:{name:"slide"}},e._l(e.days,function(t){return s("div",{key:e.format(t),staticClass:"w:full"},[s("div",{staticClass:"text:orange p:1/4 bg:grey-darkest"},[e._v(e._s(e.format(t)))]),e._v(" "),s("div",{staticClass:"responsive:6"},[e.getEpisodesFrom(t).length>0?e._l(e.getEpisodesFrom(t),function(t){return s("div",{key:t.episode.ids.imdb,staticClass:"cursor:pointer",staticStyle:{"min-height":"75px"},on:{click:function(s){return e.open(t)}}},[t.images?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.getImageSrc(t),expression:"getImageSrc(episode)"}],staticClass:"min-h:full w:full align:middle"}):e._e(),e._v(" "),s("div",{staticClass:"absolute t:0 flex w:full justify:end"},[e.hasBeenWatched(t)?s("div",{staticClass:"shadow bg:orange px:1/2 py:1/2 text:7/8 my:1/4"}):e._e(),e._v(" "),e.hasBeenCollected(t)?s("div",{staticClass:"shadow bg:green px:1/2 py:1/2 text:7/8 my:1/4"}):e._e()]),e._v(" "),s("div",{staticClass:"absolute b:3 l:1"},[e._v(e._s(t.show.title))]),e._v(" "),s("div",{staticClass:"absolute b:1 l:1 text:bold truncate max-w:11/12"},[e._v(e._s(t.episode.season)+"x"+e._s(t.episode.number)+" "+e._s(t.episode.title))])])}):[e._v("Nothing this day")]],2)])}),0)],1):e._e(),e._v(" "),s("episode-detail",{attrs:{show:e.hasSelectedEpisode,episode:e.selectedEpisode},on:{close:e.onClose}})],1)};i._withStripped=!0;var r=s(350),a=s(349),o=s(385),n=s(386),d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("modal",{attrs:{size:"max-w:xl",show:e.show},on:{close:function(t){return e.$emit("close")}},scopedSlots:e._u([{key:"content",fn:function(){return[e.detail?s("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:e.getLazyContainer(),expression:"getLazyContainer()"}],staticClass:"relative w:full"},[s("img",{staticClass:"min-h:full w:full align:middle rounded:t",attrs:{"data-src":e.getImageSrc()}}),e._v(" "),s("div",{staticClass:"absolute t:0 flex w:full justify:end"},[e.subtitle?s("div",{staticClass:"shadow bg:purple px:1/2 py:1/4 text:7/8 my:1/2"},[e._v("Subtitle")]):e._e(),e._v(" "),e.hasBeenCollected(e.episode)?s("div",{staticClass:"shadow bg:green px:1/2 py:1/4 text:7/8 my:1/2"},[e._v("Collected")]):e._e(),e._v(" "),e.hasBeenWatched()?s("div",{staticClass:"shadow bg:orange px:1/2 py:1/4 text:7/8 my:1/2"},[e._v("Watched")]):e._e(),e._v(" "),s("div",{staticClass:"shadow bg:orange px:1/2 py:1/4 text:7/8 my:1/2"},[e._v(e._s(e.detail.rating.toFixed(1)))])]),e._v(" "),s("div",{staticClass:"absolute b:1 l:1 r:1"},[s("div",[e._v(e._s(e.episode.show.title)+": Season "+e._s(e.episode.episode.season))]),e._v(" "),s("div",{staticClass:"truncate max-w:11/12"},[s("span",{staticClass:"text:bold"},[e._v(e._s(e.episode.episode.season)+"x"+e._s(e.episode.episode.number))]),e._v("\n          "+e._s(e.episode.episode.title)+"\n        ")])])]):e._e(),e._v(" "),e.detail?s("div",[s("div",{staticClass:"flex"},[s("div",{staticClass:"p:1"},[e._v("Aired : "+e._s(e.getDate(e.detail.first_aired)))]),e._v(" "),s("div",{staticClass:"p:1"},[e._v("Runtime : "+e._s(e.detail.runtime))]),e._v(" "),s("div",{staticClass:"p:1"},[e._v("Votes : "+e._s(e.detail.votes))])]),e._v(" "),s("div",{staticClass:"p:1"},[e._v(e._s(e.detail.overview))]),e._v(" "),e.isLoading?s("loader",{attrs:{message:e.loadingMessage}}):e._e(),e._v(" "),e.error?s("alert",{attrs:{color:"red"}},[e._v(e._s(e.error))]):e._e(),e._v(" "),e.addedMessage?s("alert",{attrs:{color:"green"}},[e._v(e._s(e.addedMessage))]):e._e(),e._v(" "),s("div",{staticClass:"m:1"},[e.tpbList?s("div",[e.tpbList.length>0?s("table",{staticClass:"border:collapse max-h:xs table:fixed"},[s("thead",[s("tr",[s("th",[e._v("Name")]),e._v(" "),s("th",[e._v("Quality")]),e._v(" "),s("th",{staticStyle:{"min-width":"100px"}},[s("i",{staticClass:"arrow p:1/5 mr:1/4 border:white inline-block"}),e._v(" "),s("span",{staticClass:"inline-block"},[e._v("Seeder")])]),e._v(" "),s("th",[e._v("Size")]),e._v(" "),s("th",[e._v("Uploaded")]),e._v(" "),s("th",[e._v("Download")])])]),e._v(" "),s("tbody",e._l(e.tpbList,function(t){return s("tr",{key:t.name,class:{"bg:orange":t.progress,"hover:bg:grey-darker cursor:pointer":!t.progress},on:{click:function(s){return e.addTorentToTransmission(t.magnetLink)}}},[s("td",{staticClass:"inline-block truncate p:1/4",staticStyle:{"max-width":"450px"}},[e._v(e._s(t.name))]),e._v(" "),s("td",{staticClass:"w:full text:center p:1/4",staticStyle:{"min-width":"50px"}},[t.quality?s("span",[e._v(e._s(t.quality))]):e._e()]),e._v(" "),s("td",{staticClass:"w:full text:center p:1/4",staticStyle:{"min-width":"50px"}},[t.seeder?s("span",[e._v(e._s(t.seeder))]):e._e()]),e._v(" "),s("td",{staticClass:"w:full text:center p:1/4",staticStyle:{"min-width":"125px"}},[t.size?s("span",[e._v(e._s(t.size))]):e._e()]),e._v(" "),s("td",{staticClass:"w:full text:center p:1/4",staticStyle:{"min-width":"100px"}},[t.uploaded?s("span",[e._v(e._s(t.uploaded))]):e._e()]),e._v(" "),s("td",[t.progress?s("span",[e._v(e._s(t.progress)+" %")]):e._e()])])}),0)]):s("div",{staticClass:"text:center"},[e._v("No results :(")])]):e._e()])],1):e._e()]},proxy:!0}])})};d._withStripped=!0;var c=s(382),l={components:{Modal:s(131).a},props:{episode:{type:Object},show:{type:Boolean,default:!1}},computed:{message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,detail:null,tpbList:[],isLoading:!1,loadingMessage:null,addedMessage:null,removedMessage:null,subtitle:!1}},watch:{show:function(){this.error=null,this.tpbList=null},episode:function(e){this.detail=null,e&&(this.getEpisode(),this.searchTorrents(),this.addedMessage=null)},message:function(e){var t=this;switch(e.object){case"trakt":switch(e.method){case"getEpisode":e.error?this.error=e.error:this.detail=e.results}break;case"download":switch(e.method){case"searchEpisode":this.isLoading=!1,e.error?502===e.error.code?this.error="The Pirate Bay is down !":this.error=e.error:(this.tpbList=e.results.filter(function(e){return e.seeder>0}),this.tpbList.length>0&&this.getActiveTorrents())}break;case"transmission":switch(e.method){case"add":this.isLoading=!1,e.error?this.error=e.error:this.$store.dispatch("notification/add",{message:"".concat(e.results.name," added to Transmission ;)"),type:"success"});break;case"remove":this.isLoading=!1,e.error?this.error=e.error:(this.removedMessage="".concat(e.results.name," remove to Transmission ;)"),this.tpbList=null);break;case"active":if(e.error)this.error=e.error;else{var s=e.results.torrents;this.tpbList.map(function(e,i){s.map(function(s){e.magnetLink.startsWith(s.magnetLink)&&t.$set(t.tpbList,i,Object.assign(e,{progress:parseInt(100*s.percentDone)}))})})}}}}},methods:{hasBeenWatched:function(){var e=this,t=this.$store.get("trakt/watched");if(t){var s=t.filter(function(t){return t.show.ids.trakt===e.episode.show.ids.trakt})[0];if(s){var i=s.seasons.filter(function(t){return t.number===e.episode.episode.season})[0];if(i)if(i.episodes.filter(function(t){return t.number===e.episode.episode.number})[0])return!0}}return!1},hasBeenCollected:function(){var e=this,t=this.$store.get("trakt/collected");if(t){var s=t.filter(function(t){return t.show.ids.trakt===e.episode.show.ids.trakt})[0];if(s){var i=s.seasons.filter(function(t){return t.number===e.episode.episode.season})[0];if(i)if(i.episodes.filter(function(t){return t.number===e.episode.episode.number})[0])return!0}}return!1},getDate:function(e){return Object(r.a)(Object(c.a)(e),"yyyy-MM-dd")},getLazyContainer:function(){if(this.episode.images)return{selector:"img",loading:"https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png",error:"https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png"}},getImageSrc:function(){if(this.episode.images)return"https://image.tmdb.org/t/p/original".concat(this.episode.images[0].file_path)},getEpisode:function(){this.$store.commit("webSocket/send",{object:"trakt",method:"getEpisode",params:{showId:this.episode.show.ids.trakt,season:this.episode.episode.season,episode:this.episode.episode.number}})},buildEpisodeName:function(){if(this.episode){var e=this.episode.episode.season<10?"0".concat(this.episode.episode.season):this.episode.episode.season,t=this.episode.episode.number<10?"0".concat(this.episode.episode.number):this.episode.episode.number;return"".concat(this.episode.show.title," S").concat(e,"E").concat(t)}},searchTorrents:function(){this.isLoading=!0,this.loadingMessage="Searchig trackers...",this.addedMessage=null,this.$store.commit("webSocket/send",{object:"download",method:"searchEpisode",params:{title:this.buildEpisodeName()}})},addTorentToTransmission:function(e){this.isLoading=!0,this.loadingMessage="Adding to Transmission...",this.$store.commit("webSocket/send",{object:"transmission",method:"add",params:{uuid:"544a62b2-ae85-46a5-95f6-92dfaaf55cfc",magnetLink:e}})},removeTorrentToTransmission:function(e){this.isLoading=!0,this.loadingMessage="Removing to Transmission...",this.$store.commit("webSocket/send",{object:"transmission",method:"remove",params:{uuid:"544a62b2-ae85-46a5-95f6-92dfaaf55cfc",id:e}})},getActiveTorrents:function(){this.$store.commit("webSocket/send",{object:"transmission",method:"active",params:{uuid:"544a62b2-ae85-46a5-95f6-92dfaaf55cfc"}})},hasSubtitle:function(e){this.$store.commit("webSocket/send",{object:"subtitle",method:"hasSubtitle",params:{file:e}})}}},u=(s(383),s(14)),h=Object(u.a)(l,d,[],!1,null,"dff260b2",null);h.options.__file="src/frontend/components/EpisodeDetail.vue";var p={components:{EpisodeDetail:h.exports},computed:{message:function(){return this.$store.getters["webSocket/message"]}},data:function(){return{error:null,results:null,settings:null,isLoading:!1,episodes:null,currentDay:null,currentWeek:null,days:[],hasSelectedEpisode:!1,selectedEpisode:null}},created:function(){this.getTransmissionSettings(),this.currentDay=Object(o.a)(new Date,6),this.getWatched(),this.getCollected()},watch:{currentDay:function(){this.days=[];for(var e=0;e<7;e++)this.days.push(Object(a.a)(this.currentDay,e));this.getEpisodes()},message:function(e){if("transmission"===e.object)switch(e.method){case"getAll":e.error?this.error=e.error:this.settings=Object.assign({},e.results)}if("trakt"===e.object)switch(e.method){case"getEpisodes":e.error?this.error=e.error:this.episodes=e.results;break;case"getWatched":e.error?this.error=e.error:this.$store.set("trakt/watched",e.results);break;case"getCollected":e.error?this.error=e.error:this.$store.set("trakt/collected",e.results)}}},methods:{onClose:function(){this.hasSelectedEpisode=!1,this.selectedEpisode=null},hasBeenWatched:function(e){if(e){var t=this.$store.get("trakt/watched");if(t){var s=t.filter(function(t){return t.show.ids.trakt===e.show.ids.trakt})[0];if(s){var i=s.seasons.filter(function(t){return t.number===e.episode.season})[0];if(i)if(i.episodes.filter(function(t){return t.number===e.episode.number})[0])return!0}}return!1}},hasBeenCollected:function(e){if(e){var t=this.$store.get("trakt/collected");if(t){var s=t.filter(function(t){return t.show.ids.trakt===e.show.ids.trakt})[0];if(s){var i=s.seasons.filter(function(t){return t.number===e.episode.season})[0];if(i)if(i.episodes.filter(function(t){return t.number===e.episode.number})[0])return!0}}return!1}},open:function(e){this.hasSelectedEpisode=!0,this.selectedEpisode=e},previous:function(){this.currentDay=Object(o.a)(this.currentDay,7)},today:function(){this.currentDay=Object(o.a)(new Date,6)},next:function(){this.currentDay=Object(a.a)(this.currentDay,7)},getEpisodes:function(){this.$store.commit("webSocket/send",{object:"trakt",method:"getEpisodes",params:{startDate:Object(r.a)(this.currentDay,"yyyy-MM-dd"),days:"7"}})},getImageSrc:function(e){if(e.images)return{src:"https://image.tmdb.org/t/p/original".concat(e.images[0].file_path),loading:"https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png",error:"https://trakt.tv/assets/placeholders/thumb/fanart-96d5b92c25602cd5f5f8bc3d7fe1a249.png"}},getEpisodesFrom:function(e){if(this.episodes)return this.episodes.filter(function(t){return Object(n.a)(new Date(t.first_aired),e)})},format:function(e){return Object(r.a)(e,"dd / MM / yyyy")},getTransmissionSettings:function(){this.$store.commit("webSocket/send",{object:"transmission",method:"getAll"})},searchEpisode:function(e){this.$store.commit("webSocket/send",{object:"download",method:"searchLatestEpisode",params:{title:e.show.title}})},addToTransmission:function(e,t){this.shows[t].isLoading=!0,this.$store.commit("webSocket/send",{object:"download",method:"addToTransmission",params:{magnetLink:e,settings:this.settings,show:this.shows[t]}})},getWatched:function(){this.$store.commit("webSocket/send",{object:"trakt",method:"getWatched"})},getCollected:function(){this.$store.commit("webSocket/send",{object:"trakt",method:"getCollected"})}}},m=Object(u.a)(p,i,[],!1,null,null,null);m.options.__file="src/frontend/pages/Calendar.vue";t.default=m.exports}}]);