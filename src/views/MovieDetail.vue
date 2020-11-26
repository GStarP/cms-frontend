<template>
  <div class="movie-detail">
    {{this.movieDetail}}
  </div>
</template>

<script>
import { getMovieDetailByUser } from '@/api/movie'
export default {
  props: ['movieId'],
  data() {
    return {
      movieDetail: {
        id: 1,            // 电影id
        name: '',         // 电影名
        posterUrl: '',    // 海报链接
        director: '',     // 导演
        screenWriter: '', // 编剧
        starring: '',     // 主演
        type: '',         // 类型
        country: '',      // 制片国家/地区
        language: '',     // 语言
        startDate: '2018-06-23',  // 上映时间
        length: 200,      // 片长
        description: '',  // 描述
        status: 1,        // 电影状态，0：上架状态，1：下架状态
        isLike: 1,        // 是否想看,0:未标记想看，1：已标记想看
        likeCount: 10     // 想看人数
      }
    }
  },
  methods: {
    updateMovieDetail() {
      const loading = this.$loading.service();
      getMovieDetailByUser(this.$store.state.userInfo.id, this.movieId)
      .then(res => {
        this.movieDetail = res.content
        loading.close()
      }).catch(e => {
        console.log(e)
        loading.close()
      })
    }
  },
  mounted() {
    this.updateMovieDetail()
  },
  watch: {
    movieId() {
      this.updateMovieDetail()
    }
  }
}
</script>

<style lang="scss">

</style>