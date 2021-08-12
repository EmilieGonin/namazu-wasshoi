import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/stylesheets/global.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  //Users & Account
  faUser, faUsers, faUserCheck, faUserPlus, faSignOutAlt, faSignInAlt, faCog,
  //Applications
  faMicrophone, faMicrophoneSlash, faTrashAlt,
  //Activities
  faCalendarWeek, faDungeon, faCamera, faImages, faGift,
  //Misc
  faBars, faArrowRight, faPlus, faCheckCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faHomeLgAlt, faStars, faUserCrown } from '@fortawesome/pro-solid-svg-icons'
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  //Users & Account
  faUser, faUsers, faUserCheck, faUserPlus, faSignOutAlt, faSignInAlt, faCog,
  //Applications
  faMicrophone, faMicrophoneSlash, faTrashAlt,
  //Activities
  faCalendarWeek, faDungeon, faCamera, faImages, faGift,
  //Misc
  faBars, faArrowRight, faPlus, faCheckCircle, faTimesCircle,
  //Brands
  faDiscord,
  //Pro
  faHomeLgAlt, faStars, faUserCrown, faSpinnerThird
)

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.use(store)
.use(createMetaManager())
.mount("#app")
