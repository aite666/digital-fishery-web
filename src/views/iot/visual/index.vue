<template>
  <div class="contain p-32" ref="baseVideoBox">
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
            item === activePolygon ? 0.8 : item === hoverPolygon ? 0.4 : 0.1
          "
          :stroke-weight="
            item === activePolygon || item === hoverPolygon ? 2 : 1
          "
        >
        </amap-polygon>
        <amap-satellite-layer :visible="satellite" />
        <!-- <amap-marker
          v-if="position"
          :position.sync="position"
          draggable
          :label="{
            content: positionText,
          }"
        /> -->
        <!-- <amap-map-type :defaultType.sync="mapType" /> -->
        <amap-control-bar
          :position="{
            top: '50px',
            left: '10px',
          }"
        />
        <!-- <amap-hawk-eye :isOpen.sync="hawkeye.isOpen" show-button /> -->
        <amap-scale position="LB" />
        <amap-tool-bar
          :position="{
            top: '160px',
            left: '40px',
          }"
        />
      </amap>
    </div>
    <div class="heade d-f ai-c">
      <div class="d-f ai-c">
        <div class="area-select">
          <el-select v-model="enterprise" placeholder="请选择">
            <el-option
              v-for="item in enterprises"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="right-b d-f ai-c">
        <el-button-group>
          <el-button class="right-button" @click="handleUpdateMap()">
            <i class="el-icon-edit" style="margin-right: 10px"></i
            >编辑</el-button
          >
          <el-button class="right-button" v-if="!isFull" @click="fullScreen()">
            <i class="el-icon-full-screen" style="margin-right: 0px"></i>
            <span>全屏</span>
          </el-button>
          <el-button
            class="right-button"
            v-if="isFull"
            @click="exitFullScreen()"
          >
            <i class="el-icon-full-screen" style="margin-right: 0px"></i>
            <span>退出全屏</span>
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div class="info-panel">
      <div class="side-card">
        <div class="title">
          <span v-if="activePolygon === null">区域信息</span>
          <span v-if="activePolygon">{{ activePolygon.blockName }}</span>
        </div>
        <div class="air" v-if="activePolygon === null">
          <div class="temp">
            <strong>{{ todayTemp }}</strong
            >℃
          </div>
          <div class="RH d-f ai-c">
            <span>{{ todayWeather }}</span>
            相对湿度{{ todayHumidity }}%
          </div>
          <div class="future">
            明天
            <span>{{ tomorrowWeather }}</span>
            {{ tomorrowNighttemp }}℃ / {{ tomorrowDaytemp }}℃
          </div>
          <div class="future">
            后天
            <span>{{ afterTomorrowWeather }}</span>
            {{ afterTomorrowNighttemp }}℃ / {{ afterTomorrowDaytemp }}℃
          </div>
        </div>
        <div class="device-statistic d-f">
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
        <div class="state-statistic">
          <div class="title title-second">今日养殖</div>
          <div class="device-statistic d-f">
            <div class="item">
              <h4 data-v-46f4e097="">养殖品种</h4>
              <div class="num">0</div>
            </div>
            <div class="item">
              <h4 data-v-46f4e097="">养殖批次</h4>
              <div class="num">0</div>
            </div>
          </div>
        </div>
        <div class="water-log">
          <div class="title title-second">区试巡检日志</div>
          <div class="no-data">暂无数据</div>
        </div>
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
import { getProductCategoryList } from "@/api/batch";
import { getDeviceList } from "@/api/device";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000,
  name: null,
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
  name: "visual",
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
      enterprise: null,
      enterprises: [
        {
          value: "基地1",
          label: "基地1",
        },
        {
          value: "基地2",
          label: "基地2",
        },
      ],
      path: [],
      editable: false,
      draggable: true,
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
    };
  },
  created() {
    this.getList();
    this.getWeather();
    this.getProductCategoryStats(null);
    this.getDeviceNum(null);
  },
  watch: {
    activePolygon(val, valOld) {
      if (val == null) {
        this.getDeviceNum(null);
        this.getProductCategoryStats(null);
      } else {
        this.getDeviceNum(val.id);
        this.getProductCategoryStats(val.id);
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
  },
};
</script>

<style scoped>
.contain {
  position: relative;
  height: calc(100vh - 50px);
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
  width: calc(100% - 48px);
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
.contain .color-desc {
  position: absolute;
  left: 34px;
  bottom: 30px;
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
</style>
<style>
.amap-logo {
  display: none !important;
}
.amap-ctrl-list-layer {
  display: none !important;
}
</style>