import axios from 'axios'
const user = JSON.parse(localStorage.getItem("user"));

export function authHeader(user) {
  api.defaults.headers.common['Authorization'] = "Bearer " + user.token;
}

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

if (user) { authHeader(user) }
