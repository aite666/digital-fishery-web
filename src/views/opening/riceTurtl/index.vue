<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <!-- <div class="mh-left">技术支持:<a href="https://github.com/jiaming743/DataV">https://github.com/jiaming743/DataV</a></div> -->
        <div class="mh-middle">稻鳖共生模式专题分析</div>
        <div class="mh-right">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
          >
            稻鳖共生档案馆
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="datav-main-container">
        <div class="mc-top">
          <Top-Left-Cmp />
          <Top-Middle-Cmp />
          <Top-right-Cmp />
        </div>
        <div class="mc-bottom">
          <dv-border-box-6 class="bottom-left-container">
            <dv-decoration-4 class="mcb-decoration-1" style="width:5px;height:45%;" />
            <dv-decoration-4 class="mcb-decoration-2" style="width:5px;height:45%;" />
            <Bottom-Left-Chart-1 />
            <Bottom-Left-Chart-2 />
          </dv-border-box-6>

          <div class="bottom-right-container">
            <Bottom-Right-Table-1 />
            <Bottom-Right-Table-2 />
            <Bottom-Right-Table-3 />
            <Bottom-Right-Table-4 />
          </div>
        </div>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>
import TopLeftCmp from './components/TopLeftCmp'
import TopMiddleCmp from './components/TopMiddleCmp'
import TopRightCmp from './components/TopRightCmp'

import BottomLeftChart1 from './components/BottomLeftChart1'
import BottomLeftChart2 from './components/BottomLeftChart2'

import BottomRightTable1 from './components/BottomRightTable1'
import BottomRightTable2 from './components/BottomRightTable2'
import BottomRightTable3 from './components/BottomRightTable3'
import BottomRightTable4 from './components/BottomRightTable4'

export default {
  name: 'riceTurtlOpening',
  components: {
    TopLeftCmp,
    TopMiddleCmp,
    TopRightCmp,
    BottomLeftChart1,
    BottomLeftChart2,
    BottomRightTable1,
    BottomRightTable2,
    BottomRightTable3,
    BottomRightTable4
  },
  data () {
    return {}
  }
}
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
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
    .mh-right {
      position: absolute;
      right: 0;
    }
  }

  .datav-main-container {
    height: calc(~"100% - 80px");

    .mc-top, .mc-bottom {
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

    .top-left-cmp, .bottom-left-container {
      width: 32%;
    }

    .top-middle-cmp, .top-right-cmp {
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

      .bottom-left-chart-1, .bottom-left-chart-2 {
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
