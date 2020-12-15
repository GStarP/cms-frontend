<template>
  <div class="coupon">
    <div class="coupon__content">
      <div class="coupon-left">
        <div class="name">
          <el-tooltip
            class="item"
            effect="dark"
            :content="coupon.description"
            placement="right"
          >
            <span>{{ coupon.name }}</span>
          </el-tooltip>
        </div>
        <div class="price">
          满 {{ coupon.targetAmount }} 减 {{ coupon.discountAmount }}
        </div>
        <div class="valid-period">
          有效期至 {{ formatDate(coupon.endTime) }}
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
</template>

<script>
import { formatDate } from "@/utils/time";
export default {
  props: ["coupon"],
  methods: {
    formatDate(d) {
      return formatDate(d);
    }
  }
};
</script>

<style lang="scss">
$couponW: 280px;
$couponMarginX: 12px;
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
  padding-left: 20px;

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
