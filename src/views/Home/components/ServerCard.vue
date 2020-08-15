<!--中转服务器列表-->
<template>
  <!--编辑中转服务器对话框-->
  <el-card class="server-card">
    <el-dialog title="编辑服务器" :visible.sync="dialogFormVisible">
      <el-form :model="editServerForm">
        <el-form-item label="服务器名称" :label-width="formLabelWidth">
          <el-input v-model="editServerForm.Name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务器地址" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="editServerForm.IP"
                autocomplete="off"
                placeholder="服务器IP"
              ></el-input>
            </el-col>
            <el-col :span="2">:</el-col>
            <el-col :span="8"
              ><el-input
                v-model="editServerForm.Port"
                autocomplete="off"
                placeholder="端口"
              ></el-input
            ></el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="服务器用户名" :label-width="formLabelWidth">
          <el-input
            v-model="editServerForm.UserName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="服务器密码" :label-width="formLabelWidth">
          <el-input
            v-model="editServerForm.Password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="editServerForm.Desc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!--中转服务器表格-->
    <el-divider content-position="left">中转服务器列表</el-divider>
    <el-table :data="servers" class="server-table">
      <el-table-column label="ID" width="120" align="center">
        <template slot-scope="scope">
          <i class="el-icon-arrow-right"></i>
          <span style="margin-left: 10px">{{ scope.row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务器名" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中转服务器地址" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.IP }}:{{ scope.row.Port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Brook是否安装: {{ scope.row.Installed }}</p>
            <p>Brook是否开启: {{ scope.row.BStatus }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" type="success" v-if="scope.row.Online">{{
                scope.row.Status
              }}</el-tag>
              <el-tag
                size="medium"
                type="info"
                v-if="scope.row.Status == '查询中'"
                >{{ scope.row.Status }}</el-tag
              >
              <el-tag
                size="medium"
                type="danger"
                v-if="scope.row.Status == '离线'"
                >{{ scope.row.Status }}</el-tag
              >
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="180" align="center">
        <template slot-scope="scope">
          <!-- 对输出进行裁剪 -->
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.Desc }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ shortenDesc(scope.row.Desc) }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <el-button :key="scope.$row" class="more-btn">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <!-- 需要询问，展示该服务器有多少条记录。如果不在线就算了 -->
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
                >开启转发</el-dropdown-item
              >
              <el-dropdown-item
                :command="beforeHandleCommand(scope.$index, scope.row, 'stop')"
                >停止转发</el-dropdown-item
              >
              <el-dropdown-item
                :command="
                  beforeHandleCommand(scope.$index, scope.row, 'restart')
                "
                >重启转发</el-dropdown-item
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
      dialogFormVisible: false,
      editServerForm: {
        BStatus: 1,
      },
      formLabelWidth: '120px',
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
    shortenDesc(desc) {
      if (desc.length > 8) {
        //字符串长度较长，截短显示
        return desc.substr(0, 8) + '...'
      } else {
        //直接返回
        return desc
      }
    },
    handleCommand(command) {
      //console.log(JSON.stringify(command))
      //command.row即可取出对象
      //command.command为操作
      let server = command.row
      switch (command.command) {
        case 'delete':
          //进行服务器删除
          this.$confirm(
            `确定要删除中转服务器${server.Name}吗？该服务器当前有${server.recordsNum}条转发规则(服务器上的中转记录还会保留)`,
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
                  //console.log('删除服务器回应:\n' + JSON.stringify(response))
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
                  //console.log('删除服务器回应:\n' + JSON.stringify(err))
                  this.$message({
                    type: 'error',
                    message: '删除失败:' + JSON.stringify(err),
                  })
                })
              //刷新页面
              this.$common.getData(this)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
          break
        case 'edit':
          //编辑服务器
          this.dialogFormVisible = true
          this.editServerForm = server
          break
        case 'start': {
          //启动brook服务
          //
          let fd = new FormData()
          fd.append('Username', server.UserName)
          fd.append('Password', server.Password)
          this.$axios
            .post(`http://${server.IP}:${server.Port}/api/start`, fd)
            .then((r) => {
              if (r.data.Code == 200) {
                this.$message({
                  type: 'success',
                  message: '已启动Brook',
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '启动Brook失败' + r.data.Msg,
                })
              }
            })
            .catch((e) => {
              this.$message({
                type: 'error',
                message: '启动Brook失败' + JSON.stringify(e),
              })
            })
          this.$common.getData(this)
          break
        }
        case 'stop': {
          //停止brook服务
          let fd = new FormData()
          fd.append('Username', server.UserName)
          fd.append('Password', server.Password)
          this.$axios
            .post(`http://${server.IP}:${server.Port}/api/stop`, fd)
            .then((r) => {
              if (r.data.Code == 200) {
                this.$message({
                  type: 'success',
                  message: '已停止Brook',
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '停止Brook失败' + r.data.Msg,
                })
              }
            })
            .catch((e) => {
              this.$message({
                type: 'error',
                message: '停止Brook失败' + JSON.stringify(e),
              })
            })
          this.$common.getData(this)
          break
        }
        case 'restart': {
          //重启brook服务
          let fd = new FormData()
          fd.append('Username', server.UserName)
          fd.append('Password', server.Password)
          this.$axios
            .post(`http://${server.IP}:${server.Port}/api/restart`, fd)
            .then((r) => {
              if (r.data.Code == 200) {
                this.$message({
                  type: 'success',
                  message: '已重启Brook',
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '重启Brook失败' + r.data.Msg,
                })
              }
            })
            .catch((e) => {
              this.$message({
                type: 'error',
                message: '重启Brook失败' + JSON.stringify(e),
              })
            })
          this.$common.getData(this)
          break
        }

        case 'print':
          //TODO:打印brook受控端日志
          break
      }
    },
    commitEdit() {
      //提交更新
      //检查表单是否填完了
      let compeleted = true
      //console.log('提交更新' + JSON.stringify(this.editServerForm))
      for (let i in this.editServerForm) {
        if (this.editServerForm[i] === '') {
          this.$message({
            type: 'warning',
            message: '请检查' + i + '是否填写完整',
          })
          compeleted = false
        }
      }
      if (compeleted) {
        let formData = new FormData()
        formData.append('ServerUsername', this.editServerForm.UserName)
        formData.append('ServerPassword', this.editServerForm.Password)
        formData.append('Username', this.$store.state.username)
        formData.append('Password', this.$store.state.password)
        formData.append('Name', this.editServerForm.Name)
        formData.append('IP', this.editServerForm.IP)
        formData.append('Port', this.editServerForm.Port)
        formData.append('Desc', this.editServerForm.Desc)
        formData.append('ID', this.editServerForm.ID)
        this.$axios
          .post(this.$store.state.webServerUrl + '/web/editserver', formData)

          .then((r) => {
            if (r.data.Code == 200) {
              this.$message({
                type: 'success',
                message: '成功修改服务器',
              })
            } else {
              this.$message({
                type: 'error',
                message: '修改服务器配置失败' + r.data.Msg,
              })
            }
          })
          .catch((e) => {
            this.$message({
              type: 'error',
              message: '修改服务器配置失败' + JSON.stringify(e),
            })
          })
        //更新
        this.dialogFormVisible = false
        this.$common.getData(this)
      }
    },
  },
  computed: {},
}
</script>
<style>
.server-table {
  with: 90%;
}
.more-btn {
  background: linear-gradient(
    90deg,
    rgba(31, 51, 212, 1) 0%,
    rgba(51, 69, 223, 1) 48%,
    rgba(72, 88, 241, 1) 100%
  ) !important;
  color: whitesmoke !important;
}
.server-card {
  padding: 1rem 5%;
  border-radius: 0.5rem !important;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  margin-top: 2.5%;
}
</style>
