<template>
  <el-row :gutter="30" class="op-row">
    <el-col :span="6">
      <el-card class="op-card">
        <div class="op-tip">您可能需要以下操作</div>
        <el-button type="primary" class="op-button">添加中转服务器</el-button>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="op-card">
        <div class="op-tip">您可能需要以下操作</div>
        <el-button type="primary" class="op-button">添加转发规则</el-button>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="op-card">
        <div class="op-tip">您可能需要以下操作</div>
        <el-button type="primary" class="op-button">重启Brook</el-button>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="op-card">
        <div class="op-tip">您可能需要以下操作</div>
        <el-button type="primary" class="op-button">停止Brook</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'OperationBar',
  data() {
    return {}
  },
}
</script>

<style scoped>
.op-row {
  margin-top: 5%;
}
.op-card {
  border-radius: 0.5rem !important;
  background-clip: padding-box;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.op-tip {
  font-size: 0.8em;
  color: gray;
  margin: 10px auto;
  font-weight: bold;
  margin-bottom: 15%;
}
.op-button {
  background: linear-gradient(
    90deg,
    rgba(31, 51, 212, 1) 0%,
    rgba(51, 69, 223, 1) 48%,
    rgba(72, 88, 241, 1) 100%
  ) !important;
  word-break: break-all;
}
</style>
