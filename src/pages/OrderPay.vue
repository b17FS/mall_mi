<template>
  <div class="pay-container">
    <div class="wrapper">
      <!-- 订单 -->
      <div class="pay-box">
        <!-- 订单提示 -->
        <div class="pay-tips">
          <div class="col"><span class="icon-gou"></span></div>
          <div class="col">
            <div class="pay-ok">订单提交成功！去付款咯～</div>
            <div class="pay-time">
              请在 <span style="color: #ff6600">0小时30分</span> 内完成支付,
              超时后将取消订单 <br />
              收货信息：{{ addressInfo }}
            </div>
          </div>
          <div class="col">
            <div class="pay-money">
              应付总额：<span style="color: #ff6600; font-size: 24px">
                {{ payment }}元</span
              >
            </div>
            <div class="detai-btn" @click="showOrderInfo = !showOrderInfo">
              订单详情
              <span class="icon-down" :class="{ up: showOrderInfo }"></span>
            </div>
          </div>
        </div>
        <!-- 订单信息 -->
        <div class="order-info" :class="{ showOrderInfo: showOrderInfo }">
          <div class="info-item">
            <span class="title">订单号：</span> <span>{{ orderNo }}</span>
          </div>
          <div class="info-item">
            <span class="title">收货信息：</span>
            <span>{{ addressInfo }}</span>
          </div>
          <div class="info-item clearfix">
            <span class="title fl">商品名称：</span>
            <div class="goods fl">
              <span v-for="item of orderList" :key="item.productId"
                ><img :src="item.productImage" class="pro-img" />
                {{ item.productName }} <br />
              </span>
            </div>
          </div>
          <div class="info-item">
            <span class="title">发票信息：</span> <span>电子发票 个人</span>
          </div>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-method">
        <div class="method-title">选择以下支付方式付款</div>
        <div class="platform">
          <span class="method-title">支付平台</span>
          <div class="choose-method">
            <div
              class="ali"
              :class="{ checked: checkedMethod === 1 }"
              @click="paySubmit(1)"
            >
              <span class="pic"></span>
            </div>
            <div
              class="wechat"
              :class="{ checked: checkedMethod === 2 }"
              @click="paySubmit(2)"
            >
              <span class="pic"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 微信支付组件 -->
    <ScanPayCode
      v-if="showScanPayCode"
      :img="wechatPayImg"
      @close="closeWechatPay"
    ></ScanPayCode>

    <!-- 确认是否完成支付 -->
    <ModalBox
      :modalTitle="'支付确认'"
      :btnType="'3'"
      :cancelText="'未支付'"
      :sureText="'查看订单'"
      :showModal="showSurePay"
      @cancel="showSurePay = false"
      @confirm="goOrderList"
    >
      <template #dialogBody>
        <p>是否已完成付款？</p>
      </template>
    </ModalBox>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import ScanPayCode from '@/components/ScanPayCode.vue'
import ModalBox from '@/components/ModalBox.vue'

