import userService from '@/services/userService';
import { USER_KEY } from '@/services/userService';
import storageService from '@/services/storageService';
import router from '@/router';

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
    },
    removeUser(state) {
      state.user = null;
    },
    incEventiClapFromUserProfile(state, { eventi }) {
      let eventiToUpdate = state.user.eventiHistoryData.find(
        ({ _id }) => _id === eventi._id
      );
      eventiToUpdate.clapsCount++;
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
      let user = storageService.load(USER_KEY) || null;
      // load user data from storage
      if (user) {
        commit({ type: 'loadUser', user });
      }
      // then load fresh data from server if available
      return userService
        .loadUser()
        .then(user => {
          storageService.store(USER_KEY, user);
          commit({ type: 'loadUser', user });
          return user;
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            storageService.remove(USER_KEY, null);
            commit({ type: 'removeUser' });
            router.push('/');
          }
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
    },
    incEventiClapFromUserProfile({ commit }, { eventi }) {
      commit({ type: 'incEventiClapFromUserProfile', eventi });
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
