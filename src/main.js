import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import { Message, Loading } from "element-ui";

Vue.config.productionTip = false;

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading;
Vue.prototype.$requireLogin = function() {
  return new Promise((resolve, reject) => {
    if (store.state.userInfo.id === 0) {
      router.push({ path: "/login" });
      this.$message.warning("请先登录");
      reject();
    } else {
      resolve();
    }
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
