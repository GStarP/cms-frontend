<template>
  <div class="activity-hint" v-if="activity.id > 0">
    <i class="el-icon-shopping-bag-2"></i>
    <span>{{ activity.name }}：单场次选座购票满
      <strong>{{ activity.targetAmount }} </strong>
      元，送满 <strong>{{ activity.coupon.targetAmount }}</strong> 减
      <strong>{{ activity.coupon.discountAmount }}</strong>
      优惠券一张</span>
  </div>
</template>

<script>
export default {
  props: ["activity"]
};
</script>

<style lang="scss">
.activity-hint {
  margin-top: 16px;
  padding: 0 16px;

  $h: 36px;
  height: $h;
  background-color: #f56c6c;
  color: #fff;
  border-radius: 4px;

  font-weight: 300;

  display: flex;
  flex-direction: row;

  i {
    line-height: $h;
    margin-right: 8px;
  }
  span {
    line-height: $h;
  }
}
</style>
