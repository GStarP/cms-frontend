<template>
  <div class="home">
    <banner class="home-banner"/>
    <div class="home-movie-list">
      <div class="home-movie-list-main">
        <popular-movie-list class="home-movie-popular-list"/>
        <coming-movie-list class="home-movie-coming-list"/>
      </div>
      <ranking-movie-list class="home-movie-list-side"/>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import ComingMovieList from "@/components/ComingMovieList";
import PopularMovieList from "@/components/PopularMovieList";
import RankingMovieList from "@/components/RankingMovieList";

export default {
  components: {
    Banner,
    ComingMovieList,
    PopularMovieList,
    RankingMovieList
  }
};
</script>

<style lang="scss">
.home-movie-list {
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;

  align-items: flex-start;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}

.home-movie-list-main {
  flex: 4;
  //margin-left: 20px;
  //margin-right: 20px;
}

.home-movie-list-side {
  flex: 1;
  //margin-left: 20px;
  //margin-right: 20px;
}
</style>
