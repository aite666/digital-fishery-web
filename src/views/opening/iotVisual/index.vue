<template>
  <el-container class="mapWrapper">
    <el-header>
      <div class="topBannerBox">
        <div class="navLeft">
          <div class="title">基地1</div>
        </div>
        <div class="bannerMenu">
          <div class="baseOperation">
            <!-- <el-button @click="undoDraw"
              ><i class="icofont-undo"></i
            ></el-button>
            <el-button @click="redoDraw"
              ><i class="icofont-redo"></i
            ></el-button> -->
            <el-button @click="mapDraw"
              ><svg-icon icon-class="mapDraw"></svg-icon
            ></el-button>
            <el-button
              @click="deleteDraw"
              :disabled="currentBlock ? false : true"
              ><svg-icon
                style="width: 1.4em; height: 1.3em"
                icon-class="delete"
              ></svg-icon
            ></el-button>
            <!-- <el-button @click="rectangle"
              ><svg-icon icon-class="rectangle"></svg-icon
            ></el-button>
            <el-button @click="circle"
              ><svg-icon icon-class="circle"></svg-icon
            ></el-button>
            <el-button><svg-icon icon-class="region"></svg-icon></el-button> -->
          </div>
        </div>
        <div class="btnArea">
          <el-button type="primary" size="small" @click="publish"
            >发布</el-button
          >
        </div>
      </div>
    </el-header>
    <el-container class="mainScene">
      <el-aside width="200px">
        <div class="mainTitle">
          <span>区块列表</span>
          <span @click="addPolygon()"><i class="el-icon-plus add"></i></span>
        </div>
        <div class="modelList">
          <div
            class="model"
            v-for="item of polygonList"
            :key="item.index"
            :class="{ currentModel: item.current }"
            @click="selectPolygon(item)"
          >
            <div style="width: 100%">
              <span>{{ item.blockName }}</span>
            </div>
            <span class="handle" @click.stop="deletePolygon(item)"
              ><i class="el-icon-delete"></i
            ></span>
          </div>
        </div>
      </el-aside>
      <el-main>
        <amap
          class="mapContainer"
          ref="myMap"
          :zoom.sync="zoom"
          :center.sync="center"
          @complete="setFitView"
          cache-key="iot-map"
          @click="onMapClick"
        >
          <amap-polygon
            ref="polygons"
            v-for="item in polygonList"
            :key="item.index"
            clickable
            @click="onPolygonClick(item.index)"
            :path.sync="item.path"
            :fill-color="fill"
            :fill-opacity="0.1"
            :editable="item.editable"
            :draggable="item.draggable"
          >
          </amap-polygon>
          <amap-satellite-layer :visible="satellite" />
          <amap-scale position="LB" />
          <amap-tool-bar
            :position="{
              top: '10px',
              left: '10px',
            }"
          />
          <amap-mouse-tool :mode.sync="drawerMode" @draw="onDraw" />
        </amap>
      </el-main>
      <el-aside width="260px">
        <div class="rightAreaBox">
          <el-tabs v-model="activeName" :stretch="tabStretch">
            <el-tab-pane label="区块信息" name="first">
              <div class="plotAreaBox">
                <div class="plotTag">区块名称</div>
                <el-input
                  class="plotTitle"
                  v-model="currentBlockName"
                ></el-input>
                <div class="plotArea">面积：{{ area }}亩</div>
                <div class="plotPosition">
                  <p>坐标：</p>
                  <p class="plotPositionContent" v-html="positionContent"></p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="设备绑定" name="second"
              ><div class="deviceBox">
                <div class="device">
                  <div class="deviceInfo">
                    <span style="color: rgb(51, 51, 51)">电磁阀</span
                    ><span style="color: rgb(144, 147, 153)"
                      >122973540186relay0</span
                    >
                  </div>
                  <div class="handle">
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div class="device">
                  <div class="deviceInfo">
                    <span style="color: rgb(51, 51, 51)">电磁阀</span
                    ><span style="color: rgb(144, 147, 153)"
                      >122973540186relay0</span
                    >
                  </div>
                  <div class="handle">
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div class="footerTip">
                  <el-button type="primary"> 添加设备 </el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import {
  fetchList,
  createBlock,
  updateBlock,
  deleteBlock,
  getBlockDetail,
} from "@/api/block";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000,
  name: null,
};
const defaultPolygon = {
  id: null,
  index: null,
  current: false,
  path: [],
  editable: false,
  draggable: true,
  blockName: null,
  blockDescription: null,
  blockArea: null,
};
function makeBounds(value) {
  const sw = new window.AMap.LngLat(value[0][0], value[0][1]);
  const ne = new window.AMap.LngLat(value[1][0], value[1][1]);
  return new window.AMap.Bounds(sw, ne);
}

