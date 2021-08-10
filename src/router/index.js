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
      heading: "Profil utilisateur",
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
  },
  {
    path: "/admin",
    name: "AdminPanel",
    component: () => import('../views/AdminPanel.vue'),
    meta: {
      title: "Panel administrateur - Namazu Wasshoi",
      heading: "Panel administrateur",
      icon: "user-crown"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  //redirect if not logged in or admin
  const publicPages = ["/", "/login", "/signup", "/members", "/apply", "/teams"];
  const ucPages = ["/teams", "/planning"];
  const adminPages = ["/admin"];
  const authRequired = !publicPages.includes(to.path);
  const adminRequired = adminPages.includes(to.path);
  const uc = ucPages.includes(to.path);

  if (uc) {
    //Check if user is logged in
    const loggedIn = localStorage.getItem('user');

    if (!loggedIn) {
      store.dispatch("error", "Cette page est toujours en construction. :(");
      return next("/");

    } else {
      //Check if user is admin
      const isAdmin = store.getters.isAdmin;

      if (!isAdmin) {
        store.dispatch("error", "Cette page est toujours en construction. :(");
        return next("/");
      }
    }
  }

  if (authRequired) {
    //Check if user is logged in
    const loggedIn = localStorage.getItem('user');

    if (!loggedIn) {
      store.dispatch("error", "Vous devez être connecté pour accéder à cette page.");
      return next('/login');
    }
    else {
      // Check if user is still registered
      const userId = store.getters.userId;
      store.dispatch("checkUser", userId)
      .then(() => {
        if (adminRequired) {
          //Check if user is admin if page is restricted
          const isAdmin = store.getters.isAdmin;

          if (!isAdmin) {
            const error = "Vous n'avez pas la permission d'accéder à cette page."
            throw error;
          } else {
            next();
          }
        } else {
          next();
        }
      })
      .catch((e) => {
        store.dispatch("error", e);
        return next('/');
      })
    }
  }
  else {
    next()
  }
})
router.afterEach((to) => {
  router.isReady()
  .then(() => {
    store.dispatch("setPage", [to.meta.heading, to.meta.icon]);
    // store.commit("REQUEST", "success");
  })
  .catch((e) => console.error(e));
})

export default router
