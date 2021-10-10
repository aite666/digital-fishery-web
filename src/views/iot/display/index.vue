<template>
    <el-card shadow="never">
        <div class="info-panel d-f">
            <div class="left d-f">
              <div class="wapper">
                <div class="top">
                  <block-select class="select-block " @block="getBlock"></block-select>
                </div>
              </div>
            </div>
            <div class="right">
                <ul class="list d-f">
                    <li>
                        <div class="icon"><i class="el-icon-grape"></i></div>
                        <div class="info">
                            <h3>10</h3>
                            <span>监测信息</span>
                        </div>
                    </li>
                    <li>
                        <div class="icon"><i class="el-icon-refrigerator"></i></div>
                        <div class="info">
                            <h3>10</h3>
                            <span>警告信息</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
          <span class="content-text">监测数据</span>
          <el-select class="select-monitor-type" v-model="monitorTypeSelected">
            <el-option
              key="all"
              label="全部类型"
              value="all">
            </el-option>
            <el-option
              key="1"
              label="HP"
              value="1">
            </el-option>
            <el-option
              key="2"
              label="温度"
              value="2">
            </el-option>
          </el-select>
          <el-row :gutter="12" style="margin: 20px 0 20px 0">
            <el-col :span="4">
              <el-card shadow="always">
                <div @click="handleViewData()" class="card-hover">
                  <div class="card-content-item">43.33℃</div>
                  <div class="card-content-item">CPU温度 122168720202</div>
                  <div class="card-content-item">区块1</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div @click="handleViewData()" class="card-hover">
                  <div class="card-content-item">43.33℃</div>
                  <div class="card-content-item">CPU温度 122168720202</div>
                  <div class="card-content-item">区块1</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div @click="handleViewData()" class="card-hover">
                  <div class="card-content-item">43.33℃</div>
                  <div class="card-content-item">CPU温度 122168720202</div>
                  <div class="card-content-item">区块1</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
    </el-card>
</template>

<script>
  import BlockSelect from './../../info/block/components/BlockSelect';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null,
    blockId: null,
  };
  export default {
    name: "display",
    components:{BlockSelect},
    props: {
    },
    data() {
      return {
        activeName: 'first',
        blockSelected: 'all',
        monitorTypeSelected: 'all',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    created() {
    },
    computed:{
    },
    methods: {
      getBlock(block) {
          if (block) {
            this.listQuery.blockId = block.id;
          } else {
            this.listQuery.blockId = null;
          }
      },
      handleViewData() {

      }
    }
  }
</script>

<style scoped>
.info-panel {
  border-bottom: 1px solid #ebeef5;
}
.left {
    /* width: 255px; */
    height: 80px;
    border-right: 1px solid #ebeef5;
    padding-left: 10px;
}
.extra-info {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    color: #909399;
    line-height: 17px;
}
.select-block {
  margin: 0 30px 0 0px;
}
.content-text {
  margin: 0 0 0 10px;
  font-size: 20px;
  font-weight: 500;
}
.select-monitor-type {
  margin: 0 0 0 10px;
}
.d-f {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.left .area-name {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    padding-left: 40px;
    padding-right: 60px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.right .list {
    padding-left: 10px;
}
.right .list li {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-left: 50px;
}
.right .list li .icon {
    margin-right: 20px;
    font-size: 34px;
    padding-top: 13px;
}
.right .list li .info {
    color: #171717;
}
.content {
    margin-top:20px;
}
.card-content-item {
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
