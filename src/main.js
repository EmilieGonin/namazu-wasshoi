import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/stylesheets/global.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  //Users & Account
  faUser, faUsers, faUserCheck, faUserPlus, faSignOutAlt, faSignInAlt, faCog,
  //Activities
  faCalendarWeek, faDungeon, faCamera, faImages,
  //Misc
  faBars, faArrowRight, faPlus, faCheckCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faStars, faUserCrown } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  //Users & Account
  faUser, faUsers, faUserCheck, faUserPlus, faSignOutAlt, faSignInAlt, faCog,
  //Activities
  faCalendarWeek, faDungeon, faCamera, faImages,
  //Misc
  faBars, faArrowRight, faPlus, faCheckCircle, faTimesCircle,
  //Pro
  faHomeLgAlt, faStars, faUserCrown
)

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
