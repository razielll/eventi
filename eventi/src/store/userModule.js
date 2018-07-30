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
    incEventiClap({ state, commit }, { _id }) {
      if (state.user._id) {
        // userService.
        console.log('TODO: update claps on user');
      }
    },
    loadUser({ commit }) {
      return userService.loadUser().then(user => {
        commit({ type: 'loadUser', user });
        return user;
      });
    },
    checkLogin({ commit }) {
      let loggedInUser = storageService.load(USER_KEY) || null;
      let isLoggedIn = { userLoggedIn: true };
      if (loggedInUser) {
        commit({ type: 'setUser', user: loggedInUser });
      } else {
        isLoggedIn.userLoggedIn = false;
      }
      return Promise.resolve(isLoggedIn);
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
