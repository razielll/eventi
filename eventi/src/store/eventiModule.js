import eventiService from '@/services/eventiService.js'

export default {
    state: {
        eventis: [],
        filterBy: {},
    },
    mutations: {
        addEventi(state, { eventi }) {
            state.eventis.unshift(eventi)
        },
        loadEventi(state, { eventis }) {
            console.log('got eventis');
            
            state.eventis = eventis
        },
        updateEventi(state, { updateEventi }) {
            let idx = state.eventis.findIndex(eventi => eventi._id === updateEventi._id)
            state.eventis.splice(idx, 1, updateEventi)
        }
    },
    actions: {
        addEventi({ commit }, { eventi }) {
          return eventiService.addEventi(eventi).then(eventi => {
            commit({ type: 'addEventi', eventi });
            return eventi;
          });
        },
        loadEventi(context) {
            return eventiService.loadEventi()
                .then(res => { 
                    context.commit({ type: 'loadEventi', eventis: res }) })
        },
        getEventiById(context, { eventiId }) {
            console.log('store got id', eventiId);
            return eventiService.getEventiById(eventiId)
        },
        removeEventi(context, { eventiId }) {
            return eventiService.removeEventi(eventiId)
                .then(() => { context.commit({ type: 'removeEventi', eventiId }) })
        },
        updateEventi(context, { eventi }) {
            return eventiService.updateEventi(eventi)
                .then((res) => {
                    return context.commit({ type: 'updateEventi', updateEventi: res.data })
                })
        },
    },
    getters: {
        eventisToShow(state) {
            return state.eventis
        }
    },
}
