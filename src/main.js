import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/stylesheets/global.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSignOutAlt, faCog, faArrowRight, faUsers, faCalendarWeek, faDungeon } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faStars } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faSignOutAlt, faCog, faArrowRight, faUsers, faCalendarWeek, faDungeon, faHomeLgAlt, faStars)

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
