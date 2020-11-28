<template>
  <div class="movie-ticket">
    {{movieId + ' ' + scheduleId}}
  </div>
</template>

<script>
// 用到的接口
// /ticket/get/occupiedSeats?scheduleId=
// /ticket/lockSeat
// /vip/get/12
// /refund/all
export default {
  props: ['movieId', 'scheduleId']
}
</script>

<style lang="scss">

</style>