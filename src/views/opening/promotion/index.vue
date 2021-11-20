<template>
  <div class="body_gray">
    <div class="wrap">
      <header class="title_bar">
        <img src="../../../assets/images/logo.jpeg" class="logo" />
        安吉智慧渔场
      </header>
      <div class="white_box">
        <div class="mainImg_box">
          <img :src="qrCodeDetail.backgroundImage" class="mainImgBg" />
          <img :src="qrCodeDetail.logoImage" class="mainImg" />
          <div class="good_name">{{ qrCodeDetail.title }}</div>
        </div>
        <dl class="good_intr">
          <dt>{{ qrCodeDetail.title }}</dt>
          <dd class="good_content">
            {{ qrCodeDetail.description }}
          </dd>
        </dl>
      </div>
      <div class="file_big_box">
        <h2 class="sub_title">
          溯源档案链
          <div class="complete">
            档案完整性
            <span class="star_on"></span>
            <span class="star_on"></span>
            <span class="star_on"></span>
            <span class="star_on"></span>
            <span class="star_on"></span>
            <span class="star_on"></span>
          </div>
        </h2>
        <div class="file_box">
          <div class="file_item">
            <a href="javascript:void(0)" @click="loadWorkInfo('cycleImage')">
              <img src="../../../assets/images/cycleImage_on.png" alt="" />
              <p>成长记录图</p>
            </a>
          </div>
          <div class="file_item">
            <a href="javascript:void(0)" @click="loadWorkInfo('video')">
              <img src="../../../assets/images/realtimeVideo_on.png" alt="" />
              <p>实时环境直播</p></a
            >
          </div>
          <div class="file_item">
            <a href="javascript:void(0)" @click="loadWorkInfo('chart')">
              <img
                src="../../../assets/images/environmentalData_on.png"
                alt=""
              />
              <p>关键环境数据</p></a
            >
          </div>
        </div>
        <div class="file_box">
          <div class="file_item">
            <a
              href="javascript:void(0)"
              @click="loadWorkInfo('table', null, 2)"
            >
              <img src="../../../assets/images/fertilizerUse_on.png" alt="" />
              <p>营养供给表</p></a
            >
          </div>
          <div class="file_item">
            <a
              href="javascript:void(0)"
              @click="loadWorkInfo('table', null, 1)"
            >
              <img src="../../../assets/images/pesticideUse_on.png" alt="" />
              <p>防治记录表</p></a
            >
          </div>
          <div class="file_item">
            <a
              href="javascript:void(0)"
              @click="loadWorkInfo('authReport', null, 1)"
            >
              <img src="../../../assets/images/authReport_on.png" alt="" />
              <p>认证报告</p></a
            >
          </div>
        </div>
        <div class="code_box">
          <dl>
            <dt>原产地链码</dt>
            <dd>660aa6f18f0ef537fab704210ea8db1a</dd>
          </dl>
          <dl>
            <dt>动态溯源码</dt>
            <dd>60198B050009201908201134201908280951</dd>
          </dl>
        </div>
      </div>
      <div class="table mapBox">
        <h2 class="sub_title pdb20">
          渔场信息
          <div class="boss_box">
            <span class="portrait"
              ><img :src="qrCodeDetail.adminImage" alt="" /></span
            >责任人：{{ qrCodeDetail.admin }}
          </div>
        </h2>
        <baidu-map v-if="mapFlag" id="mapMain" class="map" @ready="mapHandle"> </baidu-map>
        <div class="addr_box">
          <!-- <span
            ><label class="distcode">广东省&gt;河源市&gt;紫金县</label
            >南岭镇庄田村嶂背小组</span
          > -->
          <span
            ><label class="distcode">{{ qrCodeDetail.position }}</label></span
          >
        </div>
      </div>
      <!-- <div class="deathLine">技术支持：XXXX 粤ICP备：18000000号</div> -->
    </div>
  </div>
</template>
<script>
import { getQrCodeDetail } from "@/api/qrCode";

