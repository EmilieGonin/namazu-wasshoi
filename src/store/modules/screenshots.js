import api from '../axios'

const actions = {
  //Submit screenshot
  submitScreenshot({ commit, rootState }, formData) {
    return new Promise((resolve, reject) => {
      formData.append("UserId", JSON.stringify(rootState.users.user.id));
      commit("request", "pending", { root: true });

      api.post("screenshots/", formData)
      .then(response => {
        commit("request", "success", { root: true });
        commit("message", response.data.message, { root: true });
        resolve();
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject();
      })
    })
  }
}

export default {
  actions
}
