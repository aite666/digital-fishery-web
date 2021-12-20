<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <!-- <div class="mh-left">技术支持:<a href="https://github.com/jiaming743/DataV">https://github.com/jiaming743/DataV</a></div> -->
        <div class="mh-middle">
          {{ bigscreenDetail.configDataJson.mainTitle }}
        </div>
        <div class="mh-right">
          <dv-border-box-2
            style="
              width: 120px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              margin-left: 200px;
            "
          >
            {{ bigscreenDetail.configDataJson.subTitle }}
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="datav-main-container">
        <div class="mc-top">
          <Top-Left-Cmp
            :title1="bigscreenDetail.configDataJson.leftTopTitle1"
            :data11="bigscreenDetail.configDataJson.leftTopData11"
            :data12="bigscreenDetail.configDataJson.leftTopData12"
            :data13="bigscreenDetail.configDataJson.leftTopData13"
            :title2="bigscreenDetail.configDataJson.leftTopTitle2"
            :data21="bigscreenDetail.configDataJson.leftTopData21"
            :data22="bigscreenDetail.configDataJson.leftTopData22"
            :data23="bigscreenDetail.configDataJson.leftTopData23"
          />
          <Top-Middle-Cmp
            :title="bigscreenDetail.configDataJson.centerTitle1"
            :dataList="bigscreenDetail.configDataJson.centerData1"
          />
          <Top-right-Cmp
            :title="bigscreenDetail.configDataJson.centerTitle2"
            :dataList="bigscreenDetail.configDataJson.centerData2"
          />
        </div>
        <div class="mc-bottom">
          <dv-border-box-6 class="bottom-left-container">
            <dv-decoration-4
              class="mcb-decoration-1"
              style="width: 5px; height: 45%"
            />
            <dv-decoration-4
              class="mcb-decoration-2"
              style="width: 5px; height: 45%"
            />
            <Bottom-Left-Chart-1
              :title="bigscreenDetail.configDataJson.leftBottomTitle1"
              :saleTotal="bigscreenDetail.configDataJson.leftBottomSaleTotal"
              :dataList="bigscreenDetail.configDataJson.leftBottomData1"
            />
            <Bottom-Left-Chart-2
              :title="bigscreenDetail.configDataJson.leftBottomTitle2"
              :timeAvg="bigscreenDetail.configDataJson.leftBottomTimeAvg"
              :dataList="bigscreenDetail.configDataJson.leftBottomData2"
            />
          </dv-border-box-6>

          <div class="bottom-right-container">
            <Bottom-Right-Table-1
              :title="bigscreenDetail.configDataJson.rightTitle1"
              :dataList="bigscreenDetail.configDataJson.rightData1"
            />
            <Bottom-Right-Table-2
              :title="bigscreenDetail.configDataJson.rightTitle2"
              :dataList="bigscreenDetail.configDataJson.rightData2"
            />
            <Bottom-Right-Table-3
              :title="bigscreenDetail.configDataJson.rightTitle3"
              :dataList="bigscreenDetail.configDataJson.rightData3"
            />
            <Bottom-Right-Table-4
              :title="bigscreenDetail.configDataJson.rightTitle4"
              :dataList="bigscreenDetail.configDataJson.rightData4"
            />
          </div>
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script>
import { fetchList } from "@/api/bigscreen";
import TopLeftCmp from "./components/TopLeftCmp";
import TopMiddleCmp from "./components/TopMiddleCmp";
import TopRightCmp from "./components/TopRightCmp";

import BottomLeftChart1 from "./components/BottomLeftChart1";
import BottomLeftChart2 from "./components/BottomLeftChart2";

import BottomRightTable1 from "./components/BottomRightTable1";
import BottomRightTable2 from "./components/BottomRightTable2";
import BottomRightTable3 from "./components/BottomRightTable3";
import BottomRightTable4 from "./components/BottomRightTable4";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
export default {
  name: "riceTurtlOpening",
  components: {
    TopLeftCmp,
    TopMiddleCmp,
    TopRightCmp,
    BottomLeftChart1,
    BottomLeftChart2,
    BottomRightTable1,
    BottomRightTable2,
    BottomRightTable3,
    BottomRightTable4,
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      bigscreenDetail: {
        name: "riceTurtl",
        configDataJson: {
          mainTitle: "",
          subTitle: "",
          leftTopTitle1: "",
          leftTopData11: "",
          leftTopData12: "",
          leftTopData13: "",
          leftTopTitle2: "",
          leftTopData21: "",
          leftTopData22: "",
          leftTopData23: "",

          centerTitle1: "",
          centerData1: [],
          centerTitle2: "",
          centerData2: [],

          leftBottomTitle1: "",
          leftBottomSaleTotal: "",
          leftBottomData1: [],
          leftBottomTitle2: "",
          leftBottomTimeAvg: "",
          leftBottomData2: [],

          rightTitle1: "",
          rightData1: [],
          rightTitle2: "",
          rightData2: [],
          rightTitle3: "",
          rightData3: [],
          rightTitle4: "",
          rightData4: [],
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listQuery.name = "riceTurtl";
      fetchList(this.listQuery).then((response) => {
        let list = response.data.list;
        if (list.length > 0) {
          this.bigscreenDetail = list[0];
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
    background-image: url(../../../assets/images/datav_bg2.png);
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    // justify-content: space-between;
    justify-content: center;
    // align-items: flex-end;
    align-items: center;

    .mh-left {
      font-size: 20px;
      color: rgb(1, 134, 187);

      a:visited {
        color: rgb(1, 134, 187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left,
    .mh-right {
      width: 450px;
    }
    .mh-right {
      position: absolute;
      right: 0;
    }
  }

  .datav-main-container {
    height: calc(~"100% - 80px");

    .mc-top,
    .mc-bottom {
      box-sizing: border-box;
      padding: 30px;
      display: flex;
    }

    .mc-top {
      height: 40%;
    }

    .mc-bottom {
      height: 60%;
    }

    .top-left-cmp,
    .bottom-left-container {
      width: 32%;
    }

    .top-middle-cmp,
    .top-right-cmp {
      width: 34%;
    }

    .bottom-left-container {
      position: relative;

      .border-box-content {
        display: flex;
      }

      .mcb-decoration-1 {
        position: absolute;
        left: 50%;
        margin-left: -2px;
      }

      .mcb-decoration-2 {
        position: absolute;
        left: 49.7%;
        margin-left: -2px;
      }

      .mcb-decoration-1 {
        top: 5%;
        transform: rotate(180deg);
      }

      .mcb-decoration-2 {
        top: 50%;
      }

      .bottom-left-chart-1,
      .bottom-left-chart-2 {
        width: 50%;
        height: 100%;
      }
    }

    .bottom-right-container {
      width: 68%;
      padding-left: 30px;
      box-sizing: border-box;
      display: flex;
    }
  }
}
</style>
