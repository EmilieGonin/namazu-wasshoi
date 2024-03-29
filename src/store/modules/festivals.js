import api from '../axios'

const actions = {
  //Get all or current and previous festivals
  getFestivals({ commit }, option) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.get("festivals/" + (option ? option : ''))
      .then((response) => {
        commit("request", "success", { root: true });
        if (option) {
          resolve(response.data);
        } else {
          resolve(response.data.festivals);
        }
      })
      .catch((e) => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      });
    })
  },
  //Submit vote to current festival
  submitVote({ commit, state }, form) {
    return new Promise((resolve, reject) => {
      const req = {
        UserId: state.user.id,
        ...form
      }
      commit("request", "pending", { root: true });

      api.post("festivals/vote", req)
      .then((response) => {
        commit("request", "success", { root: true });
        commit("message", response.data.message, { root: true });
        resolve();
      })
      .catch((e) => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Create a new festival
  newFestival({ commit }, form) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.post("festivals/", form)
      .then((response) => {
        commit("request", "success", { root: true });
        commit("message", response.data.message, { root: true });
        resolve();
      })
      .catch((e) => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  }
}

export default {
  actions
}
