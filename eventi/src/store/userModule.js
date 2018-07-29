import userService from '@/services/userService';
import { USER_KEY } from '@/services/userService';
import storageService from '@/services/storageService';

export default {
  state: {
    user: {}
  },
  mutations: {
    loadUser(state, { user }) {
      state.user = user;
    },
    setUser(state, { user }) {
      state.user = user;
    },
    logout(state, payload) {
      state.user = null;
    }
  },
  actions: {
    userSignup(context, { user }) {
      userService.userSignup(user).then(user => {
        context.commit({ type: 'setUser', user });
      });
    },
    userLogin(context, { user }) {
      userService.userLogin(user).then(user => {
        storageService.store(USER_KEY, user);
        context.commit({ type: 'setUser', user });
      });
    },
    incEventiClap(context, eventiId) {
      // TODO update user eventi
      console.log('TODO: update user eventi clap');
    },
    loadUser({ commit }) {
      return userService.loadUser().then(user => {
        commit({ type: 'loadUser', user });
        return user;
      });
    },
    checkLogin({ commit }) {
      let loggedInUser = storageService.load(USER_KEY) || null;
      if (loggedInUser) {
        commit({ type: 'setUser', user: loggedInUser });
        return Promise.resolve({ userLoggedIn: true });
      } else {
        Promise.reject({ userLoggedIn: false });
      }
    }
  },
  getters: {
    userForDisplay(state) {
      return state.user;
    },
    getUser(state) {
      return state.user;
    }
  }
};
