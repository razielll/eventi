import eventiService from '@/services/eventiService.js';
import { getDemoEventi } from '@/services/demoService';
import EventBusService, { SHOW_MSG } from '@/services/eventBus';

export default {
  state: {
    eventis: [],
    filterBy: {
      distance: 500000,
      category: null
    }
  },
  mutations: {
    addEventi(state, { eventi }) {
      state.eventis.unshift(eventi);
    },
    loadEventi(state, { eventis }) {
      state.eventis = eventis;
    },
    updateEventi(state, { _id, data }) {
      let eventi = state.eventis.find(eventi => eventi._id === _id);
      Object.assign(eventi, data);
      // state.eventis.splice(idx, 1, updateEventi);
    },
    setFilterBy(state, { category, distance }) {
      Object.assign(state.filterBy, { category, distance });
    },
    addUserToEventi(state, { data }) {
      let eventi = state.eventis.find(eventi => eventi._id === data.eventiId);
      eventi.goingUserId.push(data.userId);
    },
    removeUserFromEventi(state, { data }) {
      let userIdToRemove = data.userId;
      let eventi = state.eventis.find(eventi => eventi._id === data.eventiId);
      let idx = eventi.goingUserId.findIndex(
        userId => userId === userIdToRemove
      );
      eventi.goingUserId.splice(idx, 1);
    }
  },
  actions: {
    addEventi({ commit }, { data }) {
      return eventiService.addEventi(data).then(eventi => {
        // commit({ type: 'addEventi', eventi });
        // TODO show msg and redirect to home page
        return eventi;
      });
    },
    addDemoEventi({ commit }, { eventi }) {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          commit({ type: 'addEventi', eventi: getDemoEventi(i) });
          EventBusService.$emit(SHOW_MSG, {
            txt: 'New Eventi',
            type: 'primary'
          });
        }, 10000 * (i + 1));
      }
    },
    loadEventi({ commit, rootState, state }) {
      let { distance, category } = state.filterBy;
      let { lng, lat } = rootState.position;

      return eventiService
        .loadEventi({
          lng,
          lat,
          distance,
          category
        })
        .then(eventis => {
          eventis.sort(
            (eventi1, eventi2) => eventi2.clapsCount - eventi1.clapsCount
          );
          commit({ type: 'loadEventi', eventis });
        });
    },
    getEventiById(context, { eventiId }) {
      return eventiService.getEventiById(eventiId);
    },
    removeEventi(context, { eventiId }) {
      return eventiService.removeEventi(eventiId).then(() => {
        context.commit({ type: 'removeEventi', eventiId });
      });
    },
    updateEventi({ commit }, { _id, data }) {
      return eventiService.updateEventi(_id, data).then(updateResult => {
        if (updateResult.ok) {
          // TODO flash message
          // return commit({ type: 'updateEventi', _id, data });
        }
      });
    },

    incEventiClap({ state, commit }, { _id }) {
      const eventi = state.eventis.find(eventi => eventi._id === _id);
      const updateData = { clapsCount: eventi.clapsCount + 1 };
      return eventiService.incEventiClap(_id, updateData).then(res => {
        commit({ type: 'updateEventi', _id, data: updateData });
        return res;
      });
    },
    incEventiClapFromUserProfile(context, { eventi }) {
      const updateData = { clapsCount: eventi.clapsCount + 1 };
      return eventiService.incEventiClap(eventi._id, updateData);
    },
    filterByCategory({ commit }, { category }) {
      return eventiService.loadEventi({ category }).then(eventis => {
        commit({ type: 'loadEventi', eventis });
      });
    },
    // distanceChange({ commit, rootState }, { distance }) {
    //   let { lng, lat } = rootState.position;
    //   return eventiService.loadEventi({ distance, lng, lat }).then(eventis => {
    //     commit({ type: 'loadEventi', eventis });
    //   });
    // },
    setFilterBy({ dispatch, commit }, { category, distance }) {
      commit({ type: 'setFilterBy', category, distance });
      dispatch({ type: 'loadEventi' });
    },
    addUser(context, { data }) {
      eventiService.eventiAddUser(data.eventiId, data.userId).then(res => {
        if (res.ok) {
          return context.commit({ type: 'addUserToEventi', data });
        }
      });
    },
    removeUser(context, { data }) {
      return eventiService
        .eventiRemvoeUser(data.eventiId, data.userId)
        .then(res => {
          if (res.ok) {
            return context.commit({ type: 'removeUserFromEventi', data });
          }
        });
    }
  },
  getters: {
    eventisToShow(state) {
      return state.eventis;
    }
  }
};
