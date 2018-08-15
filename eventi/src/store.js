import Vue from 'vue';
import Vuex from 'vuex';
import eventiModule from '@/store/eventiModule.js';
import userModule from '@/store/userModule.js';
import chatModule from '@/store/chatModule.js';
import geoService from '@/services/geoService';

Vue.use(Vuex);
Vue.config.devtools = true;
export default new Vuex.Store({
  strict: true,

  state: {
    position: {}
  },
  mutations: {
    setPosition(state, { lat, lng }) {
      state.position = { lat, lng };
    }
  },
  actions: {
    async initStore({ commit, dispatch }) {
      let position = await geoService.getPosition();
      let { latitude: lat, longitude: lng } = position.coords;
      // let { latitude: lat, longitude: lng } = {
      //   longitude: 34.794144,
      //   latitude: 32.07008
      // };

      commit({ type: 'setPosition', lat, lng });

      dispatch({ type: 'loadEventi' });
      // .then(() => {
      //   dispatch({ type: 'addDemoEventi' });
      // });
    }
  },

  getters: {
    getPosition(state) {
      return state.position;
    }
  },
  modules: {
    eventiModule,
    userModule,
    chatModule
  }
});
