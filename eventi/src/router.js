import Vue from 'vue'
import Router from 'vue-router'

import eventi from '../components/eventi.vue'
import eventiAdd from '../components/eventiAdd.vue'
import eventiDetails from '../components/eventiDetails.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'eventi home page',
            component: eventi
        },

        {
            path: '/eventi/:eventiId?',
            name: 'eventi edit',
            component: eventiAdd
        },
        {
            path: '/:eventiId',
            name: 'eventi details',
            component: eventiDetails
        },
    ]
})
