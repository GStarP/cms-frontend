<template>
  <div class="movie-schedule-item">
    <div class="movie-schedule-item__left">
      <div class="movie-schedule-item__hall">{{ schedule.hallName }}</div>
      <div class="movie-schedule-item__start-time"><span>开始时间</span>{{ formatTime(schedule.startTime) }}</div>
    </div>
    <div class="movie-schedule-item__fare"><span>￥</span>{{schedule.fare}}</div>
    <el-button class="movie-schedule-item__buy" type="primary" @click="buyTicket(schedule)">选座购票</el-button>
  </div>
</template>

<script>
export default {
  props: ['schedule'],
  methods: {
    formatTime(time) {
      return time.substr(11, 5)
    },
    buyTicket(schedule) {
      // TODO 跳转选座页面
    }
  }
}
</script>

<style lang="scss">
.movie-schedule-item {
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 20px 20px;

  &:not(:last-child) {
    border-bottom: 1px dashed #e5e5e5;
  }

  &__left {
    display: flex;
    flex-direction: column;
  }

  &__hall {
    font-size: 18px;
  }

  &__start-time {
    font-size: 14px;
    color: #999;

    margin-top: 6px;

    span {
      margin-right: 16px;
    }
  }

  &__fare {
    font-size: 24px;
    font-weight: bold;

    margin-left: auto;

    span {
      font-size: 16px;
    }
  }

  &__buy {
    margin-left: 32px;
  }

  .el-button {
    height: fit-content;
    padding: 8px 16px;
    padding-right: 15px;
    border-radius: 16px;
    span {
      letter-spacing: 1px;
    }
  }
}
</style>