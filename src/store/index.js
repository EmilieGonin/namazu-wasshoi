import { createStore } from 'vuex'
import { api, authHeader, cache, checkCache } from './axios'

const user = JSON.parse(localStorage.getItem("user"));
// localStorage.clear();
// console.log(user);

export default createStore({
  state() {
    return {
      status: "",
      errors: "",
      title: "",
      icon: "",
      user: user ? user : "",
      fc: ""
    }
  },
  getters: {
    status(state) { return state.status },
    title(state) { return state.title },
    icon(state) { return state.icon },
    user(state) { return state.user },
    fc(state) { return state.fc.data.fc },
    fcMembers(state) { return state.fc.data.fcMembers },
    staffMembers(state) { return state.fc.data.staff },
    loggedIn(state) { return !!state.user }
  },
  mutations: {
    REQUEST(state, status) {
      state.status = status;
    },
    ERROR(state, errors) {
      state.errors = errors;
      setTimeout(() => {
        state.errors = "";
      }, 5000);
    },
    SET_PAGE(state, [ title, icon ]) {
      state.title = title;
      state.icon = icon;
    },
    SET_FREE_COMPANY(state, data) {
      state.fc = data;
    },
    AUTH_SUCCESS(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      authHeader(user);
      state.user = user;
      state.status = "success";
      state.errors = "";
    },
    LOGOUT(state) {
      state.user = "";
    },
  },
  actions: {
    setPage({ commit }, [ title, icon ]) {
      commit("SET_PAGE", [ title, icon ]);
    },
    setFreeCompany({ commit }) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        const fc = checkCache("fc");

        if (!fc) {
          api.get("fc")
          .then((response) => {
            commit("SET_FREE_COMPANY", cache("fc", response.data));
            commit("REQUEST", "success");
            resolve();
          })
          .catch((e) => {
            console.error(e);
            commit("REQUEST", "error");
            commit("ERROR", "Une erreur s'est produite pendant le chargement de la compagnie libre.");
            reject();
          });
        } else {
          commit("SET_FREE_COMPANY", fc);
          commit("REQUEST", "success");
          resolve();
        }
      })
    },
    searchCharacter({ commit }, [ character, cl, silent ]) {
      return new Promise((resolve, reject) => {
        if (!silent) {
          commit("REQUEST", "pending");
        }

        api.post("fc/character", {
          character: character,
          cl: cl
        })
        .then((response) => {
          commit("REQUEST", "success");
          resolve(response.data.character);
        })
        .catch((e) => {
          commit("REQUEST", "error");
          commit("ERROR", e.response.data.error);
          reject();
        });
      })
    },
    error({ commit }, error) {
      commit("REQUEST", "error");
      commit("ERROR", error);
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.post("user/signup", user)
        .then((response) => {
          commit("AUTH_SUCCESS", response.data);
          resolve(response);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        api.post("user/login", user)
        .then((response) => {
          commit("AUTH_SUCCESS", response.data);
          resolve(response);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    logout({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("user");
    },
    apply({ commit }, form) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.post("applicants/new", form)
        .then(() => {
          commit("REQUEST", "success");
          resolve();
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    getApplicants({ commit }) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.get("applicants/")
        .then((response) => {
          commit("REQUEST", "success");
          resolve(response.data.applicants);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    getParameter({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.get("parameters/" + parameter)
        .then((response) => {
          commit("REQUEST", "success");
          resolve(response.data.parameter.data);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
