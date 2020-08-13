export default {
  //获取服务器信息与中转信息
  getData(vue) {
    //请求网页后端获取服务器列表
    const fdata = new FormData()
    fdata.append('Username', vue.$store.state.username)
    fdata.append('Password', vue.$store.state.password)
    vue.$axios
      .post('/web/getservers', fdata)
      .then((response) => {
        if (response.data.Code == 200) {
          //.log('查询成功:\n' + JSON.stringify(response))
          let servers = response.data.Data.servers
          for (let i in servers) {
            //servers[i] 默认没有Status等属性，如果先提交，那么新加入的属性变化无法被追踪，所以在第一次提交前先把属性加进去
            servers[i].Status = '查询中'
            //Brook状态
            servers[i].BStatus = '未知'
            //Brook是否安装
            servers[i].Installed = false
            servers[i].Online = false
          }
          vue.$store.commit('updateServers', servers)
          //vue.$store.commit()
          //逐一请求服务器获取状态以及中转列表
          if (servers != []) {
            for (let i = 0; i < servers.length; i++) {
              //逐一请求。。并更新列表
              //对象的属性是没有绑定的，所以需要促使数组变化
              //vue.$store.commit('updateServers', [])

              let fdata = new FormData()
              let server = servers[i]
              fdata.append('Username', servers[i].UserName)
              fdata.append('Password', servers[i].Password)
              //这里的post不方便用反代的
              vue.$axios
                .post(`http://${server.IP}:${server.Port}/api/getstatus`, fdata)
                .then((response) => {
                  console.log(
                    '受控端查询记录\ni' + JSON.stringify(response.data)
                  )
                  if (response.data.Code == 200) {
                    //成功发送到服务器，并正常回应
                    console.log(
                      '查询到的服务器\n' + JSON.stringify(response.data)
                    )
                    servers[i].Status = '在线'
                    servers[i].Online = true
                    servers[i].BStatus = response.data.Enable
                    servers[i].Installed = response.data.Installed
                    //vue.$store.commit('updateServers', [])
                    //vue.$store.commit('updateServers', servers)
                    //vue.$store.commit('updateServers', vue.servers)
                    //添加到中转列表中
                    let forwards = []
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
                      forwards.push(forward)
                      vue.$store.commit('updateForwards', forwards)
                    }
                  }
                })
                .catch(() => {
                  //如果连接不上服务器（显示离线）
                  servers[i].Status = '离线'
                  vue.$store.commit('updateServers', servers)
                  //console.log('查询服务器信息失败\n' + JSON.stringify(err))
                })
            }
          } else {
            console.log('服务器列表为空，请先添加中转服务器')
          }
        } else {
          console.log('查询失败:\n' + JSON.stringify(response))
          vue.$notify({
            title: '失败',
            message: '查询失败\n' + JSON.stringify(response),
            type: 'success',
          })
        }
      })
      .catch((err) => {
        console.log('获取列表出错' + JSON.stringify(err))
        vue.$notify({
          title: '错误',
          message: '获取中转服务器列表失败，请确认网页后端是否正常运行',
          type: 'error',
        })
      })
  },
}
