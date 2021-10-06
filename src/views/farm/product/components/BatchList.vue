<template> 
<div>
    <el-input v-model="listQuery.code" class="input-width" placeholder="批次号"></el-input>
    <el-button
        type="primary"
        @click="handleSearchList()"
        >
        查询搜索
    </el-button>
    <div class="table-container">
      <el-table ref="batchTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="批次号" width="160" align="center">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        <el-table-column label="所在区块" align="center">
          <template slot-scope="scope">{{scope.row.blockName}}</template>
        </el-table-column>
        <el-table-column label="养殖品种" width="120" align="center">
          <template slot-scope="scope">{{scope.row.productCategoryName}}</template>
        </el-table-column>
        <el-table-column label="养殖日期" width="120" align="center">
          <template slot-scope="scope">{{scope.row.farmTime | formatFarmTime}}</template>
        </el-table-column>
        <el-table-column label="来源单位" width="120" align="center">
          <template slot-scope="scope">{{scope.row.origin}}</template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">{{scope.row.quantity}}</template>
        </el-table-column>
        <el-table-column label="单价" width="120" align="center">
          <template slot-scope="scope">{{scope.row.unitPrice}}</template>
        </el-table-column>
        <el-table-column label="金额" width="120" align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-table-column>
        <el-table-column label="养殖状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p style="margin-bottom: 4px;margin-top: 4px;">
              <el-button
                size="mini"
                @click="handleUpdateBatch(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteBatch(scope.$index, scope.row)">删除
              </el-button>
            </p>
            <p style="margin-bottom: 4px;margin-top: 4px;">
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleFinishBatch(scope.$index, scope.row)">养殖结束
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
  import {fetchList, deleteBatch} from '@/api/batch';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    code: null,
    blockId: null,
  };
  export default {
    name: "BatchList",
    components:{},
    props: {
        blockId: {
          type: Number,
          default: null
        }
    },
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
    watch:{
      blockId(val, valOld){
        this.blockId = val;
        this.getList();
      }
    },
    filters: {
      formatFarmTime(time) {
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
        this.listQuery.blockId = this.blockId;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleUpdateBatch(index, row) {
          this.$emit('update-batch', index, row);
      },
      handleDeleteBatch(index, row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBatch(row.id).then(response => {
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