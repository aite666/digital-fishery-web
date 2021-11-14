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
            <div class="icon">
              <svg-icon icon-class="equipment" class="color-main"></svg-icon>
            </div>
            <div class="info">
              <h3>{{ deviceNum }}</h3>
              <span>监测设备数</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-grape"></i></div> -->
            <div class="icon">
              <svg-icon icon-class="fish2" class="color-main"></svg-icon>
            </div>
            <div class="info">
              <h3>{{ productCategoryNum }}</h3>
              <span>养殖鱼类数</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-refrigerator"></i></div> -->
            <div class="icon">
              <svg-icon icon-class="batch" class="color-main"></svg-icon>
            </div>
            <div class="info">
              <h3>{{ batchNum }}</h3>
              <span>投放批次数</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-user"></i></div> -->
            <div class="icon">
              <svg-icon icon-class="ums-role" class="color-main"></svg-icon>
            </div>
            <div class="info">
              <h3>{{ adminNum }}</h3>
              <span>管理员人数</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设备" name="first">
          <device-list :blockId="blockSelectedId" :onlyView="onlyView">
          </device-list>
        </el-tab-pane>
        <el-tab-pane label="养殖品种" name="second">
          <el-row :gutter="12" style="margin: 20px 0 20px 0">
            <el-col
              :span="4"
              v-for="stat of productCategoryStats"
              :key="stat.productCategoryId"
            >
              <el-card shadow="always">
                <div class="card-content-item">
                  {{ stat.productCategoryName }}
                </div>
                <div class="card-content-item">
                  总批次数: {{ stat.batchCount }}
                </div>
                <div class="card-content-item">
                  总量: {{ stat.batchTotal | formatBatchTotal }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="养殖批次" name="third">
          <batch-list
            ref="batchList"
            :blockId="blockSelectedId"
            :onlyView="onlyView"
          ></batch-list>
        </el-tab-pane>
        <el-tab-pane label="管理员" name="fourth"> </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import {
  fetchList,
  createBlock,
  updateBlock,
  deleteBlock,
  getBlockDetail,
} from "@/api/block";
import { getProductCategoryList } from "@/api/batch";
import { getDeviceList } from "@/api/device";
import DeviceList from "./../../../iot/equipment/components/DeviceList";
import BatchList from "./../../../farm/product/components/BatchList";

const defaultBlockDetail = {
  name: "",
  description: "",
  area: 0,
};
export default {
  name: "BlockView",
  components: { DeviceList, BatchList },
  props: {},
  data() {
    return {
      blockViewDetail: Object.assign({}, defaultBlockDetail),
      activeName: "first",
      deviceNum: 0,
      productCategoryNum: 0,
      batchNum: 0,
      adminNum: 0,
      productCategoryStats: [],
      onlyView: true,
    };
  },
  created() {
    this.blockSelectedId = this.$route.query.id;
    this.getBlockDetail();
    this.getProductCategoryStats();
    this.getDeviceNum();
  },
  computed: {},
  methods: {
    getBlockDetail() {
      getBlockDetail(this.blockSelectedId).then((response) => {
        this.blockViewDetail = response.data;
      });
    },
    getProductCategoryStats() {
      getProductCategoryList(this.blockSelectedId).then((response) => {
        this.productCategoryStats = response.data;
        let productCategoryNum = 0;
        let batchNum = 0;
        for (let item of response.data) {
          productCategoryNum += 1;
          batchNum += item["batchCount"];
        }
        this.productCategoryNum = productCategoryNum;
        this.batchNum = batchNum;
      });
    },
    getDeviceNum() {
      let query = {
        pageNum: 1,
        pageSize: 100000,
        blockId: this.blockSelectedId,
      };
      getDeviceList(query).then((response) => {
        this.deviceNum = response.data.total;
      });
    },
  },
};
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
  margin-top: 20px;
}
</style>
