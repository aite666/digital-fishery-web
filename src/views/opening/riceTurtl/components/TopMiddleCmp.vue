<template>
  <div class="top-middle-cmp">
    <div class="chart-name">
      {{ title }}
      <dv-decoration-3 style="width: 200px; height: 20px" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: "TopMiddleCmp",
  props: {
    title: {
      type: String,
      default: "",
    },
    dataList: {
      type: Array,
      default: [],
    },
  },
  watch: {
    dataList(val, valOld) {
      this.createData();
    },
  },
  data() {
    return {
      option: {
        legend: {
          data: [this.title],
          textStyle: {
            fill: "#fff",
          },
        },
        xAxis: {
          data: [
            "2021-01",
            "2021-02",
            "2021-03",
            "2021-04",
            "2021-05",
            "2021-06",
            "2021-07",
            "2021-08",
            "2021-09",
            "2021-10",
            "2021-11",
            "2021-12",
          ],
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
        },
        series: [
          {
            data: [
              2122,
              2668,
              2847,
              2226,
              2115,
              2442,
              2813,
              2843,
              2377,
              2144,
              2452,
              2156,
            ],
            type: "line",
            name: this.title,
            smooth: true,
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"],
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
    this.createData();
  },
  methods: {
    createData() {
      if (this.dataList.length > 0) {
        let timeList = [];
        let valueList = [];
        for (let i = 0; i < this.dataList.length; i++) {
          let item = this.dataList[i];
          timeList.push(item.time);
          valueList.push(parseInt(item.value));
        }
        console.log(timeList)
        console.log(valueList)
        this.option.xAxis.data = timeList;
        this.option.series[0].data = valueList;
        this.option = Object.assign({}, this.option);
      }
    },
  },
};
</script>

<style lang="less">
.top-middle-cmp {
  position: relative;
  padding: 0 50px;
  box-sizing: border-box;

  .chart-name {
    position: absolute;
    right: 70px;
    text-align: right;
    font-size: 20px;
    top: 10px;
  }
}
</style>
