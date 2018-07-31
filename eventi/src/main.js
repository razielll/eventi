import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import axios from 'axios'
import VueSocketio from 'vue-socket.io';
import 'bulma/css/bulma.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faCheck,
  faLock,
  faUser,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';


axios.defaults.withCredentials = true

library.add(faLock, faCheck, faEnvelope, faUser, faExclamationTriangle);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSocketio, 'http://localhost:1923', store);

import 'bulma/css/bulma.css';
// import './registerServiceWorker'

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
