import api from '../axios'

const actions = {
  //Get parameter by id
  getParameter({ commit }, parameter) {
    return new Promise((resolve, reject) => {
      api.get("parameters/" + parameter)
      .then(response => {
        commit("request", "success", { root: true });
        resolve(response.data.parameter.data);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Get all parameters
  getParameters({ commit }) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.get("parameters/")
      .then(response => {
        commit("request", "success", { root: true });
        resolve(response.data.parameters);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Edit Parameter
  editParameter({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.put("parameters/" + id)
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
}

export default {
  actions
}
