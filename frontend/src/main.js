import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import store from './store'

library.add(faUser, faArrowRightFromBracket, faHouse, faXmark, faImage);

createApp(App)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
