<template>
  <div>
    <!-- 头部导航栏order-header -->
    <OrderHeader :title="title">
      <template #tip>
        <span>
          {{ tip }}
        </span>
      </template>
    </OrderHeader>

    <!-- 主体部分 -->
    <router-view></router-view>

    <!-- ServiceBar -->
    <ServiceBar></ServiceBar>
    <!-- 底部导航栏nav-footer -->
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader.vue'
import ServiceBar from '@/components/ServiceBar.vue'
import NavFooter from '@/components/NavFooter.vue'

export default {
  name: 'OrderCommon',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      title: '',
      tip: ''
    }
  },
  mounted() {
    let path = this.$route.path
    if (path === '/orderCommon/orderConfirm') {
      this.title = '确认订单'
      this.tip = '温馨提示：请填写准确的收货地址，仔细确认订单后，再提交'
      // console.log(this)
    } else if (path === '/orderCommon/orderList') {
      this.title = '订单列表'
      this.tip = '温馨提示：请谨防钓鱼链接或诈骗电话，了解更多>'
    } else if (path === '/orderCommon/orderPay') {
      this.title = '支付订单'
      this.tip = '温馨提示：请谨防钓鱼链接或诈骗电话，了解更多>'
    }
  }
}
</script>

<style></style>
