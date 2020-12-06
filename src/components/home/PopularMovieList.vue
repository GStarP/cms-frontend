<template>
  <div class="popular-movie-list">
    <div class="section-title">
      正在热映
    </div>
    <div class="popular-movie-grid">
      <div v-for="movie in popularMovieList" :key="movie.movieId">
        <movie-poster
          v-bind:id="movie.movieId"
          v-bind:name="movie.name"
          v-bind:img="movie.posterUrl"
          v-bind:like="movie.likeCount"
          v-bind:action="action"
        >
        </movie-poster>
      </div>
      <div class="popular-movie-empty" v-if="popularMovieList.length === 0">
        <span>抱歉，当前暂无正在热映中的影片... -_-|||</span>
      </div>
    </div>
  </div>
</template>

<script>
import MoviePoster from "@/components/MoviePoster";
import { getPopularMovieList } from "@/api/movie";

export default {
  name: "PopularMovieList",
  data() {
    return {
      popularMovieList: [],
      action: "购票"
    };
  },
  components: {
    MoviePoster
  },
  mounted() {
    const loading = this.$loading.service();
    getPopularMovieList()
      .then(res => res.content)
      .then(res => {
        this.popularMovieList = res;
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
.popular-movie-list {
  .section-title {
    $h: 18px;
    height: $h;
    line-height: $h;
    font-size: 18px;
  }
}

.popular-movie-title {
  font-size: 26px;
  //margin: 30px 30px 0;
  color: $primary;
}

.popular-movie-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.popular-movie-empty {
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
