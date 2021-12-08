<template>
  <dv-border-Box-7 id="report-card" :color="borderColor">
    <div class="report-card-title">{{ reportCardTitle }}</div>
    <div class="report-table">
      <dv-scroll-board :config="config" />
    </div>
  </dv-border-Box-7>
</template>

<script>
export default {
  name: "ReportCard",
  props: {
    reportCardTitle: {
      type: String,
      default: "检验检测报告",
    },
    reportTableData: {
      type: Array,
      default: [
        {
          testItem: "悬浮物，mg/L",
          testMethod: "GB/T 11901-1989",
          testValue: "25.3",
          standardValue: "≤80",
          singleConclusion: "合格",
        },
        {
          testItem: "总磷，mg/L",
          testMethod: "GB/T 11893-1989",
          testValue: "0.16",
          standardValue: "≤0.8",
          singleConclusion: "合格",
        },
        {
          testItem: "总氮，mg/L",
          testMethod: "HJ 636-2012",
          testValue: "0.8",
          standardValue: "≤4.0",
          singleConclusion: "合格",
        },
        {
          testItem: "高锰酸钾指数，mg/L",
          testMethod: "GB/T 11892-1989",
          testValue: "4.34",
          standardValue: "≤20",
          singleConclusion: "合格",
        },
        {
          testItem: "氨氮，mg/L",
          testMethod: "HJ 535-2009",
          testValue: "0.092",
          standardValue: "≤2.2",
          singleConclusion: "合格",
        },
      ],
    },
  },
  data() {
    return {
      borderColor: ["rgba(1, 153, 209, 0.5)", "rgba(1, 153, 209, 0.5)"],
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
    };
  },
  created() {
    if (this.reportTableData.length > 0) {
      let configData = [];
      for (let i = 0; i < this.reportTableData.length; i++) {
        let item = this.reportTableData[i];
        configData.push([
          item.testItem,
          item.testMethod,
          item.testValue,
          item.standardValue,
          item.singleConclusion,
        ]);
      }
      this.config.data = configData;
      setTimeout(() => {
        this.config = Object.assign({}, this.config)
      }, 1000)
    }
  },
};
</script>

<style lang="less">
#report-card {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  padding: 0 2%;
  .report-card-title {
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .report-table {
    height: calc(~"100% - 50px");
  }
}
</style>
