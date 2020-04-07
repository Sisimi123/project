import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import dict from './dict'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    dict,
    user
  }
})
