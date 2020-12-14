<template>
  <div class="coupon-list">
    <div class="coupon-list__wrapper">
      <div class="section-title">优惠券</div>
      <div class="coupons">
        <div class="no-coupon" v-if="coupons.length === 0">
          您尚未拥有优惠券
        </div>
        <div class="coupon" v-for="item of coupons" :key="item.idx">
          <div class="coupon__content">
            <div class="coupon-left">
              <div class="name">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.description"
                  placement="right"
                >
                  <span>{{ item.name }}</span>
                </el-tooltip>
              </div>
              <div class="price">
                满 {{ item.targetAmount }} 减 {{ item.discountAmount }}
              </div>
              <div class="valid-period">
                有效期至 {{ formatDate(item.endTime) }}
              </div>
            </div>
            <div class="coupon-right">
              <div class="coupon-use" @click="$router.push({ path: '/movie' })">
                <div>去使用</div>
                <i class="el-icon-shopping-cart-2 el-icon--right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserCoupon } from "@/api/coupon";
import { formatDate } from "@/utils/time";
export default {
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
    },
    formatDate(time) {
      return formatDate(time);
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
  font-size: 24px;
  color: #99a9bf;
}
.coupon {
  position: relative;
  overflow: hidden;
  background: #40a0ffd8;
  height: 120px;
  width: $couponW;
  margin: 16px $couponMarginX 16px $couponMarginX;
  box-sizing: border-box;

  &__content {
    display: flex;
    flex-direction: row;
    padding: 16px 5px;
    color: white;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
  }
}

.coupon::before {
  border-right: 10px dotted #f6f8fa;
  left: -5px;
}

.coupon::after {
  border-left: 10px dotted #f6f8fa;
  right: -5px;
}

.coupon::before,
.coupon::after {
  top: 10px;
  content: " ";
  width: 0;
  height: 100%;
  position: absolute;
}

.coupon-left {
  display: flex;
  flex: 1;
  flex-direction: column;
  border-right: 2px dashed rgba(255, 255, 255, 0.3);

  height: 100%;
  padding-left: 16px;

  .name {
    font-size: 16px;
    margin-bottom: 4px;
    font-weight: 300;
  }

  .price {
    font-size: 24px;
    color: #fff;
  }

  .valid-period {
    font-size: 12px;
    color: #fff;
    margin-top: auto;
  }
}

.coupon-right {
  width: 80px;
}

.coupon-use {
  display: flex;
  flex-direction: column;
  align-items: center;
  > i {
    font-size: 20px;
    margin-top: 8px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>
