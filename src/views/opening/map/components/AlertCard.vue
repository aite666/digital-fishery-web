<template>
  <dv-border-Box-7 id="alert-card" :color="borderColor">
    <div class="alert-card-title">
      {{ alertCardTitle }}
      <span v-if="blockName">（{{ blockName }}）</span>
    </div>
    <div class="alert-table">
      <dv-scroll-board :config="config" />
    </div>
  </dv-border-Box-7>
</template>

<script>
import { fetchList } from "@/api/alarm";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  userId: null,
  description: null,
  blockId: null,
};
export default {
  name: "AlertCard",
  props: {
    alertCardTitle: {
      type: String,
      default: "报警通知",
    },
    block: {
      type: Object,
      default: null,
    },
  },
  watch: {
    block(val, valOld) {
      if (val == null) {
        this.blockId = null;
        this.blockName = null;
        this.getAlerts(null);
      } else {
        this.blockId = val.id;
        this.blockName = val.blockName;
        this.getAlerts(val.id);
      }
    }
  },
  data() {
    return {
      borderColor: ["rgba(1, 153, 209, 0.5)", "rgba(1, 153, 209, 0.5)"],
      listQuery: Object.assign({}, defaultListQuery),
      blockId: null,
      blockName: null,
      config: {
        data: [],
        columnWidth: [160],
        index: false,
        align: ["center"],
        rowNum: 5,
        oddRowBGC: "rgba(0, 44, 81, 0.8)",
        evenRowBGC: "rgba(10, 29, 50, 0.8)",
      },
    };
  },
  created() {
    this.getAlerts(null);
  },
  methods: {
    getAlerts(blockId) {
      this.listQuery.blockId = blockId;
      fetchList(this.listQuery).then((response) => {
        let list = response.data.list;
        let configData = [];
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          configData.push([item.alarmTime, item.description]);
        }
        this.config.data = configData;
        setTimeout(() => {
          this.config = Object.assign({}, this.config);
        }, 500)
      });
    },
  },
};
</script>

<style lang="less">
#alert-card {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  padding: 0 5%;
  .alert-card-title {
    height: 50px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .alert-table {
    height: calc(~"100% - 50px");
  }
}
</style>
