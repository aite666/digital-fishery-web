<template>
  <div class="contain" ref="baseVideoBox">
    <div class="map">
      <amap
        class="mapContainer"
        cache-key="myMap"
        ref="myMap"
        map-style="amap://styles/whitesmoke"
        async
        :zoom.sync="zoom"
        :pitch.sync="pitch"
        :center.sync="center"
        @hotspotclick="onHotspotClick"
        view-mode="3D"
        :show-label="showLabel"
      >
        <amap-polygon
          ref="polygons"
          v-for="item in polygonList"
          :key="item.index"
          clickable
          @click="
            activePolygon && activePolygon.index == item.index
              ? (activePolygon = null)
              : (activePolygon = item)
          "
          @mouseover="hoverPolygon = item"
          @mouseout="hoverPolygon = null"
          :path.sync="item.path"
          :fill-color="item.fill"
          :fill-opacity="
            item === activePolygon ? 0.9 : item === hoverPolygon ? 0.7 : 0.4
          "
          :stroke-weight="
            item === activePolygon || item === hoverPolygon ? 2 : 1
          "
        >
        </amap-polygon>
        <amap-satellite-layer :visible="satellite" :show-label="showLabel"/>
      </amap>
    </div>
    <div class="total-statistic d-f">
      <div class="item" v-if="activePolygon === null">
        <h4 data-v-46f4e097="">区块数</h4>
        <div class="num">{{ polygonList.length }}</div>
      </div>
      <div class="item" v-if="activePolygon">
        <h4 data-v-46f4e097="">面积(亩)</h4>
        <div class="num">{{ activePolygon.blockArea }}</div>
      </div>
      <div class="item">
        <h4 data-v-46f4e097="">监测设备</h4>
        <div class="num">{{ deviceNum }}</div>
      </div>
      <div class="item">
        <h4 data-v-46f4e097="">养殖鱼类</h4>
        <div class="num">{{ productCategoryNum }}</div>
      </div>
      <div class="item">
        <h4 data-v-46f4e097="">投放批次</h4>
        <div class="num">{{ batchNum }}</div>
      </div>
    </div>
    <div class="color-desc">
      <ul class="list" @mouseout="hoverPolygon = null">
        <li
          v-for="item in polygonList"
          :key="item.index"
          @mouseover="hoverPolygon = item"
          @click="
            activePolygon ? (activePolygon = null) : (activePolygon = item)
          "
        >
          <span
            :class="{ active: item === activePolygon || item === hoverPolygon }"
          >
          </span
          >{{ item.blockName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  fetchList,
  createBlock,
  updateBlock,
  deleteBlock,
  getBlockDetail,
} from "@/api/block";
import { getLiveWeather, getForecastWeather } from "@/api/weather";
import { getProductCategoryList, getBatchList } from "@/api/batch";
import { getDeviceList } from "@/api/device";
import { getInspectionList } from "@/api/inspection";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000,
  name: null,
  enterpriseId: null
};
const defaultPolygon = {
  id: null,
  index: null,
  path: [],
  fill: "#409EFF",
  blockName: null,
  blockDescription: null,
  blockArea: null,
};

