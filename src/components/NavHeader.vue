<template>
  <div class="header-container">
    <!-- NavTopbar -->
    <div class="nav-topbar">
      <div class="wrapper">
        <div class="topbar-menu">
          <a href="javascript::">松果出行</a>
          <a href="javascript::">MIUI</a>
          <a href="javascript::">云服务</a>
          <a href="javascript::">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="!username" @click="goLogin">登录</a>
          <a href="javascript:;" v-if="username"> {{ username }} </a>
          <a href="javascript:;" v-if="username" @click="loginOut">退出</a>
          <!-- <a href="javascript:;" v-if="!username" @click="goLogin">登录</a> -->

          <a href="/#/orderCommon/orderList">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goTOCart"
            ><span class="icon-cart"></span> 购物车 ({{ cartCount }})</a
          >
        </div>
      </div>
    </div>
    <!-- NavHeader -->
    <div class="nav-header">
      <div class="wrapper">
        <!-- 左侧logo -->
        <div class="header-logo">
          <a href="/#/productHome"></a>
        </div>
        <!-- 中间菜单导航 -->
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item in phoneList" :key="item.id">
                  <a :href="'/#/productDetail/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Redmi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="../../public/imgs/nav-img/nav-3-1.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米cc9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="../../public/imgs/nav-img/nav-3-2.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米cc9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="../../public/imgs/nav-img/nav-3-3.png" alt="" />
                    </div>
                    <div class="pro-name">小米cc9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="../../public/imgs/nav-img/nav-3-4.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米cc9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="../../public/imgs/nav-img/nav-3-5.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米cc9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="../../public/imgs/nav-img/nav-3-6.png" alt="" />
                    </div>
                    <div class="pro-name">小米cc9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 右侧搜索区 -->
        <div class="header-search">
          <input type="text" name="keywords" />
          <!-- <a href="javsscript:;">小米9</a>
          <a href="javsscript:;">小米9 SE</a> -->
          <span class="icon-search"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'NavHeader',
  data() {
    return {
      // username: '',
      phoneList: []
    }
  },
  computed: {
    // 因为调用用户接口获取数据需要时间，而每次刷新页面时，用户数据渲染时，用户数据还没有请求到(接口请求延迟，比组件德渲染要慢)
    // 所以，使用 computed 计算属性，对数据进行缓存，（只有在数据变更后，再回重新计算）
    // username() {
    //   return this.$store.state.username
    // },
    // cartCount() {
    //   return this.$store.state.cartCount
    // }
    ...mapState(['username', 'cartCount'])
  },
  methods: {
    // 1. 获取菜单导航 小米手机数据
    async getProductList() {
      const res = await this.$http.get('/products', {
        params: { categoryId: '100012', pageSize: 6 }
      })
      this.phoneList = res.list
      console.log(this)
      // console.log(this.phoneList)
    },

    // 2. 点击购物车跳转页面
    goTOCart() {
      this.$router.push('/productCart')
    },

    // 3. 点击登录跳转页面
    goLogin() {
      this.$router.push('/usersLogin')
    },

    // 4.退出登录
    loginOut() {
      this.$http.post('/user/logout').then(() => {
        this.$message.success('退出成功！')
        this.$cookie.set('userId', '', { expires: '-1' })
        this.saveUserName('')
        this.saveCartCount(0)
        this.$router.push('/usersLogin')
      })
    },

    ...mapActions(['saveUserName', 'saveCartCount']),

    getCartCount() {
      this.$http.get('/carts/products/sum').then((res = 0) => {
        // to-do 保存到 vuex 里面
        // this.$store.dispatch('saveCartCount', res)
        this.saveCartCount(res)
        // console.log(res)
      })
    }
  },
  filters: {
    currency(val) {
      if (!val) return '0.00'
      return '￥' + val.toFixed(2) + '元'
    }
  },
  mounted() {
    this.getProductList()
    let params = this.$route.params
    if (params && params.from === 'login') {
      this.getCartCount()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';

.header-container {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;
    .wrapper {
      display: flex;
      justify-content: space-between;
      a {
        display: inline-block;
        color: #fff;
        text-decoration: none;
        padding-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: $colorA;
        color: #fff;
        text-align: center;
        .icon-cart {
          // display: inline-block;
          // width: 16px;
          // height: 12px;
          // background: url('/public/imgs/icon-cart-checked.png') no-repeat
          //   center/contain;
          @include bgImg(16px, 12px, '/public/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .wrapper {
      position: relative;
      height: 112px;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      @include flex();
      .header-menu {
        display: flex;
        flex: 1;
        margin-left: 210px;
        .item-menu {
          color: $colorB;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          span {
            // display: inline-block;
            padding: 0 20px;
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              // display: block;
              opacity: 1;
              height: 220px;
            }
          }
          .children {
            position: absolute;
            left: 0;
            top: 112px;
            width: 1226px;
            height: 0;
            background-color: #fff;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            opacity: 0;
            overflow: hidden;
            z-index: 20;
            transition: all 0.2s;
            ul {
              .product {
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                &::after {
                  content: '';
                  position: absolute;
                  right: 0;
                  display: inline-block;
                  width: 1px;
                  height: 100px;
                  margin-top: 26px;
                  border-right: 1px solid #d7d7d7;
                }
                &:last-child::after {
                  display: none;
                }
                a {
                  // height: 100%;
                  display: inline-block;
                }
                img {
                  width: auto;
                  // width: 92px;
                  height: 111px;
                }
                .pro-img {
                  // display: flex;
                  // justify-content: center;
                  height: 111px;
                  margin-top: 26px;
                  // border-right: 1px solid #d7d7d7;
                }
                .pro-name {
                  height: 12px;
                  margin-top: 10px;
                  font-weight: 700;
                  color: $colorB;
                }
                .pro-price {
                  height: 12px;
                  margin-top: 8px;
                  color: $colorA;
                }
              }
            }
          }
        }
      }
      .header-search {
        @include flex();
        width: 319px;
        height: 50px;
        border: 1px solid #e0e0e0;
        input {
          width: 264px;
          height: 100%;
          border: none;
          border-right: 1px solid #e0e0e0;
          padding-left: 14px;
          box-sizing: border-box;
        }
        a {
          display: inline-block;
          // width: 40px;
          height: 20px;
          background-color: #ececec;
          padding: 0 4px;
          color: #666;
          font-size: 12px;
          line-height: 20px;
          text-align: center;
        }
        .icon-search {
          display: inline-block;
          @include bgImg(18px, 18px, '/public/imgs/icon-search.png');
          margin: 16px 18px;
        }
      }
    }
  }
}
</style>
