import eventiService from '@/services/eventiService.js';

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
    updateEventi(state, { _id, updateData }) {
      let eventi = state.eventis.find(eventi => eventi._id === _id);
      Object.assign(eventi, updateData);
      // state.eventis.splice(idx, 1, updateEventi);
    },
    incEventiClap(state) {}
  },
  actions: {
    addEventi({ commit }, { eventi }) {
      return eventiService.addEventi(eventi).then(eventi => {
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
    updateEventi(context, { _id, updateData }) {
      return eventiService.updateEventi(_id, updateData).then(updateResult => {
        if (updateResult.ok) {
          return context.commit({ type: 'updateEventi', _id, updateData });
        }
      });
    },
    incEventiClap({ state, dispatch }, { _id }) {
      const eventi = state.eventis.find(eventi => eventi._id === _id);
      const updateData = { clapsCount: eventi.clapsCount + 1 };
      dispatch({ type: 'updateEventi', _id, updateData });
    }
  },
  getters: {
    eventisToShow(state) {
      return state.eventis;
    }
  }
};
