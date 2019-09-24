import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import webSocket from "store/modules/webSocket"
import trakt from "store/modules/trakt"
import notification from "store/modules/notification"

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: { webSocket, trakt, notification }
})

// Only for hot deployment
if (module.hot) {
  module.hot.accept(["./modules/webSocket"], () => {
    const webSocket = require("./modules/webSocket").default
    const trakt = require("./modules/trakt").default
    const notification = require("./modules/notification").default

    store.hotUpdate({
      modules: {
        webSocket: webSocket,
        trakt: trakt,
        notification: notification
      }
    })
  })
}
