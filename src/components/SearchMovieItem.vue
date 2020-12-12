<template>
  <div class="search-movie-item">
    <img class="search-movie-item-poster" :src="movie.posterUrl" />
    <span>{{ movie.name }}</span>
  </div>
</template>

<script>
export default {
  props: ["movie"],
  name: "SearchMovieItem",
};
</script>

<style scoped lang="scss">
.search-movie-item {
  margin: 20px;
  width: 200px;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  span {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 16px;
    color: #333;
    margin-top: 10px;
  }
}
.search-movie-item-poster {
  width: 100%;
}
</style>
