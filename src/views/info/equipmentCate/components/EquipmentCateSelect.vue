<template>
  <el-select v-model="equipmentCateId" clearable @change="sendEquipmentCate()">
    <el-option
      v-for="item of list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
import { fetchList } from "@/api/equipmentCate";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000000,
};
export default {
  name: "EquipmentCateSelect",
  components: {},
  props: {
    equipmentCateSelectedId: {
      type: Number,
      default: null,
    },
    equipmentCateSelectedName: {
      type: String,
      default: null,
    },
    checkDeviceFlag: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      equipmentCateSelected: null,
      equipmentCateId: null,
      equipmentCateSelectedInfo: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
    };
  },
  created() {
    this.equipmentCateId = this.equipmentCateSelectedId;
    this.getList();
  },
  watch: {
    equipmentCateSelectedId(newV, oldV) {
      this.equipmentCateId = newV;
    },
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      debugger 
      fetchList(this.listQuery).then((response) => {
        let list = response.data.list;
        let equipmentCateSelectedInfo = {};
        let newList = [];
        for (let item of list) {
          if (this.equipmentCateSelectedName && this.equipmentCateSelectedName == item.name) {
            this.equipmentCateId = item.id;
          }
          if (this.checkDeviceFlag) {
            newList.push(item)
          } else {
            if (item.name != '采集设备') {
              newList.push(item)
            }
          }
          equipmentCateSelectedInfo[item.id.toString()] = item;
        }
        console.log(this.checkDeviceFlag)
        console.log(newList)
        this.list = newList;
        this.equipmentCateSelectedInfo = equipmentCateSelectedInfo;
        this.total = response.data.total;
      });
    },
    sendEquipmentCate() {
      //1.子组件通过子定义事件的方式将equipmentCate信息传给父组件
      this.equipmentCateSelected = this.equipmentCateSelectedInfo[this.equipmentCateId.toString()];
      this.$emit("equipment-cate", this.equipmentCateSelected);
    },
  },
};
</script>

<style scoped>
</style>