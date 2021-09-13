import api from '../axios'

export function cache(name, data) {
  const now = new Date();
  const item = {
    data: data,
    expiry: now.getTime() + 1800000
  }
  localStorage.setItem(name, JSON.stringify(item));
  return item;
}

export function checkCache(name) {
  const item = JSON.parse(localStorage.getItem(name));
  if (!item) {
    console.log("item not found");
    return false;
  }

  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(name)
    console.log("item expired");
    return false;
  } else {
    console.log("item not expired yet");
    return item;
  }
}

const actions = {
  //Get FC datas
  setFreeCompany({ commit }) {
    return new Promise((resolve, reject) => {
      commit("request", "pending", { root: true });
      const fc = checkCache("fc");

      if (!fc) {
        api.get("fc")
        .then(response => {
          commit("request", "success", { root: true });
          cache("fc", response.data);
          resolve(response.data);
        })
        .catch(e => {
          commit("request", "error", { root: true });
          commit("message", e.response.data.error, { root: true });
          reject(e);
        });
      } else {
        commit("request", "success", { root: true });
        resolve(fc.data);
      }
    })
  },
  //Search Character datas
  searchCharacter({ commit }, [ character, cl, silent ]) {
    return new Promise((resolve, reject) => {
      if (!silent) {
        commit("request", "pending", { root: true });
      }

      api.post("fc/character", {
        character: character,
        cl: cl
      })
      .then(response => {
        commit("request", "success", { root: true });
        resolve(response.data.character);
      })
      .catch(e => {
        commit("request", "error", { root: true });
        commit("message", e.response.data.error, { root: true });
        reject(e);
      });
    })
  }
}

export default {
  actions
}
