<template>
  <div class="ali-pay">
    <loading-svg v-if="loading"></loading-svg>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import LoadingSvg from '@/components/LoadingSvg.vue'

export default {
  components: { LoadingSvg },
  name: 'AliPAy',
  component: {
    LoadingSvg
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true
    }
  },
  methods: {
    paySubmit() {
      this.$http
        .post('/pay', {
          orderId: this.orderId,
          orderName: 'vue高仿小米商城', //扫码支付时订单名称
          amount: 0.01, //单位元
          payType: 1 //1支付宝，2微信
        })
        .then((res) => {
          this.content = res.content
          setTimeout(() => {
            document.forms[0].submit()
          }, 100)
          this.loading = false
        })
    }
  },
  mounted() {
    this.paySubmit()
    console.log(this.orderId)
  }
}
</script>

<style></style>
