import Vue from 'vue'
import router from '@/router'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import VueLazyLoad from 'vue-lazyload'
import store from '@/store'
import App from './App.vue'
// import '@/assets/scss/config.scss'
// import '@/assets/scss/reset.scss'
// import '@/assets/scss/base.scss'

// 根据环境变量获取不同的请求根路径
// import env from '@/env'
// axios.defaults.baseURL = env.baseURL

// 配置请求的根路径：根据前端的跨域方式作调整
//(1)前端采用proxy 代理
axios.defaults.baseURL = '/api'
// （2）前端采用core、jsonp 跨域方式
// axios.defaults.baseURL='http://xxxxxxxxxxxxxxx'
axios.defaults.timeout = 8000

// response 拦截器：处理接口请求错误拦截
axios.interceptors.response.use((response) => {
  let res = response.data
  let path = location.hash
  if (res.status == 0) {
    return res.data
  } else if (res.status == 10) {
    // status == 10 表示未登录状态
    // 未登录状态下，如果正处在 非首页,则需要跳转到登录页面进行登录
    // 可以使用vue 的前置路由导航 实现页面跳转限制
    if (path != '#/productHome') {
      window.location.href = '/#/usersLogin'
      return Promise.reject(res)
    }
  } else {
    alert(res.msg)
    return Promise.reject(res)
  }
})
Vue.prototype.$http = axios

Vue.use(VueLazyLoad, {
  loading: '../public/imgs/loading-svg/loading-balls.svg'
})

Vue.use(VueCookie)

// mock开关
const mock = false
if (mock) {
  require('@/mock/api')
}

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
