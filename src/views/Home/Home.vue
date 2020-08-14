<template>
  <el-container>
    <el-header height="66px" class="header">
      <NavBar />
    </el-header>
    <el-main class="page-main">
      <OperationBar />
      <ServerCard :servers="this.$store.state.servers" />
      <ForwardCard :forwards="this.$store.state.forwards" />
      <popup-form
        :servers="this.$store.state.servers"
        :forwards="this.$store.state.forwards"
      ></popup-form>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script>
// @ is an alias to /src
import ServerCard from './components/ServerCard.vue'
import NavBar from './components/NavBar.vue'
import ForwardCard from './components/ForwardCard.vue'
import OperationBar from './components/OperationBar.vue'
import PopupForm from './components/PopupForm.vue'
import 'element-ui/lib/theme-chalk/display.css'
export default {
  name: 'Home',
  components: { ServerCard, NavBar, ForwardCard, OperationBar, PopupForm },
  data() {
    return {
      circleUrl: '../assets/images/avatars/profile-image-1.jpg',
      iconUrl: require('@/assets/images/avatars/profile-image-1.jpg'),
      servers: [],
      forwards: [],
    }
  },
  beforeMount: function() {
    //打开页面，首先检测是否登录，如果没有登录，先让用户去登陆 考虑是否设置过期时间？
    if (this.$store.state.username == '') {
      //未检测到登录信息
      this.$router.replace({ path: '/login' })
    } else {
      this.$common.getData(this)
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
  },
  method() {},
}
</script>
<style>
.header {
  width: 100%;
  padding: 0 !important;
}
@media screen and(min-width: 960px) {
  .page-main {
    margin: auto 6%;
  }
}
@media screen and (max-width: 479px) {
  .page-main {
    margin: auto 1%;
    padding: 10px !important;
  }
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
