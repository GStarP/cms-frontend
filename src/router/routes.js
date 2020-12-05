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
        path: "/movie-ticket-seat/:movieId/:scheduleId",
        component: () => import("@/views/MovieTicketSeat.vue"),
        props: true,
        meta: {
          title: "选座"
        }
      },
      {
        path: "/movie-ticket-pay",
        component: () => import("@/views/MovieTicketPay.vue"),
        meta: {
          title: "支付"
        }
      },
      {
        path: "/movie-ticket-finish",
        component: () => import("@/views/MovieTicketFinish.vue"),
        meta: {
          title: "支付成功"
        }
      },
      {
        path: "/user/history/consume",
        component: () => import("@/views/ConsumeHistory.vue"),
        meta: {
          title: "消费记录"
        }
      },
      {
        path: "/user/ticket",
        component: () => import("@/views/Ticket.vue"),
        props: true,
        meta: {
          title: "购票记录"
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
