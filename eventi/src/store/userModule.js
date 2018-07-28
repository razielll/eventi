import userService from '@/services/userService'

export default {
    state: {
        user: {}
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

}