<template>
  <div class="ranking-movie-list">
    <div class="section-title">票房排行</div>
    <div
      class="ranking-movie-list-content"
      v-for="index in rankingMovieList.length"
      :key="index"
    >
      <movie-rank-item
        v-bind:id="rankingMovieList[index - 1].movieId"
        v-bind:index="index"
        v-bind:name="rankingMovieList[index - 1].name"
        v-bind:box-office="rankingMovieList[index - 1].boxOffice"
      ></movie-rank-item>
    </div>
  </div>
</template>

<script>
import MovieRankItem from "@/components/home/MovieRankItem";
import { getRankingMovieList } from "@/api/movie";
export default {
  name: "RankingMovieList",
  data() {
    return {
      rankingMovieList: []
    };
  },
  components: {
    MovieRankItem
  },
  mounted() {
    const loading = this.$loading.service();
    getRankingMovieList()
      .then(res => res.content)
      .then(res => {
        this.rankingMovieList = res;
        loading.close();
      })
      .catch(e => {
        console.log(e);
        loading.close();
      });
  }
};
</script>

<style scoped lang="scss">
.ranking-movie-list {
  .section-title {
    $h: 18px;
    height: $h;
    line-height: $h;
    font-size: 18px;
  }
}

.ranking-movie-title {
  color: $primary;
  font-size: 26px;
  margin-bottom: 10px;
}
</style>
