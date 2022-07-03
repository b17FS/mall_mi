<template>
  <div class="pro-container">
    <!-- 产品参数组件 -->
    <ProductParam :proName="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </ProductParam>
    <!-- 产品图片 -->
    <div class="product">
      <div class="product-bg1">
        <img src="../../public/imgs/product/product-bg-1.png" alt="" />
        <div class="pro-info">
          <div class="title">{{ product.name }}</div>
          <div class="desc">{{ product.subtitle }}</div>
          <div class="func">
            <ul>
              <li>全球首款双频 GPS</li>
              <li>骁龙845</li>
              <li>AI 变焦双摄</li>
              <li>红外人脸识别</li>
            </ul>
          </div>
          <div class="price">
            <span class="now">￥{{ product.price }}</span>
            <span class="pass">￥2999</span>
          </div>
        </div>
      </div>
      <div class="product-bg2">
        <img src="../../public/imgs/product/product-bg-2.png" alt="" />
      </div>
      <div class="product-bg3">
        <img src="../../public/imgs/product/product-bg-3.png" alt="" />
      </div>
    </div>

    <!-- 画廊 -->
    <div class="gallery-container">
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide
            ><img src="/imgs/product/gallery-2.png" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-3.png" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-4.png" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-5.jpg" alt=""
          /></swiper-slide>
          <swiper-slide
            ><img src="/imgs/product/gallery-6.jpg" alt=""
          /></swiper-slide>
          <!-- Optional controls -->
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
    </div>

    <!-- 视频 -->
    <div class="video-container">
      <div class="video-introduce">
        <p>
          60帧超慢动作摄影 <br />
          慢慢回味每一瞬间的精彩
        </p>
        <p>
          后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！ <br />
          更能AI 精准分析视频内容，15个场景智能匹配背景音效。
        </p>
      </div>
      <div class="video-bg wrapper" @click="isShowVideo = 'slideDown'"></div>
      <div class="video-box" v-show="isShowVideo">
        <div class="overlay"></div>
        <div class="video" :class="isShowVideo">
          <span class="close-btn" @click="closeVideo"></span>
          <video
            src="../../public/imgs/product/video.mp4"
            controls
            autoplay
            muted
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from '@/components/ProductParam.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductShow',
  components: {
    ProductParam,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      isShowVideo: '',
      product: {}, //当前展示德商品信息
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  methods: {
    getProductInfo() {
      let id = this.$route.params.id
      this.$http.get(`/products/${id}`).then((res) => {
        this.product = res
      })
      // console.log(this)
    },

    buy() {
      let id = this.$route.params.id
      this.$router.push(`/productDetail/${id}`)
    },

    closeVideo() {
      this.isShowVideo = 'slideUp'
      setTimeout(() => {
        this.isShowVideo = ''
      }, 600)
    }
  },
  mounted() {
    this.getProductInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';

.pro-container {
  width: 1920px;
  margin: 0 auto;
  .btn {
    margin-left: 14px;
  }
  .product {
    // width: 1920px;
    margin: 0 auto;
    .product-bg1 {
      position: relative;
      height: 718px;
      img {
        width: 100%;
      }
      .pro-info {
        position: absolute;
        left: 50%;
        top: 40px;
        transform: translateX(-50%);
        @include flex();
        flex-direction: column;
        width: 600px;
        color: $colorB;

        .title {
          // line-height: 196px;
          font-size: 80px;
          font-weight: 700;
        }
        .desc {
          // width: 216px;
          font-size: $fontE;
          letter-spacing: 10px;
          text-align: center;
        }
        .func {
          font-size: $fontI;
          margin: 20px 0;
          ul {
            @include flex();
            li {
              padding: 0 15px;
              border-right: 1px solid #bfab9d;
            }
          }
        }
        .price {
          .now {
            font-size: 38px;
          }
          .pass {
            margin-left: 5px;
            font-size: 26px;
            text-decoration: line-through;
          }
        }
      }
    }
    .product-bg2 {
      img {
        height: 397px;
        width: 1226px;
        margin: 40px 347px;
        border: 1px dashed $colorC;
      }
    }
    .product-bg3 {
      height: 638px;
      margin-bottom: 36px;
      img {
        width: 100%;
      }
    }
  }
  .gallery-container {
    height: 356px;
    margin-bottom: 127px;
    // overflow: hidden;
    .swiper-box {
      position: relative;
      img {
        width: 100%;
      }
      .desc {
        margin-top: 50px;
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      .swiper-pagination {
        // display: flex;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        /deep/ .swiper-pagination-bullet {
          width: 29px;
          height: 3px;
          margin: 0 5px;
          border-radius: 0;
        }
        /deep/ .swiper-pagination-bullet-active {
          background-color: #666;
        }
      }
    }
  }
  .video-container {
    height: 1044px;
    margin-bottom: 40px;
    background-color: #000;
    .video-introduce {
      color: $colorG;
      @include flex();
      flex-direction: column;
      P {
        width: 686px;
        font-size: 60px;
        text-align: center;
        margin-top: 82px;
        &:last-child {
          width: 732px;
          margin-top: 47px;
          margin-bottom: 58px;
          font-size: $fontG;
        }
      }
    }
    .video-bg {
      @include bgImg(100%, 540px, '/public/imgs/product/gallery-1.png');
    }
    .video-box {
      .overlay {
        @include position(fixed);
        background-color: $colorB;
        opacity: 0.5;
        z-index: 10;
      }
      @keyframes slideDown {
        from {
          top: -50%;
          opacity: 0;
        }
        to {
          top: 50%;
          opacity: 1;
        }
      }
      @keyframes slideUp {
        from {
          top: 50%;
          opacity: 1;
        }
        to {
          top: -50%;
          opacity: 0;
        }
      }
      .video {
        position: fixed;
        top: -50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1000px;
        height: 536px;
        z-index: 15;
        // opacity: 0;
        // transition: all 0.6s;
        // &.slidedown {
        //   top: 50%;
        //   opacity: 1;
        // }
        &.slideDown {
          animation: slideDown 0.6s linear forwards;
        }
        &.slideUp {
          animation: slideUp 0.6s linear;
        }
        .close-btn {
          cursor: pointer;
          z-index: 17;
          @include iconImg(
            absolute,
            20px,
            20px,
            20px,
            20px,
            '/public/imgs/icon-close.png'
          );
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