export default {
  name: 'ProductPay',
  components: {
    ScanPayCode,
    ModalBox
  },
  data() {
    return {
      showSurePay: false, // 是否显示确认支付弹框
      wechatPayImg: '', //微信支付二维码图片路径
      showScanPayCode: false, // 显示微信支付弹框
      showOrderInfo: false, //显示订单详情信息
      checkedMethod: '', //支付类型
      orderId: this.$route.query.orderNo,
      addressInfo: '', //收货人地址
      orderList: [],
      payment: 0, // 应付总额
      timer: '' // 定时器ID
    }
  },
  methods: {
    // 1.获取订单详细信息
    getOrderDetail() {
      this.$http.get(`/orders/${this.orderId}`).then((res) => {
        let location = res.shippingVo
        for (let k in location) {
          if (k !== 'receiverPhone') {
            this.addressInfo += location[k] + ' '
          }
        }

        this.orderList = res.orderItemVoList
        this.payment = res.payment
        // console.log(this.addressInfo)
      })
    },

    // 2.支付方式提交
    paySubmit(payType) {
      if (payType === 1) {
        this.checkedMethod = payType
        window.open(`/#/aliPay/?orderId=${this.orderId}`, '_blank')
      } else {
        this.checkedMethod = payType
        this.$http
          .post('/pay', {
            orderId: this.orderId,
            orderName: 'vue高仿小米商城', //扫码支付时订单名称
            amount: 0.01, //单位元
            payType: 2 //1支付宝，2微信
          })
          .then((res) => {
            QRCode.toDataURL(res.content)
              .then((url) => {
                this.showScanPayCode = true
                this.wechatPayImg = url
                this.loopOrderState()
              })
              .catch(() => {
                this.$message.error('微信二维码生产失败，请稍后再试！')
              })
          })
      }
    },

    // 3.关闭微信支付
    closeWechatPay() {
      this.showScanPayCode = false
      this.showSurePay = true
      clearInterval(this.timer)
    },

    // 4.确认付款后跳到订单列表页
    goOrderList() {
      this.$router.push('/orderCommon/orderList')
    },

    // 轮询当前订单支付状态
    loopOrderState() {
      this.timer = setInterval(() => {
        this.$http.get(`/orders/${this.orderId}`).then((res) => {
          if (res.status == 20) {
            clearInterval(this.timer)
            this.goOrderList()
            // this.$message.
          }
        })
      }, 1000)
    }
  },
  mounted() {
    this.getOrderDetail()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';

.pay-container {
  background-color: $colorH;
  overflow: hidden;
  padding: 30px 0 130px;
  .wrapper {
    .pay-box {
      font-size: $fontJ;
      padding: 60px 50px;
      // margin: 30px 0;
      background-color: $colorG;
      .pay-tips {
        @include flex();
        border-bottom: 1px solid #d7d7d7;
        padding-bottom: 45px;
        .col {
          flex: 1;
          color: $colorC;
          &:nth-child(n + 2) {
            flex: 3;
          }
          &:last-child {
            text-align: right;
          }
          .icon-gou {
            width: 90px;
            height: 90px;
            @include bgImg(90px, 90px, '/public/imgs/icon-gou.png', 70%);
            background-color: #39d5a1;
            border-radius: 50%;
          }
          .pay-ok {
            font-size: $fontE;
            color: $colorB;
          }
          .pay-money,
          .pay-ok {
            margin-bottom: 20px;
          }
          .pay-time {
            line-height: 25px;
          }
          .detai-btn {
            cursor: pointer;
            .icon-down {
              margin-left: 5px;
              vertical-align: middle;
              @include bgImg(15px, 15px, '/public/imgs/icon-down.png');
              transition: all 0.3s;
              &.up {
                transform: rotate(180deg);
              }
            }
          }
        }
      }
      .order-info {
        display: none;
        color: $colorB;
        padding-top: 40px;
        &.showOrderInfo {
          display: block;
        }
        .info-item {
          margin-left: 160px;
          padding: 10px 0;
          .title {
            display: inline-block;
            width: 100px;
          }
          .goods {
            .pro-img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .pay-method {
      height: 270px;
      background-color: $colorG;
      margin-top: 45px;
      padding: 0 50px;
      color: $colorB;
      .method-title {
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #d7d7d7;
        font-size: $fontG;
        &:last-of-type {
          border: none;
        }
      }
      .platform {
        font-size: $fontH;
        .choose-method {
          display: flex;
          .ali,
          .wechat {
            width: 188px;
            height: 64px;
            margin-right: 20px;
            border: 1px solid #d7d7d7;
            @include flex(center);
            .pic {
              @include bgImg(103px, 38px, '/public/imgs/pay/icon-ali.png');
            }
            &.checked {
              border-color: $colorA;
            }
          }
          .wechat {
            .pic {
              background-image: url('/public/imgs/pay/icon-wechat.png');
            }
          }
        }
      }
    }
  }
}
</style>
