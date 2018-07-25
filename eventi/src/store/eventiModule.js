import eventiService from '../services/eventiService';

export const EVENTI_ADD = 'eventi/add';

export default {
  state: {
    eventis: [],
    filterBy: {}
  },
  mutations: {
    [EVENTI_ADD](state, { eventi }) {}
  },
  getters: {
    eventisToShow() {
      return console.log('hellow');
    }
  },
  actions: {
    [EVENTI_ADD]({ commit }, { eventi }) {
      return eventiService.add(eventi).then(eventi => {
        commit({ type: EVENTI_ADD, eventi });
        return eventi;
      });
    }
  }
};
