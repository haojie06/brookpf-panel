<template>
  <el-container>
    <el-header height="66px" class="header">
      <NavBar />
    </el-header>
    <el-main class="page-main">
      <OperationBar />
      <ServerCard :servers="servers" />
      <ForwardCard :forwards="forwards" />
      <popup-form :servers="servers" :forwards="forwards"></popup-form>
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
import PopupForm from './components/PopupForm.vue'
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
          //.log('查询成功:\n' + JSON.stringify(response))
          this.servers = response.data.Data.servers
          //this.$store.commit()
          //逐一请求服务器获取状态以及中转列表
          if (this.servers != []) {
            for (let i = 0; i < this.servers.length; i++) {
              //逐一请求。。并更新列表
              this.servers[i].Status = '查询中'
              //对象的属性是没有绑定的，所以需要促使数组变化
              this.servers.push([])
              this.servers.pop()
              let fdata = new FormData()
              let server = this.servers[i]
              fdata.append('Username', this.servers[i].UserName)
              fdata.append('Password', this.servers[i].Password)
              //这里的post不方便用反代的
              this.$axios
                .post(`http://${server.IP}:${server.Port}/api/getstatus`, fdata)
                .then((response) => {
                  console.log(
                    '受控端查询记录\ni' + JSON.stringify(response.data)
                  )
                  if (response.data.Code == 200) {
                    //成功发送到服务器，并正常回应
                    this.servers[i].Status = '在线'
                    this.servers.push([])
                    this.servers.pop()

                    //this.$store.commit('updateServers', this.servers)
                    //添加到中转列表中
                    let records = response.data.Records
                    for (let index in records) {
                      let ritems = records[index].split(' ')
                      if (ritems.length == 1) {
                        break
                      }
                      let forward = {}
                      forward.lname = server.Name
                      forward.lhost = server.IP
                      forward.lport = ritems[0]
                      forward.rhost = ritems[1]
                      forward.rport = ritems[2]
                      if (ritems[3] == 1) {
                        forward.enable = true
                      } else {
                        forward.enable = false
                      }
                      if (ritems[4] != undefined) {
                        forward.note = ritems[4]
                      } else {
                        forward.note = '无'
                      }
                      if (ritems[5] != undefined) {
                        forward.rname = ritems[5]
                      } else {
                        forward.rname = '未命名'
                      }
                      this.forwards.push(forward)
                    }
                  }
                })
                .catch(() => {
                  //如果连接不上服务器（显示离线）
                  this.servers[i].Status = '离线'
                  this.servers.push([])
                  this.servers.pop()
                  //console.log('查询服务器信息失败\n' + JSON.stringify(err))
                })
            }
          } else {
            console.log('服务器列表为空，请先添加中转服务器')
          }
        } else {
          console.log('查询失败:\n' + JSON.stringify(response))
          this.$notify({
            title: '失败',
            message: '查询失败\n' + JSON.stringify(response),
            type: 'success',
          })
        }
      })
      .catch((err) => {
        console.log('获取列表出错' + JSON.stringify(err))
        this.$notify({
          title: '错误',
          message: '获取中转服务器列表失败，请确认网页后端是否正常运行',
          type: 'error',
        })
      })
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
