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
                    <storage-list></storage-list>
                </el-tab-pane>
                <el-tab-pane label="入库记录" name="second">
                    <storage-record-list></storage-record-list>
                </el-tab-pane>
                <el-tab-pane label="出库记录" name="third">
                    <storage-record-list></storage-record-list>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script>
  import StorageList from './components/StorageList';
  import storageRecordList from './../storageRecord/index';

  export default {
    name: "storage",
    components: { StorageList, storageRecordList },
    data() {
      return {
        activeName: 'first',
        blockSelected: '',
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
