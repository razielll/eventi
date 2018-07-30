import eventiService from '@/services/eventiService.js';
import router from '@/router';

export default {
  state: {
    eventis: [],
    filterBy: {}
  },
  mutations: {
    addEventi(state, { eventi }) {
      state.eventis.unshift(eventi);
    },
    loadEventi(state, { eventis }) {
      console.log('got eventis');
      state.eventis = eventis;
    },
    updateEventi(state, { _id, data }) {
      let eventi = state.eventis.find(eventi => eventi._id === _id);
      Object.assign(eventi, data);
      // state.eventis.splice(idx, 1, updateEventi);
    },
    incEventiClap(state) {}
  },
  actions: {
    addEventi({ commit }, { data }) {
      console.log('action data:', data);
      return eventiService.addEventi(data).then(eventi => {
        commit({ type: 'addEventi', eventi });
        return eventi;
      });
    },
    loadEventi(context) {
      return eventiService.loadEventi().then(res => {
        context.commit({ type: 'loadEventi', eventis: res });
      });
    },
    getEventiById(context, { eventiId }) {
      console.log('store got id', eventiId);
      return eventiService.getEventiById(eventiId);
    },
    removeEventi(context, { eventiId }) {
      return eventiService.removeEventi(eventiId).then(() => {
        context.commit({ type: 'removeEventi', eventiId });
      });
    },
    updateEventi({ commit }, { _id, data, isCommit = true }) {
      return eventiService.updateEventi(_id, data).then(updateResult => {
        if (updateResult.ok && isCommit) {
          return commit({ type: 'updateEventi', _id, data });
        }
      });
    },

    incEventiClap({ state, commit }, { _id }) {
      const eventi = state.eventis.find(eventi => eventi._id === _id);
      const updateData = { clapsCount: eventi.clapsCount + 1 };
      return eventiService.incEventiClap(_id, updateData).then(res => {
        commit({ type: 'updateEventi', _id, data: updateData });
      });
    },
    incEventiClapFromUserProfile(context, { eventi }) {
      const updateData = { clapsCount: eventi.clapsCount + 1 };
      return eventiService.incEventiClap(eventi._id, updateData);
    }
  },
  getters: {
    eventisToShow(state) {
      return state.eventis;
    }
  }
};
