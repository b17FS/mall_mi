<template>
  <div class="servicebar-container">
    <div class="wrapper">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150元包邮</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceBar'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.servicebar-container {
  color: #666;
  font-size: 16px;
  ul {
    display: flex;
    li {
      flex: 1;
      height: 36px;
      margin: 15px 0;
      border-right: 1px solid #e5e5e5;
      line-height: 36px;
      text-align: center;
      &:last-child {
        border: none;
      }
      span {
        vertical-align: middle;
        margin-right: 8px;
      }
      .icon-setting {
        @include bgImg(20px, 20px, '../../public/imgs/icon-setting.png');
      }
      .icon-7day {
        @include bgImg(20px, 20px, '../../public/imgs/icon-7day.png');
      }
      .icon-15day {
        @include bgImg(20px, 20px, '../../public/imgs/icon-15day.png');
      }
      .icon-post {
        @include bgImg(20px, 20px, '../../public/imgs/icon-post.png');
      }
    }
  }
}
</style>
