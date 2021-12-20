<template>
  <div class="bigscreen-container">
    <el-descriptions title="基地一张图" :column="1" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="handleViewOpeningPage()"
          >查看大屏页面</el-button
        >
        <el-button type="primary" size="small" @click="handleUpdateBigscreen()"
          >编辑</el-button
        >
      </template>
      <el-descriptions-item label="主标题">{{
        bigscreenDetail.configDataJson.mainTitle
      }}</el-descriptions-item>
      <el-descriptions-item label="左二图表标题">{{
        bigscreenDetail.configDataJson.leftTitle2
      }}</el-descriptions-item>
      <el-descriptions-item label="左三图表标题">{{
        bigscreenDetail.configDataJson.leftTitle3
      }}</el-descriptions-item>
      <el-descriptions-item label="左四图表标题">{{
        bigscreenDetail.configDataJson.leftTitle4
      }}</el-descriptions-item>
      <el-descriptions-item label="右一图表标题">{{
        bigscreenDetail.configDataJson.rightTitle1
      }}</el-descriptions-item>
      <el-descriptions-item label="右二图表标题">{{
        bigscreenDetail.configDataJson.rightTitle2
      }}</el-descriptions-item>
      <el-descriptions-item label="右三图表标题">{{
        bigscreenDetail.configDataJson.rightTitle3
      }}</el-descriptions-item>
      <el-descriptions-item label="右四图表标题">{{
        bigscreenDetail.configDataJson.rightTitle4
      }}</el-descriptions-item>
      <el-descriptions-item label="右四图表数据">
        <el-table :data="bigscreenDetail.configDataJson.rightTable4" style="width: 100%">
          <el-table-column prop="testItem" label="检验检测项目、单位">
          </el-table-column>
          <el-table-column prop="testMethod" label="检验检测方法">
          </el-table-column>
          <el-table-column prop="testValue" label="检测值">
          </el-table-column>
          <el-table-column prop="standardValue" label="标准值">
          </el-table-column>
          <el-table-column prop="singleConclusion" label="单项结论">
          </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item label="中间底部图片">
        <div v-for="image of centerBottomImageList" :key="image" >
          <img class="image" :src="image" />
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog
      :title="'编辑大屏配置'"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form
        :model="bigscreenDetailCopy"
        ref="bigscreenForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="主标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.mainTitle"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左二图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTitle2"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左三图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTitle3"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左四图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTitle4"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右一图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle1"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右二图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle2"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右三图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle3"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右四图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle4"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右四图表数据：">
          <el-table :data="bigscreenDetailCopy.configDataJson.rightTable4"
            style="width: 100%">
            <el-table-column prop="testItem" label="检验检测项目、单位">
              <template slot-scope="scope">
                <el-input v-model="scope.row.testItem"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="testMethod" label="检验检测方法">
              <template slot-scope="scope">
                <el-input v-model="scope.row.testMethod"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="testValue" label="检测值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.testValue"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="standardValue" label="标准值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.standardValue"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="singleConclusion" label="单项结论">
              <template slot-scope="scope">
                <el-input v-model="scope.row.singleConclusion"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i class="el-icon-circle-plus-outline icon-class"
                @click="handleAddColumn()"></i>
                <i class="el-icon-remove-outline icon-class"
                @click="handleDeleteColumn(scope.$index, scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="中间底部图片：">
          <multi-upload v-model="selectPics"></multi-upload>
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
import MultiUpload from "@/components/Upload/multiUpload";
import lodash from "lodash";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
export default {
  name: "bigscreenMap",
  components: {MultiUpload},
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      listQuery: Object.assign({}, defaultListQuery),
      bigscreenDetailCopy: {
        id: null,
        name: "bigscreenMap",
        configDataJson: {
          mainTitle: "",
          leftTitle2: "",
          leftTitle3: "",
          leftTitle4: "",
          rightTitle1: "",
          rightTitle2: "",
          rightTitle3: "",
          rightTitle4: "",
          rightTable4: [],
          centerBottomImages: "",
        },
      },
      bigscreenDetail: {
        id: null,
        name: "bigscreenMap",
        configDataJson: {
          mainTitle: "",
          leftTitle2: "",
          leftTitle3: "",
          leftTitle4: "",
          rightTitle1: "",
          rightTitle2: "",
          rightTitle3: "",
          rightTitle4: "",
          rightTable4: [],
          centerBottomImages: "",
        },
      },
      centerBottomImageList: [],
    };
  },
  created() {
    this.getList();
  },
  filters: {},
  computed: {
    selectPics: {
      get: function () {
        let pics = [];
        if (
          this.bigscreenDetailCopy.configDataJson.centerBottomImages === undefined ||
          this.bigscreenDetailCopy.configDataJson.centerBottomImages == null ||
          this.bigscreenDetailCopy.configDataJson.centerBottomImages === ""
        ) {
          return pics;
        }
        let imageList = this.bigscreenDetailCopy.configDataJson.centerBottomImages.split(",");
        for (let i = 0; i < imageList.length; i++) {
          pics.push(imageList[i]);
        }
        return pics;
      },
      set: function (newValue) {
        if (newValue == null || newValue.length === 0) {
          this.bigscreenDetailCopy.configDataJson.centerBottomImages = null;
        } else {
          this.bigscreenDetailCopy.configDataJson.centerBottomImages = "";
          if (newValue.length > 1) {
            for (let i = 0; i < newValue.length; i++) {
              this.bigscreenDetailCopy.configDataJson.centerBottomImages += newValue[i];
              if (i !== newValue.length - 1) {
                this.bigscreenDetailCopy.configDataJson.centerBottomImages += ",";
              }
            }
          } else {
            this.bigscreenDetailCopy.configDataJson.centerBottomImages = newValue[0];
          }
        }
      },
    },
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.name = "bigscreenMap";
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data.list;
        if (list.length > 0) {
          this.bigscreenDetail = list[0];
          this.centerBottomImageList = this.bigscreenDetail.configDataJson.centerBottomImages.split(",");
        }
      });
    },
    handleViewOpeningPage(index, row) {
      let url = "/#/opening/bigscreenMap";
      window.open(url, "_blank");
    },
    handleUpdateBigscreen() {
      this.bigscreenDetailCopy = lodash.cloneDeep(this.bigscreenDetail)
      this.checkTableDataEmpty();
      this.dialogVisible = true;
    },
    handleDialogConfirm() {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateBigscreenByName("bigscreenMap", this.bigscreenDetailCopy).then(
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
    },
    handleAddColumn() {
      let data = {
        testItem: '',
        testMethod: '',
        testValue: '',
        standardValue: '',
        singleConclusion: '',
      }
      this.bigscreenDetailCopy.configDataJson.rightTable4.push(data);
    },
    handleDeleteColumn(index, row) {
      this.bigscreenDetailCopy.configDataJson.rightTable4.splice(index, 1);
      this.checkTableDataEmpty();
    },
    checkTableDataEmpty() {
      if (this.bigscreenDetailCopy.configDataJson.rightTable4.length == 0) {
        let data = {
          testItem: '',
          testMethod: '',
          testValue: '',
          standardValue: '',
          singleConclusion: '',
        }
        this.bigscreenDetailCopy.configDataJson.rightTable4.push(data);
      }
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
.icon-class {
  font-size: 22px;
}
.image {
  float: left;
  margin-right: 10px;
  height: 150px;
  width: 150px;
}
</style>


