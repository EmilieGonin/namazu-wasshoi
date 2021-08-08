import { createStore } from 'vuex'
import { api, authHeader, cache, checkCache } from './axios'

const user = JSON.parse(localStorage.getItem("user"));
// localStorage.clear();
console.log(user);

export default createStore({
  state() {
    return {
      status: "",
      errors: "",
      title: "",
      icon: "",
      user: user,
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
    UPDATE_STATUS(state, status) {
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
  },
  actions: {
    setPage({ commit }, [ title, icon ]) {
      commit("SET_PAGE", [ title, icon ]);
    },
    setFreeCompany({ commit }) {
      return new Promise((resolve, reject) => {
        commit("UPDATE_STATUS", "pending");
        const fc = checkCache("fc");

        if (!fc) {
          api.get("fc")
          .then((response) => {
            commit("SET_FREE_COMPANY", cache("fc", response.data));
            commit("UPDATE_STATUS", "success");
            resolve();
          })
          .catch((e) => {
            console.error(e);
            commit("UPDATE_STATUS", "error");
            commit("ERROR", "Une erreur s'est produite pendant le chargement de la compagnie libre.");
            reject();
          });
        } else {
          commit("SET_FREE_COMPANY", fc);
          commit("UPDATE_STATUS", "success");
          resolve();
        }
      })
    },
    searchCharacter({ commit }, [ character, cl, silent ]) {
      return new Promise((resolve, reject) => {
        if (!silent) {
          commit("UPDATE_STATUS", "pending");
        }

        api.post("fc/character", {
          character: character,
          cl: cl
        })
        .then((response) => {
          commit("UPDATE_STATUS", "success");
          resolve(response.data.character.Name);
        })
        .catch((e) => {
          commit("UPDATE_STATUS", "error");
          commit("ERROR", e.response.data.error);
          reject();
        });
      })
    },
    error({ commit }, error) {
      commit("UPDATE_STATUS", "error");
      commit("ERROR", error);
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("UPDATE_STATUS", "pending");
        api.post("user/signup", user)
        .then((response) => {
          commit("AUTH_SUCCESS", response.data);
          resolve(response);
        })
        .catch((error) => {
          commit("UPDATE_STATUS", "error");
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    },
    getParameter({ commit }, parameter) {
      return new Promise((resolve, reject) => {
        commit("UPDATE_STATUS", "pending");
        api.get("parameters/" + parameter)
        .then((response) => {
          commit("UPDATE_STATUS", "success");
          resolve(response.data.parameter.data);
        })
        .catch((error) => {
          commit("UPDATE_STATUS", "error");
          commit("ERROR", error.response.data.error);
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
