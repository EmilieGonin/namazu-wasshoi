import api from '../axios'

const actions = {
  //Post a new application
  apply({ commit }, form) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.post("applicants/new", form)
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
  //Get all applicants
  getApplicants({ commit }) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.get("applicants/")
      .then(response => {
        commit("request", "success", { root: true });
        resolve(response.data.applicants);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      })
    })
  },
  //Delete applicant by id
  deleteApplicant({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });

      api.delete("applicants/" + id)
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
  }
}

export default {
  actions
}
