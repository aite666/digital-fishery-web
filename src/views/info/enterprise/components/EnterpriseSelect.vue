<template>
  <el-select v-model="selectEnterpriseId" clearable @change="sendEnterprise()">
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
import { mapGetters } from "vuex";
import { fetchList } from "@/api/enterprise";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 100000000,
};
export default {
  name: "EnterpriseSelect",
  components: {},
  props: {
    enterpriseSelectedId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["enterpriseId"]),
  },
  data() {
    return {
      enterpriseSelected: null,
      selectEnterpriseId: null,
      enterpriseSelectedInfo: null,
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
    };
  },
  created() {
    this.selectEnterpriseId = this.enterpriseSelectedId;
    this.getList();
  },
  watch: {
    enterpriseSelectedId(newV, oldV) {
      this.selectEnterpriseId = newV;
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
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data.list;
        let newList = []
        let enterpriseSelectedInfo = {};
        for (let item of list) {
          if (this.enterpriseId && this.enterpriseId != -1) {
            if (this.enterpriseId == item.id) {
              newList.push(item)
            }
          } else {
            newList.push(item)
          }
          enterpriseSelectedInfo[item.id.toString()] = item;
        }
        if (this.enterpriseId && this.enterpriseId != -1) {
          this.list = newList
        } else {
          this.list = [{'id': -1, 'name': '全部'}].concat(newList)
        }
        this.enterpriseSelectedInfo = enterpriseSelectedInfo;
        this.total = response.data.total;
      });
    },
    sendEnterprise() {
      //1.子组件通过子定义事件的方式将enterprise信息传给父组件
      this.enterpriseSelected = this.enterpriseSelectedInfo[this.selectEnterpriseId.toString()];
      this.$emit("enterprise", this.enterpriseSelected);
    },
  },
};
</script>

<style scoped>
</style>