import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import mixin from '@/mixins/emitter'
Vue.mixin(mixin)

import Alert from '@/components/alert/alert.js'
import store from './store'
Vue.prototype.$Alert = Alert

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')