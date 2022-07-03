<template>
  <div class="nav-bar" :class="{ is_fixed: isFixed }">
    <div class="wrapper">
      <div class="pro-title">{{ proName }}</div>
      <div class="pro-param">
        <a href="JavaScript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductParam',
  props: {
    proName: String
  },
  data() {
    return {
      isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      this.isFixed = scrollTop > 152 ? true : false
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';

.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
  &.is_fixed {
    position: fixed;
    top: 0;
    left: 50%;
    // width: 100%;
    transform: translateX(-50%);
    width: 1920px;
    box-shadow: 0 5px 5px $colorE;
    z-index: 20;
  }
  .wrapper {
    @include flex();
    .pro-title {
      font-size: $fontH;
      font-weight: 700;
      color: $colorB;
    }
    .pro-param {
      font-size: $fontJ;
      a {
        color: $colorC;
      }
      span {
        margin: 0 10px;
      }
    }
  }
}
</style>
