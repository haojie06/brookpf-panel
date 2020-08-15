<template>
  <body>
    <div class="login-page">
      <el-form
        class="login-container"
        status-icon
        label-position="left"
        label-width="0px"
        @keyup.enter.native="login"
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
    </div>
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
      console.log('登录' + this.$store.state.webServerUrl)
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
  created: function() {
    //读取
    // console.log('读取JSON' + Config.webserverUrl)
    //本地配置文件要用axios来读取，直接读取config.json 打包后更换配置不会生效
    this.$axios
      .get('/config.json')
      .then((r) => {
        this.$store.commit('changeServerUrl', r.data.webserverUrl)
      })
      .catch((e) => {
        console.log('获取web后端配置文件失败\n' + JSON.stringify(e))
      })
  },
}
</script>
<style>
.login-page {
  font-size: 160%;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-image: url('../assets/images/suya.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
@media screen and (min-width: 480px) {
  .login-container {
    font-size: 160%;
    display: block;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: aliceblue;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
}
@media screen and (max-width: 479px) {
  .login-container {
    font-size: 160%;
    display: block;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 30% auto;
    width: 18rem;
    padding: 35px 35px 15px 35px;
    background: aliceblue;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 10px #ffffff;
  }
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
