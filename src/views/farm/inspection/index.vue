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
        @click="handleAddInspection()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="infoInspectionTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="区域名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.blockName}}</template>
        </el-table-column>
        <el-table-column label="区试时间" width="120" align="center">
          <template slot-scope="scope">{{scope.row.inspectionTime | formatInspectionTime}}</template>
        </el-table-column>
        <el-table-column label="品种繁育指标数据" align="center">
          <template slot-scope="scope">{{scope.row.productData}}</template>
        </el-table-column>
        <el-table-column label="环境数据" align="center">
          <template slot-scope="scope">{{scope.row.environmentData}}</template>
        </el-table-column>
        <el-table-column label="品种性状描述" align="center">
          <template slot-scope="scope">{{scope.row.characterDescription}}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img style="height: 80px" :src="getImage(scope.row.images)">
          </template>
        </el-table-column>
        <el-table-column label="区试人员" align="center">
          <template slot-scope="scope">{{scope.row.createUser}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateInspection(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteInspection(scope.$index, scope.row)">删除
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
  import {fetchList, deleteInspection} from '@/api/inspection';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    name: null,
    blockId: null,
  };
  export default {
    name: "inspectionList",
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
      formatInspectionTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      },
    },
    methods: {
      getImage(images) {
        let image =' ';
        if (images) {
          image = images.split(',')[0];
        }
        return image;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleAddInspection() {
        this.$router.push({path:'/farm/addInspection'});
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
      getBlock(block) {
          if (block) {
            this.listQuery.blockId = block.id;
          } else {
            this.listQuery.blockId = null;
          }
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleUpdateInspection(index, row) {
        this.$router.push({path:'/farm/updateInspection',query:{id:row.id}});
      },
      handleDeleteInspection(index, row) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteInspection(row.id).then(response => {
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


