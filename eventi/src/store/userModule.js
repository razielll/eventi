import userService from '@/services/userService';

export default {
    state: {
        user: {}
    },
    mutations: {},
    actions: {
        userSignup(context, { user }) {
            userService.userSignup(user);
        },
        mutations: {
            setUser(state, { user }) {
                state.user = user
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
            }
        },
        incEventiClap(context, eventiId) {
            // TODO update user eventi
            console.log('TODO: update user eventi clap');
        },
    }
};
