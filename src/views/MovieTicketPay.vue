<template>
  <div class="movie-ticket-pay__wrapper">
    <div v-if="$route.query.c" class="back-to-seat" @click="$router.back()">
      <i class="el-icon-back"></i>返回重新选座
    </div>
    <movie-ticket-step class="movie-ticket-step" :progress="1" />
    <div class="movie-ticket-pay">
      <el-alert
        show-icon
        title="请尽快完成支付"
        type="warning"
        description="如果您在确认选座后 5 分钟内未完成支付，座位将被解锁，将可以被他人选择"
        class="movie-ticket-pay__warning"
        :closable="false"
      />
      <div class="movie-ticket-pay__info">
        <div class="section-title">待支付电影票</div>
        <el-table
          ref="ticketList"
          :data="payInfo.ticketList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="onTicketListSelectChange"
        >
          <el-table-column type="selection" width="56" />
          <el-table-column label="电影名称">
            <template slot-scope="scope">{{
              scope.row.schedule.movieName
            }}</template>
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope">{{
              scope.row.schedule.startTime.substr(0, 16).replace("T", " ")
            }}</template>
          </el-table-column>
          <el-table-column label="影厅">
            <template slot-scope="scope">{{
              scope.row.schedule.hallName
            }}</template>
          </el-table-column>
          <el-table-column label="座位">
            <template slot-scope="scope"
              >{{ scope.row.rowIndex + 1 }}排{{
                scope.row.columnIndex + 1
              }}座</template
            >
          </el-table-column>
        </el-table>
        <div class="movie-ticket-pay__total-fare">
          总金额：<span>{{ totalFare.toFixed(2) }}</span> 元
        </div>
        <div class="section-title">可用优惠券</div>
        <div class="no-coupon" v-if="availableCoupons.length === 0">
          无可用优惠券，您可以 <strong>提高总金额</strong> 或
          <el-link>去抽取优惠券</el-link>
        </div>
        <div class="movie-ticket-pay__coupon-list" v-else>
          <el-tag
            v-for="(coupon, i) of availableCoupons"
            :key="'coupon' + coupon.id"
            @click="onCouponSelectChange(i)"
            :effect="couponEffect(i)"
            >满 {{ coupon.targetAmount }} 减 {{ coupon.discountAmount }}</el-tag
          >
        </div>
        <div class="movie-ticket-pay__operation">
          <div class="movie-ticket-pay__real-fare">
            实际支付：<span>￥</span><span>{{ realFare.toFixed(2) }}</span>
          </div>
          <el-button type="primary" :disabled="totalFare <= 0"
            >确认支付</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieTicketStep from "@/components/movie-ticket/MovieTicketStep.vue";

export default {
  components: { MovieTicketStep },
  data() {
    return {
      payInfo: {
        ticketList: [
          {
            ticketId: 1,
            schedule: {
              id: 368,
              hallId: 1,
              hallName: "3号厅",
              movieId: 1,
              movieName: "X战警：黑凤凰 Dark Phoenix",
              startTime: "2020-11-27T10:00:00.000+0800",
              endTime: "2020-11-27T12:00:00.000+0800",
              fare: 55
            },
            columnIndex: 1,
            rowIndex: 1
          },
          {
            ticketId: 1,
            schedule: {
              id: 369,
              hallId: 1,
              hallName: "3号厅",
              movieId: 1,
              movieName: "X战警：黑凤凰 Dark Phoenix",
              startTime: "2020-11-27T10:00:00.000+0800",
              endTime: "2020-11-27T12:00:00.000+0800",
              fare: 55
            },
            columnIndex: 1,
            rowIndex: 1
          }
        ],
        coupons: [
          {
            id: 1,
            description: "这是一张优惠券",
            name: "冬至未至",
            targetAmount: 100,
            discountAmount: 10.5
          },
          {
            id: 2,
            description: "这是一张优惠券",
            name: "冬至未至",
            targetAmount: 50,
            discountAmount: 20
          }
        ]
      },
      selectedTickets: [],
      selectedCoupon: 0
    };
  },
  methods: {
    updatePayInfo() {
      // TODO 等待后端创建
    },
    onTicketListSelectChange(val) {
      this.selectedTickets = val;
    },
    onCouponSelectChange(index) {
      this.selectedCoupon = index;
    },
    couponEffect(index) {
      if (index === this.selectedCoupon) {
        return "dark";
      } else {
        return "plain";
      }
    }
  },
  computed: {
    totalFare() {
      let total = 0;
      for (const ticket of this.selectedTickets) {
        total += ticket.schedule.fare;
      }
      return total;
    },
    availableCoupons() {
      const res = [];
      for (const coupon of this.payInfo.coupons) {
        if (this.totalFare >= coupon.targetAmount) {
          res.push(coupon);
        }
      }
      const compare = function(x, y) {
        return y.discountAmount - x.discountAmount;
      };

      return res.sort(compare);
    },
    realFare() {
      let fare = this.totalFare;
      if (this.availableCoupons.length > 0) {
        fare -= this.availableCoupons[this.selectedCoupon].discountAmount;
      }
      return fare;
    }
  },
  mounted() {
    this.updatePayInfo();
    this.$refs.ticketList.toggleAllSelection();
  },
  watch: {
    availableCoupons() {
      this.selectedCoupon = 0;
    }
  }
};
</script>

<style lang="scss">
.back-to-seat {
  position: absolute;
  top: 84px;
  left: 24px;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-weight: 300;

  i {
    font-size: 18px;
    margin-right: 2px;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}
.movie-ticket-step {
  margin: 36px 0;
}
.movie-ticket-pay {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__warning {
    max-width: 664px;

    background-color: #fef0f0 !important;
    color: #f56c6c !important;

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
  }
  .el-alert__description {
    color: #f56c6c !important;
    font-size: 14px;
    margin-top: 8px;
  }

  &__info {
    width: 1200px;

    .el-table {
      border: 1px solid #ebeef5;
      border-bottom: none;

      margin-bottom: 8px;
    }
  }

  .no-coupon {
    font-size: 15px;
    color: #999;
    height: 30px;
    line-height: 30px;

    .el-link {
      font-size: 15px;
      font-weight: bold;
      vertical-align: baseline;
    }
  }

  &__coupon-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .el-tag {
      margin-right: 8px;
      margin-bottom: 8px;

      letter-spacing: 0;
      padding-right: 12px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  &__total-fare {
    text-align: end;
    margin-bottom: 16px;
    font-size: 14px;
    span {
      font-size: 16px;
    }
  }

  &__operation {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    margin-top: 32px;
  }

  &__real-fare {
    margin-bottom: 16px;

    > span {
      color: #ef4238;
      font-weight: bold;
    }
    > span:first-child {
      font-size: 20px;
    }
    > span:last-child {
      font-size: 28px;
    }
  }
  .el-button {
    font-size: 16px;
    padding: 12px 20px;
    padding-right: 18px;
    letter-spacing: 2px;
  }
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
</style>