export default {
  name: "CenterMap",
  components: {},
  data() {
    return {
      center: [119.615241, 30.611064],
      position: null,
      zoom: 17,
      pitch: 0,
      // rotation: 15,
      mapType: 1,
      isFull: false,
      satellite: true,
      hawkeye: {
        isOpen: true,
      },
      path: [],
      editable: false,
      draggable: true,
      showLabel: false,
      fill: "#409EFF",
      polygonList: [],
      listQuery: Object.assign({}, defaultListQuery),
      blockList: null,
      hoverPolygon: null,
      activePolygon: null,
      cityCode: "330523",
      todayTemp: null,
      todayWeather: null,
      todayHumidity: null,
      tomorrowWeather: null,
      tomorrowDaytemp: null,
      tomorrowNighttemp: null,
      afterTomorrowWeather: null,
      afterTomorrowDaytemp: null,
      afterTomorrowNighttemp: null,
      deviceNum: 0,
      productCategoryNum: 0,
      batchNum: 0,
      todayFishNum: 0,
      todayBatchNum: 0,
      inspectionList: [],
    };
  },
  created() {
    this.getList();
    this.getWeather();
    this.getProductCategoryStats(null);
    this.getDeviceNum(null);
    this.getTodayNum(null);
    this.getInspectionList(null);
  },
  filters: {
    formatInspectionTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyyMMdd");
    },
    formatProductData(content) {
      if (content.length > 50) {
        return content.substr(0, 50) + "...";
      } else {
        return content;
      }
    },
  },
  watch: {
    activePolygon(val, valOld) {
      if (val == null) {
        this.getDeviceNum(null);
        this.getProductCategoryStats(null);
        this.getTodayNum(null);
        this.getInspectionList(null);
        this.changeBlockSelected(null)
      } else {
        this.getDeviceNum(val.id);
        this.getProductCategoryStats(val.id);
        this.getTodayNum(val.id);
        this.getInspectionList(val.id);
        this.changeBlockSelected(val)
      }
    },
  },
  computed: {
    positionText() {
      if (!this.position) return "";
      return `${this.position[0]}, ${this.position[1]}`;
    },
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then((response) => {
        this.blockList = response.data.list;
        let polygonList = [];
        for (let item of this.blockList) {
          let polygon = Object.assign({}, defaultPolygon);
          polygon.id = item.id;
          polygon.index = "old_" + item.id;
          polygon.blockName = item.name;
          polygon.blockDescription = item.description;
          polygon.blockArea = item.area;
          polygon.path = item.positionJson;
          polygonList.push(polygon);
        }
        this.polygonList = polygonList;
      });
    },
    onHotspotClick(e) {
      if (e && e.lnglat) {
        this.center = [e.lnglat.lng, e.lnglat.lat];
      }
    },
    onMapClick(e) {
      if (e.lnglat) {
        this.position = [e.lnglat.lng, e.lnglat.lat];
      } else {
        this.position = null;
      }
      this.editable = true;
    },
    handleUpdateMap() {
      let url = "/#/opening/iotVisual";
      if (this.listQuery.enterpriseId) {
        url = "/#/opening/iotVisual?enterpriseId=" + this.listQuery.enterpriseId;
      }
      window.open(url, "_blank");
    },
    fullScreen() {
      if (this.isFull) {
        return this.exitFullScreen();
      }
      var e = this.$refs.baseVideoBox;
      e.requestFullscreen
        ? e.requestFullscreen()
        : e.webkitRequestFullScreen
        ? e.webkitRequestFullScreen()
        : e.mozRequestFullScreen
        ? e.mozRequestFullScreen()
        : e.msRequestFullscreen(),
        (this.isFull = true);
    },
    exitFullScreen() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.msExitFullscreen
        ? document.msExiFullscreen()
        : document.webkitCancelFullScreen && document.webkitCancelFullScreen(),
        (this.isFull = false);
    },
    getWeather() {
      getLiveWeather(this.cityCode).then((response) => {
        if (response.status == 200) {
          let data = response.data;
          if ("lives" in data) {
            this.todayTemp = data.lives[0].temperature;
            this.todayWeather = data.lives[0].weather;
            this.todayHumidity = data.lives[0].humidity;
          }
        }
      });
      getForecastWeather(this.cityCode).then((response) => {
        if (response.status == 200) {
          let data = response.data;
          if ("forecasts" in data) {
            this.tomorrowWeather = data.forecasts[0].casts[1].dayweather;
            this.tomorrowDaytemp = data.forecasts[0].casts[1].daytemp;
            this.tomorrowNighttemp = data.forecasts[0].casts[1].nighttemp;
            this.afterTomorrowWeather = data.forecasts[0].casts[2].dayweather;
            this.afterTomorrowDaytemp = data.forecasts[0].casts[2].daytemp;
            this.afterTomorrowNighttemp = data.forecasts[0].casts[2].nighttemp;
          }
        }
      });
    },
    getProductCategoryStats(blockId) {
      getProductCategoryList(blockId).then((response) => {
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
    getDeviceNum(blockId) {
      let query = {
        pageNum: 1,
        pageSize: 100000,
        blockId: blockId,
      };
      getDeviceList(query).then((response) => {
        this.deviceNum = response.data.total;
      });
    },
    getTodayNum(blockId) {
      let query = {
        pageNum: 1,
        pageSize: 100000,
        blockId: blockId,
        farmTime: formatDate(new Date(), "yyyy-MM-dd") + " 00:00:00",
      };
      getBatchList(query).then((response) => {
        this.todayBatchNum = response.data.total;
        let fishList = [];
        for (let item of response.data.list) {
          if (fishList.indexOf(item.productCategoryName)) {
            fishList.push(item.productCategoryName);
          }
        }
        this.todayFishNum = fishList.length;
      });
    },
    getInspectionList(blockId) {
      let query = {
        pageNum: 1,
        pageSize: 5,
        blockId: blockId,
        startTime: formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 5), "yyyy-MM-dd") + " 00:00:00",
        endTime: formatDate(new Date(), "yyyy-MM-dd") + " 23:59:59",
      };
      getInspectionList(query).then((response) => {
        this.inspectionList = response.data.list;
      });
    },
    changeBlockSelected(block) {
      this.$emit('changeBlockSelected', block);
    }
  },
};
</script>

