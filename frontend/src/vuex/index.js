import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import dashboard from './dashboard'
// import logistics from './logistics'
// import profile from './profile'
import users from './users'

export default new Vuex.Store({
  modules: {
    // dashboard,
    // logistics,
    // profile,
    users,
  }
})
