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
          <el-form-item label="所在区块：">
            <block-select
              @block="getBlock"
              :blockSelectedId="blockSelectedId"
            ></block-select>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input
              v-model="listQuery.description"
              class="input-width"
              placeholder="描述"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="接受人：">
            <el-input v-model="listQuery.adminName" class="input-width" placeholder="接受人"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-switch
        style="float: right"
        v-model="allUser"
        active-text="所有用户的告警"
        inactive-text="自己的告警"
        @change="changeAllUser"
      >
      </el-switch>
    </el-card>
    <div class="table-container">
      <el-table
        ref="alarmRecordTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="告警时间" align="center">
          <template slot-scope="scope">{{ scope.row.alarmTime }}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <!-- <el-table-column label="告警类型" width="120" align="center">
          <template slot-scope="scope">{{scope.row.legalPerson}}</template>
        </el-table-column> -->
        <el-table-column label="所在区块" align="center">
          <template slot-scope="scope">{{ scope.row.blockName }}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <!-- <el-button
                size="mini"
                @click="handleUpdateAlarmRecord(scope.$index, scope.row)">查看
              </el-button> -->
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteAlarmRecord(scope.$index, scope.row)"
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
import { fetchList, deleteAlarmRecord } from "@/api/alarm";
import { formatDate } from "@/utils/date";
import { mapGetters } from "vuex";
import BlockSelect from "./../../info/block/components/BlockSelect";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  userId: null,
  description: null,
  blockId: null,
};
export default {
  name: "alarmRecordList",
  components: { BlockSelect },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      blockSelectedId: null,
      allUser: false,
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  created() {
    this.getList();
  },
  filters: {
    // formatCreationTime(time) {
    //   let date = new Date(time);
    //   return formatDate(date, 'yyyy-MM-dd')
    // },
  },
  methods: {
    getBlock(block) {
      if (block) {
        this.blockSelectedId = block.id;
      } else {
        this.blockSelectedId = null;
      }
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.blockSelectedId = null;
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddAlarmRecord() {
      this.$router.push({ path: "/info/addAlarmRecord" });
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
      if (this.allUser) {
        this.listQuery.userId = null;
      } else {
        this.listQuery.userId = this.userId;
      }
      this.listQuery.blockId = this.blockSelectedId;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    changeAllUser() {
      this.getList();
    },
    handleUpdateAlarmRecord(index, row) {
      this.$router.push({
        path: "/info/updateAlarmRecord",
        query: { id: row.id },
      });
    },
    handleDeleteAlarmRecord(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteAlarmRecord(row.id).then((response) => {
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
</style>


