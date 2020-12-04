<template>
  <div class="movie-detail">
    <!-- 电影信息 -->
    <div class="movie-info">
      <div class="section-title">电影详情</div>
      <div class="movie-info__wrapper">
        <div class="movie-info__left">
          <img class="movie-info__poster" :src="movieDetail.posterUrl" />
        </div>
        <div class="movie-info__right">
          <div class="movie-info__name">{{ movieDetail.name }}</div>
          <div class="movie-info__type">
            <el-tag type="warning" effect="dark">
              <i class="el-icon-time" />
              {{ movieDetail.length }}分钟
            </el-tag>
            <el-tag type="danger" effect="dark">
              <i class="el-icon-star-off" />
              {{ movieDetail.likeCount }}人想看</el-tag
            >
            <el-tag
              v-for="type in typeList"
              :key="movieId + 'type' + type"
              effect="dark"
              >{{ type }}</el-tag
            >
          </div>
          <div class="movie-info__text">
            <span>导演：</span>{{ text(movieDetail.director) }}
          </div>
          <div class="movie-info__text">
            <span>主演：</span>{{ text(movieDetail.starring) }}
          </div>
          <div class="movie-info__text">
            <span>语言：</span>{{ text(movieDetail.language) }}
          </div>
          <div class="movie-info__text">
            <span>简介：</span>
            <el-tooltip placement="top" :content="text(description)">
              <div>{{ text(description) }}</div>
            </el-tooltip>
          </div>
          <icon-button
            class="movie-info__like"
            icon="heart"
            :color="likeColor"
            @click="updateLikeMovie"
            >{{ likeText }}</icon-button
          >
        </div>
      </div>
    </div>
    <!-- 排片信息 -->
    <div class="movie-schedule">
      <div class="section-title">排片信息</div>
      <el-tabs type="border-card" v-if="movieScheduleList.length > 0">
        <el-tab-pane
          v-for="schedule of movieScheduleList"
          :key="movieId + 'schedule' + schedule.date"
          :label="dateText(schedule.date)"
        >
          <movie-schedule-item
            v-for="item of schedule.scheduleItemList"
            :key="movieId + 'schedule-item' + item.id"
            :schedule="item"
          ></movie-schedule-item>
        </el-tab-pane>
      </el-tabs>
      <div v-else class="no-movie-schedule">
        <span>暂无排片，不如</span>
        <el-link type="primary" @click="$router.push({ path: '/movie' })"
          >看看其它电影</el-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/IconButton.vue";
import MovieScheduleItem from "@/components/movie-detail/MovieScheduleItem.vue";
import { getMovieDetailByUser, toggleLikeMovie } from "@/api/movie";
import { getMovieSchedule } from "@/api/schedule";
import { formatDate, isToday, isNextDay } from "@/utils/time";
export default {
  components: {
    IconButton,
    MovieScheduleItem
  },
  props: ["movieId"],
  data() {
    return {
      movieDetail: {
        id: 1, // 电影ID
        name: "", // 电影名
        posterUrl: "", // 海报链接
        director: "", // 导演
        screenWriter: "", // 编剧
        starring: "", // 主演
        type: "", // 类型
        country: "", // 制片国家/地区
        language: "", // 语言
        startDate: "2018-06-23", // 上映时间
        length: 200, // 片长
        description: "", // 描述
        status: 1, // 电影状: 0-上架, 1-下架
        islike: 1, // 是否标记想看
        likeCount: 10 // 想看人数
      },
      movieScheduleList: []
    };
  },
  methods: {
    updateMovieDetail() {
      const loading = this.$loading.service();
      getMovieDetailByUser(this.$store.state.userInfo.id, this.movieId)
        .then(res => {
          const movieDetail = res.content;
          movieDetail.startDate = formatDate(movieDetail.startDate);
          this.movieDetail = movieDetail;
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    text(val) {
      if (val) {
        return val;
      } else {
        return "暂无信息";
      }
    },
    updateLikeMovie() {
      const loading = this.$loading.service();
      toggleLikeMovie(
        this.$store.state.userInfo.id,
        this.movieId,
        this.movieDetail.islike
      )
        .then(() => {
          this.updateMovieDetail();
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    updateMovieScheduleList() {
      const loading = this.$loading.service();
      getMovieSchedule(this.movieId)
        .then(res => {
          const movieScheduleList = [];
          for (let s of res.content) {
            if (s.scheduleItemList.length != 0) {
              s.date = formatDate(s.date);
              movieScheduleList.push(s);
            }
          }
          this.movieScheduleList = movieScheduleList;
          loading.close();
        })
        .catch(e => {
          console.log(e);
          loading.close();
        });
    },
    dateText(dateStr) {
      if (isToday(dateStr)) {
        return (dateStr += "（今天）");
      } else if (isNextDay(dateStr)) {
        return (dateStr += "（明天）");
      } else {
        return dateStr;
      }
    }
  },
  computed: {
    typeList() {
      return this.movieDetail.type.split("/").map(t => t.trim());
    },
    description() {
      return " " + this.movieDetail.description.trim();
    },
    likeColor() {
      return this.movieDetail.islike ? "#ed5565" : "white";
    },
    likeText() {
      return this.movieDetail.islike ? "已想看" : "想看";
    }
  },
  mounted() {
    this.updateMovieDetail();
    this.updateMovieScheduleList();
  },
  watch: {
    movieId() {
      this.updateMovieDetail();
      this.updateMovieScheduleList();
    }
  }
};
</script>

<style lang="scss">
$moviePosterHeight: 344px;

.movie-detail {
  display: flex;
  flex-direction: column;
}
.movie-info {
  margin-top: 16px;

  &__wrapper {
    padding: 36px;

    background-color: #fff;
    border: 1px solid #dcdfe6;

    display: flex;
    flex-direction: row;
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
    width: $moviePosterHeight * 0.7;
    height: $moviePosterHeight;
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
    span {
      font-weight: bold;
    }
    div {
      @include text-ellipsis(3);
      font-size: 15px;
      margin-top: 4px;
    }
  }

  &__like {
    margin-top: auto;
    margin-bottom: 8px;
  }

  .el-tag {
    i {
      font-size: 16px;
      vertical-align: text-bottom;
      margin-right: -2px;
    }
  }
}
.movie-schedule {
  margin-top: 32px;

  .no-movie-schedule {
    border: 1px solid #dcdfe6;
    background-color: #fff;
    padding: 48px 0;

    display: flex;
    flex-direction: row;
    justify-content: center;

    span {
      font-size: 18px;

      &:first-child {
        margin-right: 2px;
      }
    }
  }

  .el-tabs {
    box-shadow: none;
  }
  .el-tabs__content {
    padding-top: 0;
    padding-bottom: 0;
  }
}

.el-tooltip__popper {
  max-width: 800px;
  font-size: 16px;
  font-weight: 300;
}
</style>
