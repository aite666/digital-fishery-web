<template>
  <div id="data-view">
    <dv-full-screen-container>
      <top-header :mainTitle="bigscreenDetail.configDataJson.mainTitle" />
      <div class="main-content">
        <digital-flop
          :dataList="bigscreenDetail.configDataJson.centerTopData"
        />
        <div class="block-left-right-content">
          <ranking-board
            :title="bigscreenDetail.configDataJson.leftTitle"
            :dataList="bigscreenDetail.configDataJson.leftTableData"
          />
          <div class="block-top-bottom-content">
            <div class="block-top-content">
              <rose-chart
                :title="bigscreenDetail.configDataJson.centerTitle1"
                :dataList="bigscreenDetail.configDataJson.centerData1"
              />
              <water-level-chart
                :amount="bigscreenDetail.configDataJson.centerData21"
                :percent="bigscreenDetail.configDataJson.centerData22"
              />
              <scroll-board
                :dataList="bigscreenDetail.configDataJson.rightTableData"
              />
            </div>
            <cards
              :image1="bigscreenDetail.configDataJson.bottomImage1"
              :image2="bigscreenDetail.configDataJson.bottomImage2"
              :image3="bigscreenDetail.configDataJson.bottomImage3"
              :image4="bigscreenDetail.configDataJson.bottomImage4"
            />
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>
<script>
import { fetchList } from "@/api/bigscreen";
import topHeader from "./components/topHeader";
import digitalFlop from "./components/digitalFlop";
import rankingBoard from "./components/rankingBoard";
import roseChart from "./components/roseChart";
import waterLevelChart from "./components/waterLevelChart";
import scrollBoard from "./components/scrollBoard";
import cards from "./components/cards";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
export default {
  name: "giftedFishOpening",
  components: {
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    cards,
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      bigscreenDetail: {
        name: "giftedFish",
        configDataJson: {
          mainTitle: "",
          centerTopData: [],
          leftTitle: "",
          leftTableData: [],
          centerTitle1: "",
          centerData1: [],
          centerTitle2: "",
          centerData2: [0, 0],
          rightTableData: [],
          bottomImage1: "",
          bottomImage2: "",
          bottomImage3: "",
          bottomImage4: "",
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listQuery.name = "giftedFish";
      fetchList(this.listQuery).then((response) => {
        let list = response.data.list;
        if (list.length > 0) {
          this.bigscreenDetail = list[0];
          console.log(this.bigscreenDetail);
        }
      });
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
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 55%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
}
</style>
