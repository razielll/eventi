import Vue from 'vue';
import Router from 'vue-router';

import eventi from '@/views/eventiApp.vue';
import eventiAdd from '@/components/eventiAdd.vue';
import eventiDetails from '@/views/eventiDetails.vue';
import userProfile from '@/views/userProfile.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'eventi-home',
      component: eventi
    },
    {
      path: '/user',
      name: 'user-profile',
      component: userProfile
    },
    {
      path: '/eventi/edit/:eventiId?',
      name: 'eventi-edit',
      component: eventiAdd
    },
    {
      path: '/eventi/:eventiId',
      name: 'eventi-details',
      component: eventiDetails
    }
  ]
});
