<template>
  <el-steps :active="progress" finish-status="success" align-center>
    <el-step title="选座购票"></el-step>
    <el-step title="完成支付"></el-step>
    <el-step title="出票观影"></el-step>
  </el-steps>
</template>

<script>
export default {
  props: ["progress"]
};
</script>
