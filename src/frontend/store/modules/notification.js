import { getID } from 'plugins'

const BOUND_TIMER = 100
const TIMER = 3000

const state = {
  list: []
}

const getters = {
  list: state => state.list
}

// Mutations mutate the state
// Mutations hanler must be synchronous
const mutations = {
  add(state, item) {
    state.list.push(item)
  },

  timer(state, item) {
    state.list.map((e, index) => {
      if (e.id === item.id) {
        state.list[index].remain = item.remain - Number(BOUND_TIMER)
        state.list[index].width = Math.ceil(
          (state.list[index].remain / item.timeout) * 100
        )
      }
    })
  },

  remove(state, index) {
    if (index !== undefined && index !== null) {
      state.list.splice(index, 1)
    } else {
      state.list = []
    }
  }
}

// Actions commit mutations
// Actions can contain asynchronous operations
const actions = {
  add({ commit, state }, item) {
    item.id = getID()

    switch (item.type) {
    case 'success':
      item.color = 'green'
      item.timeout = TIMER
      item.remain = item.timeout
      item.width = 100
      break
    case 'warning':
      item.color = 'orange'
      break
    case 'error':
      item.color = 'red'
      break
    default:
      item.color = 'teal'
      item.timeout = TIMER
      item.remain = item.timeout
      item.width = 100
    }

    commit('add', item)

    if (item.timeout) {
      setTimeout(
        () =>
          state.list.map((e, index) => {
            if (e.id === item.id) {
              commit('remove', index)
            }
          }),
        item.timeout
      )

      const timer = setInterval(() => {
        if (item.remain > BOUND_TIMER) {
          commit('timer', item)
        } else {
          clearInterval(timer)
        }
      }, BOUND_TIMER)
    }
  },

  remove({ commit }, index) {
    commit('remove', index)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
