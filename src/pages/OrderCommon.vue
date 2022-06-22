<template>
  <div>
    <!-- 头部导航栏order-header -->
    <OrderHeader></OrderHeader>
    <!-- 主体部分 -->
    <router-view></router-view>
    <!-- 底部导航栏order-footer -->
    <OrderFooter></OrderFooter>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader.vue'
import OrderFooter from '@/components/OrderFooter.vue'

export default {
  name: 'OrderCommon',
  components: {
    OrderHeader,
    OrderFooter
  }
}
</script>

<style></style>
