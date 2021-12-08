<template>
  <dv-border-Box-7 :color="borderColor" class="top-middle-cmp">
    <div class="chart-name">
      {{ saleCardTitle }}
      <span v-if="blockName">（{{ blockName }}）</span>
      <dv-decoration-3 style="width: 200px; height: 20px" />
    </div>
    <dv-charts :option="option" />
  </dv-border-Box-7>
</template>

<script>
import { getChartData } from "@/api/home";
import { str2Date, formatDate } from "@/utils/date";
export default {
  name: "SaleCard",
  props: {
    saleCardTitle: {
      type: String,
      default: "区块销售情况",
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
        this.getChartData(null);
      } else {
        this.blockId = val.id;
        this.blockName = val.blockName;
        this.getChartData(val.id);
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
              name: "销售总数(公斤)",
              color: "#ff5ca9",
            },
            {
              name: "销售总数(条)",
              color: "#f5d94e",
            },
            {
              name: "销售总额",
              color: "#3de7c9",
            },
          ],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: [],
          boundaryGap: false,
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
        grid: {
          top: 70,
        },
        yAxis: [
          {
            name: "销售总数(公斤/条)",
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
              formatter({ value }) {
                return value.toFixed(2);
              },
            },
            axisTick: {
              show: false,
            },
            min: 0,
            max: 1000,
          },
          {
            name: "销售总额(￥)",
            nameGap: 6,
            nameTextStyle: {
              fill: "#fff",
              fontSize: 10,
            },
            data: "value",
            position: "right",
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
              formatter({ value }) {
                return value;
              },
            },
            axisTick: {
              show: false,
            },
            min: 0,
            max: 10000,
          },
        ],
        series: [
          {
            data: [],
            type: "line",
            name: "销售总数(公斤)",
            smooth: false,
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
            yAxisIndex: 0,
          },
          {
            data: [],
            type: "line",
            name: "销售总数(条)",
            smooth: false,
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
            yAxisIndex: 0,
          },
          {
            data: [],
            type: "line",
            name: "销售总额",
            smooth: false,
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"],
            },
            lineStyle: {
              lineDash: [5, 5],
            },
            linePoint: {
              radius: 4,
              style: {
                fill: "#00db95",
              },
            },
            yAxisIndex: 1,
          },
        ],
      },
    };
  },
  created() {
    this.getChartData(null);
  },
  methods: {
    getChartData(blockId) {
      let params = {
        startTime: formatDate(
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 14),
          "yyyy-MM-dd hh:mm:ss"
        ),
        endTime: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
        detail: 1,
      };
      if (blockId != null) {
        params["blockId"] = blockId;
      }
      getChartData(params).then((response) => {
        let list = response.data;
        let dateList = [];
        let saleQuantityList1 = [];
        let saleQuantityList2 = [];
        let saleAmountList = [];
        let max1 = 0;
        let max2 = 0;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          dateList.push(
            item.date.substring(5, 7) + "/" + item.date.substring(8, 10)
          );
          saleQuantityList1.push(item.saleQuantity1);
          if (item.saleQuantity1 > max1) {
            max1 = item.saleQuantity1;
          }
          saleQuantityList2.push(item.saleQuantity2);
          if (item.saleQuantity2 > max1) {
            max1 = item.saleQuantity2;
          }
          saleAmountList.push(item.saleAmount);
          if (item.saleAmount > max2) {
            max2 = item.saleAmount;
          }
        }
        this.defaultOption.xAxis.data = dateList;
        this.defaultOption.yAxis[0].max = max1;
        this.defaultOption.yAxis[1].max = max2;
        this.defaultOption.series[0].data = saleQuantityList1;
        this.defaultOption.series[1].data = saleQuantityList2;
        this.defaultOption.series[2].data = saleAmountList;
        setTimeout(() => {
          this.option = Object.assign({}, this.defaultOption);
        }, 10);
      });
    },
  },
};
</script>

<style lang="less">
.top-middle-cmp {
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
