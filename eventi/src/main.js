import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import axios from 'axios'
import VueSocketIo from 'vue-socket.io';
import SocketIo from 'socket.io-client'
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

library.add(faLock, faCheck, faEnvelope, faUser, faExclamationTriangle);

axios.defaults.withCredentials = true

// export const SocketInstance = SocketIo(`//${window.location.host}`)
export const SocketInstance = SocketIo(`http://localhost:33333`)
Vue.use(VueSocketIo, SocketInstance, store);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
