<template>
  <body class="login-page">
    <el-form
      class="login-container"
      status-icon
      label-position="left"
      label-width="0px"
    >
      <h3 class="login-title">Brook面板登陆</h3>
      <el-form-item required>
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item required>
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%;background: #505458;border: none"
          v-on:click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      responseResult: [],
    }
  },
  methods: {
    login() {
      //form-data形式提交
      let params = new FormData()
      params.append('Username', this.loginForm.username)
      params.append('Password', this.loginForm.password)
      this.$axios
        .post(`${this.$store.state.webServerUrl}/web/login`, params)
        .then((successResponse) => {
          if (successResponse.data.Code === 200) {
            console.log('登陆成功')
            this.$router.replace({ path: '/' })
            this.$store.commit('login', {
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            this.$notify({
              title: '登录成功',
              message: '欢迎回来',
              type: 'success',
            })
          } else {
            console.log(
              '登陆失败\n' + JSON.stringify(successResponse.data.Code)
            )
            this.$notify.error({
              title: '错误',
              message: '登陆失败 请检测用户名/密码是否正确',
            })
          }
        })
        .catch((err) => {
          console.log('登陆失败' + JSON.stringify(err))
          this.$notify.error({
            title: '错误',
            message: '登陆失败' + JSON.stringify(err),
          })
        })
    },
  },
}
</script>
<style>
.login-page {
  font-size: 160%;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
