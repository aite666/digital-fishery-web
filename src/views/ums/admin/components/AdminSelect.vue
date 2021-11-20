<template>
  <el-select v-model="adminId" clearable @change="sendAdmin()">
    <el-option
      v-for="item of adminList"
      :key="item.id"
      :label="item.username"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchList } from "@/api/login";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000000,
};
export default {
  name: "AdminSelect",
  components: {},
  props: {
    adminSelectedId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      adminSelected: null,
      adminId: null,
      adminSelectedInfo: null,
      adminList: null,
    };
  },
  computed: {
    ...mapGetters(["enterpriseId"]),
  },
  created() {
    this.adminId = this.adminSelectedId;
    this.getList();
  },
  watch: {
    adminSelectedId(newV, oldV) {
      this.adminId = newV;
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
      fetchList(defaultListQuery).then((response) => {
        let list = response.data.list;
        let adminList = [];
        let adminSelectedInfo = {};
        for (let item of list) {
          if (this.enterpriseId && this.enterpriseId != -1) {
            if (this.enterpriseId == item["enterpriseId"]) {
              adminList.push({
                id: item["id"],
                username: item["nickName"],
              });
            }
          } else {
            adminList.push({
              id: item["id"],
              username: item["nickName"],
            });
          }
          adminSelectedInfo[item["id"].toString()] = item;
        }
        this.adminList = adminList;
        this.adminSelectedInfo = adminSelectedInfo;
      });
    },
    sendAdmin() {
      //1.子组件通过子定义事件的方式将admin信息传给父组件
      this.adminSelected = this.adminSelectedInfo[this.adminId.toString()];
      this.$emit("admin", this.adminSelected);
    },
  },
};
</script>

<style scoped>
</style>