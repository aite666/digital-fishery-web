<template>
   
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="因子编号：">
            <el-input
              v-model="listQuery.factorId"
              class="input-width"
              placeholder="因子编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="因子名称：">
            <el-input
              v-model="listQuery.factorName"
              class="input-width"
              placeholder="因子名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleShowUpperLevel()"
        size="mini">
        返回上一级
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="deviceFactorTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="设备地址码" align="center">
          <template slot-scope="scope">{{ scope.row.deviceAddr }}</template>
        </el-table-column>
        <el-table-column label="因子编号" align="center">
          <template slot-scope="scope">{{ scope.row.factorId }}</template>
        </el-table-column>
        <el-table-column label="因子名称" align="center">
          <template slot-scope="scope">{{ scope.row.factorName }}</template>
        </el-table-column>
        <el-table-column label="节点编号" align="center">
          <template slot-scope="scope">{{ scope.row.nodeId }}</template>
        </el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">{{
            scope.row.enabled | formatEnabled
          }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{
            scope.row.status | formatStatus
          }}</template>
        </el-table-column>
        <el-table-column label="偏差" align="center">
          <template slot-scope="scope">{{ scope.row.offset }}</template>
        </el-table-column>
        <el-table-column label="单位" align="center">
          <template slot-scope="scope">{{ scope.row.unit }}</template>
        </el-table-column>
        <el-table-column label="报警延时" align="center">
          <template slot-scope="scope">{{ scope.row.alarmDelay }}分钟</template>
        </el-table-column>
        <el-table-column label="报警频率" align="center">
          <template slot-scope="scope">{{ scope.row.alarmRate }}</template>
        </el-table-column>
        <el-table-column label="报警延时" align="center">
          <template slot-scope="scope">{{ scope.row.alarmDelay }}</template>
        </el-table-column>
        <el-table-column label="系数" align="center">
          <template slot-scope="scope">{{ scope.row.coefficient }}</template>
        </el-table-column>
        <el-table-column label="小数位数" align="center">
          <template slot-scope="scope">{{ scope.row.digits }}</template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateDeviceFactor(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteDeviceFactor(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column> -->
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
import { fetchList } from "@/api/deviceFactor";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  factorId: null,
  factorName: null,
  deviceAddr: null,
};
export default {
  name: "deviceFactorList",
  components: {},
  props: {},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatEnabled(value) {
      if (value == 1) {
        return "开启";
      } else {
        return "关闭";
      }
    },
    formatStatus(value) {
      if (value == 1) {
        return "在线";
      } else {
        return "离线";
      }
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
    handleShowUpperLevel() {
      this.$router.back();
    },
    getList() {
      this.listLoading = true;
      this.listQuery.deviceAddr = this.$route.query.deviceAddr;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


