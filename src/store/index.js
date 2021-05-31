import { createStore } from 'vuex'

const user = JSON.parse(localStorage.getItem("user"));

export default createStore({
  state() {
    return {
      loading: false,
      title: "",
      icon: "",
      user: user
    }
  },
  getters: {
    loading(state) { return state.loading },
    title(state) { return state.title },
    icon(state) { return state.icon },
    loggedIn(state) { return !!state.user }
  },
  mutations: {
    LOADING(state) {
      state.loading = true;
    },
    SET_PAGE(state, [ title, icon ]) {
      state.title = title;
      state.icon = icon;
    }
  },
  actions: {
    setPage({ commit }, [ title, icon ]) {
      commit("SET_PAGE", [ title, icon ]);
    }
  },
  modules: {
  }
})
