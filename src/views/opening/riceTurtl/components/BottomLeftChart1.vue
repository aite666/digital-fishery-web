<template>
  <div class="bottom-left-chart-1">
    <div class="header-name">{{title}}</div>
    <div class="details-value"><span>{{saleTotalNum.toLocaleString()}}</span>￥</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'BottomLeftChart1',
  props: {
    title: {
      type: String,
      default: "",
    },
    saleTotal: {
      type: String,
      default: "",
    },
    dataList: {
      type: Array,
      default: [],
    },
  },
  watch: {
    saleTotal(val, valOld) {
      this.getSaleTotalNum();
    },
    dataList(val, valOld) {
      this.createData();
    },
  },
  data () {
    return {
      saleTotalNum: 0,
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '客户A', value: 93, radius: ['30%', '33%'] },
              { name: '客户B', value: 65, radius: ['32%', '35%'] },
              { name: '客户C', value: 32, radius: ['31%', '37%'] },
              { name: '客户D', value: 44, radius: ['31%', '32%'] },
              { name: '其它', value: 52, radius: ['32%', '35%'] }
            ],
            outsideLabel: {
              labelLineEndLength: 20,
              formatter: '{percent}%\n{name}',
              style: {
                fill: '#fff'
              }
            }
          },
          {
            name: 'decoration ring',
            type: 'pie',
            data: [
              { value: 10, radius: ['50%', '53%'] }
            ],
            outsideLabel: {
              show: false
            },
            pieStyle: {
              fill: 'rgba(255, 255, 255, 0.2)'
            }
          },
          {
            name: 'decoration ring',
            type: 'pie',
            data: [
              { value: 10, radius: ['45%', '46%'] }
            ],
            outsideLabel: {
              show: false
            },
            pieStyle: {
              fill: 'rgba(255, 255, 255, 0.2)'
            }
          }
        ],
        color: ['#00c0ff', '#3de7c9', '#fff', '#00c0ff', '#3de7c9', '#fff']
      }
    }
  },
  created() {
    this.getSaleTotalNum();
    this.createData();
  },
  methods: {
    getSaleTotalNum() {
      this.saleTotalNum = parseInt(this.saleTotal);
    },
    createData() {
      if (this.dataList.length > 0) {
        let configData = [];
        for (let i = 0; i < this.dataList.length; i++) {
          let item = this.dataList[i];
          let value = parseInt(item['value'])
          let value2 = parseInt(item['value']) / 2
          configData.push({
            name: item['name'],
            value: value,
            radius: [value2 + '%', value + '%']
          });
        }
        this.option.series[0].data = configData;
        this.option = Object.assign({}, this.option);
      }
    },
  },
}
</script>

<style lang="less">
.bottom-left-chart-1 {
  position: relative;

  .header-name {
    height: 150px;
    line-height: 150px;
    font-size: 20px;
    text-align: center;
  }

  .details-value {
    height: 40px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;

    span {
      color: #00c0ff;
      font-size: 45px;
    }
  }

  .dv-charts-container {
    height: calc(~"100% - 190px");
  }

  .decoration-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 5px solid fade(#fefefe, 30);
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
