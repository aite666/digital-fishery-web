<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="区块名称：">
            <block-select @block="getBlock"></block-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddSale()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="infoSaleTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="区块名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.blockName}}</template>
        </el-table-column>
        <el-table-column label="养殖品种名称" align="center">
          <template slot-scope="scope">{{scope.row.productCategoryName}}</template>
        </el-table-column>
        <el-table-column label="销售时间" width="120" align="center">
          <template slot-scope="scope">{{scope.row.saleTime}}</template>
        </el-table-column>
        <el-table-column label="目的地" align="center">
          <template slot-scope="scope">{{scope.row.destination}}</template>
        </el-table-column>
        <el-table-column label="客户名称" align="center">
          <template slot-scope="scope">{{scope.row.customer}}</template>
        </el-table-column>
        <el-table-column label="客户电话" align="center">
          <template slot-scope="scope">{{scope.row.customerPhone}}</template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">{{scope.row.quantity + scope.row.unit}}</template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="scope">{{scope.row.unitPrice}}</template>
        </el-table-column>
        <el-table-column label="金额" align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateSale(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteSale(scope.$index, scope.row)">删除
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
  import BlockSelect from './../../info/block/components/BlockSelect';
  import {fetchList, deleteSale} from '@/api/sale';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null,
  };
  export default {
    name: "saleList",
    components:{BlockSelect},
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
      formatSaleTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
      },
    },
    methods: {
      getBlock(block) {
          if (block) {
            this.listQuery.blockId = block.id;
          } else {
            this.listQuery.blockId = null;
          }
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleAddSale() {
        this.$router.push({path:'/farm/addSale'});
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
      handleUpdateSale(index, row) {
        this.$router.push({path:'/farm/updateSale',query:{id:row.id}});
      },
      handleDeleteSale(index, row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSale(row.id).then(response => {
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


