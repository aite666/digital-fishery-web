<template> 
<div>
    <el-input v-model="listQuery.blockName" class="input-width" placeholder="区域名称"></el-input>
    <el-button
        type="primary"
        @click="handleSearchList()"
        >
        查询搜索
    </el-button>
    <el-button
    style="float:right"
    type="primary"
    @click="handleAddStorageRecord()">
    添加入库
    </el-button>
    <div class="table-container">
      <el-table ref="infoStorageRecordTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="农资名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.storageName}}</template>
        </el-table-column>
        <el-table-column label="农资类型" align="center">
          <template slot-scope="scope">{{scope.row.productCategoryName}}</template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">{{scope.row.quantity}}</template>
        </el-table-column>
        <el-table-column label="生产厂商" align="center">
          <template slot-scope="scope">{{scope.row.manufacturer}}</template>
        </el-table-column>
        <el-table-column label="价格(元)" width="120" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="备注" width="120" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="入库日期" width="120" align="center">
          <template slot-scope="scope">{{scope.row.recordTime | formatRecordTime}}</template>
        </el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateStorageRecord(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteStorageRecord(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleConfirmStorageRecord(scope.$index, scope.row)">确认
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
        :page-sizes="[5,10,20,50]"
        :total="total">
      </el-pagination>
    </div>
</div>
</template>
<script>
  import {fetchList, deleteStorageRecord} from '@/api/storageRecord';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null,
  };
  export default {
    name: "storageRecordList",
    components:{},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatRecordTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
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
        this.$router.push({path:'/info/addStorageRecord'});
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleUpdateStorageRecord(index, row) {
        this.$router.push({path:'/info/updateStorageRecord',query:{id:row.id}});
      },
      handleDeleteStorageRecord(index, row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteStorageRecord(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


