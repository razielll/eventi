import eventiService from '@/services/eventiService.js';

export default {
  state: {
    eventis: [],
    filterBy: {
      distance: 500,
      category: null
    }
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
    setFilterBy(state, { category, distance }) {
      Object.assign(state.filterBy, { category, distance });
    },
    incEventiClap(state) {}
  },
  actions: {
    addEventi({ commit }, { data }) {
      return eventiService.addEventi(data).then(eventi => {
        // commit({ type: 'addEventi', eventi });
        console.log(eventi);
        // TODO show msg and redirect to home page
        return eventi;
      });
    },
    loadEventi({ commit, rootState, state }) {
      console.log('loadEventi');
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
          commit({ type: 'loadEventi', eventis });
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
    updateEventi({ commit }, { _id, data }) {
      return eventiService.updateEventi(_id, data).then(updateResult => {
        if (updateResult.ok) {
          console.log('eventi updated');
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
    }
  },
  getters: {
    eventisToShow(state) {
      return state.eventis;
    }
  }
};
