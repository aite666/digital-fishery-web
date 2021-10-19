<template>
  <div>
    <el-input
      v-model="listQuery.blockName"
      class="input-width"
      placeholder="区域名称"
    ></el-input>
    <el-button type="primary" @click="handleSearchList()"> 查询搜索 </el-button>
    <el-button
      style="float: right"
      v-if="!isDetail"
      type="primary"
      @click="handleAddStorageRecord()"
    >
      添加入库
    </el-button>
    <div class="table-container">
      <el-table
        ref="infoStorageRecordTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column> -->
        <el-table-column label="农资名称" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.storageName }}</template>
        </el-table-column>
        <el-table-column label="农资类型" align="center">
          <template slot-scope="scope">{{
            scope.row.storageProductCategoryName
          }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-if="isDetail">
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.type == 1">
              <span style="color: rgb(21, 185, 192)">入库</span>
            </div>
            <div class="scope-item" v-if="scope.row.type == 2">
              <span style="color: rgb(245, 108, 108)">出库</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.type == 1">
              <span style="color: rgb(21, 185, 192)">{{
                scope.row.quantity + scope.row.storageUnit
              }}</span>
            </div>
            <div class="scope-item" v-if="scope.row.type == 2">
              <span style="color: rgb(245, 108, 108)"
                >- {{ scope.row.quantity + scope.row.storageUnit }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="使用区块" align="center" v-if="isDetail">
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.type == 1">--</div>
            <div class="scope-item" v-if="scope.row.type == 2">
              {{ scope.row.blockName }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="使用养殖鱼类" align="center" v-if="isDetail">
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.type == 1">--</div>
            <div class="scope-item" v-if="scope.row.type == 2">
              {{ scope.row.productCategoryName }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="生产厂商" align="center" v-if="!isDetail">
          <template slot-scope="scope">{{
            scope.row.storageManufacturer
          }}</template>
        </el-table-column>
        <el-table-column
          label="价格(元)"
          width="120"
          align="center"
          v-if="!isDetail"
        >
          <template slot-scope="scope">{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="备注" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
        <el-table-column
          label="入库日期"
          width="120"
          align="center"
          v-if="!isDetail"
        >
          <template slot-scope="scope">{{
            scope.row.recordTime | formatRecordTime
          }}</template>
        </el-table-column>
        <el-table-column
          label="日期"
          width="120"
          align="center"
          v-if="isDetail"
        >
          <template slot-scope="scope">{{
            scope.row.recordTime | formatRecordTime
          }}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
          align="center"
          v-if="!isDetail"
        >
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.status == 1">
              <span
                class="color-dot"
                style="background: rgb(21, 185, 192)"
              ></span>
              <span>已确认</span>
            </div>
            <div class="scope-item" v-if="scope.row.status == 0">
              <span
                class="color-dot"
                style="background: rgb(153, 153, 153)"
              ></span>
              <span>未确认</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
          align="center"
          v-if="!isDetail"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.status == 0">
              <el-button
                size="mini"
                @click="handleUpdateStorageRecord(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteStorageRecord(scope.$index, scope.row)"
                >删除
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleConfirmStorageRecord(scope.$index, scope.row)"
                >确认
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
  confirmStorageRecord,
} from "@/api/storageRecord";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
};
export default {
  name: "storageRecordList",
  components: {},
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
    };
  },
  created() {
    if (this.isDetail) {
    } else {
      this.listQuery.type = 1;
    }
    this.getList();
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
    handleAddStorageRecord() {
      this.$router.push({ path: "/farm/addStorageRecord" });
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
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleUpdateStorageRecord(index, row) {
      this.$router.push({
        path: "/farm/updateStorageRecord",
        query: { id: row.id },
      });
    },
    handleConfirmStorageRecord(index, row) {
      this.$confirm("是否要进行确认操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        confirmStorageRecord(row.id).then((response) => {
          this.$message({
            message: "确认成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
          this.$emit("confirm");
        });
      });
    },
    handleDeleteStorageRecord(index, row) {
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
.scope-item {
  width: 100%;
  display: flex;
  justify-content: center;
}
.scope-item span {
  display: inline-block;
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


