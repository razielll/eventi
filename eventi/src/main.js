import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bulma/css/bulma.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faCheck, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(faLock, faCheck, faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// import './registerServiceWorker'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
