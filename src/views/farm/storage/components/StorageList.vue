<template>
  <div>
    <el-input
      v-model="listQuery.name"
      class="name-query"
      placeholder="请输入农资名称"
    ></el-input>
    <product-cate-select
      @product-cate="getProductCate"
      @product-cate-info="getProductCateInfo"
    ></product-cate-select>
    <el-button type="primary" @click="handleSearchList()"> 查询搜索 </el-button>
    <span>只显示预警库存 </span>
    <el-switch v-model="thresholdVisible" @change="changeThresholdVisible">
    </el-switch>
    <el-button style="float: right" type="primary" @click="handleAddStorage()">
      新增农资商品
    </el-button>
    <el-row :gutter="12" style="margin: 20px 0 20px 0">
      <el-col :span="4" v-for="item in list" :key="item.id">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span class="card-title">{{ item.name }}</span>
            <el-button
              class="card-button"
              type="text"
              icon="el-icon-delete"
              @click="handleDeleteStorage(item.id)"
            >
            </el-button>
            <el-button
              class="card-button"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdateStorage(item.id)"
            >
            </el-button>
          </div>
          <div @click="handleViewStorage(item.id)" class="card-hover">
            <div class="card-content-item">
              类型：{{ getproductCateName(item.productCategoryId) }}
            </div>
            <div class="card-content-item">品牌：{{ item.brand }}</div>
            <div class="card-content-item">
              生产厂商：{{ item.manufacturer }}
            </div>
            <div class="card-content-item">
              库存：
              <span
                style="color: rgb(21, 185, 192)"
                v-if="
                  item.quantity <= item.maxThreshold &&
                  item.quantity >= item.minThreshold
                "
              >
                {{ item.quantity }}{{ item.unit }}(正常)
              </span>
              <span
                style="color: rgb(245, 108, 108)"
                v-if="item.quantity > item.maxThreshold"
              >
                {{ item.quantity }}{{ item.unit }}(偏多)
              </span>
              <span
                style="color: rgb(245, 108, 108)"
                v-if="item.quantity < item.minThreshold"
              >
                {{ item.quantity }}{{ item.unit }}(偏少)
              </span>
            </div>
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
        :page-sizes="[12, 18, 24, 32]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import ProductCateSelect from "./../../../info/productCate/components/ProductCateSelect";
import { fetchList, deleteStorage } from "@/api/storage";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 12,
  name: null,
  thresholdVisible: false,
};
export default {
  name: "StorageList",
  components: { ProductCateSelect },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      thresholdVisible: false,
      productCateInfo: {},
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatStorageTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd HH:mm:ss");
    },
  },
  methods: {
    getProductCate(productCate) {
      if (productCate) {
        this.listQuery.productCategoryId = productCate.id;
        this.listQuery.productCategoryName = productCate.id;
      } else {
        this.listQuery.productCategoryId = null;
        this.listQuery.productCategoryName = null;
      }
    },
    getProductCateInfo(productCateInfo) {
      this.productCateInfo = productCateInfo;
    },
    getproductCateName(productCategoryId) {
      let productCategoryName = productCategoryId;
      if (productCategoryId in this.productCateInfo) {
        productCategoryName = this.productCateInfo[productCategoryId]["name"];
      }
      return productCategoryName;
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddStorage() {
      this.$router.push({ path: "/farm/addStorage" });
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
    handleUpdateStorage(rowId) {
      this.$router.push({ path: "/farm/updateStorage", query: { id: rowId } });
    },
    handleViewStorage(rowId) {
      this.$router.push({ path: "/farm/viewStorage", query: { id: rowId } });
    },
    handleDeleteStorage(rowId) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteStorage(rowId).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    changeThresholdVisible() {
      this.listQuery.thresholdVisible = this.thresholdVisible;
      this.getList();
    },
  },
};
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
  clear: both;
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