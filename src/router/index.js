import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue'),
    meta: {
      title: "Namazu Wasshoi",
      heading: "Bienvenue, petit namazu !",
      icon: "home-lg-alt"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue'),
    meta: {
      title: "Connexion - Namazu Wasshoi",
      heading: "Connexion",
      icon: "sign-in-alt"
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import('../views/Signup.vue'),
    meta: {
      title: "Créer un compte - Namazu Wasshoi",
      heading: "Créer un compte",
      icon: "user-plus"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch("setPage", [to.meta.heading, to.meta.icon]);
  next();
})

export default router
