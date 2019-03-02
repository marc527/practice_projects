const state = {
  counter: 0
}

const getters = {
  doubleCounter: (state) => {
    return state.counter * 2;
  }
}

const mutations = {
  increment: (state, payload) => {
    state.counter += payload;
  },
  decrement: (state, payload) => {
    state.counter -= payload;
  }
}

const actions = {
  increment: ({commit}, payload) => {
    console.log(payload);
    commit('increment', payload);
  },
  decrement: context => {
    context.commit('decrement');
  },
  asyncIncrement: ({commit}, payload) => {
    setTimeout(() => {
      commit('increment', payload.by)
    }, payload.duration)
  },
  asyncDecrement: ({commit}, payload) => {
    setTimeout(() => {
      commit('decrement', payload.by)
    }, payload.duration)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
