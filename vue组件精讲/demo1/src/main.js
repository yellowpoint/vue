import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import mixin from '@/mixins/emitter'
Vue.mixin(mixin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')