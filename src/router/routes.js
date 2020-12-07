const routes = [
  {
    path: "/",
    component: () => import("@/views/Frame.vue"),
    // 启用精确匹配
    pathToRegexpOptions: {
      strict: true
    },
    children: [
      {
        path: "/",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/movie",
        component: () => import("@/views/MovieList.vue"),
        meta: {
          title: "电影"
        }
      },
      {
        path: "/movie-detail/:movieId",
        component: () => import("@/views/MovieDetail.vue"),
        props: true,
        meta: {
          title: "电影详情"
        }
      },
      {
        path: "/movie-ticket/:movieId/:scheduleId",
        component: () => import("@/views/MovieTicket.vue"),
        props: true,
        meta: {
          title: "选座购票"
        }
      },
      {
        path: "/membership",
        component: () => import("@/views/Membership.vue"),
        props: true,
        meta: {
          title: "会员权益"
        }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
    meta: {
      title: "注册"
    }
  },
  {
    path: "*",
    component: () => import("@/views/Error.vue"),
    meta: {
      title: "页面走丢啦"
    }
  }
];

export default routes;
