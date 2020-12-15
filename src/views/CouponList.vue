<template>
  <div class="coupon-list">
    <div class="coupon-list__wrapper">
      <div class="section-title">优惠券</div>
      <div class="coupons">
        <div class="no-coupon" v-if="coupons.length === 0">
          您尚未拥有优惠券
        </div>
        <coupon v-for="item of coupons" :key="item.idx" :coupon="item"></coupon>
      </div>
    </div>
  </div>
</template>

<script>
import Coupon from "@/components/Coupon.vue";
import { getUserCoupon } from "@/api/coupon";
export default {
  components: {
    Coupon
  },
  data() {
    return {
      coupons: [
        {
          id: 1, // 优惠券id
          description: "", // 优惠券描述
          name: "", // 优惠券名称
          targetAmount: 1.0, // 使用门槛
          discountAmount: 1.0, // 优惠金额
          startTime: "2020-01-01 00:00:00.000", // 可用时间
          endTime: "2020-01-01 00:00:00.000" // 失效时间
        }
      ]
    };
  },
  methods: {
    getConpons() {
      const loading = this.$loading.service();
      getUserCoupon(this.$store.state.userInfo.id)
        .then(res => {
          res.content.sort(function(a, b) {
            if (a.endTime === b.endTime) {
              return a.id > b.id ? 1 : -1;
            }
            return a.endTime > b.endTime ? 1 : -1;
          });
          this.coupons = res.content;
          let idx = 0;
          for (let c of this.coupons) {
            c.idx = idx;
            idx = idx + 1;
          }
          console.log(this.coupons);
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    }
  },
  computed: {},
  mounted() {
    this.getConpons();
  }
};
</script>

<style lang="scss">
.coupon-list {
  display: flex;
  justify-content: center;

  &__wrapper {
    margin-top: 16px;
  }
}

$couponW: 280px;
$couponMarginX: 12px;
.coupon-list .section-title {
  margin-left: $couponMarginX;
}
.coupons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: $couponW * 3 + $couponMarginX * 6;
}
.no-coupon {
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: #99a9bf;
}
</style>
