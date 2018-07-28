import userService from '@/services/userService'

export default {
    state: {
        user: {}
    },
    mutations: {

    },
    actions: {
        userSignup(context, { user }) {
            console.log('action got:', user);
            userService.userSignup(user)
        },
        userLogin(context, {user}){
            userService.userLogin(user)
        }
    },

}