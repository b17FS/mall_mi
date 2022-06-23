<template>
  <div>
    <!-- 头部导航栏nav-header -->
    <NavHeader></NavHeader>
    <!-- 主体部分 -->
    <router-view></router-view>
    <!-- 底部导航栏nav-footer -->
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'

export default {
  name: 'HomeCommon',
  components: {
    NavHeader,
    NavFooter
  }
}
</script>

<style></style>
