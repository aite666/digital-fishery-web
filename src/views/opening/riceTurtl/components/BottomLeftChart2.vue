<template>
  <div class="bottom-left-chart-2">
    <div class="header-name">{{title}}</div>
    <div class="details-value"><span>{{timeAvg}}</span>分钟</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'BottomLeftChart2',
  props: {
    title: {
      type: String,
      default: "",
    },
    timeAvg: {
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
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 7,
            data: [
              { name: '10分钟以内', value: 25, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '60%' },
              { name: '15分钟以内', value: 45, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '52%' },
              { name: '30分钟以内', value: 65, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '44%' },
              { name: '45分钟以内', value: 35, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '36%' },
              { name: '大于60分钟', value: 25, gradient: ['#03c2fd', '#1ed3e5', '#2fded6'], radius: '28%' }
            ],
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            dataItemStyle: {
              lineCap: 'round'
            },
            backgroundArc: {
              show: false
            },
            details: {
              show: true,
              formatter: '{name}',
              position: 'start',
              offset: [-10, 0],
              style: {
                fill: '#fff',
                fontSize: 12,
                textAlign: 'right'
              }
            }
          }
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
        let configData = [];
        for (let i = 0; i < this.dataList.length; i++) {
          let item = this.dataList[i];
          let value = parseInt(item['value'])
          configData.push({
            name: item['name'],
            value: value,
            gradient: ['#03c2fd', '#1ed3e5', '#2fded6'],
            radius: (60 - 8 * i) + '%'
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
.bottom-left-chart-2 {
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
}
</style>
