import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import webSocket from 'store/modules/webSocket'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { webSocket }
})

// Only for hot deployment
if (module.hot) {
  module.hot.accept(['./modules/webSocket'], () => {
    const webSocket = require('./modules/webSocket').default

    store.hotUpdate({
      modules: {
        webSocket: webSocket
      }
    })
  })
}
