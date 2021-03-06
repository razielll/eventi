import userService from '@/services/userService';
import { USER_KEY } from '@/services/userService';
import storageService from '@/services/storageService';
import router from '@/router';
import { log } from 'util';

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
    logout(state) {
      state.user = null;
    },
    updateUserEventi(state, payload) {
      payload.eventiId
        ? state.user.eventiHistory.push(payload.eventiId)
        : (state.user.eventiHistory = payload.eventis);
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
        storageService.store(USER_KEY, user);
        context.commit({ type: 'setUser', user });
      });
    },
    userLogin(context, { user }) {
      return userService.userLogin(user).then(user => {
        if (!user) {
          throw 'no user found';
          return;
        }
        storageService.store(USER_KEY, user);
        context.commit({ type: 'setUser', user });
      });
    },
    loadUser({ commit, dispatch }) {
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
            dispatch({ type: 'removeUser' });
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
    },
    addUser(context, { data }) {
      userService
        .addEventiToUser(data.userId, data.eventiId)
        .then(eventiAdded => {
          if (eventiAdded.ok) {
            let eventiId = data.eventiId;
            context.commit({ type: 'updateUserEventi', eventiId });
          }
        });
    },
    removeUser(context, payload) {
      let eventis = payload.eventis.filter(
        eventiId => eventiId !== payload.data.eventiId
      );
      return userService
        .userLeaveEventi(payload.data.userId, eventis)
        .then(updated => {
          if (updated.ok) {
            context.commit({ type: 'updateUserEventi', eventis });
          }
        });
    },
    logout({ commit }) {
      userService.logout().then(logedout => {
        storageService.remove('loggedInUser');
        commit({ type: 'logout' });
      });
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
};
