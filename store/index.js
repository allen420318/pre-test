const store = {
  state: () => ({
    isLogin: false,
  }),
  mutations: {
    setItem(state, payload) {
      state[payload.item] = payload.data
    },
  },
  actions: {
    setIsLogin({ commit }, boolen) {
      commit('setItem', { item: 'isLogin', data: boolen })
    },
  },
}

export default store
