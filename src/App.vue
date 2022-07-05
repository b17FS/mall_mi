<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    getUser() {
      this.$http.get('/user').then((res = {}) => {
        // to-do  保存到 vuex 里面
        this.$store.dispatch('saveUserName', res.username)
        // console.log(res)
      })
    },

    getCartCount() {
      this.$http.get('/carts/products/sum').then((res = 0) => {
        // to-do 保存到 vuex 里面
        this.$store.dispatch('saveCartCount', res)
        // console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/config.scss';
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/base.scss';

@import '@/assets/scss/button.scss';
</style>
