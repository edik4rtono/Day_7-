import axios from 'axios'

export default {
  namespaced: true,
  state: {
    userList: [],
  },
  mutations: {
    updateUserList(state, value) {
      state.userList = value
    }
  },
  actions: {
    async fetchUsers({commit}) {
      const response = await axios.get('http://localhost:3000/users')
      commit('updateUserList', response.data)
    },

    async asd() {
  // await = dispatch('fetchUsers')
    }
  }
}
