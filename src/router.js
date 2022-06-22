import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/ProductHome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'productHome',
      component: Home
    }
  ]
})
