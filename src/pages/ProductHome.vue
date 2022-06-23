<template>
  <div class="home-container">
    <div class="wrapper">
      <!-- swiper -->
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item of slideList" :key="item.id">
            <a :href="'/#/productShow/' + item.id"><img :src="item.img" /></a>
          </swiper-slide>

          <!-- 分页器 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- 左右箭头 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              手机 电话卡
              <div class="children">
                <ul v-for="(item, index) of menuList" :key="index">
                  <li v-for="subItem of item" :key="subItem.id">
                    <a :href="'/#/productShow/' + subItem.id">
                      <img
                        :src="subItem ? subItem.img : '/imgs/item-box-1.png'"
                        alt=""
                      />
                      <p>{{ subItem ? subItem.name : '小米CC9' }}</p>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">电视 盒子</li>
            <li class="menu-item">笔记本 平板</li>
            <li class="menu-item">家电 插线板</li>
            <li class="menu-item">出行 穿戴</li>
            <li class="menu-item">耳机 音箱</li>
            <li class="menu-item">电源 配件</li>
            <li class="menu-item">生活 箱包</li>
          </ul>
        </div>
      </div>
      <!-- ads广告 -->
      <div class="ads-box">ads</div>
      <!-- banner -->
      <div class="banner">banner</div>
      <!-- 产品列表 -->
      <div class="product-box">product</div>
    </div>

    <!-- 底部ServiceBar -->
    <ServiceBar></ServiceBar>
  </div>
</template>

<script>
import ServiceBar from '@/components/ServiceBar.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'ProductHome',
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg'
        }
      ],
      menuList: [
        [
          {
            id: '30',
            name: '小米CC9',
            img: '/imgs/item-box-1.png'
          },
          {
            id: '31',
            name: '小米8青春版',
            img: '/imgs/item-box-2.png'
          },
          {
            id: '32',
            name: 'Redmi K20 Pro',
            img: '/imgs/item-box-3.jpg'
          },
          {
            id: '33',
            name: '移动4G专区',
            img: '/imgs/item-box-4.jpg'
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
.home-container {
  .swiper-box {
    position: relative;
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
        height: 100%;
      }
      .swiper-button-prev {
        // position: absolute;
        left: 274px;
      }
    }
    .nav-menu {
      position: absolute;
      top: 0;
      left: 0;
      width: 264px;
      height: 451px;
      padding-top: 26px;
      box-sizing: border-box;
      // opacity: 0.7;
      background-color: rgba(85, 88, 90, 0.5);
      font-size: $fontI;
      color: $colorG;
      z-index: 10;
      .menu-wrap {
        .menu-item {
          position: relative;
          padding: 0 30px;
          line-height: 50px;
          &::after {
            content: '';
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            width: 10px;
            height: 15px;
            @include bgImg(10px, 15px, '/public/imgs/icon-arrow.png');
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            position: absolute;
            left: 264px;
            top: -26px;
            width: 964px;
            height: 451px;
            background-color: #fff;
            border: 1px solid $colorH;
            ul {
              display: flex;
              li {
                flex: 1;
                padding-left: 23px;
                a {
                  display: inline-block;
                  color: $colorB;
                  font-size: $fontJ;
                  font-weight: bold;
                  line-height: 75px;
                  img {
                    width: 35px;
                    height: 42px;
                    vertical-align: middle;
                  }
                  p {
                    display: inline-block;
                    padding-left: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
