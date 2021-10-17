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
      width="420px"
    >
      <div class="source-box">
        <div class="tips d-f ai-c">
          <span class="icon">
            <svg aria-hidden="true" class="svg-icon">
              <use xlink:href="#icon-dcr-weixin">
                <svg id="icon-dcr-weixin" viewBox="0 0 1024 1024"><path d="M512 1.877333c-282.567111 0-512 227.555556-512 510.122667 0 282.567111 229.432889 510.122667 512 510.122667s510.122667-227.555556 510.122667-510.122667c0-282.567111-227.555556-510.122667-510.122667-510.122667zM420.977778 631.466667c-26.567111 0-49.322667-5.688889-75.832889-11.377778l-75.889778 37.944889 22.755556-66.389334C237.056 553.699556 204.8 504.433778 204.8 443.733333c0-104.277333 98.588444-185.856 218.055111-185.856 108.088889 0 201.045333 64.512 219.989333 153.6-7.566222 0-13.255111-1.877333-20.878222-1.877333-104.277333 0-185.799111 77.767111-185.799111 172.544 0 15.189333 1.877333 30.378667 7.566222 45.511111-7.566222 3.811556-15.189333 3.811556-22.755555 3.811556z m322.389333 77.767111l17.066667 54.954666-58.823111-34.133333c-22.755556 5.688889-43.576889 11.377778-66.332445 11.377778-104.334222 0-185.856-70.144-185.856-157.354667 0-87.267556 81.521778-159.288889 185.856-159.288889 98.588444 0 185.799111 70.144 185.799111 159.288889 0 47.388444-32.199111 91.022222-77.710222 125.155556z" fill="#46BB36"></path><path d="M318.577778 379.278222c0 17.066667 13.255111 30.321778 30.321778 30.321778 17.066667 0 30.378667-13.255111 30.378666-30.321778 0-17.066667-13.312-30.378667-30.378666-30.378666-17.066667 0-30.321778 13.312-30.321778 30.378666z m235.121778 159.288889c0 13.255111 11.377778 24.632889 24.689777 24.632889 13.255111 0 24.632889-11.377778 24.632889-24.632889 0-13.312-11.377778-24.689778-24.632889-24.689778-13.312-1.877333-24.689778 9.500444-24.689777 24.689778zM472.177778 379.278222c0 17.066667 13.255111 30.321778 30.321778 30.321778 17.066667 0 30.378667-13.255111 30.378666-30.321778 0-17.066667-13.312-30.378667-30.378666-30.378666-17.066667 0-30.321778 13.312-30.321778 30.378666z m202.922666 159.288889c0 13.255111 11.377778 24.632889 24.632889 24.632889 13.255111 0 24.632889-11.377778 24.632889-24.632889 0-13.312-11.377778-24.689778-24.632889-24.689778-13.255111-1.877333-24.632889 9.500444-24.632889 24.689778z" fill="#46BB36"></path></svg>
              </use>
            </svg>
          </span>
          <span data-v-42cb75f2="">微信扫一扫预览推广溯源信息</span>
        </div>
        <div class="img-box d-f ai-c">
          <img
            data-v-42cb75f2=""
            :src="qrCodeDetail.logoImage"
            alt=""
            width="160"
            height="160"
          />
          <img
            data-v-42cb75f2=""
            :src="qrCodeDetail.image"
            alt=""
            width="160"
            height="160"
          />
        </div>
        <div class="name">{{ qrCodeDetail.title }}</div>
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
        title: "",
        logoImage: "",
        image: "",
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


