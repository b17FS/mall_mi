<template>
  <div class="footer-container">
    <div class="footer-logo">
      <img src="../../public/imgs/logo-mi.png" alt="" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;" target="_blank">xxxx主页</a> <span>|</span>
      <a href="javascript:;" target="_blank">vue全栈课程</a><span>|</span>
      <a href="javascript:;" target="_blank">React全家桶课程</a><span>|</span>
      <a href="javascript:;" target="_blank"
        >微信支付专项课程（H5+小程序+Node+Mongo）</a
      >
    </div>
    <div class="copy-right">
      Copyright <span class="domain"> xxxxxxxxxxxxxxxxxx</span> rrrrrrr
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavFooter'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';

.footer-container {
  // 开启BFC
  overflow: hidden;
  @include flex(center);
  flex-direction: column;
  height: 234px;
  background-color: $colorB;
  border-top: 4px solid $colorA;
  font-size: $fontI;
  color: $colorD;
  .footer-logo {
    margin-bottom: 30px;
    text-align: center;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 7px;
    }
    p {
      width: 64px;
    }
  }
  .footer-link {
    width: 730px;
    margin-bottom: 10px;
    a {
      display: inline-block;
      line-height: 22px;
      padding: 0 10px;
      font-size: $fontI;
      color: $colorD;
      // border-right: 1px solid $colorD;
      // &:last-child {
      //   border: none;
      // }
    }
  }
  .copy-right {
    .domain {
      color: $colorA;
    }
  }
}
</style>
