<template>
  <div class="movie-ticket">
    <movie-ticket-step class="movie-ticket-step" :progress="0" />
    <div class="movie-ticket-info">
      <div class="movie-ticket-seats">
        <div class="movie-ticket-seats__introduction">
          <div class="seat-0" />
          <span>可选座位</span>
          <div class="seat-1" />
          <span>已售座位</span>
          <div class="seat-2" />
          <span>已选座位</span>
        </div>
        <div class="movie-ticket-seats__map">
          <div class="movie-ticket-seats__map__row">
            <div />
            <div v-for="i of colNum" :key="'col' + i" class="col-index">
              {{ i }}
            </div>
            <div />
          </div>
          <div
            v-for="(row, i) of seats"
            :key="scheduleId + 'row' + i"
            class="movie-ticket-seats__map__row"
          >
            <div class="row-index">{{ i + 1 }}</div>

            <div
              v-for="(seat, j) of row"
              :key="scheduleId + 'row' + i + 'col' + j"
              class="movie-ticket-seats__map__seat"
              :class="'seat-' + seats[i][j]"
              @click="selectSeat(i, j)"
            />
            <div />
          </div>
        </div>
      </div>
      <div class="movie-ticket-schedule">
        <div class="movie-ticket-schedule__detail">
          <img class="movie-schedule__poster" :src="movieDetail.posterUrl" />
          <div class="movie-schedule__right">
            <div class="movie-schedule__name">{{ movieDetail.name }}</div>
            <div class="movie-schedule__text">
              <span>类型：</span>{{ movieDetail.type }}
            </div>
            <div class="movie-schedule__text">
              <span>片长：</span>{{ movieDetail.length }} 分钟
            </div>
            <div class="movie-schedule__text">
              <span>影厅：</span>{{ scheduleItem.hallName }}
            </div>
            <div class="movie-schedule__text">
              <span>场次：</span>{{ timeStr }}
            </div>
            <div class="movie-schedule__text">
              <span>票价：</span>￥{{ scheduleItem.fare }} / 张
            </div>
          </div>
        </div>
        <div class="movie-ticket-schedule__operation">
          <div class="section-title">已选座位</div>
          <div v-if="selectedSeats.length === 0" class="no-movie-ticket">
            点击左侧座位进行选座
          </div>
          <div v-else class="movie-ticket-seats">
            <el-tag
              disable-transitions
              v-for="seat of selectedSeats"
              :key="scheduleId + 'r' + seat.rowIndex + 'c' + seat.columnIndex"
              effect="plain"
              >{{ seat.rowIndex + 1 }} 排 {{ seat.columnIndex + 1 }} 座</el-tag>
          </div>
        </div>
        <el-button
          type="primary"
          :disabled="selectedSeats.length === 0"
          @click="lockSeat"
          >确认选座</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MovieTicketStep from "@/components/movie-ticket/MovieTicketStep.vue";
import { getMovieDetailByUser } from "@/api/movie";
import { getScheduleInfo, lockSeat } from "@/api/ticket";
import { formatDate, formatTime, isToday, isNextDay } from "@/utils/time";

export default {
  components: {
    MovieTicketStep
  },
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
      movieDetail: {
        id: 1,
        name: "",
        posterUrl: "",
        director: "",
        screenWriter: "",
        starring: "",
        type: "",
        country: "",
        language: "",
        startDate: "2018-06-23",
        length: 200,
        description: "",
        status: 1,
        islike: 1,
        likeCount: 10
      },
      seats: [[]]
    };
  },
  methods: {
    updateMovieDetail() {
      const loading = this.$loading.service();
      getMovieDetailByUser(this.$store.state.userInfo.id, this.movieId)
        .then(res => {
          const movieDetail = res.content;
          movieDetail.startDate = formatDate(movieDetail.startDate);
          this.movieDetail = movieDetail;
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
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
    },
    lockSeat() {
      const loading = this.$loading.service();
      lockSeat(
        this.$store.state.userInfo.id,
        this.scheduleId,
        this.selectedSeats
      )
        .then(res => {
          this.$router.push({
            path: `/movie-ticket-pay/${this.scheduleId}`
          });
          this.$message.success("选座成功，请尽快完成支付");
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    }
  },
  computed: {
    timeStr() {
      let dateStr = formatDate(this.scheduleItem.startTime);
      const timeStr = formatTime(this.scheduleItem.startTime).substr(0, 5);
      if (isToday(dateStr)) {
        dateStr += " (今天)";
      } else if (isNextDay(dateStr)) {
        dateStr += " (明天)";
      }
      dateStr += " " + timeStr;
      return dateStr;
    },
    colNum() {
      const arr = [];
      for (let i = 0; i < this.seats[0].length; i++) {
        arr.push(i + 1);
      }
      return arr;
    },
    selectedSeats() {
      const arr = [];
      for (let i = 0; i < this.seats.length; i++) {
        for (let j = 0; j < this.seats[i].length; j++) {
          if (this.seats[i][j] === 2) {
            arr.push({
              rowIndex: i,
              columnIndex: j
            });
          }
        }
      }
      return arr;
    }
  },
  mounted() {
    this.updateSchedultInfo();
    this.updateMovieDetail();
  },
  watch: {
    movieId() {
      this.updateSchedultInfo();
      this.updateMovieDetail();
    },
    scheduleId() {
      this.updateSchedultInfo();
      this.updateMovieDetail();
    }
  }
};
</script>

<style lang="scss">
.movie-ticket-step {
  margin: 36px 0;
}
.movie-ticket-info {
  border: 1px solid #dcdfe6;
  background-color: #fff;

  display: flex;
  flex-direction: row;
}
.movie-ticket-seats {
  flex: 1;

  &__introduction {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 32px;
    margin-bottom: 36px;

    > div {
      $size: 32px;
      height: $size;
      width: $size;

      margin-right: 8px;
      &:hover {
        cursor: unset;
        opacity: 1;
      }
    }

    > span {
      margin-right: 48px;
      font-weight: 300;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__map {
    margin-bottom: 56px;
    &__row {
      display: flex;
      flex-direction: row;
      justify-content: center;

      position: relative;

      &:not(:last-child) {
        margin-bottom: 12px;
      }
      > div {
        margin-left: 8px;

        text-align: center;

        $size: 32px;
        height: $size;
        width: $size;
      }
      .col-index {
        color: #999;
      }
      .row-index {
        color: #999;
        text-align: start;
      }
    }
  }
}
.movie-ticket-schedule {
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  width: 424px;
  background-color: #f9f9f9;

  padding: 24px 32px;

  &__detail {
    display: flex;
    flex-direction: row;

    margin-bottom: 40px;
  }

  &__operation {
    display: flex;
    flex-direction: column;

    .no-movie-ticket {
      font-size: 16px;
      height: 32px;
      line-height: 32px;
    }
  }

  .el-button {
    margin-top: auto;
    width: 100%;

    font-size: 15px;
    letter-spacing: 2px;
    padding-right: 18px;
  }

  .movie-ticket-seats {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .el-tag {
      letter-spacing: 0;
      padding-right: 12px;

      margin-right: 8px;
      margin-bottom: 8px;
    }

    margin-bottom: 8px;
  }

  .movie-schedule {
    &__name {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 12px;
    }
    &__text {
      span {
        color: #999;
      }
      font-size: 14px;
      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }
    &__poster {
      $posterH: 180px;
      height: $posterH;
      width: $posterH * 0.7;
      outline: solid 2px #fff;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);

      margin-right: 24px;
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
