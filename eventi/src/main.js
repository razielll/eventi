import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueSocketIo from 'vue-socket.io';
import SocketIo from 'socket.io-client';
import moment from 'vue-moment';
import 'bulma/css/bulma.css';
import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import FBSignInButton from 'vue-facebook-signin-button';
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
Vue.use(FBSignInButton);
Vue.use(moment);
Vue.use(VeeValidate);

axios.defaults.withCredentials = true;



const URL =
	process.env.NODE_ENV !== 'development'
		? `/`
		: `//localhost:3000`;

const SocketInstance = SocketIo(`${URL}`);

Vue.use(VueSocketIo, SocketInstance, store);

Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
