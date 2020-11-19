<template>
  <div class="error">
    <div class="error-code">404</div>
    <div class="not-found">NOT FOUND</div>
    <el-button plain @click="$router.push({ path: '/' })">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: "error"
};
</script>

<style lang="scss">
.error {
  height: 100vh;
  background-color: $primary;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    margin-top: 3rem;

    outline: 1.5px solid #fff;
    background: transparent;
    border: none;
    border-radius: 0;
    color: #fff;

    font-weight: bold;
    letter-spacing: 1px;

    &:hover {
      color: $primary;
    }
  }
}

.error-code {
  $size: 12rem;
  font-size: $size;
  line-height: $size;
  font-family: "consolas";
  color: #fff;

  margin-top: -8vh;
}
.not-found {
  $size: 3rem;
  font-size: $size;
  line-height: $size;
  color: #fff;
}
</style>
