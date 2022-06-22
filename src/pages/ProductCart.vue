<template>
  <div>
    <!-- 头部导航栏nav-header -->
    <OrderHeader></OrderHeader>
    <!-- 主体部分 -->
    购物车页面
    <!-- 底部导航栏nav-ooter -->
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader.vue'
import NavFooter from '@/components/NavFooter.vue'

export default {
  name: 'OrderCommon',
  components: {
    OrderHeader,
    NavFooter
  }
}
</script>

<style></style>
