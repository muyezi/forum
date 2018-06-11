import Vue from 'vue'
import Vuex from 'vuex'
import http from './axios'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    accesstoken: '',
    hasnotReadNum: 0,
    hasReadNum: 0
  },
  mutations: {
    setUser(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
      state.accesstoken = localStorage.getItem('accesstoken')
    },
    clearUser(state) {
      state.user = ''
      state.accesstoken = ''
      localStorage.removeItem('user')
      localStorage.removeItem('accesstoken')
    },
    setMsgReadNum(state, val) {
      state.hasnotReadNum = val[0]
      state.hasReadNum = val[1]
    },
    clearMsgReadNum(state) {
      state.hasnotReadNum = 0
      state.hasReadNum = 0
    }
  },
  actions: {
    getMsg({
      commit,
      state
    }) {
      return http
        .get('/messages', {
          params: {
            accesstoken: state.accesstoken
          }
        })
        .then(res => {
          commit('setMsgReadNum', [
            res.hasnot_read_messages.length,
            res.has_read_messages.length
          ])
        })
    }
  }
})