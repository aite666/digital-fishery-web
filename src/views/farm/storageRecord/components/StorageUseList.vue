<template>
  <div>
    <el-input
      v-model="listQuery.storageName"
      class="input-width"
      placeholder="农资名称"
    ></el-input>
    <el-button type="primary" @click="handleSearchList()"> 查询搜索 </el-button>
    <div class="table-container">
      <el-table
        ref="storageUseTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="农资名称" align="center">
          <template slot-scope="scope">{{ scope.row.storageName }}</template>
        </el-table-column>
        <el-table-column label="区块名称" align="center">
          <template slot-scope="scope">{{ scope.row.blockName }}</template>
        </el-table-column>
        <!-- <el-table-column label="农资类型" align="center">
          <template slot-scope="scope">{{
            scope.row.productCategoryName
          }}</template>
        </el-table-column> -->
        <el-table-column label="使用日期" align="center">
          <template slot-scope="scope">{{
            scope.row.recordTime | formatRecordTime
          }}</template>
        </el-table-column>
        <el-table-column label="使用数量" align="center">
          <template slot-scope="scope">{{ scope.row.quantity + scope.row.storageUnit }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <p style="margin-bottom: 4px; margin-top: 4px">
              <!-- <el-button
                size="mini"
                @click="handleUpdateStorageUse(scope.$index, scope.row)">编辑
              </el-button> -->
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteStorageUse(scope.$index, scope.row)"
                >删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  fetchList,
  deleteStorageRecord,
  updateStorageRecord,
} from "@/api/storageRecord";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  code: null,
  blockId: null,
};
export default {
  name: "StorageUseList",
  components: {},
  props: {
    blockId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      dialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  watch: {
    blockId(val, valOld) {
      this.blockId = val;
      this.getList();
    },
  },
  filters: {
    formatRecordTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.listQuery.blockId = this.blockId;
      this.listQuery.type = 2;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    //   handleUpdateStorageUse(index, row) {
    //   },
    handleDeleteStorageUse(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteStorageRecord(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
.color-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 8px;
  margin-right: 6px;
}
</style>