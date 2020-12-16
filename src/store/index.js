import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 已登录用户信息
    userInfo: {
      // id: 1,
      id: 0,
      username: "",
      password: "",
      auth: 0
    },
    // 电影列表
    movieList: [],
    // 最近一次查看电影的活动信息
    activityInfo: {
      id: 0,
      name: "",
      description: "",
      startTime: "",
      endTime: "",
      targetAmount: 0,
      coupon: {
        id: 0,
        name: "",
        targetAmount: 0,
        discountAmount: 0,
        startTime: "",
        endTime: ""
      }
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      this.state.userInfo = userInfo;
    },
    setMovieList(state, movieList) {
      this.state.movieList = movieList;
    },
    setActivityInfo(state, activity) {
      this.state.activityInfo = activity;
    }
  }
});