const defaultQrCodeDetail = {
  title: "",
  backgroundImage: "",
  logoImage: "",
  description: "",
  admin: "",
  adminImage: "",
  position: "",
  longitude: 0,
  latitude: 0,
};
export default {
  name: "QrCodeDetail",
  props: {},
  data() {
    return {
      qrCodeDetail: Object.assign({}, defaultQrCodeDetail),
      mapFlag: false,
    };
  },
  created() {
    getQrCodeDetail(this.$route.query.id).then((response) => {
      this.qrCodeDetail = response.data;
      this.mapFlag = true;
    });
  },
  computed: {},
  methods: {
    loadWorkInfo(type) {
      console.log("loadWorkInfo type:" + type);
    },
    mapHandle({ BMap, map }) {
      let longitude = this.qrCodeDetail.longitude;
      let latitude = this.qrCodeDetail.latitude;
      var point = new BMap.Point(longitude, latitude);
      var marker = new BMap.Marker(point); // 创建标注
      map.centerAndZoom(point, 13);
      map.addOverlay(marker); // 将标注添加到地图
    },
  },
};
</script>
<style scoped>
.logo {
  height: 32px;
  position: absolute;
  left: 10px;
  border-radius: 50%;
  margin-top: -4px;
}
.body_gray {
  background-color: #f5f5f5;
}
header.title_bar {
  padding: 10px 0 10px;
  text-align: center;
  position: relative;
  font-size: 18px;
  color: #666;
  background-color: #fff;
}
.mainImg_box {
  position: relative;
}
.mainImg {
  position: absolute;
  left: 20px;
  bottom: -20px;
  width: 80px;
  height: 80px;
  border-radius: 5px;
  border: 2px solid #fff;
}
.mainImgBg {
  width: 100%;
  display: none;
}
.good_name {
  position: absolute;
  left: 120px;
  color: #fff;
  font-weight: bold;
  bottom: 20px;
  font-size: 20px;
  display: none;
}
.good_intr {
  padding: 10px 20px;
  font-size: 14px;
  margin-top: 15px;
  color: #333;
  text-align: justify;
}
.good_content {
  text-indent: 2em; /*em是相对单位，2em即现在一个字大小的两倍*/
  margin-left: 0;
}
.sub_title {
  font-size: 18px;
  font-weight: bold;
  padding: 15px 15px 10px;
  background-color: #fff;
  color: #666;
  margin-top: 10px;
}
.sub_title {
  position: relative;
}
.complete {
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 12px;
  color: #999;
}
.star_on,
.star_off {
  width: 12px;
  height: 12px;
  background: url(../../../assets/images/star_on.png) 0 0 no-repeat;
  /* background: url(../../images/report/star_on.png) 0 0 no-repeat; */
  -webkit-background-size: 100%;
  display: inline-block;
  background-size: 100%;
  margin-left: 3px;
}
.star_off {
  background: url(../../../assets/images/star_off.png) 0 0 no-repeat;
  -webkit-background-size: 100%;
  display: inline-block;
  margin: 0 2px;
  background-size: 100%;
}
.file_box {
  display: flex;
  background-color: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
}
.file_item {
  flex: 1;
  text-align: center;
  padding: 0 10px;
  color: #666;
}
.file_item img {
  height: 60px;
}
.white_box {
  background-color: #fff;
}
.code_box {
  padding: 10px 0 10px;
  background-color: #fff;
  position: relative;
}
.code_box span {
  margin-right: 10px;
}
.code_box dl {
  background-color: #f5f5f5;
  padding: 10px 10px 10px 90px;
  color: #636363;
  border-radius: 3px;
  word-wrap: break-word;
  margin: 5px 10px;
}
.code_box dl dt {
  position: absolute;
  left: 15px;
  color: #999;
}
.portrait img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-right: 10px;
}
.portrait {
  margin-top: 10px;
}
.boss_box {
  padding-top: 10px;
}
.map {
  width: 100%;
  height: 289px;
  overflow: hidden;
  position: relative;
  z-index: 0;
  background-color: rgb(243, 241, 236);
  color: rgb(0, 0, 0);
  text-align: left;
}
.pdb20 {
  padding-bottom: 20px;
}
.addr_box {
  padding: 10px;
  background-color: #fff;
}
.addr_box span {
  background-color: #f5f5f5;
  border-radius: 50px;
  padding: 5px 10px 5px 26px;
  position: relative;
  display: block;
}
.addr_box span:before {
  content: "";
  position: absolute;
  left: 10px;
  top: 5px;
  width: 16px;
  height: 16px;
  background: url(../../../assets/images/icon_addr.png) 0 0 no-repeat;
  -webkit-background-size: auto 100%;
  background-size: auto 100%;
}
.deathLine {
  text-align: center;
  color: #999;
  padding: 20px 0;
  width: 100%;
  display: table;
}
.table {
  display: table;
  width: 100%;
  padding-bottom: 10px;
}
.good_intr dt {
  font-size: 20px;
  margin-bottom: 10px;
}
.file_big_box {
  background-color: #fff;
  margin-top: 10px;
  width: 100%;
  padding-bottom: 10px;
  display: none;
}
.mapBox {
  width: 100%;
}
.mainImg_box {
  width: 100%;
}
.good_name {
  display: block;
}
.mainImgBg {
  display: block;
  height: 206px;
}

