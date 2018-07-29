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
    },
    getters: {
        userForDisplay(state) {
            return state.user;
        },
        getUser(state) {
            return state.user
        },
    }
};
