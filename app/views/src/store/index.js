import Vue from 'vue'
import Vuex from 'vuex'

import { tasks } from './modules/tasks'
import { ui } from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { tasks, ui },
})
