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
            <template slot-scope="scope">{{ scope.row.rowIndex + 1 }}排{{
                scope.row.columnIndex + 1
              }}座</template>
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
            >满 {{ coupon.targetAmount }} 减 {{ coupon.discountAmount }}</el-tag>
        </div>
        <div class="movie-ticket-pay__operation">
          <div class="movie-ticket-pay__real-fare">
            实际支付：<span>￥</span><span>{{ realFare.toFixed(2) }}</span>
          </div>
          <el-button type="primary" :disabled="totalFare <= 0" @click="startPay">确认支付</el-button>
        </div>
      </div>
    </div>
    <!-- 银行卡支付弹窗 -->
    <el-dialog
      class="bank-card-dialog"
      title="银行卡支付"
      :visible.sync="bankCardDialogShow"
      :close-on-click-modal="false"
      width="600px"
      top="25vh"
    >
      <div class="bank-card-dialog__hint">请输入支付密码</div>
      <number-password-input @finish="onBankCardPasswordFinish" />
    </el-dialog>
    <!-- 会员卡支付弹窗 -->
    <el-dialog
      class="vip-card-dialog"
      title="会员卡支付"
      :visible.sync="vipCardDialogShow"
      :close-on-click-modal="false"
      width="600px"
      top="25vh"
    >
      <div class="vip-card-dialog__info">
        <div><span>会员卡类型：</span>{{ vipCardInfo.cardType.name }}</div>
        <div>
          <span>会员卡优惠：</span>{{ vipCardInfo.cardType.description }}
        </div>
        <div>
          <span>会员卡余额：</span>{{ vipCardInfo.balance.toFixed(2) }} 元
        </div>
        <div><span>待支付金额：</span>{{ realFare.toFixed(2) }} 元</div>
      </div>
      <div class="vip-card-dialog__operation">
        <el-link @click="switchToBankCardPay">银行卡支付</el-link>
        <el-button :type="vipCardPayColor" @click="vipCardPayOperation">{{
          vipCardPayText
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MovieTicketStep from "@/components/movie-ticket/MovieTicketStep.vue";
import NumberPasswordInput from "@/components/movie-ticket/NumberPasswordInput.vue";
import { getTicketToPay, buyTicketByVIP, buyTicket } from "@/api/ticket";
import { getVIPCardByUserId } from "@/api/vip-card";

export default {
  components: { MovieTicketStep, NumberPasswordInput },
  props: ['scheduleId'],
  data() {
    return {
      payInfo: {
        ticketList: [],
        coupons: []
      },
      selectedTickets: [],
      selectedCoupon: 0,
      vipCardInfo: {
        userId: 0,
        id: 0,
        balance: 0,
        joinDate: "2020-01-01T00:00:00.000",
        cardTypeId: 0,
        cardType: {
          id: 0,
          name: "",
          description: "",
          price: 0,
          topUpTarget: 0,
          topUpDiscount: 0,
          ticketTarget: 0,
          ticketDiscount: 0
        }
      },
      vipCardDialogShow: false,
      bankCardDialogShow: false
    };
  },
  methods: {
    async updatePayInfo() {
      const loading = this.$loading.service();
      const res = await getTicketToPay(this.$store.state.userInfo.id, this.scheduleId);
      this.payInfo = res.content;
      loading.close();
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
    },
    updateVIPCardInfo() {
      getVIPCardByUserId(this.$store.state.userInfo.id)
        .then(res => {
          this.vipCardInfo = res.content;
        })
        .catch(e => {
          console.log(e);
        });
    },
    startPay() {
      if (this.vipCardInfo.id === 0) {
        this.bankCardDialogShow = true;
      } else {
        this.vipCardDialogShow = true;
      }
    },
    switchToBankCardPay() {
      this.vipCardDialogShow = false;
      this.bankCardDialogShow = true;
    },
    vipCardPayOperation() {
      if (this.vipCardInfo.balance >= this.realFare) {
        this.payByVIPCard();
      } else {
        // TODO 跳转至充值页
      }
    },
    onBankCardPasswordFinish() {
      const loading = this.$loading.service({
        text: "正在调取银行卡支付服务..."
      });
      setTimeout(() => {
        loading.close();
        this.payByBankCard();
      }, 500);
    },
    payByVIPCard() {
      this.pay(buyTicketByVIP);
    },
    payByBankCard() {
      this.pay(buyTicket);
    },
    pay(payFunction) {
      const ticketIdList = this.selectedTickets.map(t => t.ticketId);
      let couponId = 0;
      if (this.availableCoupons.length > 0) {
        couponId = this.availableCoupons[this.selectedCoupon].id;
      }
      const loading = this.$loading.service();
      payFunction(ticketIdList, couponId)
        .then(res => {
          this.$router.push({ path: "/movie-ticket-finish" });
          this.$message.success("支付成功");
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
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
    },
    vipCardPayColor() {
      if (this.vipCardInfo.balance >= this.realFare) {
        return "primary";
      } else {
        return "warning";
      }
    },
    vipCardPayText() {
      if (this.vipCardInfo.balance >= this.realFare) {
        return "会员卡快捷支付";
      } else {
        return "前往充值";
      }
    }
  },
  async mounted() {
    await this.updatePayInfo();
    this.$refs.ticketList.toggleAllSelection();
    this.updateVIPCardInfo();
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
    color: #606266;
    height: 30px;
    line-height: 30px;

    .el-link {
      font-size: 15px;
      font-weight: bold;
      vertical-align: baseline;
      span {
        text-decoration: underline;
      }
    }
    .el-link.is-underline:hover:after {
      border: none;
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
.el-dialog__header {
  padding-left: 30px;
  padding-top: 25px;
}
.bank-card-dialog {
  display: flex;
  flex-direction: column;

  &__hint {
    text-align: center;
    font-weight: 300;
    font-size: 18px;
    margin-bottom: 24px;
  }

  .number-password-input {
    margin-bottom: 72px;
  }
}
.vip-card-dialog {
  display: flex;
  flex-direction: column;

  .el-dialog__title {
    font-weight: bold;
  }

  &__info {
    padding-left: 40px;
    margin-bottom: 24px;

    > div {
      font-size: 16px;
      margin-bottom: 8px;
    }

    span {
      display: inline-block;
      width: 100px;
      color: #999;
    }
  }

  &__operation {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;

    .el-link {
      margin-right: 8px;
      font-weight: 300;
      font-size: 14px;
    }
    .el-button {
      margin-right: 10px;
      font-weight: 300;
    }
  }
}
</style>
