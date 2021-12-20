<template>
  <div id="data-view">
    <dv-full-screen-container id="dv-full-screen-container">
      <top-header :mainTitle="bigscreenDetail.configDataJson.mainTitle" />
      <div class="main-content">
        <div class="block-left-content">
          <div class="left-1">
            <weather-card></weather-card>
          </div>
          <div class="left-2">
            <fish-card
              :block="block"
              :fishCardTitle="bigscreenDetail.configDataJson.leftTitle2"
            ></fish-card>
          </div>
          <div class="left-3">
            <sale-card
              :block="block"
              :saleCardTitle="bigscreenDetail.configDataJson.leftTitle3"
            ></sale-card>
          </div>
          <div class="left-4">
            <alert-card
              :block="block"
              :alertCardTitle="bigscreenDetail.configDataJson.leftTitle4"
            ></alert-card>
          </div>
        </div>
        <div class="block-main-content">
          <div class="main-1">
            <center-map @changeBlockSelected="changeBlockSelected"></center-map>
          </div>
          <div class="main-2">
            <center-bottom :images="bigscreenDetail.configDataJson.centerBottomImages"></center-bottom>
          </div>
        </div>
        <div class="block-right-content">
          <div class="right-1">
            <realtime-card
              :block="block"
              :realtimeCardTitle="bigscreenDetail.configDataJson.rightTitle1"
            ></realtime-card>
          </div>
          <div class="right-2">
            <history-card-1
              :block="block"
              :historyCardTitle="bigscreenDetail.configDataJson.rightTitle2"
            ></history-card-1>
          </div>
          <div class="right-3">
            <history-card-2
              :block="block"
              :historyCardTitle="bigscreenDetail.configDataJson.rightTitle3"
            ></history-card-2>
          </div>
          <div class="right-4">
            <report-card
              :block="block"
              :reportCardTitle="bigscreenDetail.configDataJson.rightTitle4"
              :reportTableData="bigscreenDetail.configDataJson.rightTable4"
            ></report-card>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>
<script>
import { fetchList } from "@/api/bigscreen";
import TopHeader from "./components/TopHeader";
import WeatherCard from "./components/WeatherCard";
import FishCard from "./components/FishCard";
import SaleCard from "./components/SaleCard";
import AlertCard from "./components/AlertCard";
import RealtimeCard from "./components/RealtimeCard";
import HistoryCard1 from "./components/HistoryCard1";
import HistoryCard2 from "./components/HistoryCard2";
import ReportCard from "./components/ReportCard";
import CenterBottom from "./components/CenterBottom";
import CenterMap from "./components/CenterMap";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
export default {
  name: "bigscreenMap",
  components: {
    TopHeader,
    WeatherCard,
    FishCard,
    SaleCard,
    AlertCard,
    RealtimeCard,
    HistoryCard1,
    HistoryCard2,
    ReportCard,
    CenterBottom,
    CenterMap,
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      block: null,
      bigscreenDetail: {
        name: "bigscreenMap",
        configDataJson: {
          mainTitle: "",
          leftTitle2: "",
          leftTitle3: "",
          leftTitle4: "",
          rightTitle1: "",
          rightTitle2: "",
          rightTitle3: "",
          rightTitle4: "",
          rightTable4: [],
          centerBottomImages: "",
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.name = "bigscreenMap";
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data.list;
        if (list.length > 0) {
          this.bigscreenDetail = list[0];
          console.log(this.bigscreenDetail)
        }
      });
    },
    changeBlockSelected(block) {
      console.log(block);
      this.block = block;
    },
  },
};
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url(../../../assets/images/datav_bg1.png);
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(~"100% - 100px");
    .block-left-content {
      display: flex;
      width: 30%;
      flex-direction: column;

      .left-1 {
        height: 25%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .top-middle-cmp {
        width: 100%;
      }

      .left-2 {
        height: 25%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .left-3 {
        height: 25%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .left-4 {
        height: 25%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
    }

    .block-main-content {
      display: flex;
      width: 40%;
      flex-direction: column;

      .main-1 {
        height: 74%;
      }

      .main-2 {
        margin-top: 1%;
        height: 25%;
      }
    }

    .block-right-content {
      display: flex;
      width: 30%;
      flex-direction: column;
      .right-1 {
        height: 20%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .top-right-cmp {
        width: 100%;
      }

      .right-2 {
        height: 25%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .right-3 {
        height: 25%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
      .right-4 {
        height: 30%;
        box-sizing: border-box;
        padding: 2px 10px;
        display: flex;
      }
    }
  }
}
</style>
