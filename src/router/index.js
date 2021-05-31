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
  },
  {
    path: "/user/:id",
    name: "Profile",
    component: () => import('../views/Profile.vue'),
    meta: {
      title: "Profil utilisateur - Namazu Wasshoi",
      heading: "Profil utilisateur - ",
      icon: "user"
    }
  },
  {
    path: "/account",
    name: "Account",
    component: () => import('../views/Account.vue'),
    meta: {
      title: "Paramètres du compte - Namazu Wasshoi",
      heading: "Paramètres du compte",
      icon: "cog"
    }
  },
  {
    path: "/apply",
    name: "Apply",
    component: () => import('../views/Apply.vue'),
    meta: {
      title: "Postuler - Namazu Wasshoi",
      heading: "Postuler",
      icon: "user-check"
    }
  },
  {
    path: "/members",
    name: "Members",
    component: () => import('../views/Members.vue'),
    meta: {
      title: "Membres - Namazu Wasshoi",
      heading: "Membres",
      icon: "users"
    }
  },
  {
    path: "/galleries/:id?",
    name: "Galleries",
    component: () => import('../views/Galleries.vue'),
    meta: {
      title: "Galeries - Namazu Wasshoi",
      heading: "Galeries",
      icon: "images"
    }
  },
  {
    path: "/planning",
    name: "Planning",
    component: () => import('../views/Planning.vue'),
    meta: {
      title: "Planning - Namazu Wasshoi",
      heading: "Planning",
      icon: "calendar-week"
    }
  },
  {
    path: "/festival-gyokoso",
    name: "FestivalGyokoso",
    component: () => import('../views/FestivalGyokoso.vue'),
    meta: {
      title: "Festival Gyôkoso - Namazu Wasshoi",
      heading: "Festival Gyôkoso",
      icon: "camera"
    }
  },
  {
    path: "/teams/:team?",
    name: "Teams",
    component: () => import('../views/Teams.vue'),
    meta: {
      title: "Equipes d'évent - Namazu Wasshoi",
      heading: "Equipes d'évent",
      icon: "stars"
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
