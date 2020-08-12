<template>
  <el-container>
    <el-header height="66px" class="header">
      <NavBar />
    </el-header>
    <el-main class="page-main">
      <OperationBar />
      <ServerCard />
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
    }
  },
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
