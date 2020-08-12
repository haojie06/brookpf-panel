import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    username: '',
    password: '',
    lastOP: 0,
    servers: [],
    portforwards: [],
  },
  mutations: {
    login(state, payload) {
      state.login = true
      state.username = payload.username
      state.password = payload.password
      console.log(
        `用户登录，提交至store u:${state.username} p:${state.password}`
      )
    },
    updateServers(state, servers) {
      state.servers = servers
      console.log('STORE:更新服务器列表')
    },
  },
  actions: {},
  modules: {},
})
