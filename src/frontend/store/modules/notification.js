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
  }
}

const actions = {
  add(payload, data) {
    payload.commit("add", data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
