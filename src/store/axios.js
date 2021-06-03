import axios from 'axios'
const user = JSON.parse(localStorage.getItem("user"));

export function authHeader(user) {
  api.defaults.headers.common['Authorization'] = "Bearer " + user.token;
}

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
const xivapi = axios.create({
  baseURL: "https://xivapi.com/",
  params: {
    private_key: process.env.VUE_APP_XIVAPI_KEY
  }
})

if (user) { authHeader(user) }

export { api, xivapi }
