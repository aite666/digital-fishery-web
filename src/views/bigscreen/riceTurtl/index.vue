<template>
  <div class="bigscreen-container">
    <el-descriptions
      title="稻鳖共生模式专题分析"
      :column="1"
      border
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="handleViewOpeningPage()">查看大屏页面</el-button>
        <el-button type="primary" size="small" @click="handleUpdateBigscreen()">编辑</el-button>
      </template>
      <el-descriptions-item label="主标题">{{bigscreenDetail.configDataJson.mainTitle}}</el-descriptions-item>
      <el-descriptions-item label="副标题1">{{bigscreenDetail.configDataJson.subTitle1}}</el-descriptions-item>
      <el-descriptions-item label="副标题2">{{bigscreenDetail.configDataJson.subTitle2}}</el-descriptions-item>
      <el-descriptions-item label="副标题3">{{bigscreenDetail.configDataJson.subTitle3}}</el-descriptions-item>
      <el-descriptions-item label="副标题4">{{bigscreenDetail.configDataJson.subTitle4}}</el-descriptions-item>
    </el-descriptions>
    <el-dialog
      :title="'编辑大屏配置'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="bigscreenDetail" ref="bigscreenForm" label-width="150px" size="small">
        <el-form-item label="主标题：">
          <el-input v-model="bigscreenDetail.configDataJson.mainTitle" class="form-width"></el-input>
        </el-form-item>
        <el-form-item label="副标题1：">
          <el-input v-model="bigscreenDetail.configDataJson.subTitle1" class="form-width"></el-input>
        </el-form-item>
        <el-form-item label="副标题2：">
          <el-input v-model="bigscreenDetail.configDataJson.subTitle2" class="form-width"></el-input>
        </el-form-item>
        <el-form-item label="副标题3：">
          <el-input v-model="bigscreenDetail.configDataJson.subTitle3" class="form-width"></el-input>
        </el-form-item>
        <el-form-item label="副标题4：">
          <el-input v-model="bigscreenDetail.configDataJson.subTitle4" class="form-width"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  createBigscreen,
  updateBigscreen,
  updateBigscreenByName,
  deleteBigscreen,
  getBigscreenDetail,
} from "@/api/bigscreen";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
export default {
  name: "riceTurtl",
  components: {},
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      listQuery: Object.assign({}, defaultListQuery),
      bigscreenDetail: {
        name: 'riceTurtl',
        configDataJson: {
          'mainTitle': '',
          'subTitle1': '',
          'subTitle2': '',
          'subTitle3': '',
          'subTitle4': '',
        },
      },
    };
  },
  created() {
    this.getList();
  },
  filters: {},
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.name = 'riceTurtl';
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        let list = response.data.list
        if (list.length > 0) {
          this.bigscreenDetail = list[0];
        }
      });
    },
    handleViewOpeningPage(index, row) {
      let url = "/#/opening/riceTurtl";
      window.open(url, "_blank");
    },
    handleUpdateBigscreen() {
      this.dialogVisible = true;
    },
    handleDialogConfirm() {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateBigscreenByName('riceTurtl', this.bigscreenDetail).then(
          (response) => {
            this.$message({
              message: "修改成功",
              type: "success",
              duration: 1000,
            });
            this.dialogVisible = false;
            this.getList();
          }
        );
      });
    }
  },
};
</script>
<style scoped>
.bigscreen-container {
  padding: 40px 60px;
}
.el-descriptions__title {
  font-size: 22px !important;
}
.form-width {
  width: 400px;
}
</style>


