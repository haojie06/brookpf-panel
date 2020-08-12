<template>
  <el-container>
    <el-header height="66px" class="header">
      <NavBar />
    </el-header>
    <el-main class="page-main">
      <OperationBar />
      <ServerCard :servers="servers" />
      <ForwardCard />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import ServerCard from './components/ServerCard.vue'
import NavBar from './components/NavBar.vue'
import ForwardCard from './components/ForwardCard.vue'
import OperationBar from './components/OperationBar.vue'
export default {
  name: 'Home',
  components: { ServerCard, NavBar, ForwardCard, OperationBar },
  data() {
    return {
      circleUrl: '../assets/images/avatars/profile-image-1.jpg',
      iconUrl: require('@/assets/images/avatars/profile-image-1.jpg'),
      servers: [],
    }
  },
  beforeMount: function() {
    //打开页面，首先检测是否登录，如果没有登录，先让用户去登陆 考虑是否设置过期时间？
    if (this.$store.state.username == '') {
      //未检测到登录信息
      this.$router.replace({ path: '/login' })
    }
    //如果过期，重登
    /*
    let now = Date.parse(new Date())
    let lastOP = this.$store.state.lastOP
    if ((now - lastOP) / 1000 > 20) {
      this.$notify.this.$router.replace({ path: '/login' })
      this.$notify({
        title: '过期了',
        message: '登录过期，请重新登录',
        type: 'warn',
      })
    }
    */
    //如果密码修改 重登

    //请求网页后端获取服务器列表
    const fdata = new FormData()
    fdata.append('Username', this.$store.state.username)
    fdata.append('Password', this.$store.state.password)
    this.$axios
      .post('/web/getservers', fdata)
      .then((response) => {
        if (response.data.Code == 200) {
          console.log('查询成功:\n' + JSON.stringify(response))
          this.servers = response.data.Data.servers
          //this.$store.commit()
        } else {
          console.log('查询失败:\n' + JSON.stringify(response))
        }
      })
      .catch((err) => {
        console.log('获取列表出错' + JSON.stringify(err))
      })
    //逐一请求服务器获取状态以及中转列表
  },
  method() {},
}
</script>
<style>
.header {
  width: 100%;
  padding: 0 !important;
}
.page-main {
  margin: auto 8%;
}
@media (max-width: 1199px) {
  .page-header {
    background: #fff;
    position: fixed;
    width: 100%;
    z-index: 99;
    box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.04);
  }
}
</style>