.good_intr {
  position: relative;
  width: auto;
}
.good_intr dt {
  display: none;
}
.file_big_box {
  width: 100%;
}
.mapBox {
  width: 100%;
  margin-left: 0;
}
.sub_wrap {
  width: 100%;
  background-color: #fff;
  height: 100%;
}
.wrap {
  height: 100%;
  position: relative;
}

@media only screen and (max-width: 2000px) {
  .wrap {
    width: 640px;
    margin: 0 auto;
  }
}

@media only screen and (max-width: 500px) {
  .wrap {
    width: 100%;
  }
}

.bgw {
  background-color: #fff;
}

.kedu {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 20px;
  background: url(../../../assets/images/kedu.jpg) 0 0 repeat-y;
  left: 50%;
  border-left: 2px solid #75b078;
}
header.subPage_title {
  color: #2caa8a;
}
.pic_box {
  border-top-left-radius: 8px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 8px;
  background-color: #eee;
  width: 160px;
  height: 100px;
  overflow: hidden;
  top: 50px;
  z-index: 2;
  overflow: hidden;
}

.pic_box img {
  width: 100%;
}
.line {
  position: absolute;
  content: "";
  width: 30px;
  height: 3px;
  border-bottom: 1px solid #75b078;
  right: -12px;
  top: 15px;
  z-index: 1;
}

.month {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #66b65e;
  color: #fff;
  border-radius: 5px;
  padding: 6px 20px 6px 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
}
.picNum {
  color: #fff;
  background: url(../../../assets/images/icon_pic.png) 0 0 no-repeat;
  -webkit-background-size: 2px;
  background-size: 20px;
  position: absolute;
  left: 5px;
  top: 5px;
  display: block;
  padding-left: 30px;
  font-weight: bold;
}
.pic_big_box {
  position: absolute;
  right: 50%;
  margin-right: 10px;
}
.pic_big_box_right {
  right: auto;
  left: 50%;
  margin-left: 15px;
}
.pic_big_box_right .pic_box {
  border-top-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 8px;
}
.pic_big_box_right .picNum {
  left: auto;
  right: 10px;
}
.pic_big_box_right .month {
  left: 0;
  top: 0;
  right: auto;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
}
.pic_big_box_right .line {
  right: auto;
  left: -20px;
}
.sub_wrap_line:before {
  position: absolute;
  top: 50px;
  bottom: 0;
  width: 20px;
  background: url(../../../assets/images/kedu.jpg) 0 0 repeat-y;
  left: 50%;
  border-left: 2px solid #75b078;
  content: "";
}
.back {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 26px;
  height: 26px;
  background: #d2f6ed url(../../../assets/images/icon_back.png) center center
    no-repeat;
  -webkit-background-size: 20px;
  background-size: 20px;
  border-radius: 50%;
  padding: 6px;
}
.picList li {
  width: 78px;
  height: 45px;
  float: left;
  overflow: hidden;
  margin-right: 1px;
}
.picList li img {
  width: 100%;
}
.picList {
  padding: 10px 20px;
}
.picList dt {
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #666;
}
.file_item a {
  display: block;
}
.picList dd {
  display: table;
  width: 100%;
}

.tagBox {
  display: flex;
  margin-bottom: 0px;
}
.tagBox li {
  flex: 1;
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
}
.tagBox li.chosen {
  color: #2caa8a;
  font-weight: bold;
  border-bottom: 2px solid #2caa8a;
}
.tagBox li.chosen a {
  color: #2caa8a;
  font-weight: bold;
}
.dataBox {
  text-align: center;
  padding: 20px 10px;
  background-color: #f5f5f5;
}
.table1 th {
  background-color: #e8fcf9;
  padding: 5px;
  color: #5a7974;
}
.table1 td {
  padding: 5px;
  text-align: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  color: #666;
}
.table1 {
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  width: 100%;
}
.img1 {
  width: 100%;
}
.online {
  position: relative;
  margin-top: 20px;
}
.btn_play {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -20px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background: url(../../../assets/images/icon_play.png) 0 0 no-repeat;
  -webkit-background-size: 40px;
  background-size: 40px;
}
.btn_online {
  border-radius: 5px;
  margin: 10px 20px;
  background-color: #65cfb3;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}
.bar_btn {
  text-align: center;
  padding: 10px 0;
}
.btn_video {
  border-radius: 3px;
  background-color: #2caa8a;
  color: #2caa8a;
  display: inline-block;
  padding: 8px 14px;
  color: #fff;
  margin: 10px 5px;
}
.btn_video_selected {
  background-color: #fa8722;
}
.anchorBL {
  display: none; 
}
</style>
<style>
/*这两段是去掉百度地图水印的css*/
.BMap_cpyCtrl {
    display: none !important;
}
.anchorBL {
    display: none !important;
}
</style>


