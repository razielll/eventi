import userService from '@/services/userService';
import { log } from 'util';

export default {
  state: {
    user: null
  },
  mutations: {
    loadUser(state, { user }) {
      state.user = user;
    }
  },
  actions: {
    loadUser({ commit }) {
      return userService.loadUser().then(user => {
        commit({ type: 'loadUser', user });
        return user;
      });
    },
    incEventiClap(context, eventiId) {
      // TODO update user eventi
      console.log('TODO: update user eventi clap');
    }
  },
  getters: {
    userForDisplay(state) {
      return state.user;
    }
  }
};
