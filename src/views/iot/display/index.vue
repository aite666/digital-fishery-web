<template>
  <el-card shadow="never">
    <div class="info-panel d-f">
      <div class="left d-f">
        <div class="wapper">
          <div class="top">
            <block-select class="select-block" @block="getBlock"></block-select>
          </div>
        </div>
      </div>
      <div class="right">
        <ul class="list d-f">
          <li>
            <!-- <div class="icon"><i class="el-icon-grape"></i></div> -->
            <div class="icon">
              <svg-icon icon-class="monitor" class="color-main"></svg-icon>
            </div>
            <div class="info">
              <h3>{{ factorNum }}</h3>
              <span>监测信息</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-refrigerator"></i></div> -->
            <div class="icon">
              <svg-icon icon-class="alert" class="color-main"></svg-icon>
            </div>
            <div class="info">
              <h3>{{ alertNum }}</h3>
              <span>警告信息(最近一天)</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <span class="content-text">监测数据</span>
      <el-select
        class="select-monitor-type"
        v-model="factorSelected"
        @change="changeFactorType()"
      >
        <el-option
          v-for="item of factorTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-switch
        style="margin-left: 10px"
        v-model="dataMode"
        active-text="历史数据"
        inactive-text="实时数据"
        @change="changeDataMode"
      >
      </el-switch>
      <el-date-picker
        v-if="dataMode"
        style="margin-left: 10px"
        v-model="range"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00']"
        @change="changeRange"
      >
      </el-date-picker>
      <div v-if="!dataMode" style="margin: 20px 0 20px 0">
        <el-row
          :gutter="12"
          v-for="(deviceItem, index) of factorDeviceList"
          :key="'device_' + index"
        >
          <el-col
            :span="4"
            v-for="item of deviceItem"
            :key="'realtime_' + item.factorId"
          >
            <el-card shadow="always" style="margin-bottom: 20px">
              <div class="card-hover">
                <div class="card-icon">
                  <svg-icon
                    :icon-class="getIcon(item.factorName)"
                    class="color-main"
                  ></svg-icon>
                </div>
                <div class="card-content-item">
                  <strong class="card-num">{{ item.value }}</strong
                  >{{ item.unit }}
                </div>
                <div class="card-content-item">
                  {{ item.factorName }} {{ item.deviceAddr }}
                </div>
                <div class="card-content-item">
                  所在区块：{{ item.blockName }}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-if="dataMode" style="margin: 20px 0 20px 0">
        <el-row
          :gutter="12"
          v-for="(deviceItem, index) of nodeChartDeviceList"
          :key="'device2_' + index"
        >
          <el-col
            :span="8"
            v-for="item of deviceItem"
            :key="'history_' + item.dataKey"
          >
            <el-card shadow="always" style="margin-bottom: 20px">
              <div class="card-hover">
                <!-- <div class="card-icon"><svg-icon :icon-class="getIcon(item.registerName)" class="color-main"></svg-icon></div>
                    <div class="card-content-item">
                      <strong class="card-num">{{item.data[0].value}}</strong>
                    </div>
                    <div class="card-content-item">{{item.registerName}} {{item.deviceAddr}}</div>
                    <div class="card-content-item">时间：{{item.data[0].time}}</div> -->
                <div class="echarts" :ref="item.dataKey"></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-empty
          v-if="nodeChartDeviceList.length == 0"
          description="暂无数据">
        </el-empty>
      </div>
    </div>
  </el-card>
</template>

<script>
import BlockSelect from "./../../info/block/components/BlockSelect";
import { getDeviceRealtimeList, getDeviceNodeCharts } from "@/api/device";
import { fetchAlarmList } from '@/api/alarm';
import { fetchList } from "@/api/deviceFactor";
import { formatDate } from "@/utils/date";
let Echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar"); //所需图表
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");

