<template>
  <div class="search-bar">
    <el-input placeholder="输入电影名称进行搜索" v-model="searchInput">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <el-button slot="append" @click="searchMovies">搜索</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    searchMovies() {
      this.$router.push({
        path: "/search",
        query: {
          keyword: this.searchInput,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-input {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
