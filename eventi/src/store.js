import Vue from 'vue';
import Vuex from 'vuex';
import eventiModule from '@/store/eventiModule.js';
import userModule from '@/store/userModule.js';

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
      commit({ type: 'setPosition', lat, lng });
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
