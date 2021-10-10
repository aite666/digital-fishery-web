<template> 
<div>
    <el-input v-model="listQuery.code" class="input-width" placeholder="批次号"></el-input>
    <el-button
        type="primary"
        @click="handleSearchList()"
        >
        查询搜索
    </el-button>
    <el-button
        type="primary"
        style="float:right;"
        @click="handleUseStorage()"
        >
        使用农资
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
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.status == 1">
              <span class="color-dot" style="background: rgb(21, 185, 192);"></span>
              <span>养殖中</span>
            </div>
            <div class="scope-item" v-if="scope.row.status == 0">
              <span class="color-dot" style="background: rgb(153, 153, 153);"></span>
              <span>养殖完毕</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
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
            <p style="margin-bottom: 4px;margin-top: 4px;" v-if="scope.row.status == 1">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleOutBatch(scope.$index, scope.row)">出塘
                </el-button>
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
    <el-dialog
      :title="'添加出塘记录'"
      :visible.sync="dialogVisible"
      width="40%">
        <batch-out-detail :is-edit='false' :batchDetail='batchDetail'
          @cancel="cancel" @commitSuccess="commitSuccess">
        </batch-out-detail>
    </el-dialog>
</div>
</template>
<script>
  import BatchOutDetail from './BatchOutDetail';
  import {fetchList, deleteBatch, updateBatch} from '@/api/batch';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    code: null,
    blockId: null,
  };
  export default {
    name: "BatchList",
    components:{BatchOutDetail},
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
        dialogVisible: false,
        batchDetail: null,
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
      handleOutBatch(index, row) {
          this.dialogVisible = true;
          this.batchDetail = row;
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
      handleFinishBatch(index, row) {
        this.$confirm('是否要进行养殖结束操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status = 0;
          updateBatch(row.id, row).then(response => {
            this.$message({
              message: '养殖结束成功',
              type: 'success',
              duration: 1000
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
        this.$emit('getAllList');
      },
      handleUseStorage() {
        this.$router.push({path:'/farm/addStorageUse'});
      }
    }
  }
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