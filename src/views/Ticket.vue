<template>
  <div class="ticket-history">
    <div class="ticket-history__wrapper">
      <div class="section-title">购票记录</div>
      <el-table
        :height="tableHeight"
        :data="ticketList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        >>
        <el-table-column prop="movieName" label="电影名称" width="240">
        </el-table-column>
        <el-table-column prop="hallName" label="影厅名" width="80">
        </el-table-column>
        <el-table-column prop="seat" label="座位" width="80"> </el-table-column>
        <el-table-column prop="startTime" label="放映时间" width="200">
        </el-table-column>
        <el-table-column prop="time" label="购票时间" width="200">
        </el-table-column>
        <el-table-column
          prop="stateText"
          label="状态"
          width="90"
          :filters="[
            { text: '未完成', value: '未完成' },
            { text: '已支付', value: '已支付' },
            { text: '已失效', value: '已失效' },
            { text: '已出票', value: '已出票' },
            { text: '已退票', value: '已退票' }
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <div class="ticket-state">
              <div class="circle" :style="stateColor(scope.row.state)"/>
              <div>{{ scope.row.stateText }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="issueMyTicket(scope.row)"
              v-if="scope.row.state == 1"
              plain
              >出票</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="refundMyTicket(scope.row)"
              v-if="scope.row.state == 1"
              plain
              >退票</el-button>
            <!-- <el-button
              plain
              size="mini"
              type="danger"
              @click="deleteMyTicket(scope.row)"
              v-if="scope.row.state > 1"
              >删除记录</el-button> -->
            <el-button
              size="mini"
              type="primary"
              @click="$router.push({ path: `/movie-ticket-pay/${scope.row.scheduleId}` })"
              v-if="scope.row.state == 0"
              plain
              >支付</el-button>
            <el-button
              plain
              size="mini"
              type="danger"
              @click="cancelMyTicket(scope.row)"
              v-if="scope.row.state == 0"
              >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getAllTicket,
  issueTicket,
  deleteTicket,
  cancelTicket,
  getTicketRefund
} from "@/api/ticket";
import { formatTimeStamp } from "@/utils/time";
export default {
  data() {
    return {
      ticketList: []
    };
  },
  methods: {
    getTicketList() {
      const loading = this.$loading.service();
      const ticketList = [];
      getAllTicket(this.$store.state.userInfo.id)
        .then(res => {
          for (let s of res.content) {
            s.time = formatTimeStamp(s.time);
            s.startTime = formatTimeStamp(s.startTime);
            s.endTime = formatTimeStamp(s.endTime);
            s.seat = s.rowIndex + 1 + "排" + (s.columnIndex + 1) + "座";
            var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
            if (time > s.startTime) {
              s.state = 2;
            }
            if (s.state == 0) {
              s.stateText = "未完成";
            } else if (s.state == 1) {
              s.stateText = "已支付";
            } else if (s.state == 2) {
              s.stateText = "已失效";
            } else if (s.state == 3) {
              s.stateText = "已出票";
            } else if (s.state == 4) {
              s.stateText = "已退票";
            }
            ticketList.push(s);
          }
          this.ticketList = ticketList;
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    issueMyTicket(row) {
      issueTicket(row.id)
        .then(res => {
          this.$message({
            showClose: true,
            message: "恭喜您！出票成功",
            type: "success"
          });
          this.getTicketList();
        })
        .catch(e => {
          this.$message({
            showClose: true,
            message: "出票失败，请重试",
            type: "error"
          });
          console.log(e);
        });
    },
    deleteMyTicket(row) {
      this.$confirm("是否确认删除失效电影票记录？", "提示", {
        type: "warning"
      })
        .then(() => {
          deleteTicket(row.id)
            .then(res => {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              this.getTicketList();
            })
            .catch(e => {
              this.$message({
                showClose: true,
                message: "删除失败",
                type: "error"
              });
              console.log(e);
            });
        })
        .catch(e => {});
    },
    refundMyTicket(row) {
      getTicketRefund(row.id)
        .then(res => {
          var refundText = "";
          var discount = parseInt(res.content);
          if (discount == 100) {
            refundText = "现在退票将全款返还支付金额，请确认是否退票。";
          } else if (discount == 0) {
            refundText = "现在退票不返还支付金额，请确认是否退票。";
          } else {
            refundText =
              "现在退款将返还支付金额的" + discount + "%，请确认是否退票。";
          }
          this.$confirm(refundText, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deleteTicket(row.id)
                .then(res => {
                  this.$message({
                    showClose: true,
                    message: "退票成功",
                    type: "success"
                  });
                  this.getTicketList();
                })
                .catch(e => {
                  this.$message({
                    showClose: true,
                    message: "退票失败",
                    type: "error"
                  });
                  console.log(e);
                });
            })
            .catch(() => {});
        })
        .catch(e => {
          this.$message({
            showClose: true,
            message: "退票失败，请重试",
            type: "error"
          });
          console.log(e);
        });
    },
    cancelMyTicket(row) {
      this.$confirm("是否确认取消此座位的锁定？", "提示", {
        type: "warning"
      })
        .then(() => {
          deleteTicket(row.id)
            .then(res => {
              this.$message({
                showClose: true,
                message: "取消成功",
                type: "success"
              });
              this.getTicketList();
            })
            .catch(e => {
              this.$message({
                showClose: true,
                message: "取消失败",
                type: "error"
              });
              console.log(e);
            });
        })
        .catch(e => {});
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.stateText == value;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state == 1) {
        return "";
      } else if (row.state == 0) {
        return "danger-row";
      } else if (row.state == 4) {
        return "info-row";
      } else if (row.state == 3) {
        return "success-row";
      }
      return "";
    },
    stateColor(state) {
      let style = 'background-color: '
      if (state === 0) {
        style += '#E6A23C'
      } else if (state === 1) {
        style += '#409EFF'
      } else if (state === 2) {
        style += '#F56C6C'
      } else if (state === 3) {
        style += '#67C23A'
      } else {
        style += '#909399'
      }
      return style
    }
  },
  computed: {
    tableHeight() {
      return document.documentElement.clientHeight - 170 + "px";
    }
  },
  mounted() {
    this.getTicketList();
  }
};
// 此段引用自 折戟沉沙_wx 的CSDN博客 https://blog.csdn.net/Vasilis_1/article/details/73649961
Date.prototype.Format = function(fmt) {
  // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
</script>

<style lang="scss">
.ticket-history {
  display: flex;
  justify-content: center;

  &__wrapper {
    margin-top: 16px;
  }

  .el-table {
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;

    .el-table__header {
      border-top: 1px solid #dcdfe6;
    }
  }

  tr >th:first-child, td:first-child {
    padding-left: 8px;
  }
}
.ticket-state {
  display: flex;
  flex-direction: row;
  align-items: center;

  .circle {
    $size: 8px;
    height: $size;
    width: $size;
    border-radius: 50%;
    margin-right: 6px;
  }
}
.el-table .warning-row {
  background: #e6a23c15;
}
.el-table .success-row {
  background: #67c23a15;
}
.el-table .info-row {
  background: #90939915;
}
.el-table .danger-row {
  background: #f56c6c15;
}
</style>