<style scoped>
.contain {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
}
.p-32 {
  padding: 24px 24px 0px;
}
.contain .map {
  position: absolute;
  height: 100%;
  width: calc(100%);
  background-color: rgb(204, 204, 204);
}
.contain .map .mapContainer {
  width: 100%;
  height: 100%;
  background-color: rgb(226, 230, 235) !important;
  position: relative;
  background: rgb(252, 249, 242);
}
.ai-c {
  -webkit-box-align: center;
  align-items: center;
}
.d-f {
  display: flex;
}
.contain .heade {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.contain .heade .right-b {
  margin-left: auto;
  margin-top: -5px;
  position: relative;
  z-index: 999;
}
.contain .heade .right-b .right-button {
  width: 130px;
}
/* .contain .heade .right-b .right-button i{
  margin-right: 10px;
} */
.contain .info-panel {
  position: absolute;
  right: 34px;
  width: 260px;
  height: calc(100% - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 16px;
  background: rgb(255, 255, 255);
  border-radius: 4px;
}
.side-card {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: 100%;
  color: rgb(51, 51, 51);
  user-select: none;
  overflow: hidden;
}
.side-card .title {
  margin-bottom: 16px;
  font-size: 18px;
  font-family: PingFangSC-Medium, "PingFang SC";
  font-weight: 500;
}
.side-card .air {
  margin-bottom: 20px;
}
.side-card .air .temp {
  margin-bottom: 5px;
  font-size: 16px;
}
.side-card .air .temp strong {
  font-size: 26px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
}
.side-card .air .RH {
  font-size: 14px;
  color: rgb(96, 98, 102);
}
.side-card .air .RH span {
  padding-right: 6px;
  margin-right: 6px;
  border-right: 1px solid rgb(235, 238, 245);
}
.side-card .air .future {
  margin-top: 14px;
  font-size: 14px;
}
.side-card .device-statistic {
  user-select: none;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.side-card .device-statistic .item {
  -webkit-box-flex: 1;
  padding-bottom: 15px;
  text-align: center;
  cursor: pointer;
  flex: 1 1 0%;
}
.side-card .device-statistic .item .num {
  font-size: 20px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
}
.side-card .title-second {
  font-size: 16px;
  margin: 16px 0px;
}
.side-card .device-statistic {
  user-select: none;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.side-card .device-statistic .item {
  -webkit-box-flex: 1;
  padding-bottom: 15px;
  text-align: center;
  cursor: pointer;
  flex: 1 1 0%;
}
.side-card .device-statistic .item h4 {
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  color: rgb(144, 147, 153);
}
.side-card .device-statistic .item .num {
  font-size: 20px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
}
.side-card .water-log {
  user-select: none;
}
.side-card .water-log .no-data {
  margin-top: 24px;
  text-align: center;
  color: rgb(192, 196, 204);
  font-size: 14px;
}
side-card .water-log .inspection-data {
  margin-top: 24px;
  font-size: 14px;
}
.contain .color-desc {
  position: absolute;
  left: 15px;
  bottom: 10px;
  width: 150px;
  box-sizing: border-box;
  padding: 0px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}
.contain .color-desc .list {
  margin: 0px;
  padding: 0px;
}
.contain .color-desc .list li {
  /* margin-bottom: 18px; */
  padding: 14px 12px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 12px;
  color: rgb(255, 255, 255);
}
.contain .color-desc .list li:last-child {
  margin-bottom: 0px;
}
.contain .color-desc .list li span {
  margin-right: 10px;
  width: 14px;
  height: 14px;
  background-color: rgb(226, 232, 240);
  border-radius: 50%;
}
.contain .color-desc .list li span.active {
  background-color: #409eff;
}

.contain .total-statistic {
  position: absolute;
  left: 15px;
  top: 10px;
  padding: 0px 18%;
  width: 100%;
  color: #fff;
}
.contain .total-statistic .item {
  -webkit-box-flex: 1;
  padding-bottom: 15px;
  text-align: center;
  cursor: pointer;
  flex: 1 1 0%;
  font-size: 20px;
}
.contain .total-statistic .item .num {
  font-size: 38px;
  font-family: PingFangSC-Semibold, "PingFang SC";
  font-weight: 600;
}
</style>
<style>
.amap-copyright {
   display: none !important;
}
.amap-logo {
  display: none !important;
}
.amap-ctrl-list-layer {
  display: none !important;
}
</style>