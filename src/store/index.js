import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 已登录用户信息
    userInfo: {
      id: 12,
      // id: 0,
      username: "",
      password: "",
      auth: 0
    },
    // 电影列表
    movieList: [
      {
        id: undefined,
        country: undefined,
        description: undefined,
        director: undefined,
        islike: undefined,
        language: undefined,
        length: undefined,
        likeCount: undefined,
        name: undefined,
        posterUrl: undefined,
        screenWriter: undefined,
        starring: undefined,
        startDate: undefined,
        status: undefined,
        type: undefined
      }
    ]
  },
  mutations: {
    setUserInfo(state, userInfo) {
      this.state.userInfo = userInfo;
    },
    setMovieList(state, movieList) {
      this.state.movieList = movieList;
    }
  }
});
