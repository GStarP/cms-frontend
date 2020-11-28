<template>
  <div class="movie-ticket">
    <div class="movie-ticket-step"></div>
    <div class="movie-ticket-info">
      <div class="movie-ticket-seats">
        <div class="movie-ticket-seats__introduction"></div>
        <div class="movie-ticket-seats__map">
          <div
            v-for="(row, i) of seats"
            :key="scheduleItem.id + 'row' + i"
            class="movie-ticket-seats__map__row"
          >
            <div
              v-for="(seat, j) of row"
              :key="scheduleItem.id + 'row' + i + 'col' + j"
              class="movie-ticket-seats__map__seat"
              :class="'seat-' + seats[i][j]"
              @click="selectSeat(i, j)"
            />
          </div>
        </div>
      </div>
      <div class="movie-ticket-schedule"></div>
    </div>
  </div>
</template>

<script>
import { getScheduleInfo } from "@/api/ticket";
// 用到的接口
// /ticket/get/occupiedSeats?scheduleId=
// /ticket/lockSeat
// /vip/get/12
// /refund/all
export default {
  props: ["movieId", "scheduleId"],
  data() {
    return {
      scheduleItem: {
        id: 1,
        hallId: 1,
        hallName: "影厅名称",
        movieId: 1,
        movieName: "电影名",
        startTime: "2020-11-27T00:00:00.000+0800",
        endTime: "2020-11-27T00:00:00.000+0800",
        fare: 101.1
      },
      seats: []
    };
  },
  methods: {
    updateSchedultInfo() {
      const loading = this.$loading.service();
      getScheduleInfo(this.scheduleId)
        .then(res => {
          this.scheduleItem = res.content.scheduleItem;
          this.seats = res.content.seats;
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    selectSeat(i, j) {
      const state = this.seats[i][j];
      const copy = this.seats.slice(0);
      if (state === 0) {
        copy[i][j] = 2;
      } else if (state === 2) {
        copy[i][j] = 0;
      }
      this.seats = copy;
    }
  },
  mounted() {
    this.updateSchedultInfo();
  },
  watch: {
    movieId() {
      this.updateSchedultInfo();
    },
    scheduleId() {
      this.updateSchedultInfo();
    }
  }
};
</script>

<style lang="scss">
.movie-ticket-seats {
  &__map {
    &__row {
      display: flex;
      flex-direction: row;
      &:not(:last-child) {
        margin-bottom: 12px;
      }
      > div {
        margin-left: 8px;
      }
    }
    &__seat {
      $size: 28px;
      height: $size;
      width: $size;
    }
  }
}
.seat-0 {
  background: url("~@/assets/img/seat-0.png") no-repeat 50% 50%;
  background-size: contain;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
.seat-1 {
  background: url("~@/assets/img/seat-1.png") no-repeat 50% 50%;
  background-size: contain;
}
.seat-2 {
  background: url("~@/assets/img/seat-2.png") no-repeat 50% 50%;
  background-size: contain;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
