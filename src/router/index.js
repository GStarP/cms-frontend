import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = "CMS | " + to.meta.title;
  }
  window.scrollTo(0, 0);
  next();
});

export default router;
