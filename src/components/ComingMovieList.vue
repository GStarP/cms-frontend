<template>
  <div class="coming-movie-list">
    <div class="coming-movie-title">
      即将上映
    </div>
    <div class="coming-movie-grid">
      <div v-for="movie in comingMovieList" :key="movie.movieId">
        <movie-poster
          v-bind:id="movie.movieId"
          v-bind:name="movie.name"
          v-bind:img="movie.posterUrl"
          v-bind:like="movie.likeCount"
          v-bind:action="action"
        >
        </movie-poster>
      </div>
      <div class="coming-movie-empty" v-if="comingMovieList.length === 0">
        <span>抱歉，当前暂无即将上映的影片... -_-|||</span>
      </div>
    </div>
  </div>
</template>

<script>
import MoviePoster from "@/components/MoviePoster";
import { getComingMovieList } from "@/api/movie";
export default {
  name: "ComingMovieList",
  components: {
    MoviePoster
  },
  data() {
    return {
      comingMovieList: [],
      action: "详情"
    };
  },
  mounted() {
    const loading = this.$loading.service();
    getComingMovieList()
      .then(res => res.content)
      .then(res => {
        this.comingMovieList = res;
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
.coming-movie-list {
}

.coming-movie-title {
  font-size: 26px;
  margin: 30px 0 0;
  color: $primary;
}

.coming-movie-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.coming-movie-empty {
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
