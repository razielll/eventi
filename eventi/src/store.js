import Vue from 'vue';
import Vuex from 'vuex';
import eventiModule from '@/store/eventiModule.js';
import userModule from '@/store/userModule.js';
import { log } from 'util';

Vue.use(Vuex);

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
    setPosition({ commit }, { lat, lng }) {
      console.log('setPosition');
      commit({ type: 'setPosition', lat, lng });
      return Promise.resolve({ lat, lng });
    }
  },

  getters: {
    getPosition(state) {
      return state.position;
    }
  },
  modules: {
    eventiModule,
    userModule
  }
});
