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
  name: "HistoryCard2",
  props: {
    historyCardTitle: {
      type: String,
      default: "湿度、溶解氧、PH变化趋势",
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
              name: "湿度",
              color: "#ff5ca9",
            },
            {
              name: "溶解氧",
              color: "#3de7c9",
            },
            {
              name: "PH",
              color: "#f5d94e",
            },
          ],
          textStyle: {
            fill: "#fff",
          },
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
          max: 10,
        },
        series: [
          {
            name: "湿度",
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
            name: "溶解氧",
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
          {
            data: [],
            type: "line",
            name: "PH",
            lineArea: {
              show: true,
              gradient: ["rgba(245, 217, 79, 0.8)", "rgba(245, 217, 79, 0.2)"],
            },
            lineStyle: {
              stroke: "#f5d94e",
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#f5d94e",
                stroke: "transparent",
              },
            },
          },
        ],
      },
    }
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
        registerNames: "湿度,溶解氧,ph",
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
          let valueList3 = [];
          let max = 10;
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            dateList.push(
              item.date.substring(5, 7) + "/" + item.date.substring(8, 10)
            );
            if (item["湿度"]) {
              valueList1.push(item["湿度"]);
            } else {
              valueList1.push(0);
            }
            if (item["湿度"] > max) {
              max = item["湿度"];
            }
            if (item["溶解氧"]) {
              valueList2.push(item["溶解氧"]);
            } else {
              valueList2.push(0);
            }
            if (item["溶解氧"] > max) {
              max = item["溶解氧"];
            }
            if (item["ph"]) {
              valueList3.push(item["ph"]);
            } else {
              valueList3.push(0);
            }
            if (item["ph"] > max) {
              max = item["ph"];
            }
          }
          this.defaultOption.xAxis.data = dateList;
          this.defaultOption.yAxis.max = max;
          this.defaultOption.series[0].data = valueList1;
          this.defaultOption.series[1].data = valueList2;
          this.defaultOption.series[2].data = valueList3;
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
