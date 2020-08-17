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
    forwards: [],
    portforwards: [],
    addServerFormVisable: false,
    addForwardFormVisable: false,
    webServerUrl: '',
    infoPanel: {
      totalServers: 0,
      onlineServers: 0,
      totalForwards: 0,
      enableForwards: 0,
    },
  },
  mutations: {
    changeServerUrl(state, url) {
      console.log('读取修改URL' + url)
      state.webServerUrl = url
    },
    login(state, payload) {
      state.login = true
      state.username = payload.username
      state.password = payload.password
    },
    updateInfoPanel(state, info) {
      state.infoPanel.totalServers = info.totalServers
      state.infoPanel.onlineServers = info.onlineServers
      state.infoPanel.totalForwards = info.totalForwards
      state.infoPanel.enableForwards = info.enableForwards
    },
    updateServers(state, servers) {
      // console.log('更新store中的服务器信息')
      state.servers = servers
    },
    updateForwards(state, forwards) {
      // console.log('更新store中的中转记录信息 更新前')
      state.forwards = forwards
    },

    updateAddServerFormVisable(state, visable) {
      //更新表单可见性
      // console.log('更新表单可见性')
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
