import Vue from 'vue'
import Router from 'vue-router'

import HomeCommon from '@/pages/HomeCommon.vue'
import ProductHome from '@/pages/ProductHome.vue'
import ProductDetail from '@/pages/ProductDetail.vue'
import ProductShow from '@/pages/ProductShow.vue'
import OrderCommon from '@/pages/OrderCommon.vue'
import OrderList from '@/pages/OrderList.vue'
import OrderConfirm from '@/pages/OrderConfirm.vue'
import OrderPay from '@/pages/OrderPay.vue'
import ProductCart from '@/pages/ProductCart.vue'
import UsersLogin from '@/pages/UsersLogin.vue'
import AliPay from '@/pages/AliPay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/productHome',
      name: 'HomeCommon',
      component: HomeCommon,
      children: [
        {
          path: '/productHome',
          name: 'ProductHome',
          component: ProductHome
        },
        {
          path: '/productDetail/:id',
          name: 'ProductDetail',
          component: ProductDetail
        },
        {
          path: '/productShow/:id',
          name: 'ProductShow',
          component: ProductShow
        }
      ]
    },
    {
      path: '/orderCommon',
      name: 'OrderCommon',
      component: OrderCommon,
      children: [
        {
          path: 'orderList',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: 'orderConfirm',
          name: 'OrderConfirm',
          component: OrderConfirm
        },
        {
          path: 'orderPay',
          name: 'OrderPay',
          component: OrderPay
        }
      ]
    },
    {
      path: '/productCart',
      name: 'ProductCart',
      component: ProductCart
    },
    {
      path: '/usersLogin',
      name: 'UsersLogin',
      component: UsersLogin
    },
    {
      path: '/aliPay',
      name: 'AliPay',
      component: AliPay
    }
  ]
})
