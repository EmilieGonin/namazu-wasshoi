import { createStore } from 'vuex'
import { xivapi } from './axios'

const user = JSON.parse(localStorage.getItem("user"));
const id = process.env.VUE_APP_FC_ID;
// localStorage.clear();
// console.log(user);

export default createStore({
  state() {
    return {
      loading: false,
      title: "",
      icon: "",
      user: user,
      fc: ""
    }
  },
  getters: {
    loading(state) { return state.loading },
    title(state) { return state.title },
    icon(state) { return state.icon },
    user(state) { return state.user },
    fc(state) { return state.fc },
    fcMembers(state) { return state.fc.FreeCompanyMembers },
    loggedIn(state) { return !!state.user }
  },
  mutations: {
    LOADING(state) {
      state.loading = true;
    },
    SUCCESS(state) {
      state.loading = false;
    },
    SET_PAGE(state, [ title, icon ]) {
      state.title = title;
      state.icon = icon;
    },
    SET_FREE_COMPANY(state, data) {
      state.fc = data;
      state.loading = false;
    }
  },
  actions: {
    setPage({ commit }, [ title, icon ]) {
      commit("SET_PAGE", [ title, icon ]);
    },
    loading({commit}, isLoading) {
      if (isLoading) {
        commit("LOADING");
      } else {
        commit("SUCCESS");
      }
    },
    setFreeCompany({commit}) {
      commit("LOADING");
      xivapi.get("/freecompany/" + id + "?data=FCM")
      .then((response) => {
        console.log(response.data);
        commit("SET_FREE_COMPANY", response.data);
      })
      .catch((e) => console.error(e));
    }
  },
  modules: {
  }
})
