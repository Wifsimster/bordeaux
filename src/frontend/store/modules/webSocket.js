const state = {
  ws: null,
  isAlive: null,
  message: null
}

const getters = {
  ws: state => state.ws,
  isAlive: state => state.isAlive,
  message: state => state.message
}

const mutations = {
  ws(state, data) {
    state.ws = data
  },
  isAlive(state, data) {
    state.isAlive = data
  },
  message(state, data) {
    state.message = data
  },
  send(state, data) {
    state.ws.send(JSON.stringify(data))
  }
}

const actions = {
  ws(payload, data) {
    payload.commit('ws', data)

    payload.state.ws.onopen = () => {
      payload.commit('isAlive', true)

      state.ws.onmessage = evt => {
        payload.commit('message', JSON.parse(evt.data))
      }
    }

    payload.state.ws.onclose = () => {
      payload.commit('isAlive', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
