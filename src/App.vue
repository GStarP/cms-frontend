<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  min-height: 100vh;
}

#app {
  font-family: "Microsoft YaHei";
  min-height: 100vh;
  background-color: rgb(246, 248, 250);
}
</style>
