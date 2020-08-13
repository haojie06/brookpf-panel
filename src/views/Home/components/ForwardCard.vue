<!--中转服务器列表-->
<template>
  <el-card class="forward-card">
    <el-divider content-position="left">中转记录列表</el-divider>
    <el-table :data="forwards" style="width: 100%">
      <el-table-column label="#" width="80">
        <template>
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">#</span>
        </template>
      </el-table-column>
      <el-table-column label="中转服务器" width="140">
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
      <el-table-column label="服务器地址/本地端口">
        <template slot-scope="scope">
          <span>{{ scope.row.lhost }}:{{ scope.row.lport }}</span>
        </template>
      </el-table-column>
      <el-table-column label="被转发地址/远程端口">
        <template slot-scope="scope">
          <span>{{ scope.row.rhost }}:{{ scope.row.rport }}</span>
        </template></el-table-column
      >
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.enable }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >停用</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
