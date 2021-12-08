<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'ScrollBoard',
  props: {
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
      config: {
        header: [
          "检验检测项目、单位",
          "检验检测方法",
          "检测值",
          "标准值",
          "单项结论",
        ],
        headerBGC: '#0199d1',
        data: [
          ["悬浮物，mg/L", "GB/T 11901-1989", "25.3", "≤80", "合格"],
          ["总磷，mg/L", "GB/T 11893-1989", "0.16", "≤0.8", "合格"],
          ["总氮，mg/L", "HJ 636-2012", "0.8", "≤4.0", "合格"],
          ["高锰酸钾指数，mg/L", "GB/T 11892-1989", "4.34", "≤20", "合格"],
          ["氨氮，mg/L", "HJ 535-2009 11901-1989", "0.092", "≤2.2", "合格"],
        ],
        columnWidth: [200, 200, 85, 85, 100],
        index: false,
        align: ["center"],
        rowNum: 5,
        oddRowBGC: "rgba(0, 44, 81, 0.8)",
        evenRowBGC: "rgba(10, 29, 50, 0.8)",
      },
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
          configData.push([
            item.testItem,
            item.testMethod,
            item.testValue,
            item.standardValue,
            item.singleConclusion,
          ]);
        }
        this.config.data = configData;
        this.config = Object.assign({}, this.config)
      }
    },
  },
}
</script>

<style lang="less">
#scroll-board {
  width: 50%;
  box-sizing: border-box;
  margin-left: 20px;
  height: 100%;
  overflow: hidden;
}
</style>
