import userService from '@/services/userService';

export default {
    state: {
        user: {}
    },
    mutations: {
        loadUser(state, { user }) {
            state.user = user;
        },
        setUser(state, { user }) {
            state.user = user
        },
        logout(state, payload) {
            state.user = null;
        },
        updateUserEventi(state, payload) {
            // console.log('update user attendance got payload', payload);
            (payload.eventiId) ? state.user.eventiHistory.push(payload.eventiId) :
                state.user.eventiHistory = payload.eventis
        }
    },
    actions: {
        userSignup(context, { user }) {
            userService.userSignup(user)
                .then(user => context.commit({ type: 'setUser', user }))
        },
        userLogin(context, { user }) {
            userService.userLogin(user)
                .then(user => {
                    context.commit({ type: 'setUser', user })
                })
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
        addUser(context, { data }) {
            // console.log('module user add eventi got payload', data);
            userService.addEventiToUser(data.userId, data.eventiId)
                .then(eventiAdded => {
                    if (eventiAdded.ok) {
                        let eventiId = data.eventiId
                        context.commit({ type: 'updateUserEventi', eventiId })
                    }
                })
        },
        removeUser(context, payload) {
            // console.log('module user leave eventi got', payload)
            let eventis = payload.eventis.filter(eventiId => eventiId !== payload.data.eventiId)
            return userService.userLeaveEventi(payload.data.userId, eventis)
                .then(updated => {
                    if (updated.ok) {
                        context.commit({ type: "updateUserEventi", eventis })
                    }
                })
        },
    },
    getters: {
        getUser(state) {
            return state.user
        },
    }
};
