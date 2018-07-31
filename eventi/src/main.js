import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import 'bulma/css/bulma.css';
import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faCheck,
  faLock,
  faUser,
  faExclamationTriangle,
  faLocationArrow,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

axios.defaults.withCredentials = true;

library.add(
  faLock,
  faCheck,
  faEnvelope,
  faUser,
  faExclamationTriangle,
  faLocationArrow,
  faSearch
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import 'bulma/css/bulma.css';
// import './registerServiceWorker'

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch({ type: 'checkLogin' });
  },
  render: h => h(App)
}).$mount('#app');
