<template>
  <dv-border-Box-7 class="top-right-cmp" :color="borderColor">
    <div class="realtime-card-title">{{ realtimeCardTitle }}</div>
    <div class="realtime-content">
      <div class="realtime-content-half">
        <div class="realtime-content-item">
          <div class="item-left">
            <svg-icon icon-class="温度" class="weather-forecast-svg"></svg-icon>
          </div>
          <div class="item-right">
            <div class="item-text">温度</div>
            <div class="item">{{ value1 }}<span>°C</span></div>
          </div>
        </div>
        <div class="realtime-content-item">
          <div class="item-left">
            <svg-icon
              icon-class="水温计"
              class="weather-forecast-svg"
            ></svg-icon>
          </div>
          <div class="item-right">
            <div class="item-text">水温</div>
            <div class="item">{{ value2 }}<span>°C</span></div>
          </div>
        </div>
        <div class="realtime-content-item">
          <div class="item-left">
            <svg-icon icon-class="pH值" class="weather-forecast-svg"></svg-icon>
          </div>
          <div class="item-right">
            <div class="item-text">PH</div>
            <div class="item">{{ value3 }}</div>
          </div>
        </div>
      </div>
      <div class="realtime-content-half" style="padding: 0 5%">
        <div class="realtime-content-item">
          <div class="item-left">
            <svg-icon icon-class="湿度" class="weather-forecast-svg"></svg-icon>
          </div>
          <div class="item-right">
            <div class="item-text">湿度</div>
            <div class="item">{{ value4 }}<span>%RH</span></div>
          </div>
        </div>
        <div class="realtime-content-item">
          <div class="item-left">
            <svg-icon
              icon-class="溶解氧"
              class="weather-forecast-svg"
            ></svg-icon>
          </div>
          <div class="item-right">
            <div class="item-text">溶解氧</div>
            <div class="item">{{ value5 }}<span>mg/L</span></div>
          </div>
        </div>
      </div>
    </div>
  </dv-border-Box-7>
</template>

<script>
import { getDeviceRealtimeList } from "@/api/device";
import { fetchList } from "@/api/deviceFactor";
export default {
  name: "RealtimeCard",
  props: {
    realtimeCardTitle: {
      type: String,
      default: "实时数据",
    },
    block: {
      type: Object,
      default: null,
    },
  },
  watch: {
    block(val, valOld) {
      if (val == null) {
        this.blockId = null;
        this.blockName = null;
      } else {
        this.blockId = val.id;
        this.blockName = val.blockName;
      }
      this.getDeviceRealtimeData();
    },
  },
  data() {
    return {
      borderColor: ["rgba(1, 153, 209, 0.5)", "rgba(1, 153, 209, 0.5)"],
      blockId: null,
      blockName: null,
      factorSelected: "全部类型",
      factorList: [],
      factorDeviceList: [],
      allFactorList: [],
      factorTypeList: [],
      factorNum: 0,
      offlineDeviceList: [],
      realtimeFactorInfo: null,
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: null,
    };
  },
  created() {
    this.getDeviceRealtimeData();
  },
  methods: {
    getDeviceRealtimeData() {
      getDeviceRealtimeList().then((response) => {
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
        if (this.blockId) {
          if (item.blockId == this.blockId) {
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
      for (let i = 0; i < newFactorList.length; i++) {
        let item = newFactorList[i];
        if (item.factorName == "温度") {
          this.value1 = this.getValue(this.value1, item.value);
        } else if (item.factorName == "水温") {
          this.value2 = this.getValue(this.value2, item.value);
        } else if (item.factorName == "PH" || item.factorName == "ph") {
          this.value3 = this.getValue(this.value3, item.value);
        } else if (item.factorName == "湿度") {
          this.value4 = this.getValue(this.value4, item.value);
        } else if (item.factorName == "溶解氧") {
          this.value5 = this.getValue(this.value5, item.value);
        }
      }
    },
    getValue(oldValue, value) {
      let result = oldValue;
      if (value != null) {
        if (oldValue == null) {
          result = value;
        } else if (oldValue == "离线") {
          if (value != "离线") {
            result = value;
          }
        } else {
          if (value != "离线") {
            result = parseInt((value + oldValue) / 2);
          }
        }
      }
      return result;
    },
  },
};
</script>

<style lang="less">
.top-right-cmp {
  position: relative;
  padding: 0;
  box-sizing: border-box;
  .realtime-card-title {
    margin-left: 5%;
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .realtime-content {
    height: calc(~"100% - 50px");
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .realtime-content-half {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .realtime-content-item {
        display: flex;
        flex-direction: row;
        .item-left {
          font-size: 34px;
          width: 30%;
          margin-right: 16px;
        }
        .item-right {
          font-size: 16px;
          width: 70%;
          .item-text {
            font-size: 14px;
            color: #05bbdb;
          }
          .item {
            font-size: 24px;
            span {
              margin-left: 4px;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
