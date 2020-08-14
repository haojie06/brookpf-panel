<template>
  <div>
    <div class="navbar">
      <el-row>
        <el-col :span="16" class="logo-col nav-col">
          <div class="logo-box">
            <a href="/" class="logo-text">BROOKWEB</a>
          </div>
        </el-col>
        <el-col :span="8" class="right-col">
          <!-- <div class="header-button-box">
            <el-avatar class="avatar" :size="40" :src="iconUrl"></el-avatar>
            <el-dropdown class="nav-dropdown">
              <span class="el-dropdown-link">
                <i class="el-icon-s-fold drop-icon"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加中转服务器</el-dropdown-item>
                <el-dropdown-item>添加转发规则</el-dropdown-item>
                <el-dropdown-item>重启Brook</el-dropdown-item>
                <el-dropdown-item disabled>停止Brook</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      iconUrl: require('@/assets/images/avatars/profile-image-1.jpg'),
    }
  },
  methods: {},
}
</script>
<style>
.header-button-box {
  min-width: 30px;
  display: inline-block;
  padding: 0px;
  margin-left: 5%;
  margin-top: 10px;
}

.logo-text {
  color: white;
  text-decoration: none;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 22px;
  font-family: Montserrat, sans-serif;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.navbar {
  font-size: 150%;
  background: #7168fc !important;
  box-shadow: 0 0 0.7rem rgba(31, 45, 61, 0.3);
  position: fixed;
  width: 100%;
  height: 66px;
  top: 0;
  z-index: 97;
}
el-row {
  height: 65px;
}
.logo-col {
  text-align: left;
}
.right-col {
  text-align: left;
  height: 60px;
}
.avatar {
  margin-left: 15px;
}
.nav-dropdown {
  top: -0.5rem;
  padding: 0.5rem;
}
.drop-icon {
  font-size: 1.8em;
  color: whitesmoke;
}
.logo-box {
  display: inline-block;
  padding: 15px 20px;
  margin-left: 5%;
}
</style>
