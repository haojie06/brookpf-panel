export default {
  //获取服务器信息与中转信息
  getData(vue) {
    //请求网页后端获取服务器列表
    const fdata = new FormData()
    fdata.append('Username', vue.$store.state.username)
    fdata.append('Password', vue.$store.state.password)
    let info = {
      totalServers: 0,
      onlineServers: 0,
      enableForwards: 0,
      totalForwards: 0,
    }
    vue.$axios
      .post(`${vue.$store.state.webServerUrl}/web/getservers`, fdata)
      .then((response) => {
        if (response.data.Code == 200) {
          //.log('查询成功:\n' + JSON.stringify(response))
          let servers = response.data.Data.servers
          info.totalServers = servers.length
          vue.$store.commit('updateInfoPanel', info)
          for (let i in servers) {
            //servers[i] 默认没有Status等属性，如果先提交，那么新加入的属性变化无法被追踪，所以在第一次提交前先把属性加进去
            servers[i].Status = '查询中'
            //Brook状态
            servers[i].BStatus = '未知'
            //Brook是否安装
            servers[i].Installed = false
            servers[i].Online = false
            // console.log(
            //   '查询到的服务器(来自web端)\n' + JSON.stringify(servers[i])
            // )
          }
          vue.$store.commit('updateServers', servers)
          //vue.$store.commit()
          //逐一请求服务器获取状态以及中转列表
          let forwards = []
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
                  if (response.data.Code == 200) {
                    //成功发送到服务器，并正常回应
                    // console.log(
                    //   '查询到的服务器(受控端)\n' + JSON.stringify(response.data)
                    // )
                    info.onlineServers =
                      vue.$store.state.infoPanel.onlineServers + 1
                    vue.$store.commit('updateInfoPanel', info)
                    servers[i].Status = '在线'
                    servers[i].Online = true
                    servers[i].BStatus = response.data.Enable
                    servers[i].Installed = response.data.Installed
                    servers[i].recordsNum = 0
                    //vue.$store.commit('updateServers', [])
                    //vue.$store.commit('updateServers', servers)
                    //vue.$store.commit('updateServers', vue.servers)
                    //添加到中转列表中

                    let records = response.data.Records
                    if (records != '') {
                      servers[i].recordsNum = records.length
                      vue.$store.commit('updateServers', servers)
                    }
                    for (let index in records) {
                      // 这了先用&来划分，尝试获取流量统计 datas[1]是流量部分 tcp入 tcp出 udp入 udp出
                      let datas = records[index].split('&')
                      let ritems = datas[0].trim().split(' ')
                      if (ritems.length == 1) {
                        break
                      }
                      console.log('加工之前的RITEMS\n' + ritems)
                      info.totalForwards =
                        vue.$store.state.infoPanel.totalForwards + 1
                      vue.$store.commit('updateInfoPanel', info)
                      let forward = {}
                      //对forward进行操作需要知道
                      forward.username = server.UserName
                      forward.password = server.Password
                      forward.controlport = server.Port
                      //中转记录的信息
                      forward.lname = server.Name
                      forward.lhost = server.IP
                      forward.lport = ritems[0]
                      forward.rhost = ritems[1]
                      forward.rport = ritems[2]
                      if (ritems[3] == 1) {
                        forward.enable = true
                        info.enableForwards =
                          vue.$store.state.infoPanel.enableForwards + 1
                        vue.$store.commit('updateInfoPanel', info)
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
                      forward.tcpIn = '0MB'
                      forward.tcpOut = '0MB'
                      forward.udpIn = '0MB'
                      forward.udpOut = '0MB'
                      forward.totalIn = '0MB'
                      forward.totalOut = '0MB'
                      if (datas[1] != '' && datas[1] != undefined) {
                        //流量统计。
                        let bw = datas[1].split(' ')
                        forward.tcpOut = this.convertBandwdith(bw[0])
                        forward.tcpIn = this.convertBandwdith(bw[1])
                        forward.udpOut = this.convertBandwdith(bw[2])
                        forward.udpIn = this.convertBandwdith(bw[3])
                        forward.totalOut = this.convertBandwdith(
                          Number(bw[0]) + Number(bw[2])
                        )
                        forward.totalIn = this.convertBandwdith(
                          Number(bw[1]) + Number(bw[3])
                        )
                        console.log('转化后的FORWARD' + JSON.stringify(forward))
                      }
                      forwards.push(forward)
                    }
                    vue.$store.commit('updateForwards', forwards)
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
          // console.log('查询失败:\n' + JSON.stringify(response))
          vue.$notify({
            title: '失败',
            message: '查询服务器列表失败\n' + JSON.stringify(response),
            type: 'success',
          })
        }
      })
      .catch((err) => {
        // console.log('获取列表出错' + JSON.stringify(err))
        vue.$notify({
          title: '错误',
          message:
            '获取中转服务器列表失败，请确认网页后端是否正常运行\n' +
            JSON.stringify(err),
          type: 'error',
        })
      })
  },
  //带宽转换 字节转为易读的字符串
  convertBandwdith(str) {
    let bytes = Number(str)
    let KB = bytes / 1024
    let MB = KB / 1024
    let GB = MB / 1024
    let TB = GB / 1024
    if (TB >= 1) {
      return String(TB.toFixed(1) + 'TB')
    } else if (GB >= 1) {
      return String(GB.toFixed(1) + 'GB')
    } else if (MB >= 1) {
      return String(MB.toFixed(1) + 'MB')
    } else if (KB >= 1) {
      return String(KB.toFixed(1) + 'KB')
    } else {
      return String(bytes + 'B')
    }
  },
}
