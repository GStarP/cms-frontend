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
      <div
        class="movie-ticket-finish__coupon"
        v-if="activityInfo.id > 0 && totalFare >= activityInfo.targetAmount"
      >
        <div class="text">恭喜您获赠</div>
        <coupon :coupon="activityInfo.coupon"></coupon>
      </div>
      <div class="movie-ticket-finish__operation">
        <el-button type="primary" @click="$router.push('/movie')">查看更多电影</el-button>
        <el-button type="danger" @click="$router.push('/user/ticket')">前往确认出票</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MovieTicketStep from "@/components/movie-ticket/MovieTicketStep.vue";
import Coupon from "@/components/Coupon.vue";
import { getSchedule } from "@/api/schedule";
import { getActivityByMovie } from "@/api/activity";

export default {
  components: { MovieTicketStep, Coupon },
  data() {
    return {
      totalFare: 0,
      scheduleId: 0,
      activityInfo: { id: 0 }
    };
  },
  mounted() {
    this.totalFare = this.$route.query.am;
    this.scheduleId = this.$route.query.si;
    const loading = this.$loading.service();
    getSchedule(this.scheduleId)
      .then(res => {
        const movieId = res.content.movieId;
        getActivityByMovie(movieId)
          .then(res => {
            if (res.content.length === 0) {
              this.activityInfo = {
                id: 0,
                coupon: {
                  id: 0
                }
              };
            } else {
              this.activityInfo = res.content[0];
            }
            loading.close();
          })
          .catch(e => {
            console.log(e);
            loading.close();
          });
      })
      .catch(e => {
        console.log(e);
        loading.close();
      });
  }
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

  &__coupon {
    margin-bottom: 40px;
    .text {
      font-size: 18px;
      text-align: center;
    }
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
