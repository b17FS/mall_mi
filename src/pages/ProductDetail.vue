<template>
  <div class="detail-container">
    <!-- 产品参数组件 -->
    <ProductParams :proName="product.name"></ProductParams>

    <!-- 商品详情 -->
    <div class="product-box wrapper">
      <!-- 商品轮播图 -->
      <div class="pro-swiper">
        <div class="swiper-box">
          <swiper :options="swiperOption">
            <swiper-slide>
              <img src="../../public/imgs/detail/phone-1.jpg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img src="../../public/imgs/detail/phone-2.jpg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img src="../../public/imgs/detail/phone-3.jpg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img src="../../public/imgs/detail/phone-4.jpg" alt="" />
            </swiper-slide>

            <!-- 分页器 -->
            <div class="swiper-pagination" slot="pagination"></div>

            <!-- 左右箭头 -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </div>

      <!-- 商品信息介绍 -->
      <div class="pro-info">
        <div class="title">{{ product.name }}</div>
        <div class="subTitle">{{ product.subtitle }}</div>
        <div class="price">
          <span class="tag">小米自营</span>
          <p>{{ product.price }} 元</p>
        </div>
        <div class="address">
          <span class="icon-loc"></span>
          <span>北京 北京市 朝阳区 安定门街道</span>
          <span>修改</span>
          <p class="has-goods">有现货</p>
        </div>
        <div class="version">
          <p class="version-hd">选择版本</p>
          <div class="version-bd">
            <div
              class="version-info"
              :class="{ choose: isChoose === '1' }"
              @click="isChoose = '1'"
            >
              <div class="info">6GB+64GB 全网通</div>
              <div class="money">1099 元</div>
            </div>
            <div
              class="version-info"
              :class="{ choose: isChoose === '2' }"
              @click="isChoose = '2'"
            >
              <div class="info">4GB+64GB 移动4G</div>
              <div class="money">1049 元</div>
            </div>
          </div>
        </div>
        <div class="color">
          <p class="color-hd">选择颜色</p>
          <div class="color-bd">
            <div class="color-info">
              <div class="color-style"></div>
              <div class="color-val">深空灰</div>
            </div>
          </div>
        </div>
        <div class="total">
          <div class="pro-choose">
            <span>
              {{ product.name
              }}{{
                isChoose === '1' || isChoose === ''
                  ? '6GB+64GB 全网通'
                  : '4GB+64GB 移动4G'
              }}
            </span>
            <!-- <span v-if="isChoose === '2'">4GB+64GB 移动4G </span> -->
            <span>
              {{
                isChoose === '1' || isChoose === '' ? '1099 元' : '1049 元'
              }}</span
            >
            <!-- <span v-if="isChoose === '2'"></span> -->
          </div>
          <div class="all-price">总计：{{ allPrice }} 元</div>
        </div>
        <div class="btn-group">
          <div class="btn btn-huge" @click="addCart">加入购物车</div>
          <div class="btn btn-like"><span class="icon-like"></span> 喜欢</div>
        </div>
      </div>
    </div>

    <!-- 价格说明 -->
    <div class="price-description">
      <div class="wrapper">
        <div class="desc-hd">价格说明</div>
        <div class="desc-con">
          <img src="../../public/imgs/detail/item-price.jpeg" alt="" />
        </div>
      </div>
    </div>

    <!-- ServiceBar -->
    <service-bar></service-bar>
  </div>
</template>

