<template>
  <div class="frame">
    <el-container>
      <el-header height="64px">
        <div
          class="header-icon-title"
          @click="$route.path !== '/' && $router.push({ path: '/' })"
        >
          <img class="icon" src="@/assets/img/cms.png" />
          <div class="title">CMS</div>
        </div>
        <div class="nav-menu">
          <div
            v-for="(item, i) of navMenuItem"
            :key="'nav-menu-item-' + i"
            class="nav-menu-item"
            :class="{ 'nav-menu-item-active': active(i) }"
            @click="navTo(item.route)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="header__right">
          <search-bar style="margin-right: 16px" />
          <template v-if="$store.state.userInfo.id > 0">
            <el-dropdown class="user-menu">
              <div class="username">
                {{ $store.state.userInfo.username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu>
                <el-dropdown-item><span
                    @click="$router.push({ path: '/user/history/consume' })"
                    >消费记录</span></el-dropdown-item>
                <el-dropdown-item><span @click="$router.push({ path: '/user/ticket' })">购票记录</span></el-dropdown-item>
                <el-dropdown-item><span @click="$router.push({ path: '/membership' })">会员卡</span></el-dropdown-item>
                <el-dropdown-item><span @click="$router.push({ path: '/user/coupon' })">优惠券</span></el-dropdown-item>
                <el-dropdown-item><span @click="logout()">登出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            <el-link
              type="primary"
              :underline="false"
              @click="$router.push({ path: '/login' })"
              >更多功能，点此登录</el-link>
          </template>
        </div>
      </el-header>
      <el-main>
        <div class="content">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      navMenuItem: [
        {
          label: "首页",
          route: "/"
        },
        {
          label: "电影",
          route: "/movie"
        }
        // {
        //   label: "抽奖",
        //   route: "/lottery"
        // }
      ]
    };
  },
  methods: {
    active(i) {
      return this.$route.path === this.navMenuItem[i].route;
    },
    navTo(route) {
      if (this.$route.path !== route) {
        if (route === "/lottery") {
          this.$requireLogin()
            .then(() => {
              this.$router.push({ path: route });
            })
            .catch(e => {});
        } else {
          this.$router.push({ path: route });
        }
      }
    },
    logout() {
      this.$store.commit("setUserInfo", {
        id: undefined,
        username: undefined,
        password: undefined,
        auth: undefined
      });
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss">
$headerHeight: 64px;

.frame {
  min-height: 100vh;

  section {
    min-height: 100vh;
  }

  header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 999;

    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;

    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0 24px;
  }

  main {
    margin-top: $headerHeight;
    display: flex;
    justify-content: center;
  }
}

.header-icon-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: $headerHeight;

  &:hover {
    cursor: pointer;
  }

  .icon {
    $size: 32px;
    width: $size;
    height: $size;
    margin-right: 8px;
  }

  .title {
    user-select: none;
    line-height: $headerHeight;
    font-size: 1.6rem;
    font-weight: bold;
    color: #2c2c2c;
  }
}

.nav-menu {
  height: $headerHeight;
  display: flex;
  flex-direction: row;

  margin-left: auto;
  margin-right: auto;
}

.nav-menu-item {
  user-select: none;

  height: $headerHeight;
  line-height: $headerHeight;
  width: $headerHeight * 1.2;
  font-size: 1rem;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: $primary;
  }
}

.nav-menu-item-active {
  background-color: $primary;
  color: #fff;

  &:hover {
    color: #fff;
  }
}

.header__right {
  display: flex;
  flex-direction: row;
  align-items: center;

  // 维持 nav-menu 居中
  margin-left: -232px;
}

.user-menu {
  height: $headerHeight;
  line-height: $headerHeight;
  font-size: 1rem;

  margin-left: 16px;

  &:hover {
    cursor: pointer;
  }
}
.el-dropdown-menu__item {
  display: flex;
  justify-content: center;

  line-height: 48px;

  > span {
    line-height: 48px;

    font-size: 16px;
  }
}

.content {
  width: 1280px;
}
</style>
