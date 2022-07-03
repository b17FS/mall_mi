import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/action'

Vue.use(Vuex)

const state = {
  username: '', //用户登录名
  cartCount: 10 //购物车数量
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
