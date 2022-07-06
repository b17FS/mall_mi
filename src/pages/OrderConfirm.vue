<template>
  <div class="confirm-container">
    <div class="order-box wrapper">
      <!-- 地址 -->
      <div class="address">
        <div class="address-hd">收货地址</div>
        <div class="address-list">
          <span
            class="cards"
            :class="{ checked: submitAddress === item.id }"
            v-for="item of addressList"
            :key="item.id"
            @click="submitAddress = item.id"
          >
            <span class="item-name">{{ item.receiverName }} </span>
            <span class="item-mobile">{{ item.receiverMobile }}</span>
            <span class="item-location">
              {{
                item.receiverProvince +
                ' ' +
                item.receiverCity +
                ' ' +
                item.receiverDistrict +
                ' ' +
                item.receiverAddress
              }}
            </span>
            <div class="item-handle">
              <i class="el-icon-delete" @click="deleteAddress(item)"></i>
              <i class="el-icon-edit" @click="editAddress(item)"></i>
            </div>
          </span>
          <span class="cards" @click="addAddress">
            <span class="icon-add"></span>
            <span>添加新地址</span>
          </span>
        </div>
      </div>
      <!-- 商品 -->
      <div class="product">
        <div class="pro-hd">商品</div>
        <div class="pro-list" v-for="item of cartList" :key="item.productId">
          <span class="pro-img">
            <img :src="item.productMainImage" alt="" />
          </span>
          <span class="pro-name">{{
            item.productName + ' ' + item.productSubtitle
          }}</span>
          <span class="num-price"
            >{{ item.productPrice }}元 x {{ item.quantity }}</span
          >
          <span class="total-price">{{ item.productTotalPrice }}元</span>
        </div>
      </div>
      <!-- 配送 -->
      <div class="send-way">
        <span class="hd">配送方式</span>
        <span class="type">包邮</span>
      </div>
      <!-- 发票 -->
      <div class="bill">
        <span class="hd">发票</span>
        <span class="type">电子发票 &nbsp;&nbsp; 个人</span>
        <div class="bill-content">
          <ul>
            <li>
              商品件数：<span>{{ proCount }} 件</span>
            </li>
            <li>
              商品总价：<span>{{ cartTotalPrice }} 元</span>
            </li>
            <li>优惠活动：<span>0元</span></li>
            <li>运费：<span>0元</span></li>
            <li>
              应付总额：<span>{{ cartTotalPrice }} 元</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 提交按钮 -->
      <div class="settle-btn">
        <div class="btn btn-large back-cart" @click="backCart">返回购物车</div>
        <div class="btn btn-large" @click="submitOrder">提交订单</div>
      </div>
    </div>

    <!-- 删除弹框 -->
    <modal-box
      :btnType="'1'"
      :sureText="'确定'"
      :showModal="showModal"
      :modalTitle="'确认删除'"
      @cancel="showModal = false"
      @confirm="submitResults"
    >
      <template #dialogBody>
        <p>确认要删除该商品吗？</p>
      </template>
    </modal-box>

    <!-- 编辑新增弹框 -->
    <modal-box
      :btnType="'1'"
      :sureText="'确定'"
      :showModal="showEditModal"
      :modalTitle="'新增/编辑'"
      @cancel="showEditModal = false"
      @confirm="submitResults"
    >
      <template #dialogBody>
        <div class="edit-wrap">
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="姓名"
              v-model="checkedAddress.receiverName"
            />
            <input
              type="text"
              class="input"
              placeholder="手机号"
              v-model="checkedAddress.receiverMobile"
            />
          </div>
          <div class="item">
            <select name="province" v-model="checkedAddress.receiverProvince">
              <option value="北京">北京</option>
              <option value="上海">上海</option>
              <option value="贵州">贵州</option>
            </select>
            <select name="city" v-model="checkedAddress.receiverCity">
              <option value="北京">北京</option>
              <option value="上海">上海</option>
              <option value="贵阳">贵阳</option>
            </select>
            <select name="district" v-model="checkedAddress.receiverDistrict">
              <option value="朝阳区">朝阳区</option>
              <option value="海淀区">海淀区</option>
              <option value="西城区">西城区</option>
              <option value="顺义区">顺义区</option>
              <option value="昌平区">昌平区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkedAddress.receiverAddress">
详细地址</textarea
            >
          </div>
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="邮编"
              v-model="checkedAddress.receiverZip"
            />
          </div>
        </div>
      </template>
    </modal-box>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox.vue'

