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
          <el-form-item label="标题：">
            <el-input
              v-model="listQuery.title"
              class="input-width"
              placeholder="标题："
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddQrCode()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="infoQrCodeTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="背景图" align="center">
          <template slot-scope="scope">
            <img
              style="height: 80px; width: 80px"
              :src="scope.row.backgroundImage"
            />
          </template>
        </el-table-column>
        <el-table-column label="Logo" width="120" align="center">
          <template slot-scope="scope">
            <img style="height: 80px; width: 80px" :src="scope.row.logoImage" />
          </template>
        </el-table-column>
        <el-table-column label="介绍" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column label="责任人" width="80" align="center">
          <template slot-scope="scope">{{ scope.row.admin }}</template>
        </el-table-column>
        <el-table-column label="责任人头像" width="120" align="center">
          <template slot-scope="scope">
            <img
              style="height: 80px; width: 80px"
              :src="scope.row.adminImage"
            />
          </template>
        </el-table-column>
        <el-table-column label="位置" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.position }}</template>
        </el-table-column>
        <el-table-column label="经度" align="center">
          <template slot-scope="scope">{{ scope.row.longitude }}</template>
        </el-table-column>
        <el-table-column label="纬度" align="center">
          <template slot-scope="scope">{{ scope.row.latitude }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateQrCode(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleViewOpeningPage(scope.$index, scope.row)"
                >查看页面
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteQrCode(scope.$index, scope.row)"
                >删除
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleViewQrCodeImage(scope.$index, scope.row)"
                >查看二维码
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
    <el-dialog
      :title="'查看推广溯源二维码'"
      :visible.sync="dialogVisible"
      width="395px"
    >
      <div class="source-box">
        <div class="tips d-f ai-c">
          <span class="icon"
            ><svg aria-hidden="true" class="svg-icon">
              <use xlink:href="#icon-dcr-weixin"></use></svg
          ></span>
          <span data-v-42cb75f2="">微信扫一扫预览推广溯源信息</span>
        </div>
        <div class="img-box d-f ai-c">
          <img
            data-v-42cb75f2=""
            :src="qrCodeDetail.logoImage"
            alt=""
            width="152"
            height="152"
          />
          <img
            data-v-42cb75f2=""
            :src="qrCodeDetail.image"
            alt=""
            width="152"
            height="152"
          />
        </div>
        <div class="name">{{qrCodeDetail.title}}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, deleteQrCode } from "@/api/qrCode";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
};
export default {
  name: "qrCodeList",
  components: {},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      dialogVisible: false,
      qrCodeDetail: {
        'title': '',
        'logoImage': '',
        'image': '',
      },
    };
  },
  created() {
    this.getList();
  },
  filters: {},
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddQrCode() {
      this.$router.push({ path: "/info/addQrCode" });
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
    handleUpdateQrCode(index, row) {
      this.$router.push({ path: "/info/updateQrCode", query: { id: row.id } });
    },
    handleDeleteQrCode(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteQrCode(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
    handleViewOpeningPage(index, row) {
      let url = "/#/opening/promotion?id=" + row.id;
      window.open(url, "_blank");
    },
    handleViewQrCodeImage(index, row) {
      this.dialogVisible = true;
      this.qrCodeDetail = row;
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
.source-box .tips {
    margin-bottom: 15px;
    justify-content: center;
}
.source-box .tips .icon {
    margin-right: 6px;
}
.source-box .tips .icon .svg-icon {
    width: 19px;
    height: 19px;
}
.source-box .tips span {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #303133;
}
.d-f {
    display: flex;
}
.ai-c {
    align-items: center;
}
.source-box .img-box {
    margin-bottom: 15px;
    justify-content: center;
}
.source-box .name {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    line-height: 22px;
    padding-bottom: 6px;
}
</style>