export default {
  name: "display",
  components: { BlockSelect },
  props: {},
  data() {
    return {
      activeName: "first",
      blockSelected: null,
      factorSelected: "全部类型",
      factorList: [],
      factorDeviceList: [],
      allFactorList: [],
      factorTypeList: [],
      factorNum: 0,
      alertNum: 0,
      realtimeFactorInfo: null,
      offlineDeviceList: [],
      dataMode: false,
      nodeChartList: [],
      allNodeChartList: [],
      nodeChartDeviceList: [],
      charts: {},
      range: [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
        new Date(),
      ],
    };
  },
  created() {
    this.getDeviceRealtimeData();
    this.getAlertNum();
  },
  computed: {},
  mounted() {},
  methods: {
    getBlock(block) {
      if (block) {
        this.blockSelected = block.id;
      } else {
        this.blockSelected = null;
      }
      this.changeFactorType();
      this.getAlertNum();
    },
    changeDataMode(e) {
      if (this.dataMode) {
        this.getDeviceHistoryData();
      } else {
        this.getDeviceRealtimeData();
        this.charts = {};
      }
    },
    getDeviceHistoryData() {
      let params = {
        startTime: formatDate(this.range[0], "yyyy-MM-dd hh:mm:ss"),
        endTime: formatDate(this.range[1], "yyyy-MM-dd hh:mm:ss"),
      };
      getDeviceNodeCharts(params).then((response) => {
        console.log(response.data);
        if (response.data) {
          let deviceData = {};
          for (let item of response.data) {
            let deviceAddr = item.deviceAddr;
            let nodeId = item.nodeId;
            let blockId = item.blockId;
            let blockName = item.blockName;
            let data = item.data;
            for (let subItem of data) {
              let recordTime = subItem.recordTime;
              let registerId = subItem.registerId;
              let registerName = subItem.registerName;
              let unit = subItem.unit;
              let value = subItem.value;
              let dataKey = deviceAddr + "#" + nodeId + "#" + registerId;
              if (Object.keys(deviceData).indexOf(dataKey) > -1) {
                deviceData[dataKey]["data"].push({
                  time: recordTime,
                  value: value,
                });
              } else {
                deviceData[dataKey] = {
                  dataKey: dataKey,
                  deviceAddr: deviceAddr,
                  nodeId: nodeId,
                  registerId: registerId,
                  registerName: registerName,
                  blockId: blockId,
                  blockName: blockName,
                  unit: unit,
                  data: [
                    {
                      time: recordTime,
                      value: value,
                    },
                  ],
                };
              }
            }
          }
          console.log(deviceData);
          this.allNodeChartList = Object.values(deviceData);
          this.filterNodeChartList()
        } else {
          this.allNodeChartList = []
          this.nodeChartList = []
          this.nodeChartDeviceList = []
          this.charts = {}
        }
      });
    },
    filterNodeChartList() {
      let newNodeChartList = [];
      for (let item of this.allNodeChartList) {
        let factorFlag = false;
        if (this.factorSelected && this.factorSelected != "全部类型") {
          let factorName = item.registerName.toLocaleUpperCase();
          if (factorName == this.factorSelected) {
            factorFlag = true;
          }
        } else {
          factorFlag = true;
        }
        let blockFlag = false;
        if (this.blockSelected) {
          if (item.blockId == this.blockSelected) {
            blockFlag = true;
          }
        } else {
          blockFlag = true;
        }
        if (blockFlag && factorFlag) {
          newNodeChartList.push(item);
        }
      }
      this.nodeChartList = newNodeChartList;
      this.factorNum = this.nodeChartList.length;
      this.nodeChartDeviceList = this.aggByDeviceAddr(this.nodeChartList);
      this.getEcharts();
    },
    aggByDeviceAddr(list) {
      // 这里通过deviceAddr二次分组
      let deviceAddrList = [];
      let result = [];
      for (let item of list) {
        if (deviceAddrList.indexOf(item.deviceAddr) > -1) {
          result[deviceAddrList.indexOf(item.deviceAddr)].push(item);
        } else {
          deviceAddrList.push(item.deviceAddr);
          result.push([item]);
        }
      }
      return result;
    },
    getEcharts() {
      let that = this;
      this.$nextTick(() => {
        let newTargets = [];
        for (let i = 0; i < that.nodeChartList.length; i++) {
          let item = that.nodeChartList[i],
            doms = that.$refs[item.dataKey];
          newTargets.push(item.dataKey);
          if (!that.charts[item.dataKey]) {
            // console.log("不存在，开始重新绘制div ->" + item.dataKey);
            that.createChart(item.dataKey, doms[0], item.unit);
          }
          that.chartDataUpdate(item.dataKey, item);
        }
        for (const key in that.charts) {
          if (newTargets.indexOf(key) < 0) {
            console.log("删除 ->" + key);
            delete that.charts[key];
          }
        }
      });
    },
    createChart(dataKey, ref, yAxisName) {
      this.charts[dataKey] = Echarts.init(ref);
      this.charts[dataKey].setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: 60,
          bottom: 20,
          left: 40,
          right: 45,
        },
        xAxis: {
          name: "时间", //坐标轴名称
          type: "category",
          boundaryGap: true,
          data: [],
        },
        yAxis: {
          name: yAxisName, //坐标轴名称
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [],
      });
    },
    chartDataUpdate(dataKey, data) {
      let timeData = [];
      let valueData = [];
      for (let item of data.data) {
        timeData.push(item.time);
        valueData.push(item.value);
      }
      this.charts[dataKey].setOption({
        title: {
          text: data.registerName + " " + data.deviceAddr,
          textStyle: {
            fontWeight: "bolder", //标题颜色
            color: "#408829",
          },
          subtext: data.blockName,
          left: "center",
        },
        color: ["#2db7f5"],
        xAxis: {
          data: timeData.map(function (str) {
            return str.replace(" ", "\n");
          }),
        },
        series: [
          {
            data: valueData,
            type: "line",
          },
        ],
      });
    },
    getDeviceRealtimeData() {
      getDeviceRealtimeList().then((response) => {
        console.log(response.data);
        let offlineDeviceList = [];
        let realtimeFactorInfo = {};
        for (let item of response.data) {
          let deviceName = item.deviceName;
          if (item.deviceStatus == "offline" || item.dataItem == null) {
            offlineDeviceList.push(deviceName);
          } else {
            for (let subItem of item.dataItem) {
              let nodeId = subItem.nodeId;
              for (let subItem2 of subItem.registerItem) {
                let registerId = subItem2.registerId;
                realtimeFactorInfo[
                  deviceName + "_" + nodeId + "_" + registerId
                ] = subItem2.value;
              }
            }
          }
        }
        this.offlineDeviceList = offlineDeviceList;
        this.realtimeFactorInfo = realtimeFactorInfo;
        this.getFactorList();
      });
    },
    getFactorList() {
      fetchList({ pageNum: 1, pageSize: 100000 }).then((response) => {
        this.factorList = response.data.list;
        this.factorNum = response.data.total;
        let factorTypeList = [{ value: "全部类型", label: "全部类型" }];
        let factorNameList = [];
        for (let item of this.factorList) {
          let factorName = item.factorName.toLocaleUpperCase();
          let factorId = item.factorId;
          if (factorNameList.indexOf(factorName) == -1) {
            factorNameList.push(factorName);
            factorTypeList.push({ value: item.factorName, label: factorName });
          }
          if (this.offlineDeviceList.indexOf(item.deviceAddr) > -1) {
            item["value"] = "离线";
          } else {
            if (Object.keys(this.realtimeFactorInfo).indexOf(factorId) > -1) {
              item["value"] = this.realtimeFactorInfo[factorId];
            } else {
              item["value"] = "离线";
            }
          }
        }
        // Object.assign(this.allFactorList, this.factorList)
        this.allFactorList = JSON.parse(JSON.stringify(this.factorList));
        this.factorTypeList = factorTypeList;
        this.filterFactorList();
      });
    },
    getIcon(factorName) {
      let icon = "monitor";
      if (factorName == "溶解氧") {
        icon = "溶解氧";
      } else if (factorName == "水温") {
        icon = "水温计";
      } else if (factorName == "PH" || factorName == "ph") {
        icon = "pH值";
      } else if (factorName == "温度") {
        icon = "温度";
      } else if (factorName == "湿度") {
        icon = "湿度";
      }
      return icon;
    },
    changeFactorType() {
      if (this.dataMode) {
        this.charts = {};
        this.filterNodeChartList();
      } else {
        this.filterFactorList();
      }
    },
    filterFactorList() {
      let newFactorList = [];
      for (let item of this.allFactorList) {
        let factorFlag = false;
        if (this.factorSelected && this.factorSelected != "全部类型") {
          let factorName = item.factorName.toLocaleUpperCase();
          if (factorName == this.factorSelected) {
            factorFlag = true;
          }
        } else {
          factorFlag = true;
        }
        let blockFlag = false;
        if (this.blockSelected) {
          if (item.blockId == this.blockSelected) {
            blockFlag = true;
          }
        } else {
          blockFlag = true;
        }
        if (blockFlag && factorFlag) {
          newFactorList.push(item);
        }
      }
      this.factorList = newFactorList;
      this.factorNum = this.factorList.length;
      this.factorDeviceList = this.aggByDeviceAddr(this.factorList);
    },
    changeRange(e) {
      console.log(e);
      this.getDeviceHistoryData();
    },
    getAlertNum() {
      let alarmQuery = {
        'blockId': this.blockSelected,
        'startTime': formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24), "yyyy-MM-dd hh:mm:ss"),
        'endTime': formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
      }
      fetchAlarmList(alarmQuery).then(response => {
        this.alertNum = response.data.total;
      });
    }
  },
};
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
  margin-top: 20px;
}
.card-icon {
  font-size: 22px;
  float: left;
}
.card-num {
  font-size: 24px;
  margin-right: 5px;
}
.card-content-item {
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: 36px;
}
.echarts {
  width: 100%;
  height: 250px;
}
</style>