<script>
import ProductParams from '@/components/ProductParam.vue'
import ServiceBar from '@/components/ServiceBar.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductDetail',
  components: {
    ProductParams,
    ServiceBar,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      productId: this.$route.params.id,
      product: {},
      isChoose: '1', // 控制选中版本，默认选中版本1
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    allPrice() {
      let price = 0
      if (this.isChoose === '1' || this.isChoose === '') {
        price = 1099
      } else if (this.isChoose === '2') {
        price = 1049
      }
      return price
    }
  },
  methods: {
    // 获取当前productId商品信息
    getProductInfo() {
      // let id = this.$route.params.id
      this.$http.get(`/products/${this.productId}`).then((res) => {
        this.product = res
        // console.log(res)
      })
    },

    // 根据当前productId，将商品添加到购物车后台
    addCart() {
      this.$http
        .post('/carts', {
          productId: this.productId,
          selected: true
        })
        .then((res) => {
          // console.log(res)
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
          this.$router.push('/productCart')
        })
    }
  },
  mounted() {
    this.getProductInfo()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';

.detail-container {
  .product-box {
    margin: 30px auto 38px;
    height: 870px;
    @include flex();
    .pro-swiper {
      flex: 1;
      height: 100%;
      .swiper-box {
        width: 384px;
        height: 468px;
        margin: 90px auto;
        // border: 1px solid $colorH;
        .swiper-container {
          width: 384px;
          height: 100%;
          .swiper-slide {
            @include flex(center);
            img {
              width: 90%;
              height: 90%;
            }
          }

          /deep/ .swiper-pagination {
            .swiper-pagination-bullet {
              width: 50px;
              height: 2px;
              background-color: $colorD;
              .swiper-pagination-bullet-active {
                background-color: $colorC;
              }
            }
          }
          .swiper-button-prev,
          .swiper-button-next {
            color: $colorD;
          }
        }
      }
    }
    .pro-info {
      flex: 1;
      height: 100%;
      .title {
        font-size: $fontC;
        line-height: 60px;
        font-weight: bold;
      }
      .subTitle {
        font-size: $fontJ;
        color: $colorD;
        line-height: 22px;
      }
      .price {
        margin-top: 26px;
        color: #ff6700;
        font-size: $fontI;
        .tag {
          display: inline-block;
          padding-bottom: 14px;
          line-height: 22px;
        }
      }
      .address {
        width: 584px;
        height: 108px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        margin-top: 50px;
        margin-bottom: 30px;
        padding-top: 60px;
        font-size: $fontJ;
        color: $colorC;
        font-weight: 700;
        .icon-loc {
          @include bgImg(20px, 22px, '/public/imgs/icon-loc.png');
          margin: 0 10px 0 34px;
          vertical-align: middle;
        }
        span {
          &:last-of-type {
            color: $colorA;
            margin-left: 20px;
          }
        }
        .has-goods {
          margin: 15px 0 0 64px;
          color: $colorA;
        }
      }
      .version {
        font-size: $fontH;
        font-weight: bold;
        .version-bd {
          @include flex();
          margin-top: 20px;
          .version-info {
            width: 287px;
            height: 50px;
            border: 1px solid $colorH;
            @include flex(space-around);
            font-size: $fontI;
            cursor: pointer;
            &.choose {
              border-color: $colorA;
              color: $colorA;
            }
            .money {
              font-weight: 400;
            }
          }
        }
      }
      .color {
        font-size: $fontH;
        font-weight: bold;
        margin-top: 30px;
        .color-bd {
          margin-top: 20px;
          color: $colorA;
          .color-info {
            width: 287px;
            height: 50px;
            border: 1px solid $colorA;
            @include flex(center);
            font-size: $fontI;
            cursor: pointer;
            .color-style {
              width: 14px;
              height: 16px;
              background-color: $colorC;
              margin-right: 10px;
            }
          }
        }
      }
      .total {
        height: 108px;
        padding: 30px;
        // margin-top: 30px;
        // margin-bottom: 20px;
        background-color: #fafafa;
        @include flex(center, flex-start);
        flex-direction: column;
        .pro-choose {
          font-size: $fontJ;
          font-weight: 700;
          @include flex();
          width: 100%;
        }
        .all-price {
          font-size: $fontE;
          color: $colorA;
          margin-top: 18px;
        }
      }
      .btn-group {
        .icon-like {
          vertical-align: middle;

          @include bgImg(18px, 16px, '/public/imgs/icon-like.png');
        }
      }
    }
  }
  .price-description {
    width: 1920px;
    height: 340px;
    background-color: #f3f3f3;
    .desc-hd {
      font-size: $fontE;
      color: $colorB;
      font-weight: 700;
      padding: 38px 0 30px 0;
    }
  }
}
</style>
