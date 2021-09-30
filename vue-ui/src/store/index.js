import { createStore } from 'vuex';

export default createStore({
  state: {
    likes: 0,
  },
  getters: {},
  mutations: {
    incrementLikes(state) {
      state.likes++;
    },
    decrementLikes(state) {
      if (state.likes > 0) state.likes--;
    },
  },
  actions: {},
  modules: {},
});
