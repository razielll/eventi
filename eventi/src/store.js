import Vue from 'vue'
import Vuex from 'vuex'
import eventiModule from '@/store/eventiModule.js'
import userModule from '@/store/userModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    eventiModule,
    userModule
  }
})
