import { make } from "vuex-pathify"
import uuid from "uuid"

const state = {
  list: []
}

const getters = make.getters(state)

const mutations = {
  add(state, data) {
    data.id = uuid.v4()
    state.list.push(data)
  },
  remove(state, id) {
    state.list.map((notification, index) => {
      if (notification.id === id) {
        state.list.splice(index, 1)
      }
    })
  }
}

const actions = {
  add(payload, data) {
    payload.commit("add", data)
  },
  remove(payload, data) {
    payload.commit("remove", data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
