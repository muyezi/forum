import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './axios'
import * as allFilter from './filter'
// import MyPlugin from './components/loading/loading.js'
// Vue.use(MyPlugin)
import {
  tabTag
} from './until'

import {
  BackTop
} from 'vue-ydui/dist/lib.rem/backtop'
import {
  Confirm,
  Alert,
  Toast,
  Notify,
  Loading
} from 'vue-ydui/dist/lib.rem/dialog'
import {
  Tab,
  TabPanel
} from 'vue-ydui/dist/lib.rem/tab'
import {
  Radio,
  RadioGroup
} from 'vue-ydui/dist/lib.rem/radio'
Vue.component(Tab.name, Tab)
Vue.component(TabPanel.name, TabPanel)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(BackTop.name, BackTop)

import 'iview/dist/styles/iview.css'
import 'vue-ydui/dist/ydui.base.css'
import './assets/styles/base.scss'
import {
  Spin
} from 'iview'
Vue.component(Spin.name, Spin)

// Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$spin = Spin
Vue.prototype.tabTag = tabTag
Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading
}
Object.keys(allFilter).forEach(key => {
  Vue.filter(key, allFilter[key])
})

store.commit('setUser')
store.dispatch('getMsg')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')