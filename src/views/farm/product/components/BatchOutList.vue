<template>
   
  <div>
    <el-input
      v-model="listQuery.code"
      class="input-width"
      placeholder="批次号"
    ></el-input>
    <el-button type="primary" @click="handleSearchList()"> 查询搜索 </el-button>
    <div class="table-container">
      <el-table
        ref="batchOutTable"
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
        <el-table-column label="批次号" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.batchCode }}</template>
        </el-table-column>
        <el-table-column label="所在区块" align="center">
          <template slot-scope="scope">{{ scope.row.blockName }}</template>
        </el-table-column>
        <el-table-column label="养殖品种" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.productCategoryName
          }}</template>
        </el-table-column>
        <el-table-column label="出塘日期" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.outTime | formatOutTime
          }}</template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.quantity }}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p style="margin-bottom: 4px; margin-top: 4px">
              <el-button
                size="mini"
                @click="handleUpdateBatchOut(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteBatchOut(scope.$index, scope.row)"
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
    <el-dialog
      :title="'编辑出塘记录'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <batch-out-detail
        :is-edit="true"
        :editDetail="batchOutDetail"
        @cancel="cancel"
        @commitSuccess="commitSuccess"
      >
      </batch-out-detail>
    </el-dialog>
  </div>
</template>
<script>
import BatchOutDetail from "./BatchOutDetail";
import { fetchList, deleteBatchOut } from "@/api/batchOut";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  code: null,
  blockId: null,
};
export default {
  name: "BatchOutList",
  components: { BatchOutDetail },
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
      batchOutDetail: null,
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
    formatOutTime(time) {
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
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleUpdateBatchOut(index, row) {
      this.dialogVisible = true;
      this.batchOutDetail = row;
    },
    handleDeleteBatchOut(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteBatchOut(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
    commitSuccess() {
      this.dialogVisible = false;
      this.getList();
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>