<template>
<div>
    <el-input v-model="listQuery.name" class="name-query"
        placeholder="请输入农资名称"></el-input>
    <el-select v-model="listQuery.productCategoryId">
        <el-option
            key="all"
            label="全部类型"
            value="all">
        </el-option>
        <el-option
            key="1"
            label="HP"
            value="1">
        </el-option>
        <el-option
            key="2"
            label="温度"
            value="2">
        </el-option>
    </el-select>
    <el-button
        type="primary"
        @click="handleSearchList()"
        >
        查询搜索
    </el-button>
    <span>只显示预警库存 </span>
    <el-switch
        v-model="thresholdVisible">
    </el-switch>
    <el-button
        style="float:right"
        type="primary"
        @click="handleAddStorage()">
        新增农资商品
    </el-button>
    <el-row :gutter="12" style="margin: 20px 0 20px 0">
        <el-col :span="4" v-for="item in list" :key="item.id">
            <el-card shadow="always">
                <div slot="header" class="clearfix">
                <span class="card-title">{{ item.name }}</span>
                <el-button class="card-button" type="text" icon="el-icon-delete"
                    @click="handleDeleteStorage(item.id)">
                </el-button>
                <el-button class="card-button" type="text" icon="el-icon-edit"
                    @click="handleUpdateStorage(item.id)">
                </el-button>
                </div>
                <div @click="handleViewStorage(item.id)" class="card-hover">
                <div class="card-content-item">类型：{{ item.productCategoryId }}</div>
                <div class="card-content-item">品牌：{{ item.brand }}</div>
                <div class="card-content-item">生产厂商：{{ item.manufacturer }}</div>
                <div class="card-content-item">库存：{{ item.quantity }}</div>
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
        :page-sizes="[12,18,24,32]"
        :total="total">
      </el-pagination>
    </div>
</div>
</template>
<script>
  import {fetchList, deleteStorage} from '@/api/storage';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 12,
    name: null,
  };
  export default {
    name: "StorageList",
    components:{},
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        thresholdVisible: false,
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatStorageTime(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
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
      handleAddStorage() {
        this.$router.push({path:'/farm/addStorage'});
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
      handleUpdateStorage(rowId) {
        this.$router.push({path:'/farm/updateStorage',query:{id:rowId}});
      },
      handleViewStorage(rowId) {
        this.$router.push({path:'/farm/viewStorage',query:{id:rowId}});
      },
      handleDeleteStorage(rowId) {
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteStorage(rowId).then(response => {
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
.name-query {
    width: 300px;
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