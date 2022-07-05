<template>
  <div class="cart-container">
    <!-- 头部导航栏nav-header -->
    <OrderHeader title="我的购物车">
      <template #tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </OrderHeader>
    <!-- 主体部分 -->
    <div class="table-box">
      <div class="wrapper">
        <!-- table区 -->
        <table class="cart-table">
          <tr class="table-hd">
            <th>
              <span
                class="checked-box"
                :class="{ isChecked: selectedAll }"
                @click="toggleAll"
              ></span>
              全选
            </th>
            <th>商品名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
          <tr class="table-item" v-for="item of cartList" :key="item.productId">
            <td class="item-checked">
              <span
                class="checked-box"
                :class="{ isChecked: item.productSelected }"
                @click="updateCart(item)"
              ></span>
            </td>
            <td class="item-name">
              <img :src="item.productMainImage" class="pro-img" />
              <span class="pro-name">
                {{ item.productName + ' ; ' + item.productSubtitle }}</span
              >
            </td>
            <td class="item-price">{{ item.productTotalPrice }}元</td>
            <td class="item-num">
              <div class="count">
                <span class="subtract" @click="updateCart(item, '-')">-</span>
                <span class="pro-num">{{ item.quantity }}</span>
                <span class="add" @click="updateCart(item, '+')">+</span>
              </div>
            </td>
            <td class="item-subtotal">{{ item.productTotalPrice }}元</td>
            <td class="item-handle" @click="showModalBox(item.productId)">
              <span class="icon-close"></span>
            </td>
          </tr>
        </table>
        <!-- 结算区 -->
        <div class="settle-accounts clearfix">
          <div class="all-num fl">
            <span class="continue">继续购物</span>
            <span
              >共
              <span style="color: #ff6600">{{ cartTotalQuantity }}</span>
              件商品，已选择
              <span style="color: #ff6600">{{ selectedQuantity }}</span>
              件</span
            >
          </div>
          <div class="all-price fr">
            <span class="summation" style="color: #ff6600"
              >合计：{{ cartTotalPrice }}元</span
            >
            <div class="btn-large btn" @click="order">去结算</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认删除弹框 -->
    <ModalBox
      :btnType="'3'"
      :cancelText="'取消'"
      :modalTitle="'提示'"
      :showModal="showModal"
      :sureText="'确认删除'"
      @confirm="deleteCart(delProductId)"
      @cancel="showModal = false"
    >
      <template #dialogBody>
        <p>请确认是否要删除该商品？</p>
      </template></ModalBox
    >

    <!-- ServiceBar -->
    <ServiceBar></ServiceBar>

    <!-- 底部导航栏nav-ooter -->
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import ServiceBar from '@/components/ServiceBar.vue'
import ModalBox from '@/components/ModalBox.vue'

export default {
  name: 'OrderCommon',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar,
    ModalBox
  },
  data() {
    return {
      // 购物车列表
      cartList: [],
      // 合计勾选总价
      cartTotalPrice: 0,
      // 已选择商品数
      selectedQuantity: 0,
      // 总共商品件数
      cartTotalQuantity: 0,
      // 是否全选状态
      selectedAll: true,
      // 控制确认删除的弹框
      showModal: false,
      //要删除的商品id
      delProductId: ''
    }
  },
  methods: {
    getCartList() {
      this.$http.get('/carts').then((res) => {
        this.renderData(res)
      })
    },
    // 切换全选状态
    toggleAll() {
      let url = this.selectedAll ? '/carts/unSelectAll' : '/carts/selectAll'
      this.$http.put(url).then((res) => {
        this.renderData(res)
      })
    },
    // 商品 勾选状态更新 和 商品数量更新
    updateCart(item, type) {
      let quantity = item.quantity
      let selected = item.productSelected
      if (type === '-') {
        quantity <= 1 ? this.$message.warning('至少保留一件商品') : --quantity
      } else if (type === '+') {
        quantity > item.productStock
          ? this.$message.warning('购买数量不能超过库存数量')
          : ++quantity
      } else {
        selected = !item.productSelected
      }

      this.$http
        .put(`carts/${item.productId}`, {
          quantity,
          selected
        })
        .then((res) => {
          this.renderData(res)
        })
    },
    // 删除某个商品
    showModalBox(id) {
      this.showModal = true
      this.delProductId = id
    },
    deleteCart() {
      this.$message.success('删除成功！')
      this.showModal = false
      this.$http.delete(`carts/${this.delProductId}`).then((res) => {
        this.renderData(res)
      })
    },

    // 抽取出来的 公共赋值 模块
    renderData(res) {
      this.cartList = res.cartProductVoList || []
      this.cartTotalPrice = res.cartTotalPrice
      this.cartTotalQuantity = res.cartTotalQuantity
      this.selectedAll = res.selectedAll
      // 遍历所有商品，过滤出选择的商品数量 selectedQuantity
      this.selectedQuantity = this.cartList.filter(
        (item) => item.productSelected
      ).length
    },

    // 购物车下单
    order() {
      // arr.every()：当数组中的每一项 xxxxxx 时，返回一个boolean值
      // 当没有商品被选中时，提示：请至少选择一件商品！
      let unCheck = this.cartList.every((item) => !item.productSelected)
      if (unCheck) {
        alert('请至少选择一件商品！')
      } else {
        this.$router.push('/orderCommon/orderConfirm')
      }
    }
  },
  mounted() {
    this.getCartList()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';

.cart-container {
  .table-box {
    background-color: $colorJ;
    .wrapper {
      overflow: hidden;
      .cart-table {
        width: 100%;
        margin: 35px 0;
        background-color: $colorG;
        tr {
          @include flex();
          border-bottom: 1px solid $colorH;
          td,
          th {
            flex: 1;
            text-align: center;
            .checked-box {
              display: inline-block;
              width: 22px;
              height: 22px;
              margin-right: 17px;
              border: 1px solid $colorH;
              vertical-align: middle;
              cursor: pointer;
              &.isChecked {
                // @include bgImg(22px, 22px, '/public/imgs/icon-gou.png');
                background: url('/public/imgs/icon-gou.png') no-repeat
                  center/contain;
                background-color: $colorA;
              }
            }
            &:nth-child(2) {
              flex: 3;
            }
          }
        }
        .table-hd {
          height: 80px;
          color: $colorC;
          font-size: $fontJ;
        }
        .table-item {
          height: 130px;
          color: $colorB;
          font-size: $fontI;
          font-weight: 700;
          .item-name {
            @include flex();
            .pro-img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
              margin-right: 30px;
            }
            .pro-name {
              font-size: $fontH;
            }
          }
          .item-num {
            .count {
              width: 150px;
              height: 40px;
              border: 1px solid $colorH;
              @include flex(space-around);
              font-size: $fontJ;
              span {
                flex: 1;
                line-height: 40px;
                cursor: pointer;
              }
            }
          }
          .item-subtotal {
            color: $colorA;
          }
          .item-handle {
            .icon-close {
              @include bgImg(14px, 12px, '/public/imgs/icon-close.png');
              cursor: pointer;
            }
          }
        }
      }
      .settle-accounts {
        margin-bottom: 130px;
        font-size: $fontJ;
        color: $colorC;
        .all-num {
          .continue {
            padding-right: 35px;
          }
        }
        .all-price {
          .summation {
            margin-right: 30px;
            font-weight: 700;
            font-size: $fontH;
          }
        }
      }
    }
  }
}
</style>
