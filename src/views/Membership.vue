<template>
  <div class="membership__wrapper">
    <div class="membership">
      <div class="section-title">会员卡</div>
      <div class="member-info">
          <vip-card :cardInfo="vipCard" :forSell="false"></vip-card>
          <el-divider/>
          <div class="member-yes" v-if="isVIP">
            <el-button type="primary" @click="charge">充值</el-button>
            <el-badge value="更多优惠" class="hot">
              <el-button type="success" @click="cardChosenDialog.visible = true">换卡</el-button>
            </el-badge>
          </div>
          <div class="member-no" v-else>
            <el-button type="primary" @click="cardChosenDialog.visible = true">办卡</el-button>
          </div>
      </div>
    </div>
    <!-- 银行卡支付弹窗 -->
    <bank-card-pay :show.sync="bankCardPayShow" @finish="onBankCardPayFinish"/>
    <!-- 办理/更换会员卡弹窗 -->
    <el-dialog
      title="办理/更换会员卡"
      :visible.sync="cardChosenDialog.visible"
    >
      <div class="card-type-wrapper">
        <!-- <div v-if="isVIP" class="member-change-warining">
          <span>切换会员权益后余额将按8折重新计入</span>
        </div> -->
        <div class="card-type-list">
          <div
            v-for="ct of cardTypePage"
            :key="'card-type-' + ct.id"
            class="vip-card-container"         
          >
            <vip-card :cardInfo="{ id: 0, balance: 0, cardType: ct}"></vip-card>
            <el-button plain type="primary" @click="confirmBuyCard(ct.id)">{{ isVIP ? '更换' : '办理'}}</el-button>
          </div>
          
        </div>
        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          :current-page.sync="cardChosenDialog.currentPage"
          :page-size="cardChosenDialog.pageSize"
          :total="isVIP ? cardChosenDialog.cardTypes.length - 1 : cardChosenDialog.cardTypes.length"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCardTypes,
  getVIPCard,
  buyVIPCard,
  chargeVIPCard,
  changeVIPCard
} from "@/api/membership";
import { formatDate } from "@/utils/time";
import VIPCard from '@/components/membership/VIPCard.vue'
import BankCardPay from '@/components/movie-ticket/BankCardPay.vue'

