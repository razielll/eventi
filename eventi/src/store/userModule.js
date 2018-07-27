import userService from '@/services/userService';

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
    }
  },
  getters: {
    userForDisplay(state) {
      return state.user
    }
  }
};
