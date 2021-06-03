import { createStore } from 'vuex'
import { xivapi, cache, checkCache } from './axios'

const user = JSON.parse(localStorage.getItem("user"));
const id = process.env.VUE_APP_FC_ID;
// localStorage.clear();
// console.log(user);

export default createStore({
  state() {
    return {
      status: "",
      title: "",
      icon: "",
      user: user,
      fc: "",
      staffMembers: ""
    }
  },
  getters: {
    status(state) { return state.status },
    title(state) { return state.title },
    icon(state) { return state.icon },
    user(state) { return state.user },
    fc(state) { if (state.fc) {
        return state.fc.data;
      }},
    fcMembers(state) { if (state.fc) {
      return state.fc.data.FreeCompanyMembers;
    }},
    staffMembers(state) { return state.staffMembers },
    loggedIn(state) { return !!state.user }
  },
  mutations: {
    UPDATE_STATUS(state, status) {
      state.status = status;
    },
    SET_PAGE(state, [ title, icon ]) {
      state.title = title;
      state.icon = icon;
    },
    SET_FREE_COMPANY(state, data) {
      state.fc = data;
    },
    SET_STAFF_MEMBERS(state, data) {
      state.staffMembers = data;
    }
  },
  actions: {
    setPage({ commit }, [ title, icon ]) {
      commit("SET_PAGE", [ title, icon ]);
    },
    setFreeCompany({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        commit("UPDATE_STATUS", "pending");
        const fc = checkCache("fc");
        if (!fc) {
          xivapi.get("/freecompany/" + id + "?data=FCM")
          .then((response) => {
            commit("SET_FREE_COMPANY", cache("fc", response.data));
            dispatch("setStaffMembers", response.data.FreeCompanyMembers)
            .then(() => {
              commit("UPDATE_STATUS", "success");
              resolve();
            })
          })
          .catch((e) => {
            console.error(e);
            commit("UPDATE_STATUS", "error");
            reject();
          });
        } else {
          commit("SET_FREE_COMPANY", fc);
          dispatch("setStaffMembers", fc.data.FreeCompanyMembers)
          .then(() => {
            commit("UPDATE_STATUS", "success");
            resolve();
          })
        }
      })
    },
    setStaffMembers({ commit }, fc) {
      return new Promise((resolve) => {
        const staffRoles = ["Maître", "Bras droit", "Officier"];
        const staff = [];
        for (const member of fc) {
          if (staffRoles.includes(member.Rank)) {
            staff.push(member.Name);
          }
        }
        commit("SET_STAFF_MEMBERS", staff);
        resolve();
      });
    }
  },
  modules: {
  }
})
