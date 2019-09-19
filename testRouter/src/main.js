// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
Vue.prototype.store = store
Vue.config.productionTip = false
import './assets/reset.less'
/* eslint-disable no-new */


import Toast from '@/components/toast/toast';
Vue.use(Toast);


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


