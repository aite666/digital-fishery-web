<template>
    <el-card shadow="never">
        <div class="d-f">
          <div class="right">
              <ul class="list d-f">
                  <li>
                      <div class="icon"><i class="el-icon-grape"></i></div>
                      <div class="info">
                          <h3>4</h3>
                          <span>本月出库</span>
                      </div>
                  </li>
                  <li>
                      <div class="icon"><i class="el-icon-refrigerator"></i></div>
                      <div class="info">
                          <h3>30</h3>
                          <span>本月入库</span>
                      </div>
                  </li>
                  <li>
                      <div class="icon"><i class="el-icon-s-tools"></i></div>
                      <div class="info">
                          <h3>10</h3>
                          <span>偏少农资</span>
                      </div>
                  </li>
                  <li>
                      <div class="icon"><i class="el-icon-s-tools"></i></div>
                      <div class="info">
                          <h3>10</h3>
                          <span>偏多农资</span>
                      </div>
                  </li>
              </ul>
          </div>
        </div>
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane label="库存" name="first">
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
                <el-tab-pane label="入库记录" name="second">
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
                <el-tab-pane label="出库记录" name="third">
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
    name: "storage",
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
    padding-left: 00px;
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
