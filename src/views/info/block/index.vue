<template>
  <el-container>
    <el-header>
      <span class="header-text">区块管理</span>
      <el-button type="primary" class="header-button">创建区块</el-button>
    </el-header>

    <el-main>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span class="card-title">区块1</span>
              <el-button class="card-button" type="text" icon="el-icon-delete">
              </el-button>
              <el-button class="card-button" type="text" icon="el-icon-edit">
              </el-button>
            </div>
            <div @click="handleViewBlock()" class="card-hover">
              <div class="card-content-item">介绍：1111111</div>
              <div class="card-content-item">面积：100亩</div>
              <div class="card-content-item">种养品种：鱼</div>
              <div class="card-content-item">种养批次：123</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span class="card-title">区块1</span>
              <el-button class="card-button" type="text" icon="el-icon-delete">
              </el-button>
              <el-button class="card-button" type="text" icon="el-icon-edit">
              </el-button>
            </div>
            <div @click="handleViewBlock()" class="card-hover">
              <div class="card-content-item">介绍：1111111</div>
              <div class="card-content-item">面积：100亩</div>
              <div class="card-content-item">种养品种：鱼</div>
              <div class="card-content-item">种养批次：123</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span class="card-title">区块1</span>
              <el-button class="card-button" type="text" icon="el-icon-delete">
              </el-button>
              <el-button class="card-button" type="text" icon="el-icon-edit">
              </el-button>
            </div>
            <div @click="handleViewBlock()" class="card-hover">
              <div class="card-content-item">介绍：1111111</div>
              <div class="card-content-item">面积：100亩</div>
              <div class="card-content-item">种养品种：鱼</div>
              <div class="card-content-item">种养批次：123</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span class="card-title">区块1</span>
              <el-button class="card-button" type="text" icon="el-icon-delete">
              </el-button>
              <el-button class="card-button" type="text" icon="el-icon-edit">
              </el-button>
            </div>
            <div @click="handleViewBlock()" class="card-hover">
              <div class="card-content-item">介绍：1111111</div>
              <div class="card-content-item">面积：100亩</div>
              <div class="card-content-item">种养品种：鱼</div>
              <div class="card-content-item">种养批次：123</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    methods: {
      handleViewBlock() {
        this.$router.push({path:'/info/blockView'});
      },
    }
  }
</script>
<style scoped>
.el-header {
  color: #333;
  line-height: 80px;
}
.header-text {
  font-size: 22px;
  font-weight: 500;
  margin-left: 20px;
}
.header-button {
  float:right;
  margin: 20px 30px;
}
.el-main {
  padding-left: 40px;
  padding-right: 50px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.card-hover {
  cursor: pointer;
}
.card-title {
  font-size: 20px;
}
.card-button {
  float: right;
  padding: 0 5px;
  font-size: 20px;
}
.card-content-item {
  font-size: 14px;
  margin-bottom: 10px;
}
</style>


