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
      const params = new FormData()
      params.append('Username', this.loginForm.username)
      params.append('Password', this.loginForm.password)
      this.$axios
        .post('/web/login', params)
        .then((successResponse) => {
          console.log('登陆成功')
          if (successResponse.data.Code === 200) {
            this.$router.replace({ path: '/' })
          } else {
            console.log(
              '登陆失败\n' + JSON.stringify(successResponse.data.Code)
            )
          }
        })
        .catch(() => {})
    },
  },
}
</script>
<style>
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
