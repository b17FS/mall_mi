<template>
  <transition name="slide">
    <div class="modal-container" v-show="showModal">
      <div class="mask"></div>
      <div class="dialog">
        <!-- 对话框头部 -->
        <div class="modal-header">
          <span> {{ modalTitle }} </span>
          <a
            href="javascript:;"
            class="icon-close"
            @click="$emit('cancel')"
          ></a>
        </div>

        <!-- 对话框主体 -->
        <div class="modal-body">
          <slot name="dialogBody"></slot>
        </div>

        <!-- 对话框底部 -->
        <div class="modal-footer">
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType == '1'"
            @click="$emit('confirm')"
          >
            {{ sureText }}
          </a>

          <a
            href="javascript:;"
            class="btn-default btn"
            v-if="btnType == '2'"
            @click="$emit('cancel')"
            >{{ cancelText }}
          </a>

          <div class="btn-group" v-if="btnType == '3'">
            <a href="javascript:;" class="btn" @click="$emit('confirm')">
              {{ sureText }}
            </a>
            <a
              href="javascript:;"
              class="btn-default btn"
              @click="$emit('cancel')"
            >
              {{ cancelText }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    // 弹框类型：大框large、小框small、中框middle、表单form
    modalType: {
      type: String,
      default: 'form'
    },
    // 弹框标题
    modalTitle: {
      type: String
    },
    // 按钮类型：1：确定按钮    2：取消按钮   3：确定取消都有
    btnType: {
      type: String
    },
    // 按钮确认/取消文本
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/modal.scss';
</style>
