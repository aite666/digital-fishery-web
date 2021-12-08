<template>
  <div id="rose-chart">
    <div class="rose-chart-title">{{ title }}</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: "RoseChart",
  props: {
    title: {
      type: String,
      default: "累计销售客户分布",
    },
    dataList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      option: {},
    };
  },
  watch: {
    dataList(val, valOld) {
      this.createData();
    },
  },
  created() {
    console.log(this.dataList);
    const { createData } = this;
    createData();
    setInterval(createData, 30000);
  },
  methods: {
    createData() {
      const { randomExtend } = this;
      let dataList = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        let min = parseInt((item.value * 3) / 4);
        dataList.push({
          name: item.name,
          value: randomExtend(min, parseInt(item.value)),
        });
      }
      if (dataList.length > 0) {
        this.option = {
          series: [
            {
              type: "pie",
              radius: "50%",
              roseSort: false,
              data: dataList,
              insideLabel: {
                show: false,
              },
              outsideLabel: {
                formatter: "{name} {percent}%",
                labelLineEndLength: 20,
                style: {
                  fill: "#fff",
                },
                labelLineStyle: {
                  stroke: "#fff",
                },
              },
              roseType: true,
            },
          ],
          color: [
            "#da2f00",
            "#fa3600",
            "#ff4411",
            "#ff724c",
            "#541200",
            "#801b00",
            "#a02200",
            "#5d1400",
            "#b72700",
          ],
        };
      }
    },
    randomExtend(minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10);
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      }
    },
  },
};
</script>

<style lang="less">
#rose-chart {
  width: 30%;
  height: 100%;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;

  .rose-chart-title {
    height: 50px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .dv-charts-container {
    height: calc(~"100% - 50px");
  }
}
</style>
