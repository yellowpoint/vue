// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'

// 公共方法，调用方法，this.$common.xxx
import common from '@/utils/common'

import commonLogic from '@/utils/commonLogic'

import api from '@/api/api'

// 添加全局自定义过滤器
import vueFilter from '@/utils/filter'
import '@/components/VLogin/index'

import VPopup from '@/components/VPopup'

import VScroll from '@/components/VScroll'

import 'mint-ui/lib/style.css'
import { Toast, MessageBox, Indicator } from 'mint-ui'

// 弹窗小动画
import 'vue2-animate/dist/vue2-animate.min.css'

// 转场动画
import vueg from 'vueg'

// fundebug的错误上报 用的是tqhw@51app.cn的账号，综合项目
import fundebug from 'fundebug-javascript'
Vue.prototype.$common = common
Vue.prototype.$commonLogic = commonLogic
Vue.prototype.$api = api
for (let key in vueFilter) {
  Vue.filter(key, vueFilter[key])
}
Vue.component('VPopup', VPopup)
Vue.component('VScroll', VScroll)

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$msg = MessageBox
Vue.prototype.$loading = Indicator
Vue.use(vueg, router)

let myVue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
Vue.use({
  myVue
})
try {
  // 百度统计
  let _hmt = []
  window._hmt = _hmt // 必须把_hmt挂载到window下，否则找不到
  // 关闭了自动PV跟踪
  window._hmt.push(['_setAutoPageview', false]);
  (function () {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?ea93a4e31d310e1ea95de9f5e431ba4b'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
} catch (e) {
  console.log('百度统计', e)
}

router.afterEach((to, from) => {
  try {
    // 关闭了自动PV跟踪
  	window._hmt.push(['_setAutoPageview', false])
    //	百度统计默认截断#号后面的参数，故通过手动来添加pv
  	window._hmt.push(['_trackPageview', '/' + location.search + '#' + to.fullPath])
  } catch (e) {
    console.log('百度统计', e)
  }
})
fundebug.apikey = '5faf9700471ce437b632d599f522a3df2420d68ad326264f4e691be21b452cde'
fundebug.silentVideo = false
// 过滤掉这两个蛋疼的报错
fundebug.filters = [{
  message: /(getElementById\('imgUrl'\))|(getElementById\('desc'\))/
}]

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData

  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}
