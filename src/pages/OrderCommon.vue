<template>
  <div>
    <!-- 头部导航栏order-header
    <OrderHeader :title="title">
      <template #tip>
        <span>
          {{ tip }}
        </span>
      </template>
    </OrderHeader> -->

    <!-- 主体部分 -->
    <router-view></router-view>

    <!-- ServiceBar -->
    <ServiceBar></ServiceBar>
    <!-- 底部导航栏nav-footer -->
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import ServiceBar from '@/components/ServiceBar.vue'
import NavFooter from '@/components/NavFooter.vue'

export default {
  name: 'OrderCommon',
  components: {
    NavFooter,
    ServiceBar
  }
}
</script>

<style></style>
