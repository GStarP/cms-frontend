<template>
  <div class="vip-card">
    <div class="vip-card__background" :style="cardBackground"></div>
    <div class="vip-card__title">
      <div>{{ cardInfo.cardType.name }}</div>
      <img src="@/assets/img/vip.png" />
    </div>
    <div class="vip-card__text"><span>充值优惠：</span>充 {{ cardInfo.cardType.topUpTarget }} 送 {{ cardInfo.cardType.topUpDiscount }}</div>
    <div class="vip-card__text" v-if="sell"><span>办理价格：</span>{{ cardInfo.cardType.price }} 元</div>
    <div class="vip-card__text" v-else><span>账户余额：</span>{{ cardInfo.balance.toFixed(2) }} 元</div>
    <div class="vip-card__stripe" :style="cardStripe"></div>
    <div class="vip-card__no">No. {{ cardInfo.id }}</div>
  </div>
</template>

<script>
export default {
  props: {
    cardInfo: Object,
    sell: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    color() {
      // TODO 用描述字段存储卡颜色
      // return this.cardInfo.cardType.description
      return '#409EFF'
    },
    cardBackground() {
      return {
        'background-color': this.color
      }
    },
    cardStripe() {
      return {
        'background-color': this.color
      }
    }
  }
}
</script>

<style lang="scss">
.vip-card {
  position: relative;
  display: flex;
  flex-direction: column;
  
  $w: 400px;
  width: $w;
  height: $w * 0.6;

  &__background {
    position: absolute;

    width: 100%;
    height: 100%;
    opacity: 0.75;
    border-radius: 8px;
    z-index: 1;
  }

  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;

    z-index: 2;

    margin-top: 20px;
    margin-bottom: 12px;
    padding-left: 18px;
    padding-right: 16px;

    >div {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #FFF;
    }

    >img {
      margin-left: auto;
      $size: 32px;
      width: $size;
      height: $size;
    }
  }

  &__text {
    z-index: 2;
    color: #FFF;

    padding-left: 18px;
    margin-bottom: 6px;
  }

  &__stripe {
    width: 100%;
    height: 40px;

    margin-top: auto;
  }

  &__no {
    z-index: 2;
    color: #FFF;
    
    text-align: end;
    padding-right: 12px;

    $h: 32px;
    height: $h;
    line-height: $h;
    font-size: 14px;
  }

}
</style>