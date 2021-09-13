import { createStore } from 'vuex'
import applicants from './modules/applicants'
import fc from './modules/fc'
import festivals from './modules/festivals'
import parameters from './modules/parameters'
import screenshots from './modules/screenshots'
import users from './modules/users'

export default createStore({
  state() {
    return {
      status: "",
      message: "",
      title: "",
      icon: "",
      viewer: "",
    }
  },
  mutations: {
    request(state, status) {
      if (state.status == "error") {
        state.message = "";
      }
      state.status = status;
    },
    message(state, message) {
      state.message = message;
      setTimeout(() => {
        state.message = "";
      }, 5000);
    },
    setPage(state, [ title, icon ]) {
      state.title = title;
      state.icon = icon;
    },
    setImageViewer(state, image) {
      state.viewer = image;
      state.status = "success";
    }
  },
  actions: {
    setImageViewer({ commit }, image) {
      commit("setImageViewer", image);
    },
    error({ commit }, error) {
      commit("request", "error");
      commit("message", error);
    }
  },
  modules: {
    applicants,
    fc,
    festivals,
    parameters,
    screenshots,
    users
  }
})
