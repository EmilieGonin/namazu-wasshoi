import { createStore } from 'vuex'
import { api, authHeader, cache, checkCache } from './axios'

const user = JSON.parse(localStorage.getItem("user"));
// localStorage.clear();
console.log(user);

export default createStore({
  state() {
    return {
      status: "",
      message: "",
      title: "",
      icon: "",
      user: user ? user.user : ""
    }
  },
  getters: {
    status(state) { return state.status },
    title(state) { return state.title },
    icon(state) { return state.icon }
  },
  mutations: {
    REQUEST(state, status) {
      if (state.status == "error") {
        state.message = "";
      }
      state.status = status;
    },
    MESSAGE(state, message) {
      state.message = message;
      setTimeout(() => {
        state.message = "";
      }, 5000);
    },
    SET_PAGE(state, [ title, icon ]) {
      state.title = title;
      state.icon = icon;
    },
    AUTH_SUCCESS(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      authHeader(user);
      state.user = user.user;
      state.status = "success";
    },
    LOGOUT(state) {
      state.user = "";
      localStorage.removeItem("user");
      localStorage.removeItem("character");
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
            cache("fc", response.data);
            commit("REQUEST", "success");
            resolve(response.data);
          })
          .catch((e) => {
            console.error(e);
            commit("REQUEST", "error");
            commit("MESSAGE", "Une erreur s'est produite pendant le chargement de la compagnie libre.");
            reject();
          });
        } else {
          commit("REQUEST", "success");
          resolve(fc.data);
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
          commit("MESSAGE", e.response.data.error);
          reject();
        });
      })
    },
    getCharacter({ commit, state }) {
      return new Promise((resolve, reject) => {
        const character = checkCache("character");

        if (!character) {
          api.get("fc/character/" + state.user.characterId)
          .then((response) => {
            cache("character", response.data.character);
            commit("REQUEST", "success");
            resolve(response.data.character);
          })
          .catch((e) => {
            commit("REQUEST", "error");
            commit("MESSAGE", e.response.data.error);
            reject();
          });
        } else {
          commit("REQUEST", "success");
          resolve(character.data);
        }
      })
    },
    error({ commit }, error) {
      commit("REQUEST", "error");
      commit("MESSAGE", error);
    },
    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.post("user/signup", user)
        .then((response) => {
          commit("AUTH_SUCCESS", response.data);
          commit("MESSAGE", "Inscription validée !");
          resolve(response);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        // commit("REQUEST", "pending");
        api.post("user/login", user)
        .then((response) => {
          commit("AUTH_SUCCESS", response.data);
          commit("MESSAGE", "Connexion réussie !");
          resolve(response);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    checkUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.get("user/" + id)
        .then(response => {
          commit("REQUEST", "success");
          resolve(response.data);
        })
        .catch(error => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          commit("LOGOUT");
          reject(error.response.data.error);
        })
      })
    },
    getUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.get("user/" + id)
        .then(response => {
          commit("REQUEST", "success");
          resolve(response.data.user);
        })
        .catch(error => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error.response.data.error);
        })
      })
    },
    apply({ commit }, form) {
      return new Promise((resolve, reject) => {
        commit("REQUEST", "pending");
        api.post("applicants/new", form)
        .then(() => {
          commit("REQUEST", "success");
          commit("MESSAGE", "Merci ! Ta candidature a bien été envoyée.");
          resolve();
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
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
          commit("MESSAGE", error.response.data.error);
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
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    }
  },
  modules: {
  }
})
