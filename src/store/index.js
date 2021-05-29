import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      loading: false,
      title: "",
      icon: ""
    }
  },
  getters: {
    loading(state) { return state.loading },
    title(state) { return state.title },
    icon(state) { return state.icon }
  },
  mutations: {
    LOADING(state) {
      state.loading = true;
    },
    SET_PAGE(state, [ title, icon ]) {
      state.title = title;
      state.icon = icon;
      setTimeout(() => {
        state.loading = false;
      }, 1000)
    }
  },
  actions: {
    setPage({ commit }, [ title, icon ]) {
      commit("LOADING");
      console.log(title);
      console.log(icon);
      commit("SET_PAGE", [ title, icon ]);
    }
  },
  modules: {
  }
})
