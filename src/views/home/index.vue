<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">区块数</div>
            <div class="color-main address-content">
              <a>{{ stats.blockNum }}</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">总批次数</div>
            <div class="color-main address-content">
              <a>{{ stats.totalBatchNum }}</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">本周批次数</div>
            <div class="color-main address-content">
              <a>{{ stats.weekBatchNum }}</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="out-border">
            <div class="layout-title">上周批次数</div>
            <div class="color-main address-content">
              <a>{{ stats.lastWeekBatchNum }}</a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon" />
            <div class="total-title">本周销售总数</div>
            <div class="total-value" v-if="stats.weekSaleQuantity == ''">
              0
            </div>
            <div v-else class="total-value">{{ stats.weekSaleQuantity }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon" />
            <div class="total-title">上周销售总数</div>
            <div class="total-value" v-if="stats.lastWeekSaleQuantity == ''">
              0
            </div>
            <div v-else class="total-value">{{ stats.lastWeekSaleQuantity }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon" />
            <div class="total-title">本周销售总额</div>
            <div class="total-value">￥{{ stats.weekSaleAmount }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon" />
            <div class="total-title">上周销售总额</div>
            <div class="total-value">￥{{ stats.lastWeekSaleAmount }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">本周告警数</span>
              <span style="float: right" class="color-danger"
                >({{ stats.weekAlertNum }})</span
              >
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">上周告警数</span>
              <span style="float: right" class="color-danger"
                >({{ stats.lastWeekAlertNum }})</span
              >
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">告警总数</span>
              <span style="float: right" class="color-danger"
                >({{ stats.totalAlertNum }})</span
              >
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">本月出库</span>
              <span style="float: right" class="color-danger"
                >({{ stats.outStorageNum }})</span
              >
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">本月入库</span>
              <span style="float: right" class="color-danger"
                >({{ stats.inStorageNum }})</span
              >
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认仓库农资数</span>
              <span style="float: right" class="color-danger"
                >({{ stats.tbcStorageNum }})</span
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">400</el-col>
                <el-col :span="6" class="color-danger overview-item-value">50</el-col>
                <el-col :span="6" class="color-danger overview-item-value">500</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">200</el-col>
                <el-col :span="6" class="color-danger overview-item-value">1000</el-col>
                <el-col :span="6" class="color-danger overview-item-value">5000</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div> -->
    <div class="statistics-layout">
      <div class="layout-title">区块统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399; font-size: 14px">本周批次总数</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                {{ stats.weekBatchNum }}
              </div>
              <div v-if="batchRate != null">
                <span class="color-danger" style="font-size: 14px">{{batchRate}}%</span>
                <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本周养殖总数</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                <span v-if="stats.weekBatchQuantity == ''">0</span>
                <span v-else>{{ stats.weekBatchQuantity }}</span>
              </div>
              <div v-if="weekBatchQuantity1 != null || weekBatchQuantity2 != null">
                <span v-if="weekBatchQuantity1 != null && weekBatchQuantity1 >= 0" class="color-success" style="font-size: 14px">+{{weekBatchQuantity1}}公斤</span>
                <span v-if="weekBatchQuantity1 != null && weekBatchQuantity1 < 0" class="color-danger" style="font-size: 14px">{{weekBatchQuantity1}}公斤</span>
                <span v-if="weekBatchQuantity2 != null && weekBatchQuantity2 >= 0" class="color-success" style="font-size: 14px">+{{weekBatchQuantity2}}尾</span>
                <span v-if="weekBatchQuantity2 != null && weekBatchQuantity2 < 0" class="color-danger" style="font-size: 14px">{{weekBatchQuantity2}}尾</span>
                <span style="color: #c0c4cc; font-size: 14px">相比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本周销售总数</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                <span v-if="stats.weekSaleQuantity == ''">0</span>
                <span v-else>{{ stats.weekSaleQuantity }}</span>
              </div>
              <div v-if="weekSaleQuantity1 != null || weekSaleQuantity2 != null">
                <span v-if="weekSaleQuantity1 != null && weekSaleQuantity1 >= 0" class="color-success" style="font-size: 14px">+{{weekSaleQuantity1}}公斤</span>
                <span v-if="weekSaleQuantity1 != null && weekSaleQuantity1 < 0" class="color-danger" style="font-size: 14px">{{weekSaleQuantity1}}公斤</span>
                <span v-if="weekSaleQuantity2 != null && weekSaleQuantity2 >= 0" class="color-success" style="font-size: 14px">+{{weekSaleQuantity2}}尾</span>
                <span v-if="weekSaleQuantity2 != null && weekSaleQuantity2 < 0" class="color-danger" style="font-size: 14px">{{weekSaleQuantity2}}尾</span>
                <span style="color: #c0c4cc; font-size: 14px">相比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本周销售总额</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                ￥{{ stats.weekSaleAmount }}
              </div>
              <div v-if="weekSaleAmountRate != null">
                <span v-if="weekSaleAmountRate >= 0" class="color-success" style="font-size: 14px">+{{ weekSaleAmountRate }}%</span>
                <span v-if="weekSaleAmountRate < 0" class="color-danger" style="font-size: 14px">{{ weekSaleAmountRate }}%</span>
                <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px; border-left: 1px solid #dcdfe6">
            <el-date-picker
              style="float: right; z-index: 1"
              size="small"
              v-model="batchNumDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"
              ></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { str2Date, formatDate } from "@/utils/date";
import { getHomeStats, getChartData } from "@/api/home";
import img_home_order from "@/assets/images/home_order.png";
import img_home_today_amount from "@/assets/images/home_today_amount.png";
import img_home_yesterday_amount from "@/assets/images/home_yesterday_amount.png";
const DATA_FROM_BACKEND = {
  columns: ["date", "batchNum", "saleAmount"],
  rows: [
    { date: "2021-11-01", batchNum: 10, saleAmount: 1093 },
    { date: "2021-11-02", batchNum: 20, saleAmount: 2230 },
    { date: "2021-11-03", batchNum: 33, saleAmount: 3623 },
    { date: "2021-11-04", batchNum: 50, saleAmount: 6423 },
    { date: "2021-11-05", batchNum: 80, saleAmount: 8492 },
    { date: "2021-11-06", batchNum: 60, saleAmount: 6293 },
    { date: "2021-11-07", batchNum: 20, saleAmount: 2293 },
    { date: "2021-11-08", batchNum: 60, saleAmount: 6293 },
    { date: "2021-11-09", batchNum: 50, saleAmount: 5293 },
    { date: "2021-11-10", batchNum: 30, saleAmount: 3293 },
    { date: "2021-11-11", batchNum: 20, saleAmount: 2293 },
    { date: "2021-11-12", batchNum: 80, saleAmount: 8293 },
    { date: "2021-11-13", batchNum: 100, saleAmount: 10293 },
    { date: "2021-11-14", batchNum: 10, saleAmount: 1293 },
    { date: "2021-11-15", batchNum: 40, saleAmount: 4293 },
  ],
};
export default {
  name: "home",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              let start = formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), "yyyy-MM-dd") + ' 00:00:00';
              let end = formatDate(new Date(), "yyyy-MM-dd") + ' 00:00:00';
              picker.$emit("pick", [str2Date(start), str2Date(end)]);
            },
          },
          {
            text: "最近一月",
            onClick(picker) {
              let start = formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), "yyyy-MM-dd") + ' 00:00:00';
              let end = formatDate(new Date(), "yyyy-MM-dd") + ' 00:00:00';
              picker.$emit("pick", [str2Date(start), str2Date(end)]);
            },
          },
        ],
      },
      batchNumDate: "",
      chartSettings: {
        xAxisType: "time",
        area: true,
        axisSite: { right: ["saleAmount"] },
        labelMap: { batchNum: "批次数", saleAmount: "销售金额" },
      },
      chartData: {
        columns: [],
        rows: [],
      },
      stats: {
        blockNum: 0,
        totalBatchNum: 0,
        weekBatchNum: 0,
        lastWeekBatchNum: 0,
        weekBatchQuantity: 0,
        lastWeekBatchQuantity: 0,
        weekBatchAmount: 0,
        lastWeekBatchAmount: 0,

        weekSaleQuantity: 0,
        lastWeekSaleQuantity: 0,
        weekSaleAmount: 0,
        lastWeekSaleAmount: 0,
        weekAlertNum: 0,
        lastWeekAlertNum: 0,
        totalAlertNum: 0,
        outStorageNum: 0,
        inStorageNum: 0,
        tbcStorageNum: 0,
      },
      loading: false,
      dataEmpty: false,
      img_home_order,
      img_home_today_amount,
      img_home_yesterday_amount,
      batchRate: null,
      weekBatchQuantity1: null,
      weekBatchQuantity2: null,
      weekSaleQuantity1: null,
      weekSaleQuantity2: null,
      weekSaleAmountRate: null,
    };
  },
  created() {
    this.getHomeStats();
    this.initDate();
    this.getChartData();
  },
  methods: {
    getHomeStats() {
      getHomeStats().then((response) => {
        this.stats = response.data;
        if (this.stats.lastWeekBatchNum != 0) {
          this.batchRate = (this.stats.weekBatchNum / this.stats.lastWeekBatchNum - 1) * 100
        }
        let batchValueList = this.getIncreaseNum(this.stats.lastWeekBatchQuantity, this.stats.weekBatchQuantity)
        this.weekBatchQuantity1 = batchValueList[0]
        this.weekBatchQuantity2 = batchValueList[1]
        let saleValueList = this.getIncreaseNum(this.stats.lastWeekSaleQuantity, this.stats.weekSaleQuantity)
        this.weekSaleQuantity1 = saleValueList[0]
        this.weekSaleQuantity2 = saleValueList[1]
        if (this.stats.lastWeekSaleAmount != 0) {
          this.weekSaleAmountRate = (this.stats.weekSaleAmount / this.stats.lastWeekSaleAmount - 1) * 100
        }
      });
    },
    getIncreaseNum(lastValue, nowValue) {
      let valueList = lastValue.split('+');
      let valueList2 = nowValue.split('+');
      let v1 = 0
      let v2 = 0
      let v11 = 0
      let v22 = 0
      for (let item of valueList) {
        if (item.indexOf('公斤') > -1) {
          v1 = parseInt(item.substring(0, item.length - 2))
        } else if (item.indexOf('尾') > -1) {
          v2 = parseInt(item.substring(0, item.length - 1))
        }
      }
      for (let item of valueList2) {
        if (item.indexOf('公斤') > -1) {
          v11 = parseInt(item.substring(0, item.length - 2))
        } else if (item.indexOf('尾') > -1) {
          v22 = parseInt(item.substring(0, item.length - 1))
        }
      }
      let dif1 = v11 - v1
      let dif2 = v22 - v2
      return [dif1, dif2]
    },
    handleDateChange() {
      this.getChartData();
    },
    initDate() {
      let start = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7);
      let end = new Date();
      this.batchNumDate = [start, end];
    },
    getChartData() {
      let params = {
        startTime: formatDate(this.batchNumDate[0], "yyyy-MM-dd hh:mm:ss"),
        endTime: formatDate(this.batchNumDate[1], "yyyy-MM-dd hh:mm:ss"),
      }
      this.loading = true;
      getChartData(params).then((response) => {
        this.chartData = {
          columns: ["date", "batchNum", "saleAmount"],
          rows: [],
        }
        this.chartData.rows = response.data;
        this.dataEmpty = false;
        this.loading = false;
      });
      // setTimeout(() => {
      //   this.chartData = {
      //     columns: ["date", "batchNum", "saleAmount"],
      //     rows: [],
      //   };
      //   for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
      //     let item = DATA_FROM_BACKEND.rows[i];
      //     let currDate = str2Date(item.date);
      //     let start = this.batchNumDate[0];
      //     let end = this.batchNumDate[1];
      //     if (
      //       currDate.getTime() >= start.getTime() &&
      //       currDate.getTime() <= end.getTime()
      //     ) {
      //       this.chartData.rows.push(item);
      //     }
      //   }
      //   this.dataEmpty = false;
      //   this.loading = false;
      // }, 1000);
    },
  },
};
</script>

<style scoped>
.app-container {
  margin-top: 20px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409eff;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}
.address-content {
  padding: 20px;
  font-size: 18px;
}
</style>
