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
      <el-card class="op-card">
        <div class="op-tip">信息显示</div>
        <el-row>
          <el-col :span="9" :offset="2">
            <div class="info-panel">
              <div>
                <span class="panel-num">{{
                  this.$store.state.infoPanel.onlineServers
                }}</span>
                <span class="num-divde">/</span>
                <span class="panel-num">{{
                  this.$store.state.infoPanel.totalServers
                }}</span>
              </div>
              <div>中转服务器(在线/总共)</div>
            </div>
          </el-col>
          <el-col :span="9" :offset="2">
            <div class="info-panel">
              <div>
                <span class="panel-num">{{
                  this.$store.state.infoPanel.enableForwards
                }}</span>
                <span class="num-divde">/</span>
                <span class="panel-num">{{
                  this.$store.state.infoPanel.totalForwards
                }}</span>
              </div>
              <div>中转记录(开启/总共)</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 电脑上 -->
    <div>
      <el-row :gutter="30" class="op-row hidden-xs-only">
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
        <el-col :span="12">
          <el-card class="op-card">
            <div class="op-tip">信息显示</div>
            <el-row>
              <el-col :span="9" :offset="2">
                <div class="info-panel">
                  <div>
                    <span class="panel-num">{{
                      this.$store.state.infoPanel.onlineServers
                    }}</span>
                    <span class="num-divde">/</span>
                    <span class="panel-num">{{
                      this.$store.state.infoPanel.totalServers
                    }}</span>
                  </div>
                  <div>中转服务器(在线/总共)</div>
                </div>
              </el-col>
              <el-col :span="9" :offset="2">
                <div class="info-panel">
                  <div>
                    <span class="panel-num">{{
                      this.$store.state.infoPanel.enableForwards
                    }}</span>
                    <span class="num-divde">/</span>
                    <span class="panel-num">{{
                      this.$store.state.infoPanel.totalForwards
                    }}</span>
                  </div>
                  <div>中转记录(开启/总共)</div>
                </div>
              </el-col>
            </el-row>
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
  padding: 6px;
  height: 8rem;
  font-size: 150%;
  border-radius: 0.5rem !important;
  background-clip: padding-box;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.panel-num {
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
}

.num-divde {
  padding: 0.5rem;
  font-size: 1.4rem;
}
.op-card-mobile {
  margin: 1rem auto;
}
.op-tip {
  font-size: 0.8em;
  color: gray;
  margin: 0px auto;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.op-button {
  margin-top: 0.5rem;
  background: linear-gradient(
    90deg,
    rgba(31, 51, 212, 1) 0%,
    rgba(51, 69, 223, 1) 48%,
    rgba(72, 88, 241, 1) 100%
  ) !important;
  word-break: break-all;
}

.info-panel {
  font-size: 0.8rem;
  color: gray;
}
.info-panel > div {
  padding: 0.5rem;
}
</style>
