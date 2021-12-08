<template>
  <dv-border-Box-7 class="top-right-cmp" :color="borderColor">
    <div class="chart-name">
      {{ historyCardTitle }}
      <span v-if="blockName">（{{ blockName }}）</span>
      <dv-decoration-3 style="width: 200px; height: 20px" />
    </div>
    <dv-charts :option="option" />
  </dv-border-Box-7>
</template>

<script>
import { getDeviceNodeDayCharts } from "@/api/device";
import { str2Date, formatDate } from "@/utils/date";
export default {
  name: "HistoryCard1",
  props: {
    historyCardTitle: {
      type: String,
      default: "温度变化趋势",
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
        this.getDeviceHistoryData(null);
      } else {
        this.blockId = val.id;
        this.blockName = val.blockName;
        this.getDeviceHistoryData(val.id);
      }
    },
  },
  data() {
    return {
      borderColor: ["rgba(1, 153, 209, 0.5)", "rgba(1, 153, 209, 0.5)"],
      blockId: null,
      blockName: null,
      option: null,
      defaultOption: {
        legend: {
          data: [
            {
              name: "气温",
              color: "#ff5ca9",
            },
            {
              name: "水温",
              color: "#3de7c9",
            },
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        grid: {
          top: 70,
        },
        xAxis: {
          data: [],
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          name: "温度(°C)",
          nameGap: 6,
          nameTextStyle: {
            fill: "#fff",
            fontSize: 10,
          },
          data: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            style: {
              stroke: "#999",
            },
          },
          axisLabel: {
            style: {
              fill: "#999",
            },
          },
          axisTick: {
            show: false,
          },
          min: 0,
          max: 40,
        },
        series: [
          {
            name: "气温",
            data: [],
            type: "line",
            lineStyle: {
              stroke: "#ff5ca9",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#ff5ca9",
                stroke: "transparent",
              },
            },
          },
          {
            name: "水温",
            data: [],
            type: "line",
            smooth: false,
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"],
            },
            lineStyle: {
              stroke: "#00db95",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#00db95",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    this.getDeviceHistoryData(null);
  },
  methods: {
    getDeviceHistoryData(blockId) {
      let params = {
        startTime: formatDate(
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 14),
          "yyyy-MM-dd hh:mm:ss"
        ),
        endTime: formatDate(
          new Date(new Date().getTime()),
          "yyyy-MM-dd hh:mm:ss"
        ),
        registerNames: "温度,水温",
      };
      if (blockId != null) {
        params["blockId"] = blockId;
      }
      getDeviceNodeDayCharts(params).then((response) => {
        console.log(response);
        let list = response.data;
        if (list != null) {
          let dateList = [];
          let valueList1 = [];
          let valueList2 = [];
          let max = 30;
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            dateList.push(
              item.date.substring(5, 7) + "/" + item.date.substring(8, 10)
            );
            if (item["温度"]) {
              valueList1.push(item["温度"]);
            } else {
              valueList1.push(0);
            }
            if (item["温度"] > max) {
              max = item["温度"];
            }
            if (item["水温"]) {
              valueList2.push(item["水温"]);
            } else {
              valueList2.push(0);
            }
            if (item["水温"] > max) {
              max = item["水温"];
            }
          }
          this.defaultOption.xAxis.data = dateList;
          this.defaultOption.yAxis.max = max;
          this.defaultOption.series[0].data = valueList1;
          this.defaultOption.series[1].data = valueList2;
          setTimeout(() => {
            this.option = Object.assign({}, this.defaultOption);
          }, 10);
        }
      });
    },
  },
};
</script>

<style lang="less">
.top-right-cmp {
  position: relative;
  padding: 0;
  box-sizing: border-box;

  .chart-name {
    position: absolute;
    left: 5%;
    text-align: left;
    font-size: 20px;
    top: 10px;
  }
}
</style>
