<template>
  <div class="orderHeader-container">
    <div class="wrapper">
      <!-- 左侧logo -->
      <div class="header-logo fl">
        <a href="/#/productHome"></a>
      </div>

      <!-- 页面标题 -->
      <div class="title fl">
        <h3>{{ title }}</h3>
        <slot name="tip"></slot>
      </div>

      <!-- 用户名称 -->
      <div class="username fr" v-if="username">{{ username }}</div>
      <div class="username fr" v-if="!username">登录</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'OrderHeader',
  props: {
    title: String
  },
  computed: {
    ...mapState(['username'])
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/config.scss';

.orderHeader-container {
  height: 112px;
  padding: 30px 0;
  border-bottom: 2px solid $colorA;
  box-sizing: border-box;
  .title {
    h3 {
      display: inline-block;
      font-size: $fontC;
      color: $colorB;
      height: 50px;
      line-height: 50px;
      margin-left: 50px;
    }
    span {
      font-size: $fontJ;
      color: $colorD;
      margin-left: 17px;
    }
  }
  .username {
    font-size: $fontI;
    color: $colorC;
    height: 50px;
    line-height: 50px;
    margin-right: 10px;
  }
}
</style>
