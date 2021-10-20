<template>
    <el-card shadow="never">
        <div class="d-f">
            <div class="left d-f">
                <div class="area-name">{{ blockViewDetail.name }}</div>
            </div>
            <div class="right">
                <ul class="list d-f">
                    <li>
                        <!-- <div class="icon"><i class="el-icon-s-tools"></i></div> -->
                        <div class="icon"><svg-icon icon-class="equipment" class="color-main"></svg-icon></div>
                        <div class="info">
                            <h3>4</h3>
                            <span>设备数</span>
                        </div>
                    </li>
                    <li>
                        <!-- <div class="icon"><i class="el-icon-grape"></i></div> -->
                        <div class="icon"><svg-icon icon-class="fish2" class="color-main"></svg-icon></div>
                        <div class="info">
                            <h3>2</h3>
                            <span>养殖品种数</span>
                        </div>
                    </li>
                    <li>
                        <!-- <div class="icon"><i class="el-icon-refrigerator"></i></div> -->
                        <div class="icon"><svg-icon icon-class="batch" class="color-main"></svg-icon></div> 
                        <div class="info">
                            <h3>3</h3>
                            <span>养殖批次数</span>
                        </div>
                    </li>
                    <li>
                        <!-- <div class="icon"><i class="el-icon-user"></i></div> -->
                        <div class="icon"><svg-icon icon-class="ums-role" class="color-main"></svg-icon></div> 
                        <div class="info">
                            <h3>1</h3>
                            <span>管理员人数</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <el-tabs v-model="activeName">
                <el-tab-pane label="设备" name="first">
                </el-tab-pane>
                <el-tab-pane label="养殖品种" name="second">
                </el-tab-pane>
                <el-tab-pane label="养殖批次" name="third">
                </el-tab-pane>
                <el-tab-pane label="管理员" name="fourth">
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script>
  import {fetchList,createBlock,updateBlock,deleteBlock,getBlockDetail} from '@/api/block'

  const defaultBlockDetail= {
    name: '',
    description: '',
    area: 0,
  };
  export default {
    name: "BlockView",
    props: {
    },
    data() {
      return {
        blockViewDetail: Object.assign({}, defaultBlockDetail),
        activeName: 'first',
      }
    },
    created() {
      getBlockDetail(this.$route.query.id).then(response => {
        this.blockViewDetail = response.data;
      });
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
