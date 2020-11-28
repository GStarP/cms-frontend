<template>
  <div class="movie-poster">
    <div class="movie-poster-content" @click="open">
      <img class="movie-img" :alt="name" :src="img" />
      <div class="movie-poster-summary">
        <div class="movie-name">{{ name }}</div>
        <div class="movie-like-count">{{ like || 0 }}人想看</div>
      </div>
    </div>
    <el-dialog :title="name" :visible.sync="movieDetailVisible">
      <div>{{ movieDetail }}</div>
    </el-dialog>
    <div class="movie-sales">{{ action }}</div>
  </div>
</template>

<script>
import { getMovieDetail } from "@/api/movie";

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
    open() {
      const loading = this.$loading.service();
      getMovieDetail(this.$props.id)
        .then(res => res.content)
        .then(res => {
          this.movieDetail = res;
          loading.close();
          this.movieDetailVisible = true;
        })
        .catch(e => {
          console.log(e);
          loading.close();
          this.$message.error("加载电影详情失败！");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.movie-poster {
  margin: 20px 30px 20px 0;
  border: 1px solid #88888820;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 6px #888888;
    border: 1px solid #88888880;
    transition: all 0.3s ease-in-out;
  }
}

.movie-poster-content {
  position: relative;
  height: 250px;
}

.movie-sales {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary;

  padding: 10px;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    color: white;
    background: $primary;
    transition: all 0.3s ease-in-out;
  }
}

.movie-img {
  width: 180px;
  height: 250px;
}

.movie-poster-summary {
  display: flex;

  flex-direction: row;
  justify-content: space-between;

  color: white;
  font-size: 16px;
  margin-top: -75px;
  margin-bottom: 0;
  position: absolute;
  padding: 40px 0 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));

  &:hover {
    margin-top: -95px;
    padding: 60px 0 0;
    transition: all 0.3s ease-in-out;
  }
}

.movie-name {
  /*防止文本过长将父容器撑开*/
  width: 80px;
  padding-left: 10px;
  padding-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-like-count {
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
