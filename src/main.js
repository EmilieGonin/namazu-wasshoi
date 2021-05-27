import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/stylesheets/global.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add()

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
