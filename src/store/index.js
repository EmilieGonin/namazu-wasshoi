import { createStore } from 'vuex'
import { xivapi, cache, checkCache, fcId } from './xivapi'

const user = JSON.parse(localStorage.getItem("user"));
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
      fcMembers: "",
      staffMembers: ""
    }
  },
  getters: {
    status(state) { return state.status },
    title(state) { return state.title },
    icon(state) { return state.icon },
    user(state) { return state.user },
    fc(state) {
      if (state.fc) {
        return state.fc.data;
      }
    },
    fcMembers(state) {
      if (state.fcMembers) {
        return state.fcMembers.data;
      }
    },
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
    SET_FREE_COMPANY_MEMBERS(state, data) {
      state.fcMembers = data;
    },
    SET_STAFF_MEMBERS(state, data) {
      state.staffMembers = data;
    }
  },
  actions: {
    setPage({ commit }, [ title, icon ]) {
      commit("SET_PAGE", [ title, icon ]);
    },
    setFreeCompanyMembers({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        commit("UPDATE_STATUS", "pending");
        const fcMembers = checkCache("fcMembers");
        if (!fcMembers) {
          xivapi.freecompany.get(fcId, {data: "FCM"})
          .then((response) => {
            commit("SET_FREE_COMPANY_MEMBERS", cache("fcMembers", response.FreeCompanyMembers));
            dispatch("setStaffMembers", response.FreeCompanyMembers)
            .then(() => {
              commit("UPDATE_STATUS", "success");
              resolve();
            })
            .catch((e) => {
              console.error(e);
              commit("UPDATE_STATUS", "error");
              reject();
            });
          })
          .catch((e) => {
            console.error(e);
            commit("UPDATE_STATUS", "error");
            reject();
          });
        } else {
          commit("SET_FREE_COMPANY_MEMBERS", fcMembers);
          dispatch("setStaffMembers", fcMembers.data)
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
