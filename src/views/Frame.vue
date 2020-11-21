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
            @click="!active(i) && $router.push({ path: item.route })"
          >
            {{ item.label }}
          </div>
        </div>
        <template v-if="$store.state.userInfo.username">
          <el-dropdown class="user-menu">
            <div class="username">
              {{ $store.state.userInfo.username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu>
              <el-dropdown-item
                ><span @click="logout()">登出</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else>
          <el-link
            type="primary"
            :underline="false"
            @click="$router.push({ path: '/login' })"
            >更多功能，点此登录</el-link
          >
        </template>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
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
        },
        {
          label: "抽奖",
          route: "/lottery"
        }
      ]
    };
  },
  methods: {
    active(i) {
      return this.$route.path === this.navMenuItem[i].route;
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

    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 24px;
  }
  main {
    margin-top: $headerHeight;
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
.user-menu {
  height: $headerHeight;
  line-height: $headerHeight;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
}
.nav-menu {
  height: $headerHeight;
  display: flex;
  flex-direction: row;
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
</style>
