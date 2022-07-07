<template>
  <div class="list-container">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <!-- LoadingSvg -->
          <LoadingSvg v-if="showLoading"></LoadingSvg>
          <div class="order" v-for="(item, index) of orderList" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ item.createTime }}
                <span>|</span>
                {{ item.receiverName }}
                <span>|</span>
                订单号：{{ item.orderNo }}
                <span>|</span>
                {{ item.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money"> {{ item.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div
              class="order-content clearfix"
              v-for="proItem of item.orderItemVoList"
              :key="proItem.productId"
            >
              <div class="good-box fl">
                <div class="good-list">
                  <div class="good-img">
                    <img :src="proItem.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">
                      {{ proItem.productName }}
                    </div>
                    <div class="p-money">
                      {{ proItem.totalPrice + ' x ' + proItem.quantity }} 元
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="item.status === 20">
                <a href="javascript:;">{{ item.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(item.orderNo)">{{
                  item.statusDesc
                }}</a>
              </div>
            </div>
          </div>

          <!-- 分页器 -->
          <el-pagination
            class="paginationFix"
            background
            layout="prev, pager, next"
            :total="total"
            :pageSize="pageSize"
            @current-change="handleChange"
          >
          </el-pagination>

          <!-- 加载更多按钮 -->

          <div class="load-more" v-if="false">
            <el-button type="primary" :loading="showLoading" @click="loadMore"
              >加载更多</el-button
            >
          </div>

          <!-- 滚动加载更多 -->
          <div
            class="scroll-more"
            v-infinite-scroll="scrollLoadMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="120"
            v-if="false"
          >
            <img
              class="scroll-svg"
              src="/imgs/loading-svg/loading-spinning-bubbles.svg"
              v-if="showLoading"
            />
          </div>

          <!-- NoData -->
          <no-data v-if="!showLoading && orderList.length == 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var infiniteScroll = require('vue-infinite-scroll')
import OrderHeader from './../components/OrderHeader'
import LoadingSvg from '@/components/LoadingSvg.vue'
import NoData from '@/components/NoData.vue'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    LoadingSvg,
    NoData
  },
  directives: { infiniteScroll },
  data() {
    return {
      orderList: [],
      showLoading: false,
      pageSize: 5,
      pageNum: 1,
      total: 0,
      busy: false //是否可以触发 scrollLoadMore 事件
    }
  },
  methods: {
    getOrderList() {
      this.showLoading = true
      this.busy = true
      this.$http
        .get('/orders', { params: { pageSize: 8, pageNum: this.pageNum } })
        .then((res) => {
          this.showLoading = false
          this.orderList = res.list //分页器分页
          // this.orderList = this.orderList.concat(res.list) // 加载更多分页、滚动加载更多分页
          this.total = res.total
          this.busy = false
          // if (!res.hasNextPage) {
          //   this.$message.error('没有更多订单信息了')
          // }
        })
        .catch(() => {
          this.showLoading = false
        })
    },

    //
    goPay(orderNo) {
      this.$router.push({
        path: '/orderCommon/orderPay',
        query: {
          orderNo: orderNo
        }
      })
    },

    // 第一种方法：分页器
    handleChange(pageNum) {
      // 该事件会自带返回pageNum
      // 个悲剧当前页码值，去后台拉取数据，渲染到页面
      this.pageNum = pageNum
      this.getOrderList()
    },

    //第二种方法：加载更多按钮
    loadMore() {
      this.pageNum++
      this.getOrderList()
    },

    //第三种方法：滚动加载，通过npm插件实现
    scrollLoadMore() {
      this.busy = true
      setTimeout(() => {
        this.pageNum++
        this.getOrderListLoading()
      }, 1000)
    },
    // 专门给scrollMore使用
    getOrderListLoading() {
      // debugger
      this.showLoading = true
      this.$http
        .get('/orders', { params: { pageSize: 5, pageNum: this.pageNum } })
        .then((res) => {
          this.orderList = this.orderList.concat(...res.list) // 加载更多分页、滚动加载更多分页
          this.showLoading = false
          if (res.hasNextPage) {
            // 还有下一页
            this.busy = false
          } else {
            // 没有下一页，则禁用滚动加载更多事件
            this.busy = true
          }
        })
        .catch(() => {
          this.showLoading = false
        })
    }
  },
  mounted() {
    this.getOrderList()
  }
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.list-container {
  background-color: $colorJ;
  .container {
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      position: relative;
      .paginationFix {
        text-align: right;
      }
      .load-more {
        text-align: center;
      }
      .scroll-more {
        height: 200px;
        .scroll-svg {
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 999;
        }
      }
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