export default {
  name: "iotVisual",
  components: {},
  data() {
    return {
      activeName: "first",
      tabStretch: true,
      center: [119.615241, 30.611064],
      position: null,
      zoom: 17,
      satellite: true,
      drawerMode: null,
      fill: "#409EFF",
      stroke: "#000A58",
      editable: false,
      ready: false,
      positionContent: null,
      currentBlockName: null,
      currentBlock: null,
      polygonList: [],
      listQuery: Object.assign({}, defaultListQuery),
      blockList: null,
      deleteBlockIds: [],
    };
  },
  created() {
    this.getList();
  },
  computed: {
    $map() {
      return this.$refs.myMap.$map;
    },
    area() {
      const { ready, polygonList } = this;
      if (!ready) return 0;
      let value = 0;
      for (let item of polygonList) {
        if (item.current) {
          this.currentBlockName = item.blockName;
          if (item.path) {
            let pointList = [];
            for (let point of item.path) {
              pointList.push(point[0].toFixed(5) + ", " + point[1].toFixed(5));
            }
            this.positionContent = pointList.join("<br>");
            value = window.AMap.GeometryUtil.ringArea(item.path);
            value = ((value * 15) / 10000).toFixed(4);
            item.blockArea = value;
            break;
          }
        }
      }
      return value;
    },
  },
  watch: {
    currentBlockName(val, valOld) {
      for (let item of this.polygonList) {
        if (item.current) {
          item.blockName = val;
        }
      }
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
    onDraw(type, res) {
      // 点击这里如果有选中且path为空的话则为编辑，其他情况都为新增
      let updateFlag = false;
      for (let item of this.polygonList) {
        item.editable = false;
        if (item.current && !item.path) {
          updateFlag = true;
          item.path = res;
        } else {
          item.current = false;
        }
      }
      if (!updateFlag) {
        let item = {
          index: "new_" + new Date().getTime(),
          current: true,
          path: res,
          editable: false,
          draggable: true,
        };
        this.polygonList.push(item);
        this.drawerMode = null;
      }
    },
    mapDraw() {
      this.drawerMode = "polygon";
    },
    rectangle() {
      this.drawerMode = "rectangle";
    },
    circle() {
      this.drawerMode = "circle";
    },
    onMapClick() {
      console.log("onMapClick");
      //   setTimeout(() => {
      //     for (let item of this.polygonList) {
      //       item.editable = false;
      //     }
      //   }, 10);
    },
    onPolygonClick(polygonIndex) {
      console.log("onPolygonClick");
      for (let item of this.polygonList) {
        if (item.index == polygonIndex) {
          item.editable = !item.editable;
          if (item.editable) {
            this.currentBlock = item;
          } else {
            this.currentBlock = null;
          }
          item.current = true;
        } else {
          item.editable = false;
          item.current = false;
        }
      }
    },
    clear() {
      this.$refs.myMap.$map.clearMap();
    },
    async setFitView(map) {
      this.ready = true;
      //   await this.$nextTick();
      //   const topn = this.$refs.polygons.slice(0, 5).map((p) => p.$target);
      //   map.setFitView(topn);
    },
    undoDraw() {},
    redoDraw() {},
    deleteDraw() {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.currentBlock.index.startsWith("old_")) {
          this.deleteBlockIds.push(this.currentBlock.id);
        }
        this.polygonList.splice(this.polygonList.indexOf(this.currentBlock), 1);
        this.currentBlock = null;
      });
    },
    selectPolygon(blockItem) {
      console.log("selectPolygon");
      for (let item of this.polygonList) {
        if (item.index == blockItem.index) {
          item.current = !item.current;
          item.editable = item.current;
          if (item.editable) {
            this.currentBlock = item;
          } else {
            this.currentBlock = null;
          }
        } else {
          item.current = false;
          item.editable = false;
        }
      }
    },
    deletePolygon(blockItem) {
      console.log("deletePolygon");
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (blockItem.index.startsWith("old_")) {
          this.deleteBlockIds.push(blockItem.id);
        }
        if (this.currentBlock == blockItem) {
          this.currentBlock = null;
        }
        this.polygonList.splice(this.polygonList.indexOf(blockItem), 1);
      });
    },
    addPolygon() {
      let item = {
        index: "new_" + new Date().getTime(),
        current: true,
        path: null,
        editable: false,
        draggable: true,
      };
      this.polygonList.push(item);
      this.drawerMode = "polygon";
    },
    publish() {
      this.$confirm("是否发布数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        for (let item of this.polygonList) {
          let blockDetail = {
            name: item.blockName,
            description: item.blockDescription,
            area: item.blockArea,
            position: JSON.stringify(item.path),
          };
          if (item.id) {
            blockDetail["id"] = item.id;
            updateBlock(item.id, blockDetail).then((response) => {});
          } else {
            createBlock(blockDetail).then((response) => {});
          }
        }
        if (this.deleteBlockIds.length > 0) {
          for (let deleteBlockId of this.deleteBlockIds) {
            deleteBlock(deleteBlockId).then((response) => {});
          }
        }
        this.$message({
          message: "发布成功",
          type: "success",
          duration: 1000,
        });
      });
    },
  },
};
</script>
<style scoped>
.mapWrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.mapWrapper .el-header {
  height: 50px !important;
  padding: 0 !important;
  border-bottom: 1px solid #d8d8d8;
}
.topBannerBox {
  height: 50px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.topBannerBox .navLeft {
  height: 100%;
  width: 200px;
  padding-left: 50px;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  flex-wrap: nowrap;
  -webkit-box-align: center;
  align-items: center;
}
.topBannerBox .navLeft .title {
  color: #000;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  user-select: none;
}
.topBannerBox .bannerMenu {
  width: calc(100% - 300px);
  height: 100%;
  position: relative;
}
.topBannerBox .bannerMenu .baseOperation {
  width: 200px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
}
.topBannerBox .bannerMenu .baseOperation button {
  width: 16px;
  height: 16px;
  border: none;
  padding: 0 !important;
  display: inline-block;
}
.topBannerBox .btnArea {
  height: 100%;
  width: 80px;
  padding-right: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.mapWrapper .mainScene .el-aside {
  height: calc(100vh - 50px);
  overflow: hidden;
}
.mapWrapper .mainScene .el-aside .mainTitle {
  height: 60px;
  padding: 0 20px;
  color: #333;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid #d8d8d8;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.mapWrapper .mainScene .el-aside .mainTitle .add {
  cursor: pointer;
  font-weight: 700;
}
.mapWrapper .mainScene .el-aside > div {
  cursor: default;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
}
.modelList {
  height: calc(100vh - 110px);
  overflow: auto;
  box-sizing: border-box;
  border-bottom: 1px solid #d8d8d8;
}
.modelList .model {
  height: 32px;
  padding: 8px 20px;
  color: #333;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.modelList .currentModel {
  background-color: #409eff;
  color: #fff !important;
}
.mapWrapper .mainScene .el-main {
  height: calc(100vh - 50px);
  padding: 10px;
  overflow: auto;
  background-color: #eee;
  box-sizing: border-box;
  position: relative;
}
.rightAreaBox,
.rightAreaBox .el-tabs {
  height: 100%;
}
.plotAreaBox .plotTag {
  height: 30px;
  padding-left: 8px;
  box-sizing: border-box;
}
.plotAreaBox .plotTitle {
  height: 40px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.plotAreaBox .plotArea {
  height: 30px;
  padding-left: 8px;
  box-sizing: border-box;
}
.plotAreaBox .plotPosition {
  height: calc(100vh - 190px);
  padding-left: 8px;
  box-sizing: border-box;
  overflow: scroll;
  line-height: 20px;
}
.plotAreaBox .plotPosition p {
  margin: 5px 0px;
}
.plotAreaBox .plotPosition .plotPositionContent {
  margin: 5px 0px;
}
.deviceBox {
  height: unset;
  overflow: unset;
}
.deviceBox .device {
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.deviceBox .device .deviceInfo {
  width: 80%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.deviceBox .device .deviceInfo span {
  width: 100%;
  overflow: hidden;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.deviceBox .device .handle span {
  font-size: 14px;
}
.deviceBox .footerTip {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 14px;
}
.mapWrapper .mainScene .el-main .mapContainer {
  width: 100%;
  height: 100%;
  background-color: #e2e6eb !important;
  position: relative;
  background: rgb(252, 249, 242);
  cursor: pointer;
}
</style>
<style>
.rightAreaBox .el-tabs__content {
  height: calc(100% - 44px);
  padding: 0 8px 10px 8px;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>

