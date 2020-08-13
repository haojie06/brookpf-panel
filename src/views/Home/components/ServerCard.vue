<!--中转服务器列表-->
<template>
  <el-card class="server-card">
    <el-divider content-position="left">中转服务器列表</el-divider>
    <el-table :data="servers" style="width: 100%">
      <el-table-column label="ID">
        <template slot-scope="scope">
          <i class="el-icon-arrow-right"></i>
          <span style="margin-left: 10px">{{ scope.row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务器名">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中转服务器地址">
        <template slot-scope="scope">
          <span>{{ scope.row.IP }}:{{ scope.row.Port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.Status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.Desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <el-button type="primary" :key="scope.$row">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="beforeHandleCommand(scope.$index, scope.row, 'edit')"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                :command="
                  beforeHandleCommand(scope.$index, scope.row, 'delete')
                "
                >删除</el-dropdown-item
              >
              <el-dropdown-item
                :command="beforeHandleCommand(scope.$index, scope.row, 'start')"
                >开启Brook</el-dropdown-item
              >
              <el-dropdown-item
                :command="beforeHandleCommand(scope.$index, scope.row, 'stop')"
                >关闭Brook</el-dropdown-item
              >
              <el-dropdown-item
                :command="
                  beforeHandleCommand(scope.$index, scope.row, 'restart')
                "
                >重启Brook</el-dropdown-item
              >
              <el-dropdown-item
                :command="beforeHandleCommand(scope.$index, scope.row, 'print')"
                >查看日志</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  name: 'ServerCard',
  props: ['servers'],
  data() {
    return {
      index: 0,
      opServer: {},
    }
  },
  methods: {
    getRowKeys(row) {
      return row.individualId // 每条数据的唯一识别值
    },
    beforeHandleCommand(index, row, command) {
      //点击按钮时先保存当前选中服务器信息，之后点击下拉框进行具体操作

      return { index, row, command }
    },
    handleCommand(command) {
      console.log(JSON.stringify(command))
      //command.row即可取出对象
      //command.command为操作
      let server = command.row
      switch (command.command) {
        case 'delete':
          //进行服务器删除
          this.$confirm(
            `确定要删除中转服务器${server.Name}吗？(服务器上的中转记录还会保留)`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
          )
            .then(() => {
              //确认进行删除
              let formData = new FormData()
              formData.append('Username', this.$store.state.username)
              formData.append('Password', this.$store.state.password)
              formData.append('ID', server.ID)
              this.$axios
                .post(
                  this.$store.state.webServerUrl + '/web/delserver',
                  formData
                )
                .then((response) => {
                  console.log('删除服务器回应:\n' + JSON.stringify(response))
                  if (response.data.Code == 200) {
                    this.$message({
                      type: 'success',
                      message: '删除成功!',
                    })
                  } else {
                    this.$message({
                      type: 'error',
                      message: '删除失败:' + JSON.stringify(response.data),
                    })
                  }
                })
                .catch((err) => {
                  console.log('删除服务器回应:\n' + JSON.stringify(err))
                  this.$message({
                    type: 'error',
                    message: '删除失败:' + JSON.stringify(err),
                  })
                })
              //刷新页面
              this.$router.go(0)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
          break
      }
    },
  },
  computed: {},
}
</script>
<style>
.server-card {
  border-radius: 0.5rem !important;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  margin-top: 2.5%;
}
</style>
