import Vue from "vue"
import Vuex from "vuex"
import pathify from "vuex-pathify"

Vue.use(Vuex)

import webSocket from "store/modules/webSocket"
import trakt from "store/modules/trakt"

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  plugins: [pathify.plugin],
  modules: { webSocket, trakt }
})

// Only for hot deployment
if (module.hot) {
  module.hot.accept(["./modules/webSocket"], () => {
    const webSocket = require("./modules/webSocket").default
    const trakt = require("./modules/trakt").default

    store.hotUpdate({
      modules: {
        webSocket: webSocket,
        trakt: trakt
      }
    })
  })
}
