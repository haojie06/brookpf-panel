<template>
  <div>
    <!--添加中转服务器表单-->
    <el-dialog
      :show-close="false"
      title="添加中转服务器"
      :visible.sync="this.$store.state.addServerFormVisable"
      class="hidden-sm-and-down"
    >
      <el-form :model="addServerForm">
        <el-form-item label="服务器名称" :label-width="formLabelWidth">
          <el-input v-model="addServerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务器地址" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="addServerForm.host"
                autocomplete="off"
                placeholder="服务器IP"
              ></el-input>
            </el-col>
            <el-col :span="2">:</el-col>
            <el-col :span="8"
              ><el-input
                v-model="addServerForm.port"
                autocomplete="off"
                placeholder="端口"
              ></el-input
            ></el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="服务器用户名" :label-width="formLabelWidth">
          <el-input
            v-model="addServerForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="服务器密码" :label-width="formLabelWidth">
          <el-input
            v-model="addServerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          v-model="addServerForm.desc"
        >
          <el-input
            type="textarea"
            v-model="addServerForm.desc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddServer">取 消</el-button>
        <el-button type="primary" @click="confirmAddServer">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加中转服务器表单 小屏幕显示的模板-->
    <el-dialog
      :show-close="false"
      title="添加中转服务器"
      :visible.sync="this.$store.state.addServerFormVisable"
      :fullscreen="true"
      :modal="false"
      class="hidden-sm-and-up"
    >
      <el-form :model="addServerForm">
        <el-form-item label="服务器名称" :label-width="formLabelWidth">
          <el-input v-model="addServerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务器地址" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="addServerForm.host"
                autocomplete="off"
                placeholder="服务器IP"
              ></el-input>
            </el-col>
            <el-col :span="2">:</el-col>
            <el-col :span="8"
              ><el-input
                v-model="addServerForm.port"
                autocomplete="off"
                placeholder="端口"
              ></el-input
            ></el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="服务器用户名" :label-width="formLabelWidth">
          <el-input
            v-model="addServerForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="服务器密码" :label-width="formLabelWidth">
          <el-input
            v-model="addServerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          :label-width="formLabelWidth"
          v-model="addServerForm.desc"
        >
          <el-input
            type="textarea"
            v-model="addServerForm.desc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddServer">取 消</el-button>
        <el-button type="primary" @click="confirmAddServer">确 定</el-button>
      </div>
    </el-dialog>
    <!---添加中转表单-->
    <el-dialog
      class="add-server hidden-sm-and-down"
      :show-close="false"
      title="添加中转记录"
      :visible.sync="this.$store.state.addForwardFormVisable"
    >
      <el-form :model="addServerForm">
        <el-form-item label="中转名称" :label-width="formLabelWidth">
          <el-input v-model="addForwardForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中转服务器" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14">
              <el-select
                v-model="addForwardForm.lserver"
                placeholder="选择服务器"
                style="display: block"
                value-key="ID"
                @change="onChange"
              >
                <el-option
                  v-for="item in servers"
                  :key="item.ID"
                  :label="item.IP"
                  :value="item"
                  :disabled="!item.Online || !item.Installed"
                >
                  <span style="float: left">{{ item.IP }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.Name
                  }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">:</el-col>
            <el-col :span="8">
              <el-input
                v-model="addForwardForm.lport"
                autocomplete="off"
                placeholder="端口"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="被中转服务器" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="addForwardForm.host"
                autocomplete="off"
                placeholder="被中转服务器IP"
              ></el-input>
            </el-col>
            <el-col :span="2">:</el-col>
            <el-col :span="8"
              ><el-input
                v-model="addForwardForm.rport"
                autocomplete="off"
                placeholder="端口"
              ></el-input
            ></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autocomplete="off"
            v-model="addForwardForm.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddForward">取 消</el-button>
        <el-button type="primary" @click="confirmAddForward">确 定</el-button>
      </div>
    </el-dialog>
    <!---添加中转表单 小屏幕显示-->
    <el-dialog
      class="add-server hidden-sm-and-up"
      :modal="false"
      :fullscreen="true"
      :show-close="false"
      title="添加中转记录"
      :visible.sync="this.$store.state.addForwardFormVisable"
    >
      <el-form :model="addServerForm">
        <el-form-item label="中转名称" :label-width="formLabelWidth">
          <el-input v-model="addForwardForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中转服务器" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14">
              <el-select
                v-model="addForwardForm.lserver"
                placeholder="选择服务器"
                style="display: block"
                value-key="ID"
                @change="onChange"
              >
                <el-option
                  v-for="item in servers"
                  :key="item.ID"
                  :label="item.IP"
                  :value="item"
                  :disabled="!item.Online || !item.Installed"
                >
                  <span style="float: left">{{ item.IP }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.Name
                  }}</span>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">:</el-col>
            <el-col :span="8">
              <el-input
                v-model="addForwardForm.lport"
                autocomplete="off"
                placeholder="端口"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="被中转服务器" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="14"
              ><el-input
                v-model="addForwardForm.host"
                autocomplete="off"
                placeholder="被中转服务器IP"
              ></el-input>
            </el-col>
            <el-col :span="2">:</el-col>
            <el-col :span="8"
              ><el-input
                v-model="addForwardForm.rport"
                autocomplete="off"
                placeholder="端口"
              ></el-input
            ></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autocomplete="off"
            v-model="addForwardForm.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddForward">取 消</el-button>
        <el-button type="primary" @click="confirmAddForward">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PopupForm',
  props: ['servers', 'forwards'],
  data() {
    return {
      addServerForm: {
        name: '',
        desc: '',
        username: '',
        password: '',
        host: '',
        port: '',
      },
      addForwardForm: {
        lport: '',
        rport: '',
        lserver: {},
        host: '',
        name: '',
        desc: '',
      },
      formLabelWidth: '100px',
    }
  },
  methods: {
    onChange: function(e) {
      console.log('选中' + JSON.stringify(e))
      console.log('此时lserver' + JSON.stringify(this.addForwardForm.lserver))
    },
    cancelAddServer: function() {
      //this.addServerFormVisable = true
      this.$store.commit('updateAddServerFormVisable', false)
    },
    cancelAddForward: function() {
      this.$store.commit('updateAddForwardFormVisable', false)
    },
    confirmAddServer: function() {
      //先判断是否都填了
      let completed = true
      for (let i in this.addServerForm) {
        if (i != 'desc' && this.addServerForm[i] == '') {
          completed = false
        }
      }
      if (!completed) {
        this.$notify({
          title: '表单不完整',
          message: '表单不完整，无法提交',
          type: 'warning',
        })
      } else {
        //axios添加
        let formData = new FormData()
        formData.append('Username', this.$store.state.username)
        formData.append('Password', this.$store.state.password)
        formData.append('ServerUser', this.addServerForm.username)
        formData.append('ServerPassword', this.addServerForm.password)
        formData.append('Name', this.addServerForm.name)
        formData.append('IP', this.addServerForm.host)
        formData.append('Port', this.addServerForm.port)
        formData.append('Desc', this.addServerForm.desc)
        this.$axios
          .post(this.$store.state.webServerUrl + '/web/addserver', formData)
          .then((response) => {
            console.log('提交表单回应\n' + JSON.stringify(response))
            if (response.data.Code == 200) {
              this.$notify({
                title: '成功添加',
                message: '成功添加中转服务器',
                type: 'success',
              })
            } else {
              this.$notify({
                title: '添加失败',
                message: '添加中转服务器失败\n' + JSON.stringify(response.data),
                type: 'error',
              })
            }
          })
          .catch((err) => {
            console.log('提交表单出错\n' + JSON.stringify(err))
            this.$notify({
              title: '添加失败',
              message: '添加中转服务器失败\n' + JSON.stringify(err),
              type: 'error',
            })
          })
        //展示加载
        this.$store.commit('updateAddServerFormVisable', false)
        //刷新页面
        this.$common.getData(this)
      }
    },
    confirmAddForward: function() {
      console.log('确认提交中转记录')
      //先确定所有的表单都填了
      let completed = true
      let lack = ''
      for (let i in this.addForwardForm) {
        if (this.addForwardForm[i] == '') {
          completed = false
          lack += i
        }
      }
      if (completed) {
        let formData = new FormData()
        formData.append('Password', this.addForwardForm.lserver.Password)
        formData.append('Username', this.addForwardForm.lserver.UserName)
        formData.append('LocalPort', this.addForwardForm.lport)
        formData.append('RemotePort', this.addForwardForm.rport)
        formData.append('Host', this.addForwardForm.host)
        formData.append('Description', this.addForwardForm.desc)
        formData.append('Name', this.addForwardForm.name)
        formData.append('Enable', 1)
        this.$axios
          .post(
            `http://${this.addForwardForm.lserver.IP}:${this.addForwardForm.lserver.Port}/api/addpf`,
            formData
          )
          .then((r) => {
            console.log(JSON.stringify(r.data))
          })
          .catch((e) => {
            console.log(JSON.stringify(e))
          })
        this.$store.commit('updateAddForwardFormVisable', false)
        this.$common.getData(this)
        //this.$router.go(0)
      } else {
        this.$message({
          type: 'warning',
          message: '存在未填项' + lack,
        })
      }
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 480px) {
  .add-server > el-form {
    width: 90%;
  }
}

.el-form-item-dev {
  text-align: left;
}
</style>
