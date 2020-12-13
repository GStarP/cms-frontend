<template>
  <div class="search-movie-list">
    <div class="search-movie-list-result">
      <search-movie-item
        v-for="movie in paginatedMovieList"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div class="search-movie-list-empty" v-if="paginatedMovieList.length === 0">
      <span>抱歉，没有符合条件的影片... -_-|||</span>
    </div>
    <el-pagination
      v-if="movieList.length !== 0"
      background
      layout="prev, pager, next"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="filteredMovieList.length"
    ></el-pagination>
  </div>
</template>

<script>
import SearchMovieItem from "./SearchMovieItem.vue";
export default {
  components: { SearchMovieItem },
  name: "SearchMovieList",
  props: ["movieList", "selectedCountries", "selectedCategories"],
  data() {
    return {
      currentPage: 1,
      pageSize: 20
    };
  },
  methods: {
    handleCurrentChange: function(newPage) {
      this.currentPage = newPage;
    }
  },
  computed: {
    paginatedMovieList() {
      const start = this.pageSize * (this.currentPage - 1);
      const end = this.pageSize * this.currentPage;
      return this.filteredMovieList.slice(start, end);
    },
    filteredMovieList() {
      return this.movieList.filter(m => {
        const countries = m.country.split("/");
        const categories = m.type.split("/");
        const contains = (l1, l2) => {
          for (let i1 in l1) {
            for (let i2 in l2) {
              if (l1[i1] === l2[i2]) return true;
            }
          }
          return false;
        };
        return (
          (this.selectedCountries.length === 0 ||
            contains(this.selectedCountries, countries)) &&
          (this.selectedCategories.length === 0 ||
            contains(this.selectedCategories, categories))
        );
      });
    }
  }
};
</script>

<style scoped lang="scss">
.search-movie-list {
  margin-left: -20px;
  margin-right: -20px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-movie-list-result {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.search-movie-list-empty {
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 24px;
    color: #99a9bf;
  }
}
</style>
