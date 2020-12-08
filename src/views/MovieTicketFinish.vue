<template>
  <div class="movie-ticket-finish__wrapper">
    <movie-ticket-step class="movie-ticket-step" :progress="2" />
    <div class="movie-ticket-finish">
      <el-alert
        show-icon
        title="支付成功"
        type="success"
        class="movie-ticket-finish__success"
        :closable="false"
      />
      <div class="movie-ticket-finish__hint"></div>
      <div class="movie-ticket-finish__operation">
        <el-button type="primary" @click="$router.push('/movie')">查看更多电影</el-button>
        <el-button type="danger" @click="$router.push('/user/ticket')">前往确认出票</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MovieTicketStep from "@/components/movie-ticket/MovieTicketStep.vue";

export default {
  components: { MovieTicketStep }
};
</script>

<style lang="scss">
.movie-ticket-step {
  margin: 36px 0;
}
.section-title {
  $h: 18px;
  height: $h;
  line-height: $h;

  font-size: 16px;
  font-weight: bold;

  padding-left: 6px;
  border-left: 4px solid $primary;

  margin-bottom: 16px;
}
.movie-ticket-finish {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__success {
    max-width: 664px;
    margin-bottom: 36px;
  }
  .el-alert {
    padding: 24px 32px;
  }
  .el-alert__icon {
    $size: 48px;
    height: $size;
    width: $size;
    font-size: $size;
  }
  .el-alert__content {
    margin-left: 24px;
  }
  .el-alert__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__hint {
    margin-bottom: 16px;
  }

  &__operation {
    display: flex;
    flex-direction: row;

    .el-button {
      margin: 0 24px;
    }
  }
}
</style>
