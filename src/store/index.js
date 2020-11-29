import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 已登录用户信息
    userInfo: {
      id: 12,
      // id: undefined,
      username: undefined,
      password: undefined,
      auth: undefined
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      this.state.userInfo = userInfo;
    },
    setPayInfo(state, payInfo) {
      this.state.payInfo = payInfo;
    }
  }
});
