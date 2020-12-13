<template>
  <div class="movie-poster" @click="toMovieDetail">
    <div class="movie-poster-content">
      <img class="movie-img" :alt="name" :src="img" />
      <div class="movie-poster-summary">
        <div class="movie-name">{{ name }}</div>
        <div class="movie-like-count">❤ {{ like || 0 }}</div>
      </div>
    </div>
    <el-dialog :title="name" :visible.sync="movieDetailVisible">
      <div>{{ movieDetail }}</div>
    </el-dialog>
    <div class="movie-sales">{{ action }}</div>
  </div>
</template>

<script>
export default {
  props: ["img", "id", "name", "like", "action"],
  name: "MoviePoster",
  data() {
    return {
      movieDetail: {},
      movieDetailVisible: false
    };
  },
  methods: {
    toMovieDetail() {
      this.$router.push({
        path: `/movie-detail/${this.id}`
      });
    }
  }
};
</script>

<style scoped lang="scss">
.movie-poster {
  margin: 12px 24px 24px 0;
  border: 1px solid #e5e5e5;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 13px rgba(0, 0, 0, 0.2);

    .movie-sales {
      color: white;
      background: $primary;
    }
  }
}

.movie-poster-content {
  position: relative;
  height: 220px;
}

.movie-sales {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary;

  letter-spacing: 2px;
  padding: 10px;
  padding-right: 8px;
  font-size: 14px;
}

.movie-img {
  width: 160px;
  height: 220px;
}

.movie-poster-summary {
  display: flex;

  flex-direction: row;
  justify-content: space-between;

  color: white;
  font-size: 14px;
  margin-top: -70px;
  margin-bottom: 0;
  position: absolute;
  padding: 40px 0 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}

.movie-name {
  /*防止文本过长将父容器撑开*/
  width: 96px;
  padding-left: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-like-count {
  padding-right: 8px;
  padding-bottom: 8px;
}
</style>