export default {
  components: {
    'vip-card': VIPCard,
    BankCardPay
  },
  data() {
    return {
      vipCard: null,
      bankCardPayShow: false,
      bankCardPayType: 0,
      topUpAmount: 0,
      cardChosenDialog: {
        visible: false,
        chosenCardTypeId: 0,
        currentPage: 1,
        pageSize: 2,
        cardTypes: [
          {
            id: 1, // 会员卡类型id
            name: "", // 会员卡类型名称
            description: "", // 会员卡类型描述
            price: 1.0, // 会员卡购买价格
            topUpTarget: 1.0, // 充值会员卡获得优惠的需满金额
            topUpDiscount: 1.0, // 充值会员卡时的优惠金额
            ticketTarget: 1.0, // 购票获得优惠的需满金额
            ticketDiscount: 1.0 // 购票时的优惠金额
          }
        ]
      }
    };
  },
  methods: {
    updateVIPCard() {
      const loading = this.$loading.service();
      getVIPCard(this.$store.state.userInfo.id)
        .then(res => {
          if (res.content) {
            const vipCard = res.content;
            vipCard.joinDate = formatDate(vipCard.joinDate);
            this.vipCard = res.content;
          }
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    getCardTypes() {
      const loading = this.$loading.service();
      getCardTypes()
        .then(res => {
          if (res.content) {
            this.cardChosenDialog.cardTypes = res.content;
          }
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    charge() {
      this.$prompt('请输入充值金额', '会员卡充值', {
        confirmButtonText: '银行卡支付',
        inputPattern: /\d+/,
        inputErrorMessage: '请输入数字，最多两位小数'
      }).then(({ value }) => {
        this.topUpAmount = value
        this.bankCardPayType = 0
        this.bankCardPayShow = true
      }).catch(() => {})
    },
    onBankCardPayFinish() {
      // 会员卡充值
      if (this.bankCardPayType === 0) {
        const loading = this.$loading.service();
        chargeVIPCard(this.vipCard.id, this.topUpAmount)
          .then(res => {
            this.$message.success("充值成功");
            this.updateVIPCard();
            loading.close();
          })
          .catch(e => {
            console.log(e);
            loading.close();
          });
      // 更换会员卡
      } else if (this.bankCardPayType === 1) {
        this.changeCard(this.cardChosenDialog.chosenCardTypeId)
      // 办理会员卡
      } else if (this.bankCardPayType === 2) {
        this.buyCard(this.cardChosenDialog.chosenCardTypeId)
      }
      this.bankCardPayShow = false
    },
    buyCard(cardTypeId) {
      const loading = this.$loading.service();
        buyVIPCard(
          this.$store.state.userInfo.id,
          cardTypeId
        )
          .then(res => {
            this.$message.success("会员卡购买成功，赶快充值使用吧");
            this.cardChosenDialog.visible = false;
            this.updateVIPCard();
            loading.close();
          })
          .catch(e => {
            console.log(e);
            loading.close();
          });
    },
    changeCard(cardTypeId) {
      const loading = this.$loading.service();
        changeVIPCard(this.vipCard.id, cardTypeId)
          .then(res => {
            this.$message.success("会员卡更换成功");
            this.cardChosenDialog.visible = false;
            this.updateVIPCard();
            loading.close();
          })
          .catch(e => {
            console.log(e);
            loading.close();
          });
    },
    confirmBuyCard(cardTypeId) {
      this.cardChosenDialog.chosenCardTypeId = cardTypeId
      // 购买会员卡
      if (!this.isVIP) {
        this.bankCardPayType = 2
        this.bankCardPayShow =  true
        this.cardChosenDialog.visible = false
      // 切换会员卡
      } else {
        this.bankCardPayType = 1
        this.$confirm('是否确认更换会员卡？余额将按 8 折计入新会员卡！', '提示', {
          type: 'warning'
        }).then(() => {
          this.bankCardPayShow =  true
          this.cardChosenDialog.visible = false
        }).catch(e => {})
      }
    }
  },
  computed: {
    isVIP() {
      return this.vipCard !== null && this.vipCard.cardType !== null
    },
    cardTypePage() {
      const arr = []
      for (const ct of this.cardChosenDialog.cardTypes) {
        if (this.isVIP && ct.id === this.vipCard.cardType.id) {
          continue
        }
        arr.push(ct)
      }
      const start_idx =
        (this.cardChosenDialog.currentPage - 1) *
        this.cardChosenDialog.pageSize;
      const end_idx = start_idx + this.cardChosenDialog.pageSize;
      return arr.slice(start_idx, end_idx);
    }
  },
  mounted() {
    this.updateVIPCard();
    this.getCardTypes();
  }
};
</script>

<style lang="scss">
.membership {
  display: flex;
  flex-direction: column;

  margin-top: 16px;

  &__wrapper {
    display: flex;
    justify-content: center;
  }

}

.member-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  .vip-card {
    margin-top: 8px;
  }

  .el-divider {
    margin: 36px 0;
  }
}

.member-yes {
  display: flex;
  flex-direction: column;
  
  width: 100%;

  >div {
    margin-bottom: 16px;
    font-size: 18px;

    >span {
      font-weight: bold;
    }
  }

  button {
    width: 100%;
    margin-bottom: 16px;
  }

  sup {
    margin-right: 40px;
    margin-top: 4px;
  }

}

.member-no {
  width: 100%;
  button {
    width: 100%;
    margin-bottom: 16px;
  }
}

.card-type-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 32px;

  .vip-card-container {
    display: flex;
    flex-direction: column;

    >button {
      margin-top: 16px;
      width: 100%;
    }
  }
}

.el-pagination {
  text-align: center;
}
</style>
