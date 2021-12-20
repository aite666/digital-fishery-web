<template>
  <div class="top-right-cmp">
    <div class="chart-name">
      {{ title }}
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'TopRightCmp',
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
  data () {
    return {
      option: {
        legend: {
          data: [
            {
              name: this.title,
              color: '#00baff'
            },
          ],
          textStyle: {
            fill: '#fff'
          }
        },
        xAxis: {
          data: [
            '2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07'
          ],
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#999'
            }
          },
          axisLabel: {
            style: {
              fill: '#999'
            }
          },
          axisTick: {
            show: false
          },
          min: 0,
        },
        series: [
          {
            name: this.title,
            data: [
              145, 146, 145, 147, 148, 150, 150
            ],
            type: 'bar',
            barStyle: {
              fill: 'rgba(0, 186, 255, 0.4)'
            }
          },
        ]
      }
    }
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
        this.option.xAxis.data = timeList;
        this.option.series[0].data = valueList;
        this.option = Object.assign({}, this.option);
      }
    },
  },
}
</script>

<style lang="less">
.top-right-cmp {
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
