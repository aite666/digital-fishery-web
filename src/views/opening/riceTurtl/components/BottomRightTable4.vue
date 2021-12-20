<template>
  <div class="bottom-right-table-4">
    <dv-border-box-6>
      <div class="table-name">
        <img src="../../../../assets/images/datav_icon4.png" />{{title}}
      </div>

      <dv-scroll-board :config="config" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable4',
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
      config: {
        data: [
          ['饲料A', '月累计：4起'],
          ['饲料B', '月累计：3起'],
          ['饲料C', '月累计：3起'],
          ['饲料D', '月累计：3起'],
          ['饲料F', '月累计：2起'],
          ['饲料G', '月累计：1起']
        ],
        index: true,
        columnWidth: [30, 100],
        align: ['center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
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
          configData.push([item['name'], item['value']]);
        }
        this.config.data = configData;
        this.config = Object.assign({}, this.config);
      }
    },
  },
}
</script>

<style lang="less">
.bottom-right-table-4 {
  width: calc(~"25% + 10px");
  height: 100%;
  margin: 0 -5px;

  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }

  .table-name {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }

  .dv-scroll-board {
    height: calc(~"100% - 60px");
  }
}
</style>
