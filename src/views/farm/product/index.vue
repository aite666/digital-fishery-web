<template>
    <el-card shadow="never">
        <div class="d-f">
            <div class="left d-f">
              <div class="wapper">
                <div class="top">
                  <el-select v-model="blockSelected">
                    <el-option
                      key="1"
                      label="区域1"
                      value="1">
                    </el-option>
                    <el-option
                      key="2"
                      label="区域2"
                      value="2">
                    </el-option>
                  </el-select>
                  <el-button class="add-button" type="primary">添加种养品种</el-button>
                </div>
                <p class="extra-info">区域面积：100亩</p>
              </div>
            </div>
            <div class="right">
                <ul class="list d-f">
                    <li>
                        <div class="icon"><i class="el-icon-grape"></i></div>
                        <div class="info">
                            <h3>4</h3>
                            <span>当前种养品种</span>
                        </div>
                    </li>
                    <li>
                        <div class="icon"><i class="el-icon-refrigerator"></i></div>
                        <div class="info">
                            <h3>30</h3>
                            <span>投放批次</span>
                        </div>
                    </li>
                    <li>
                        <div class="icon"><i class="el-icon-s-tools"></i></div>
                        <div class="info">
                            <h3>10</h3>
                            <span>出塘记录</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <el-row :gutter="12" style="margin: 20px 0 20px 0">
              <el-col :span="4">
                <el-card shadow="always">
                  鱼1
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  鱼2
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  鱼3
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  鱼4
                </el-card>
              </el-col>
            </el-row>
            <el-tabs v-model="activeName">
                <el-tab-pane label="投放批次" name="first">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="出塘记录" name="second">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="农资使用记录" name="third">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script>
  export default {
    name: "product",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        activeName: 'first',
        blockSelected: '',
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
    }
  }
</script>

<style scoped>
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
.add-button {
  margin: 0 30px 0 24px;
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
</style>
