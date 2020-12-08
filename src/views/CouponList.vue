<template>
  <div class="coupon-list">
    <div class="coupon-list__wrapper">
      <div class="section-title">优惠券</div>
        <div class="coupons">
          <div class="coupon" v-for="item of coupons" :key="item.idx">
            <div class="content">
              <div class="left">
                <div class="name">{{ item.name }}</div>
                <div class="description">{{ item.description }}</div>
                <div class="price">满{{ item.targetAmount }}减{{ item.discountAmount }}</div>
              </div>
              <div class="right">
                <div>有效日期：</div>
                <div>{{formatDate(item.startTime)}} ~ {{formatDate(item.endTime)}}</div>
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
  flex-direction: row;
  align-items: center;
}

.coupon {
  position: relative;
  overflow: hidden;
  background: $primary;
  // height: 120px;
  width: 325px;
  margin: 5px;

  ::before {
    border-right: 10px dotted white;
    left: -5px;
  }

  ::after {
    border-left: 10px dotted white;
    right: -5px;
  }

  ::before, ::after {
    top: 10px;
    content: ' ';
    width: 0;
    height: 100%;
    position: absolute;
  }
}
</style>
