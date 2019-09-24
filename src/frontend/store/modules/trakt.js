const state = {
  watched: null,
  collected: null
}

const getters = {
  watched: state => state.watched,
  collected: state => state.collected
}

const mutations = {
  setWatched(state, data) {
    state.watched = data
  },
  setCollected(state, data) {
    state.collected = data
  }
}

const actions = {
  setWatched: ({ commit, state }, data) => commit("setWatched", data),
  setCollected: ({ commit, state }, data) => commit("setCollected", data)
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
