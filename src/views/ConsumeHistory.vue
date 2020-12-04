<template>
  <el-table
    :data="consumeList"
    style="width: 100%"
    @expand-change="showConsumeDetail">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="日期">
            <span>{{ props.row.time }}</span>
          </el-form-item>
          <el-form-item label="消费金额" v-if="props.row.isShow!=3">
            <span>{{ props.row.money }}</span>
          </el-form-item>
          <el-form-item label="优惠金额" v-if="props.row.isShow!=3">
            <span>{{ props.row.discount }}</span>
          </el-form-item>
          <el-form-item label="实付金额"  v-if="props.row.isShow==3">
            <span>{{ props.row.money }}</span>
          </el-form-item>
          <el-form-item label="赠送金额"  v-if="props.row.isShow==3">
            <span>{{ props.row.discount }}</span>
          </el-form-item>
          <el-form-item label="消费类型">
            <span>{{ props.row.type }}</span>
          </el-form-item>
          <el-form-item label="消费方式">
            <span>{{ props.row.consumeType }}</span>
          </el-form-item>
          <el-form-item label="电影名称"  v-if="props.row.isShow==1">
            <span>{{ props.row.movieName }}</span>
          </el-form-item>
          <el-form-item label="影厅"  v-if="props.row.isShow==1">
            <span>{{ props.row.hallName }}</span>
          </el-form-item>
          <el-form-item label="座位号"  v-if="props.row.isShow==1">
            <span>{{ props.row.seat }}</span>
          </el-form-item>
          <el-form-item label="放映时间"  v-if="props.row.isShow==1">
            <span>{{ props.row.startTime }}</span>
          </el-form-item>
          <el-form-item label="会员卡类型"  v-if="props.row.isShow==2">
            <span>{{ props.row.cardType }}</span>
          </el-form-item>
          <el-form-item label="会员卡余额"  v-if="props.row.isShow==3">
            <span>{{ props.row.balance }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="time"
      label="日期"
      width="280">
    </el-table-column>
    <el-table-column
      prop="money"
      label="消费金额"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="消费类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="consumeType"
      label="消费方式"
      width="180">
    </el-table-column>
  </el-table>
</template>

<style lang="scss">
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import { getConsumeHistory, getConsumeDetail, getTopupHistory } from "@/api/consume";
import { formatTimeStamp } from "@/utils/time";
export default {
  data() {
    return {
      consumeList: []
    };
  },
  methods: {
    getConsumeList(){
      const loading = this.$loading.service();
      const consumeList = [];
      getConsumeHistory(this.$store.state.userInfo.id)
        .then(res => {
          for (let s of res.content) {
            s.time = formatTimeStamp(s.time);
            s.isShow = 0;
            consumeList.push(s);
          }
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
      getTopupHistory(this.$store.state.userInfo.id)
        .then(res => {
          for (let s of res.content) {
            s.time = formatTimeStamp(s.time);
            s.type="充值会员卡";
            s.consumeType="银行卡";
            s.isShow = 0;
            consumeList.push(s);
          }
          consumeList.sort(function(a,b){return b.time>a.time?1:-1});
          this.consumeList = consumeList;
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    showConsumeDetail(row, column, event){
      if(row.isShow>0){      // 检查是否进行过加载
        return;
      }
      if(row.type=="充值会员卡"){
        row.isShow=3;
      }else{
        getConsumeDetail(row.id)
          .then(res => {
            res=res.content;
            if(res.type=="购买电影票"){
              row.isShow=1;
              row.discount=res.discount;
              row.movieName=res.movieName;
              row.hallName=res.hallName;
              row.seat=res.rowIndex+"排"+res.columnIndex+"座";
              row.startTime=formatTimeStamp(res.startTime);
            }else if(res.type=="购买会员卡"){
              row.isShow=2;
              row.discount=res.discount;
              row.cardType=res.cardType;
            }
          })
          .catch(e => {
            console.log(e);
          });
      } 
    }
  },
  mounted() {
    this.getConsumeList();
  }
};
</script>