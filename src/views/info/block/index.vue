<template>
  <el-container>
    <el-header>
      <span class="header-text">区块管理</span>
      <el-button type="primary" class="header-button"
        @click="handleAddBlock()">创建区块</el-button>
    </el-header>

    <el-main>
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in list" :key="item.id">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span class="card-title">{{ item.name }}</span>
              <el-button class="card-button" type="text" icon="el-icon-delete"
                @click="handleDeleteBlock(item.id)">
              </el-button>
              <el-button class="card-button" type="text" icon="el-icon-edit"
                @click="handleUpdateBlock(item.id)">
              </el-button>
            </div>
            <div @click="handleViewBlock(item.id)" class="card-hover">
              <div class="card-content-item">介绍：{{ item.description }}</div>
              <div class="card-content-item">面积：{{ item.area }}亩</div>
              <div class="card-content-item">种养品种：鱼</div>
              <div class="card-content-item">种养批次：123</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[8,12,16,24]"
          :total="total">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import {fetchList, deleteBlock} from '@/api/block';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 8,
    name: null,
  };
  export default {
    name: "BlockList",
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
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleAddBlock() {
        this.$router.push({path:'/info/addBlock'});
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
      handleUpdateBlock(rowId) {
        this.$router.push({path:'/info/updateBlock',query:{id:rowId}});
      },
      handleViewBlock(rowId) {
        this.$router.push({path:'/info/viewBlock',query:{id:rowId}});
      },
      handleDeleteBlock(rowId) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBlock(rowId).then(response => {
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
.el-header {
  color: #333;
  line-height: 80px;
}
.header-text {
  font-size: 22px;
  font-weight: 500;
  margin-left: 20px;
}
.header-button {
  float:right;
  margin: 20px 30px;
}
.el-main {
  padding-left: 40px;
  padding-right: 50px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.card-hover {
  cursor: pointer;
}
.card-title {
  font-size: 20px;
}
.card-button {
  float: right;
  padding: 0 5px;
  font-size: 20px;
}
.card-content-item {
  font-size: 14px;
  margin-bottom: 10px;
}
</style>


