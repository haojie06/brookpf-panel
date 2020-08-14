<!--中转服务器列表-->
<template>
  <el-card class="forward-card">
    <el-divider content-position="left">中转记录列表</el-divider>
    <el-table :data="forwards" style="width: 100%">
      <el-table-column label="#" width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-d-arrow-right"></i>
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中转服务器" width="140" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>中转服务器名: {{ scope.row.rname }}</p>
            <p>中转服务器ip: {{ scope.row.lhost }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.rname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="服务器地址/本地端口" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lhost }}:{{ scope.row.lport }}</span>
        </template>
      </el-table-column>
      <el-table-column label="被转发地址/远程端口" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rhost }}:{{ scope.row.rport }}</span>
        </template></el-table-column
      >
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.enable }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="stopForward(scope.$index, scope.row)"
            v-if="scope.row.enable"
          >
            停用
          </el-button>
          <el-button
            size="mini"
            @click="startForward(scope.$index, scope.row)"
            v-if="!scope.row.enable"
          >
            启用
          </el-button>
          <el-popconfirm
            title="确定要删除该中转记录吗"
            style="margin-left: 0.2rem"
            @onConfirm="deleteForward(scope.$index, scope.row)"
          >
            <el-button slot="reference" type="danger" size="mini"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  name: 'ForwardCard',
  props: ['forwards'],
  data() {
    return {
      index: 1,
    }
  },
  methods: {
    stopForward: function(index, row) {
      //停用转发
      console.log('停用转发' + index + JSON.stringify(row))
      let formData = new FormData()
      formData.append('Username', row.username)
      formData.append('Password', row.password)
      formData.append('LocalPort', row.lport)
      formData.append('Enable', 0)
      this.$axios
        .post(`http://${row.lhost}:${row.controlport}/api/switchpf`, formData)
        .then((r) => {
          console.log('切换转发状态\n' + JSON.stringify(r.data))
          if (r.data.Code == 200) {
            this.$notify({
              title: '成功',
              message: '成功停用转发',
              type: 'success',
            })
          } else {
            this.$notify({
              title: '失败',
              message: '停用转发失败' + r.data.Msg,
              type: 'error',
            })
          }
        })
        .catch((e) => {
          console.log('停用转发错误\n' + JSON.stringify(e))
          this.$notify({
            title: '失败',
            message: '停用转发失败' + JSON.stringify(e),
            type: 'error',
          })
        })
      this.$common.getData(this)
    },
    startForward: function(index, row) {
      console.log('启用转发' + index + JSON.stringify(row))
      let formData = new FormData()
      formData.append('Username', row.username)
      formData.append('Password', row.password)
      formData.append('LocalPort', row.lport)
      formData.append('Enable', 1)
      this.$axios
        .post(`http://${row.lhost}:${row.controlport}/api/switchpf`, formData)
        .then((r) => {
          console.log('切换转发状态\n' + JSON.stringify(r.data))
          if (r.data.Code == 200) {
            this.$notify({
              title: '成功',
              message: '成功启用转发',
              type: 'success',
            })
          } else {
            this.$notify({
              title: '失败',
              message: '启用转发失败' + r.data.Msg,
              type: 'error',
            })
          }
        })
        .catch((e) => {
          console.log('启用转发错误\n' + JSON.stringify(e))
          this.$notify({
            title: '失败',
            message: '启用转发失败' + JSON.stringify(e),
            type: 'error',
          })
        })
      this.$common.getData(this)
    },
    deleteForward: function(index, row) {
      //删除转发
      console.log('删除转发' + index + JSON.stringify(row))
      let formData = new FormData()
      formData.append('Username', row.username)
      formData.append('Password', row.password)
      formData.append('LocalPort', row.lport)
      this.$axios
        .post(`http://${row.lhost}:${row.controlport}/api/delpf`, formData)
        .then((r) => {
          console.log('删除转发\n' + JSON.stringify(r.data))
          if (r.data.Code == 200) {
            this.$notify({
              title: '成功',
              message: '成功删除转发记录',
              type: 'success',
            })
          } else {
            this.$notify({
              title: '失败',
              message: '删除转发记录失败' + r.data.Msg,
              type: 'error',
            })
          }
        })
        .catch((e) => {
          console.log('删除转发错误\n' + JSON.stringify(e))
          this.$notify({
            title: '失败',
            message: '删除转发记录失败' + JSON.stringify(e),
            type: 'error',
          })
        })
      //更新数据
      this.$common.getData(this)
    },
  },
}
</script>
<style>
.forward-card {
  border-radius: 0.5rem !important;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  margin-top: 2.5%;
}
</style>
