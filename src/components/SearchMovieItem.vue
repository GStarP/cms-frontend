<template>
  <el-popover placement="top" trigger="hover">
    <div class="search-movie-item-slot" slot @click="toMovieDetail">
      <div class="search-movie-item-slot__left">
        <img class="search-movie-item-slot__poster" :src="movie.posterUrl" />
      </div>
      <div class="search-movie-item-slot__right">
        <div class="search-movie-item-slot__name">{{ movie.name }}</div>
        <div class="search-movie-item-slot__type">
          <el-tag
            disable-transitions
            v-for="category in categories"
            :key="category"
            effect="dark"
          >
            {{ category }}
          </el-tag>
        </div>
        <div class="search-movie-item-slot__type">
          <el-tag type="warning" effect="dark" disable-transitions>
            <i class="el-icon-time" />
            {{ movie.length }}分钟
          </el-tag>
          <el-tag type="danger" effect="dark" disable-transitions>
            <i class="el-icon-star-off" />
            {{ movie.likeCount }}人想看
          </el-tag>
        </div>
        <div class="search-movie-item-slot__text">
          <span>导演：</span>{{ text(movie.director) }}
        </div>
        <div class="search-movie-item-slot__text">
          <span>主演：</span>{{ text(movie.starring) }}
        </div>
        <div class="search-movie-item-slot__text">
          <span>国家：</span>{{ text(movie.country) }}
        </div>
        <div class="search-movie-item-slot__text">
          <span>语言：</span>{{ text(movie.language) }}
        </div>
        <div class="search-movie-item-slot__text">
          <span>简介：</span>
          <div>{{ text(movie.description) }}</div>
        </div>
      </div>
    </div>
    <div class="search-movie-item" slot="reference" @click="toMovieDetail">
      <img class="search-movie-item-poster" :src="movie.posterUrl" />
      <span>{{ movie.name }}</span>
    </div>
  </el-popover>
</template>

<script>
export default {
  props: ["movie"],
  name: "SearchMovieItem",
  computed: {
    categories() {
      return this.movie.type.split("/");
    },
  },
  methods: {
    toMovieDetail() {
      this.$router.push({
        path: `/movie-detail/${this.movie.id}`,
      });
    },
    text(val) {
      if (val) {
        return val;
      } else {
        return "暂无信息";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.search-movie-item {
  margin: 20px;
  width: 200px;
  height: auto;

  border: 1px solid #fff0;

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
.search-movie-item-slot {
  padding: 10px;
  background-color: #fff;

  display: flex;
  flex-direction: row;

  &:hover {
    cursor: pointer;
  }

  &__left {
    margin-right: 32px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    margin-top: -4px;
  }

  &__poster {
    width: 300px;
    height: auto;
    outline: solid 2px #fff;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  &__name {
    font-size: 32px;
    font-weight: bold;
  }

  &__type {
    margin-top: 16px;
    margin-bottom: 8px;
    > span {
      margin-right: 6px;
    }
  }

  &__text {
    margin-top: 8px;
    max-width: 400px;
    span {
      font-weight: bold;
    }
    div {
      @include text-ellipsis(6);
      font-size: 15px;
      margin-top: 4px;
    }
  }
}
</style>
