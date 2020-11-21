<template>
  <div class="login" @keyup.enter="register">
    <el-card class="login-card">
      <div
        class="icon-title"
        @click="$route.path !== '/' && $router.push({ path: '/' })"
      >
        <img class="icon" src="@/assets/img/cms.png" />
        <div class="title">CMS</div>
      </div>
      <div class="login-form">
        <el-input
          v-model="username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
        <el-input
          show-password
          v-model="password"
          placeholder="请输入密码"
          prefix-icon="el-icon-key"
        ></el-input>
        <el-input
          show-password
          v-model="confirmPassword"
          placeholder="请确认密码"
          prefix-icon="el-icon-key"
        ></el-input>
        <div class="login-hint">
          <div>已有账号？</div>
          <el-link
            class="register-hint"
            type="primary"
            @click="$router.push({ path: '/login' })"
            >立即登录</el-link
          >
        </div>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { register } from "@/api/user";
import { Message } from "element-ui";
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    register() {
      if (this.username === "") {
        Message.warning("请填写用户名");
        return;
      } else if (this.password === "") {
        Message.warning("请填写密码");
        return;
      } else if (this.confirmPassword === "") {
        Message.warning("请填写确认密码");
        return;
      } else if (this.confirmPassword != this.password) {
        Message.warning("两次填写的密码不一致");
        return;
      }
      register(this.username, this.password)
        .then(() => {
          Message.success("注册成功", { duration: 500 });
          this.$router.push({ path: "/login" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  height: 100vh;
  background-color: $primary;

  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  width: 420px;
  margin-top: -8vh;

  display: flex;
  justify-content: center;
}
.login-form {
  .el-input {
    margin-bottom: 1.5rem;
  }
  button {
    width: 100%;
  }
}
.login-hint {
  margin-top: -0.4rem;
  margin-bottom: 1.7rem;
  margin-left: 8px;

  display: flex;
  flex-direction: row;

  > div {
    font-size: 14px;
  }
}
</style>
