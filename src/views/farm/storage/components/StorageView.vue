<template>
  <el-card class="view-container" shadow="never">
    <div class="left">
      <div class="part-name">库存提醒</div>
      <el-card shadow="always" class="part-card">
        <div slot="header" class="clearfix">
          <span class="card-title">{{ storageDetail.name }}</span>
        </div>
        <div class="card-hover">
          <div class="card-content-item">
            类型：{{ storageDetail.productCategoryName }}
          </div>
          <div class="card-content-item">品牌：{{ storageDetail.brand }}</div>
          <div class="card-content-item">
            生产厂商：{{ storageDetail.manufacturer }}
          </div>
          <div class="card-content-item">
            许可证号：{{ storageDetail.license }}
          </div>
          <div class="card-content-item">
            生产日期：{{ storageDetail.productionDate | formatProductionDate }}
          </div>
          <div class="card-content-item">
            供货主体及联系人、联系电话：{{ storageDetail.contacts }}
          </div>
          <div class="card-content-item">
            库存：{{ storageDetail.quantity }} {{ storageDetail.unit }}
          </div>
        </div>
      </el-card>
      <p>
        最大库存预警:
        <el-input-number
          v-model="storageDetail.maxThreshold"
          :min="0"
          :max="100000000000000000"
          disabled
        >
        </el-input-number>
        <span class="unit-span">{{ storageDetail.unit }}</span>
      </p>
      <p>
        最小库存预警:
        <el-input-number
          v-model="storageDetail.minThreshold"
          :min="0"
          :max="100000000000000000"
          disabled
        >
        </el-input-number>
        <span class="unit-span">{{ storageDetail.unit }}</span>
      </p>
    </div>
    <div class="right">
      <div class="part-name">使用明细</div>
      <el-table
        ref="storageRecordTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.type == 1">
              <span style="color: rgb(21, 185, 192)">入库</span>
            </div>
            <div class="scope-item" v-if="scope.row.type == 2">
              <span style="color: rgb(245, 108, 108)">出库</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            <div class="scope-item" v-if="scope.row.type == 1">
              <span style="color: rgb(21, 185, 192)">{{
                scope.row.quantity + scope.row.storageUnit
              }}</span>
            </div>
            <div class="scope-item" v-if="scope.row.type == 2">
              <span style="color: rgb(245, 108, 108)"
                >- {{ scope.row.quantity + scope.row.storageUnit }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.recordTime | formatRecordTime
          }}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[5, 10, 20, 50]"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="view-container-button">
      <el-button @click="back()">返回上一级</el-button>
    </div>
  </el-card>
</template>

<script>
import { createStorage, updateStorage, getStorageDetail } from "@/api/storage";
import { fetchList } from "@/api/storageRecord";
import { formatDate } from "@/utils/date";

const defaultStorageDetail = {
  enterpriseId: 0,
  name: "",
  productCategoryId: 0,
  productCategoryName: "",
  unit: "",
  brand: "",
  manufacturer: "",
  remark: "",
  max_threshold: 0,
  max_threshold: 0,
  quantity: 0,
};
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  name: null,
  storageId: null,
};
export default {
  name: "StorageView",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      storageDetail: Object.assign({}, defaultStorageDetail),
      rules: {
        name: [
          { required: true, message: "请输入农资名称", trigger: "blur" },
          {
            min: 2,
            max: 255,
            message: "长度在 2 到 255 个字符",
            trigger: "blur",
          },
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
    };
  },
  created() {
    if (this.isEdit) {
      getStorageDetail(this.$route.query.id).then((response) => {
        this.storageDetail = response.data;
        this.getList();
      });
    } else {
      this.storageDetail = Object.assign({}, defaultStorageDetail);
    }
  },
  filters: {
    formatRecordTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatProductionDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  computed: {},
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.storageId = this.storageDetail.id;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
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
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.isEdit) {
              updateStorage(this.$route.query.id, this.storageDetail).then(
                (response) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$router.back();
                }
              );
            } else {
              createStorage(this.storageDetail).then((response) => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.view-container {
  left: 0;
  right: 0;
  width: 1070px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}
.left {
  width: 480px;
  height: 400px;
  border-right: 1px solid #ebeef5;
  float: left;
}
.part-name {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}
.part-card {
  margin: 20px 20px 0 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
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
.unit-span {
  margin-left: 10px;
}
.right {
  width: 450px;
  padding-left: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
}
.view-container-button {
  display: flex;
  justify-content: center; /*水平居中*/
  width: 100%;
  padding-top: 10px;
}
</style>
