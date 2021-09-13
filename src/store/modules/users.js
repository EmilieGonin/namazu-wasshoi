import api from '../axios'
const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
console.log(user);

export function authHeader(token) {
  api.defaults.headers.common['Authorization'] = "Bearer " + token;
}

if (token) { authHeader(token) }

const state = () => ({
  user: user ? user : "",
  token: token ? token : ""
})

const mutations = {
  setUser(state, user) {
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
    console.log(user);
  },
  setToken(state, token) {
    localStorage.setItem("token", JSON.stringify(token));
    authHeader(token);
    state.token = token;
  },
  setCharacter(state, character) {
    state.user.Character = character;
    localStorage.setItem("user", JSON.stringify(state.user));
  },
  logout(state) {
    state.user = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}

const actions = {
  //Signup
  signup({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.post("users/signup", user)
      .then(response => {
        commit("setUser", response.data.user);
        commit("setToken", response.data.token);
        commit("request", "success", { root: true });
        commit("message", response.data.message, { root: true });
        resolve(response);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Login
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.post("users/login", user)
      .then(response => {
        commit("setUser", response.data.user);
        commit("setToken", response.data.token);
        commit("request", "success", { root: true });
        commit("message", response.data.message, { root: true });
        resolve(response);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Check if user is still logged and/or registered
  checkUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.get("users/" + id)
      .then(() => {
        commit("request", "success", { root: true });
        resolve();
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        commit("logout");
        reject(e);
      })
    })
  },
  //Get All Users
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.get("users/")
      .then(response => {
        commit("request", "success", { root: true });
        resolve(response.data.users);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Get User by id
  getUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.get("users/" + id)
      .then(response => {
        commit("request", "success", { root: true });
        resolve(response.data.user);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Edit User datas
  editUser({ commit }, [ id, form ]) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.put("users/" + id, form)
      .then(response => {
        commit("setUser", response.data.user);
        commit("request", "success", { root: true });
        commit("message", response.data.message, { root: true });
        resolve();
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Delete User
  deleteUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.delete("users/" + id)
      .then(response => {
        commit("request", "success", { root: true });
        commit("message", response.data.message, { root: true });
        resolve();
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Update User Character datas
  updateCharacter({ commit, state }) {
    return new Promise((resolve, reject) => {
      // commit("request", "pending", { root: true });
      commit("setCharacter", null);

      api.get("users/" + state.user.id + "/character")
      .then(response => {
        commit("setUser", response.data.user);
        // commit("request", "success", { root: true });
        resolve();
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      });
    })
  },
}

export default {
  state,
  mutations,
  actions
}
