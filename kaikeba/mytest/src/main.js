// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import store from './store/index.js'

Vue.config.productionTip = false

import Notification from './components/notification'
// Vue.use(Notification)
Notification(Vue)

import Notification_hd from './components/notification_hd'
// Vue.use(Notification)
Vue.prototype.$notify_hd = Notification_hd

import Tabs from './components/tabs'
Vue.use(Tabs)


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
