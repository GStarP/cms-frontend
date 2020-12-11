<template>
  <div class="vip-card">
    <div class="vip-card__background" :style="cardBackground"></div>
    <!-- 无会员卡时显示的遮罩层 -->
    <div class="vip-card__shade" v-if="!hasCard">
      <div>您还不是会员<br />赶快点击下方“办卡”加入我们吧</div>
    </div>
    <!-- 会员卡信息 -->
    <div class="vip-card__title">
      <div>{{ hasCard ? cardInfo.cardType.name : "XXXXXX" }}</div>
      <img src="@/assets/img/vip.png" />
    </div>
    <div class="vip-card__text" v-if="hasCard">
      <span>充值优惠：</span>充 {{ cardInfo.cardType.topUpTarget }} 送
      {{ cardInfo.cardType.topUpDiscount }}
    </div>
    <template v-if="hasCard">
      <div class="vip-card__text" v-if="forSell">
        <span>办理价格：</span><strong>{{ cardInfo.cardType.price }}</strong> 元
      </div>
      <div class="vip-card__text" v-else>
        <span>账户余额：</span><strong>{{ cardInfo.balance.toFixed(2) }}</strong> 元
      </div>
    </template>
    <div class="vip-card__stripe" :style="cardStripe"></div>
    <div class="vip-card__no">
      No. {{ !hasCard || forSell ? "xxxxxx" : cardInfo.id }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardInfo: Object,
    forSell: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasCard() {
      return this.cardInfo !== null && this.cardInfo.cardType !== null;
    },
    color() {
      // 用描述字段存储卡颜色
      if (this.cardInfo && this.cardInfo.cardType) {
        return this.cardInfo.cardType.description;
      } else {
        return "#409EFF";
      }
    },
    cardBackground() {
      return {
        "background-color": this.color
      };
    },
    cardStripe() {
      return {
        "background-color": this.color
      };
    }
  }
};
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
    z-index: 1;
    position: absolute;

    width: 100%;
    height: 100%;
    opacity: 0.75;
    border-radius: 8px;
  }

  &__shade {
    z-index: 3;
    position: absolute;

    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-color: #000;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      opacity: 1;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 24px;

      margin-top: -16px;
    }
  }

  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;

    z-index: 2;

    margin-top: 20px;
    margin-bottom: 16px;
    padding-left: 18px;
    padding-right: 16px;

    > div {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #fff;
    }

    > img {
      margin-left: auto;
      $size: 32px;
      width: $size;
      height: $size;
    }
  }

  &__text {
    z-index: 2;
    color: #fff;

    padding-left: 18px;
    margin-bottom: 8px;

    strong {
      font-size: 20px;
    }
  }

  &__stripe {
    width: 100%;
    height: 40px;

    margin-top: auto;
  }

  &__no {
    z-index: 2;
    color: #fff;

    text-align: end;
    padding-right: 12px;

    $h: 32px;
    height: $h;
    line-height: $h;
    font-size: 14px;
  }
}
</style>
