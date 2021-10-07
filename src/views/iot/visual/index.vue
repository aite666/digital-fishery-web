<template>
  <div class="map-container" id="map-container"></div> 
</template>

<script>
export default {
  name: "visualMap",
  components: {},
  data() {
    return {
      map: null,
      // OSMUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      OSMUrl: "http://t{s}.tianditu.gov.cn/img_w/wmts?tk=b6fbc5d738b503ed401ac3fbecd5625a&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}"
    };
  },
  mounted() {
    this.map = this.$utils.map.createMap("map-container");
    // 设施地图视图 中心位置
    this.map.setView([39.924317, 115.890619	], 11, {preferCanvas: true});

    // 加载 open street map和mapbox 图层服务
   this.$utils.map.createTileLayer(this.map, this.OSMUrl, {
     maxZoom: 19,
     subdomains: [0, 1, 2, 3, 4, 5, 6, 7]
   });
  }
};
</script>
<style>
.map-container {
  width: 100%;
  height: 1000px;
}
</style>