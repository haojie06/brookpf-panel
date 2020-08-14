<template>
  <div>
    <div class="op-row-mobile hidden-sm-and-up">
      <!-- 手机显示的卡片按钮 -->
      <el-card class="op-card op-card-mobile">
        <div class="op-tip">您可能需要以下操作</div>
        <el-button type="primary" class="op-button" @click="addServer"
          >添加中转服务器</el-button
        >
      </el-card>
      <el-card class="op-card op-card-mobile">
        <div class="op-tip">您可能需要以下操作</div>
        <el-button type="primary" class="op-button" @click="addForward"
          >添加转发规则</el-button
        >
      </el-card>
    </div>
    <div>
      <el-row :gutter="30" class="op-row hidden-sm-and-down">
        <el-col :span="6">
          <el-card class="op-card">
            <div class="op-tip">您可能需要以下操作</div>
            <el-button type="primary" class="op-button" @click="addServer"
              >添加中转服务器</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="op-card">
            <div class="op-tip">您可能需要以下操作</div>
            <el-button type="primary" class="op-button" @click="addForward"
              >添加转发规则</el-button
            >
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationBar',
  data() {
    return {
      addServerForm: {
        name: '',
        region: '',
      },
      addForwardForm: {},
    }
  },
  methods: {
    addServer: function() {
      //this.addServerFormVisable = true
      this.$store.commit('updateAddServerFormVisable', true)
    },
    addForward: function() {
      //this.addForwardFormVisable = true
      this.$store.commit('updateAddForwardFormVisable', true)
    },
  },
}
</script>

<style scoped>
.op-row {
  margin-top: 5%;
}
.op-card {
  font-size: 150%;
  border-radius: 0.5rem !important;
  background-clip: padding-box;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.op-card-mobile {
  margin: 1rem auto;
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
