<template>
  <div class="membership__wrapper">
    <div class="membership">
      <div class="section-title">会员卡</div>
      <div class="member-info">
          <vip-card :cardInfo="vipCard" :sell="false"></vip-card>
          <el-divider/>
          <div class="member-yes" v-if="vipCard.id > 0">
            <!-- <div>会员卡余额：<span>{{ vipCard.balance.toFixed(2) }}</span> 元</div> -->
            <el-button type="primary">充值</el-button>
            <el-badge value="更多优惠" class="hot">
              <el-button type="success">换卡</el-button>
            </el-badge>
          </div>
          <div class="member-no" v-else></div>
      </div>
    </div>
    <!-- 充值弹窗 -->
    <el-dialog title="充值" :visible.sync="chargeDialog.visible">
      <el-input
        type="number"
        min="0"
        oninput="validity.valid||(value='');"
        v-model="chargeDialog.amount"
        placeholder="请输入充值金额"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chargeDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="chargeVIPCard()">充 值</el-button>
      </div>
    </el-dialog>
    <!-- 办理/更换会员卡弹窗 -->
    <el-dialog
      title="选择您的会员权益"
      :visible.sync="cardChosenDialog.visible"
    >
      <div class="card-type-wrapper">
        <div v-if="isVIP" class="member-change-warining">
          <span>切换会员权益后余额将按8折重新计入</span>
        </div>
        <div class="card-type-list">
          <el-row>
            <el-col
              :span="6"
              v-for="(item, index) of cardTypePage"
              :key="item.id"
              :offset="index > 0 ? 2 : 0"
              @click.native="chooseCardType(item.id)"
            >
              <el-card
                class="card-type-item-card"
                :class="{
                  'active-card':
                    cardChosenDialog.cardTypeChosenId === item.id
                }"
              >
                <div class="card-type-name">{{ item.name }}</div>
                <div class="card-type-prive">¥ {{ item.price }}</div>
                <div class="card-type-description">
                  充{{ item.topUpTarget }}送{{ item.topUpDiscount }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-pagination
          small
          hide-on-single-page
          layout="prev, pager, next"
          :current-page.sync="cardChosenDialog.currentPage"
          :page-size="cardChosenDialog.pageSize"
          :total="cardChosenDialog.cardTypes.length"
        >
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cardChosenDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="confirmMembership()">确 认</el-button>
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

export default {
  components: {
    'vip-card': VIPCard
  },
  data() {
    return {
      vipCard: {
        userId: 1,
        id: -1,
        balance: 0.0,
        joinDate: "2020-01-01 00:00:00.000",
        cardTypeId: 1,
        cardType: {
          id: 1,
          name: "暂无权益",
          description: "",
          price: 1.0,
          topUpTarget: 1.0,
          topUpDiscount: 1.0,
          ticketTarget: 1.0,
          ticketDiscount: 1.0
        }
      },
      chargeDialog: {
        visible: false,
        amount: null
      },
      cardChosenDialog: {
        visible: false,
        cardTypeChosenId: 0,
        currentPage: 1,
        pageSize: 3,
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
    chargeVIPCard() {
      if (this.chargeDialog.amount <= 0) {
        this.$message.warning("充值金额必须为正数");
        return;
      }
      const loading = this.$loading.service();
      chargeVIPCard(this.vipCard.id, this.chargeDialog.amount)
        .then(res => {
          this.$message.success("充值成功", { duration: 500 });
          this.chargeDialog.visible = false;
          this.updateVIPCard();
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    chooseCardType(cardTypeId) {
      this.cardChosenDialog.cardTypeChosenId = cardTypeId;
    },
    confirmMembership() {
      // 购买会员卡
      if (this.vipCard.id === -1) {
        const loading = this.$loading.service();
        buyVIPCard(
          this.$store.state.userInfo.id,
          this.cardChosenDialog.cardTypeChosenId
        )
          .then(res => {
            this.$message.success("恭喜您成为会员大家庭的一员啦！", {
              duration: 500
            });
            this.cardChosenDialog.visible = false;
            this.updateVIPCard();
            loading.close();
          })
          .catch(e => {
            console.log(e);
            loading.close();
          });
        // 切换会员卡
      } else {
        const loading = this.$loading.service();
        changeVIPCard(this.vipCard.id, this.cardChosenDialog.cardTypeChosenId)
          .then(res => {
            this.$message.success("成功切换了您的会员权益", { duration: 500 });
            this.cardChosenDialog.visible = false;
            this.updateVIPCard();
            loading.close();
          })
          .catch(e => {
            console.log(e);
            loading.close();
          });
      }
    }
  },
  computed: {
    isVIP() {
      return this.vipCard.id !== -1;
    },
    cardTypePage() {
      const start_idx =
        (this.cardChosenDialog.currentPage - 1) *
        this.cardChosenDialog.pageSize;
      const end_idx = start_idx + this.cardChosenDialog.pageSize;
      return this.cardChosenDialog.cardTypes.slice(start_idx, end_idx);
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.member-change-warining {
  text-align: center;
  font-size: 15px;
  color: #f52e2e;
  margin-bottom: 20px;
}

.card-type-list {
  margin-left: 56px;
  margin-bottom: 20px;
}

.el-dialog__title {
  font-weight: bold;
  color: $primary;
}

.el-pagination {
  text-align: center;
}

.active-card {
  border: 2px solid $primary;
  border-radius: 4px;
}

.card-type-name {
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.card-type-prive {
  margin-top: 8px;
  font-weight: bold;
  font-size: 24px;
  color: $primary;
  text-align: center;
}

.card-type-description {
  font-size: 14px;
  color: #6d757a;
  letter-spacing: 0;
  text-align: center;
}
</style>
