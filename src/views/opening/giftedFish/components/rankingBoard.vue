<template>
  <div id="ranking-board">
    <div class="ranking-board-title">区试巡查上报记录数量</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'RankingBoard',
  data () {
    return {
      config: {
        data: [
          {
            name: '检查水质',
            value: 320
          },
          {
            name: '检查温度',
            value: 120
          },
          {
            name: '检查水温',
            value: 78
          },
          {
            name: '检查湿度',
            value: 66
          },
          {
            name: '检查死鱼数量',
            value: 80
          },
          {
            name: '检查光照',
            value: 45
          },
          {
            name: '检查饲料情况',
            value: 619
          },
          {
            name: '检查化肥情况',
            value: 430
          },
          {
            name: '检查农药情况',
            value: 339
          }
        ],
        rowNum: 9
      }
    }
  }
}
</script>

<style lang="less">
#ranking-board {
  width: 20%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  padding: 0px 30px;

  .ranking-board-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
