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
    frowards: [],
    portforwards: [],
    addServerFormVisable: false,
    addForwardFormVisable: false,
    webServerUrl: 'http://ru.better06.xyz:8001',
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
      console.log('更新store中的服务器信息')
      state.servers = servers
    },
    updateForwards(state, forwards) {
      console.log('更新store中的中转记录信息')
      state.forwards = forwards
    },

    updateAddServerFormVisable(state, visable) {
      //更新表单可见性
      console.log('更新表单可见性')
      state.addServerFormVisable = visable
    },
    updateAddForwardFormVisable(state, visable) {
      //更新表单可见性
      state.addForwardFormVisable = visable
    },
  },
  actions: {},
  modules: {},
})
