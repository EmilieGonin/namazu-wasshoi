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
    // console.log("item not found");
    return false;
  }

  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(name)
    // console.log("item expired");
    return false;
  } else {
    // console.log("item not expired yet");
    return item;
  }
}
