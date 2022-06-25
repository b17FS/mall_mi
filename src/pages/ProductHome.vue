<template>
  <div class="home-container">
    <div class="wrapper">
      <!-- 1. swiper -->
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
        <!-- 左侧边菜单导航栏 -->
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
      <!-- 2. ads广告 -->
      <div class="ads-box">
        <a
          :href="'/#/productShow/' + item.id"
          v-for="item of adsList"
          :key="item.id"
        >
          <img :src="item.img" alt="" />
        </a>
      </div>
      <!-- 3. banner -->
      <div class="banner-box">
        <a href="/#/productShow/70">
          <img src="../../public/imgs/banner-1.png" alt="" />
        </a>
      </div>
      <!-- 4. 产品列表 -->
      <div class="product-box">
        <h2 class="pro-title">手机</h2>
        <div class="pro-content">
          <div class="banner-left"></div>
          <div class="list-wrap">
            <ul class="list" v-for="item of productList" :key="item.id">
              <li class="item">
                <span class="item-tag">新品</span>
                <div class="item-img">
                  <img src="" alt="" />
                </div>
                <div class="item-info">
                  <h3 class="item-title">xiaomi9</h3>
                  <p class="item-desc">骁龙855，索尼4800万超广角微距</p>
                  <p class="item-price">2999元</p>
                </div>
              </li>
              <li class="item">
                <span class="item-tag">新品</span>
                <div class="item-img">
                  <img src="" alt="" />
                </div>
                <div class="item-info">
                  <h3 class="item-title">xiaomi9</h3>
                  <p class="item-desc">骁龙855，索尼4800万超广角微距</p>
                  <p class="item-price">2999元</p>
                </div>
              </li>
              <li class="item">
                <span class="item-tag">新品</span>
                <div class="item-img">
                  <img src="" alt="" />
                </div>
                <div class="item-info">
                  <h3 class="item-title">xiaomi9</h3>
                  <p class="item-desc">骁龙855，索尼4800万超广角微距</p>
                  <p class="item-price">2999元</p>
                </div>
              </li>
              <li class="item">
                <span class="item-tag">新品</span>
                <div class="item-img">
                  <img src="" alt="" />
                </div>
                <div class="item-info">
                  <h3 class="item-title">xiaomi9</h3>
                  <p class="item-desc">骁龙855，索尼4800万超广角微距</p>
                  <p class="item-price">2999元</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
          shadow: false,
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
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      productList: [
        [
          {
            id: 1,
            img: ''
          },
          {
            id: 2,
            img: ''
          },
          {
            id: 3,
            img: ''
          },
          {
            id: 4,
            img: ''
          }
        ],
        []
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
.home-container {
  background-color: $colorJ;
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
  .ads-box {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      // display: inline-block;
      width: 296px;
      height: 167px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .banner-box {
    margin-bottom: 50px;
    a {
      display: block;
      img {
        height: 130px;
      }
    }
  }
  .product-box {
    height: 690px;
    margin-bottom: 51px;
    .pro-title {
      height: 71px;
      line-height: 71px;
      color: $colorB;
      font-size: $fontF;
      font-weight: bold;
    }
    .pro-content {
      @include flex();
      .banner-left {
        width: 224px;
        height: 619px;
        background-color: pink;
      }
      .list-wrap {
        @include flex();
        flex-direction: column;
        height: 619px;
        // width: 1349px;
        .list {
          // @include flex(space-around);
          display: flex;
          width: 100%;
          .item {
            position: relative;
            width: 236px;
            height: 302px;
            margin-left: 16px;
            background-color: $colorG;
            font-size: $fontJ;
            text-align: center;
            .item-tag {
              display: inline-block;
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 67px;
              height: 24px;
              background-color: green;
              color: $colorG;
            }
            .item-img {
              width: 190px;
              height: 190px;
              margin: 24px 23px 0;
              background-color: blue;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .item-info {
              // height: 50px;
              line-height: 20px;
              .item-title {
                color: $colorB;
                font-weight: bold;
              }
              .item-desc {
                color: $colorD;
                font-size: $fontK;
                padding: 6px 0 10px;
              }
              .item-price {
                color: #f20a0a;
              }
            }
          }
        }
      }
    }
  }
}
</style>
