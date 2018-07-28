import userService from '@/services/userService';

export default {
  state: {
    user: {}
  },
  mutations: {
    loadUser(state, { user }) {
      state.user = user;
    }
  },
  actions: {
    userSignup(context, { user }) {
      console.log('action got:', user);
      userService.userSignup(user);
    },
    userLogin(context, { user }) {
      userService.userLogin(user);
    },
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