export default {
  name: 'ProductConfirm',
  components: {
    ModalBox
  },
  data() {
    return {
      addressList: [], // 地址列表
      cartList: [], // 商品列表
      cartTotalPrice: 0, //  商品总价
      proCount: 0, // 商品件数
      showModal: false, //控制删除弹框显示
      checkedAddress: {}, // 要被操作的地址
      userAction: '', //用户要进行的操作  0 表示删除  1表示新增  2表示编辑
      showEditModal: false, //控制编辑和新增弹框显示
      submitAddress: 0 // 要提交的地址
    }
  },
  methods: {
    // 1.获取收货地址列表
    getAddressList() {
      this.$http.get('/shippings').then((res) => {
        this.addressList = res.list
        this.submitAddress =
          this.addressList.length === 0 ? '' : this.addressList[0].id // 默认选中第一个地址
      })
    },

    // 2.获取购物车商品列表
    getCartList() {
      this.$http.get('/carts').then((res) => {
        this.cartList = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
        this.cartList.map((item) => {
          this.proCount += item.quantity
        })
        // console.log(this.proCount)
      })
    },

    // 3.删除地址
    deleteAddress(item) {
      this.userAction = '0'
      this.checkedAddress = item
      this.showModal = true
    },

    // 4.添加新地址
    addAddress() {
      this.checkedAddress = {}
      this.showEditModal = true
      this.userAction = '2'
    },
    // 5.编辑地址
    editAddress(item) {
      this.showEditModal = true
      this.checkedAddress = item
      this.userAction = '1'
    },

    // 点击确认，提交结果到后台
    submitResults() {
      let { checkedAddress, userAction } = this
      let method,
        url,
        params = {}
      if (userAction === '0') {
        method = 'delete'
        url = `/shippings/${checkedAddress.id}`
      } else if (userAction === '1') {
        method = 'put'
        url = `/shippings/${checkedAddress.id}`
        params = checkedAddress
      } else {
        method = 'post'
        url = `/shippings`
        params = checkedAddress
        // console.log(params)
      }

      if (userAction === '1' || userAction === '2') {
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        } = this.checkedAddress

        let errMsg = ''
        if (!receiverName) {
          errMsg = '请输入收货人名称'
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = '请输入正确联系方式'
        } else if (!receiverProvince) {
          errMsg = '请输入省份'
        } else if (!receiverCity) {
          errMsg = '请输入对应城市'
        } else if (!receiverDistrict || !receiverAddress) {
          errMsg = '请输入收货地址'
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = '请输入六位邮编'
        }
        if (errMsg) {
          return this.$message.error(errMsg)
        }
      }
      // console.log(this.checkedAddress)

      this.$http[method](url, params).then(() => {
        this.closeModalBox()
        this.getAddressList()
        this.$message.success('操作成功！')
      })
    },
    closeModalBox() {
      this.showModal = false
      this.showEditModal = false
      this.userAction = ''
      this.checkedAddress = {}
    },

    // 6.提交订单
    submitOrder() {
      console.log(this.submitAddress)
      if (!this.submitAddress) {
        this.$message.error('请选择一个收获地址！')
        return
      }
      // 创建订单，并跳转到订单支付页面，
      // 同时将创建好的订单编号传到订单支付页面
      this.$http
        .post('/orders', {
          shippingId: this.submitAddress
        })
        .then((res) => {
          this.$router.push({
            path: '/orderCommon/orderPay',
            query: { orderNo: res.orderNo }
          })
          console.log(res)
        })
    },

    // 7.返回购物车
    backCart() {
      this.$router.push('/productCart')
    }
  },
  mounted() {
    this.getAddressList()
    this.getCartList()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';

.confirm-container {
  background-color: $colorH;
  overflow: hidden;
  padding: 30px 0 200px;
  .order-box {
    background-color: $colorG;
    padding-left: 60px;
    // margin-top: 30px;
    .address {
      .address-hd {
        padding: 35px 0 20px 0;
        color: $colorB;
        font-size: $fontG;
      }
      .address-list {
        display: flex;
        flex-wrap: wrap;
        .cards {
          // display: inline-block;
          width: 271px;
          height: 160px;
          margin-bottom: 60px;
          margin-right: 20px;
          padding: 30px;
          border: 1px solid $colorH;
          @include flex();
          flex-direction: column;
          color: $colorC;
          font-size: $fontJ;
          &.checked {
            border-color: $colorA;
          }
          .item-name {
            flex: 2;
            width: 100%;
            color: $colorB;
            font-size: $fontG;
          }
          .item-mobile,
          .item-location {
            flex: 1;
            width: 100%;
          }
          .item-location {
            flex: 3;
          }
          .item-handle {
            flex: 3;
            width: 100%;
            @include flex(space-between, flex-end);
            font-size: $fontE;
          }
          .icon-add {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin-bottom: 10px;
            border-radius: 50%;
            background: #e0e0e0 url('/public/imgs/icon-add.png') no-repeat
              center/14px 14px;
          }
          &:last-child {
            @include flex(center);
          }
        }
      }
    }
    .product {
      color: $colorB;
      font-weight: 700;
      .pro-hd {
        padding-bottom: 20px;
        font-size: $fontG;
        border-bottom: 1px solid $colorH;
      }
      .pro-list {
        height: 90px;
        font-size: $fontI;

        @include flex();
        .pro-img {
          width: 50px;
          height: 50px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .pro-name {
          flex: 2;
        }
        .num-price {
          flex: 1;
        }
        .total-price {
          flex: 1;
          color: $colorA;
          text-align: center;
        }
        &:last-child {
          border-bottom: 1px solid $colorH;
        }
      }
    }
    .send-way,
    .bill {
      padding: 30px 0 50px;
      border-bottom: 1px solid $colorH;
      .hd {
        margin-right: 70px;
        font-size: $fontG;
        color: $colorB;
        font-weight: 700;
      }
      .type {
        font-size: $fontI;
        color: $colorA;
      }
      .bill-content {
        height: 230px;
        padding-right: 50px;
        color: $colorC;
        font-size: $fontI;
        @include flex(flex-end);
        ul {
          li {
            height: 30px;
            line-height: 30px;
            @include flex();
            span {
              color: $colorA;
            }
          }
        }
      }
    }
    .settle-btn {
      padding: 30px 50px 50px;
      text-align: right;
      .back-cart {
        background-color: $colorG;
        color: $colorD;
        border: 1px solid #d7d7d7;
        margin-right: 20px;
      }
    }
  }
  .edit-wrap {
    font-size: $fontJ;
    .item {
      margin-bottom: 15px;
      .input {
        width: 280px;
        height: 40px;
        border: 1px solid $colorH;
        padding-left: 10px;
        & + .input {
          margin-left: 15px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid $colorH;
        border-radius: 5px;
        margin-right: 15px;
        color: $colorC;
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        border: 1px solid $colorH;
        color: $colorC;
        box-sizing: border-box;
      }
    }
  }
}
</style>
