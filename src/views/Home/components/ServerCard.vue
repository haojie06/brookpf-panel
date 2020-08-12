<!--中转服务器列表-->
<template>
  <el-card class="server-card">
    <el-divider content-position="left">中转服务器列表</el-divider>
    <el-table :data="servers" style="width: 100%">
      <el-table-column label="#">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
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
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.Desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >
              更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>test</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
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
    return {}
  },
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
