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
      user: user ? user : "",
      viewer: ""
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
    SET_USER(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      state.status = "success";
    },
    SET_IMAGE_VIEWER(state, image) {
      state.viewer = image;
      state.status = "success";
    },
    LOGOUT(state) {
      state.user = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("character");
    },
  },
  actions: {
    getFestivals({ commit }, option) {
      return new Promise((resolve, reject) => {
        // commit("REQUEST", "pending");

        api.get("festivals/" + (option ? option : ''))
        .then((response) => {
          commit("REQUEST", "success");
          if (option) {
            resolve(response.data);
          } else {
            resolve(response.data.festivals);
          }
        })
        .catch((e) => {
          commit("REQUEST", "error");
          commit("MESSAGE", e.response.data.error);
          reject();
        });
      })
    },
    setPage({ commit }, [ title, icon ]) {
      commit("SET_PAGE", [ title, icon ]);
    },
    setImageViewer({ commit }, image) {
      commit("SET_IMAGE_VIEWER", image);
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
    getCharacter({ commit }, [ characterId, silent ]) {
      return new Promise((resolve, reject) => {
        if (!silent) {
          commit("REQUEST", "pending");
        }
        const character = checkCache("character");

        if (!character) {
          api.get("fc/character/" + characterId)
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
        api.post("users/signup", user)
        .then((response) => {
          commit("SET_USER", response.data.user);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          authHeader(response.data.token);
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
        api.post("users/login", user)
        .then((response) => {
          commit("SET_USER", response.data.user);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          authHeader(response.data.token);
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
        // commit("REQUEST", "pending");
        api.get("users/" + id)
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
        api.get("users/" + id)
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
    editUser({ commit }, [ id, form ]) {
      return new Promise((resolve, reject) => {
        // commit("REQUEST", "pending");
        api.put("users/" + id, form)
        .then(response => {
          commit("SET_USER", response.data.user);
          commit("MESSAGE", "Vos données ont bien été modifiées !");
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
        // commit("REQUEST", "pending");
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
    deleteApplicant({ commit }, id) {
      return new Promise((resolve, reject) => {
        // commit("REQUEST", "pending");
        api.delete("applicants/" + id)
        .then(() => {
          commit("REQUEST", "success");
          commit("MESSAGE", "La candidature a bien été supprimée.");
          resolve();
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
    getMembers({ commit }) {
      return new Promise((resolve, reject) => {
        // commit("REQUEST", "pending");
        api.get("users/")
        .then((response) => {
          commit("REQUEST", "success");
          resolve(response.data.users);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
    deleteUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        // commit("REQUEST", "pending");
        api.delete("users/" + id)
        .then((response) => {
          commit("REQUEST", "success");
          commit("MESSAGE", response.data.message);
          resolve();
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
    getParameter({ commit }, [ parameter, silent ]) {
      return new Promise((resolve, reject) => {
        if (silent) {
          commit("REQUEST", "pending");
        }
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
    },
    getParameters({ commit }) {
      return new Promise((resolve, reject) => {
        api.get("parameters/")
        .then((response) => {
          commit("REQUEST", "success");
          resolve(response.data.parameters);
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
    submitScreenshot({ commit, state }, formData) {
      return new Promise((resolve, reject) => {
        formData.append("UserId", JSON.stringify(state.user.id));
        commit("REQUEST", "pending");
        api.post("screenshots/", formData)
        .then((response) => {
          commit("REQUEST", "success");
          commit("MESSAGE", response.data.message);
          resolve();
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
    submitVote({ commit, state }, form) {
      return new Promise((resolve, reject) => {
        const req = {
          UserId: state.user.id,
          ...form
        }
        // commit("REQUEST", "pending");
        api.post("festivals/vote", req)
        .then((response) => {
          commit("REQUEST", "success");
          commit("MESSAGE", response.data.message);
          resolve();
        })
        .catch((error) => {
          commit("REQUEST", "error");
          commit("MESSAGE", error.response.data.error);
          reject(error);
        })
      })
    },
  },
  modules: {
  }
})
