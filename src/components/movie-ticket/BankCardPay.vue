<template>
  <el-dialog
    class="bank-card-dialog"
    title="银行卡支付"
    :visible="show"
    :close-on-click-modal="false"
    width="440px"
    top="37vh"
    @close="onClose"
  >
    <div class="bank-card-dialog__hint">请输入支付密码</div>
    <number-password-input @finish="onFinish" />
  </el-dialog>
</template>

<script>
import NumberPasswordInput from '@/components/movie-ticket/NumberPasswordInput.vue'
export default {
  components: {
    NumberPasswordInput
  },
  props: ['show'],
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
    onFinish() {
      this.$emit('finish')
    }
  }
}
</script>

<style lang="scss">
.bank-card-dialog {
  display: flex;
  flex-direction: column;

  .el-dialog__header {
    padding: 15px 15px 10px 15px;
  }

  .el-dialog__body {
    padding: 10px 15px;
  }

  &__hint {
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  }

  .number-password-input {
    margin-bottom: 56px;
  }
}
</style>