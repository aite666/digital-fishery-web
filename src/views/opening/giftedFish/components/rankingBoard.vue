<template>
  <div id="ranking-board">
    <div class="ranking-board-title">{{ title }}</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "RankingBoard",
  props: {
    title: {
      type: String,
      default: "销售鱼类数量",
    },
    dataList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      config: {
        data: [],
        rowNum: 0,
      },
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
    setTimeout(() => {
      createData();
    }, 100)
  },
  methods: {
    createData() {
      let dataList = [];
      for (let i = 0; i < this.dataList.length; i++) {
        dataList.push({
          name: this.dataList[i].name,
          value: parseInt(this.dataList[i].value),
        });
      }
      if (dataList.length > 0) {
        this.config.data = dataList;
        this.config.rowNum = dataList.length;
        this.config = Object.assign({}, this.config);
      }
    },
  },
};
</script>

<style lang="less">
#ranking-board {
  width: 20%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
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
