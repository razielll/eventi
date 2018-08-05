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

      commit({ type: 'setPosition', lat, lng });

      dispatch({ type: 'loadEventi' });
      dispatch({ type: 'addDemoEventi' });
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
