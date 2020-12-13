<template>
  <div class="coupon-list">
    <div class="coupon-list__wrapper">
      <div class="section-title">优惠券</div>
        <div class="coupons">
          <div class="coupon" v-for="item of coupons" :key="item.idx">
            <div class="content">
              <div class="coupon-left">
                <div class="name">
                  <el-tooltip class="item" effect="dark" :content="item.description" placement="right">
                    <span>{{ item.name }}</span>
                  </el-tooltip>
                </div>
                <div class="price">满{{ item.targetAmount }}减{{ item.discountAmount }}</div>
                <div class="valid-period">有效期：{{formatDate(item.startTime)}} ~ {{formatDate(item.endTime)}}</div>
              </div>
              <div class="coupon-right">
                <el-link @click="$router.push({ path: '/movie' })">
                  去使用<i class="el-icon-shopping-cart-2 el-icon--right"></i>
                </el-link>
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
          id: 1,  // 优惠券id
          description: '',  // 优惠券描述
          name: '',  // 优惠券名称
          targetAmount: 1.0,  // 使用门槛
          discountAmount: 1.0,  // 优惠金额
          startTime: '2020-01-01 00:00:00.000',  // 可用时间
          endTime: '2020-01-01 00:00:00.000'  // 失效时间
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
            if(a.endTime === b.endTime) {
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
  computed: {
    
  },
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

.coupons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.coupon {
  position: relative;
  overflow: hidden;
  background: #40a0ffd8;
  height: 120px;
  width: 400px;
  margin: 5px;

  .content {
    display: flex;
    flex-direction: row;
    padding: 20px;
    color: white;
    align-items: center;
  }
}

.coupon::before {
  border-right: 10px dotted white;
  left: -5px;
}

.coupon::after {
  border-left: 10px dotted white;
  right: -5px;
}

.coupon::before, .coupon::after {
  top: 10px;
  content: ' ';
  width: 0;
  height: 100%;
  position: absolute;
}

.coupon-left {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  border-right: 2px dashed rgba(255,255,255,.3);
  width: 20%;

  .name {
    font-size: 20px;
  }

  .price {
    font-size: 24px;
    color: #f9d3a1;
  }

  .valid-period {
    font-size: 14px;
    color: #ecdfdf;
  }
}

.coupon-right {
  padding-left: 25px;
  text-align: left;
}
</style>
