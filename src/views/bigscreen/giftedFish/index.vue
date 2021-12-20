<template>
  <div class="bigscreen-container">
    <el-descriptions title="天赋渔鲜品牌专题分析" :column="1" border>
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
      <el-descriptions-item label="中间顶部数据">
        <el-table :data="bigscreenDetail.configDataJson.centerTopData" style="width: 100%">
          <el-table-column prop="name" label="养殖鱼类名称">
          </el-table-column>
          <el-table-column prop="value" label="养殖鱼类数量">
          </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item label="左侧图表标题">{{
        bigscreenDetail.configDataJson.leftTitle
      }}</el-descriptions-item>
      <el-descriptions-item label="左侧图表数据">
        <el-table :data="bigscreenDetail.configDataJson.leftTableData" style="width: 100%">
          <el-table-column prop="name" label="销售鱼类名称">
          </el-table-column>
          <el-table-column prop="value" label="销售鱼类数量">
          </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item label="中间图表标题1">{{
        bigscreenDetail.configDataJson.centerTitle1
      }}</el-descriptions-item>
      <el-descriptions-item label="中间图表数据1">
        <el-table :data="bigscreenDetail.configDataJson.centerData1" style="width: 100%">
          <el-table-column prop="name" label="客户名称">
          </el-table-column>
          <el-table-column prop="value" label="百分比">
          </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item label="中间图表标题2">{{
        bigscreenDetail.configDataJson.centerTitle2
      }}</el-descriptions-item>
      <el-descriptions-item label="中间图表数据2">
          累计完成金额：{{bigscreenDetail.configDataJson.centerData21}}
          累计完成百分比：{{bigscreenDetail.configDataJson.centerData22}}
      </el-descriptions-item>
      <el-descriptions-item label="右侧图表数据">
        <el-table :data="bigscreenDetail.configDataJson.rightTableData" style="width: 100%">
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
      <el-descriptions-item label="底部图片1">
        <img class="image" :src="bigscreenDetail.configDataJson.bottomImage1" />
      </el-descriptions-item>
      <el-descriptions-item label="底部图片2">
        <img class="image" :src="bigscreenDetail.configDataJson.bottomImage2" />
      </el-descriptions-item>
      <el-descriptions-item label="底部图片3">
        <img class="image" :src="bigscreenDetail.configDataJson.bottomImage3" />
      </el-descriptions-item>
      <el-descriptions-item label="底部图片4">
        <img class="image" :src="bigscreenDetail.configDataJson.bottomImage4" />
      </el-descriptions-item>
      <!-- <el-descriptions-item label="底部图片5">
        <img class="image" :src="bigscreenDetail.configDataJson.bottomImage5" />
      </el-descriptions-item> -->
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
        <el-form-item label="中间顶部数据：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.centerTopData"
            style="width: 100%"
          >
            <el-table-column prop="name" label="养殖鱼类名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="养殖鱼类数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('centerTopData')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'centerTopData')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="左侧图表标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTitle"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左侧图表数据：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.leftTableData"
            style="width: 100%"
          >
            <el-table-column prop="name" label="销售鱼类名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="销售鱼类数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('leftTableData')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'leftTableData')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="中间图表标题1：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.centerTitle1"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="中间图表数据1：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.centerData1"
            style="width: 100%"
          >
            <el-table-column prop="name" label="客户名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="百分比">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('centerData1')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'centerData1')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="中间图表标题2：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.centerTitle2"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="中间图表数据2：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.centerData21"
            class="form-width"
          ></el-input>
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.centerData22"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右侧图表数据：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.rightTableData"
            style="width: 100%"
          >
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
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('rightTableData')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(
                      scope.$index,
                      scope.row,
                      'rightTableData'
                    )
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="底部图片1：">
          <single-upload
            v-model="bigscreenDetailCopy.configDataJson.bottomImage1"
          ></single-upload>
        </el-form-item>
        <el-form-item label="底部图片2：">
          <single-upload
            v-model="bigscreenDetailCopy.configDataJson.bottomImage2"
          ></single-upload>
        </el-form-item>
        <el-form-item label="底部图片3：">
          <single-upload
            v-model="bigscreenDetailCopy.configDataJson.bottomImage3"
          ></single-upload>
        </el-form-item>
        <el-form-item label="底部图片4：">
          <single-upload
            v-model="bigscreenDetailCopy.configDataJson.bottomImage4"
          ></single-upload>
        </el-form-item>
        <!-- <el-form-item label="底部图片5：">
          <single-upload
            v-model="bigscreenDetailCopy.configDataJson.bottomImage5"
          ></single-upload>
        </el-form-item> -->
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
import SingleUpload from "@/components/Upload/singleUpload";
import lodash from "lodash";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 1,
  name: null,
};
export default {
  name: "giftedFish",
  components: { SingleUpload },
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      listQuery: Object.assign({}, defaultListQuery),
      bigscreenDetailCopy: {
        name: "giftedFish",
        configDataJson: {
          mainTitle: "",
          centerTopData: [],
          leftTitle: "",
          leftTableData: [],
          centerTitle1: "",
          centerData1: [],
          centerTitle2: "",
          centerData21: 0,
          centerData22: 0,
          rightTableData: [],
          bottomImage1: "",
          bottomImage2: "",
          bottomImage3: "",
          bottomImage4: "",
        },
      },
      bigscreenDetail: {
        name: "giftedFish",
        configDataJson: {
          mainTitle: "",
          centerTopData: [],
          leftTitle: "",
          leftTableData: [],
          centerTitle1: "",
          centerData1: [],
          centerTitle2: "",
          centerData21: 0,
          centerData22: 0,
          rightTableData: [],
          bottomImage1: "",
          bottomImage2: "",
          bottomImage3: "",
          bottomImage4: "",
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
      this.listQuery.name = "giftedFish";
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data.list;
        if (list.length > 0) {
          this.bigscreenDetail = list[0];
        }
      });
    },
    handleViewOpeningPage(index, row) {
      let url = "/#/opening/giftedFish";
      window.open(url, "_blank");
    },
    handleUpdateBigscreen() {
      this.bigscreenDetailCopy = lodash.cloneDeep(this.bigscreenDetail);
      this.checkTableDataEmpty();
      this.dialogVisible = true;
    },
    handleDialogConfirm() {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateBigscreenByName("giftedFish", this.bigscreenDetailCopy).then(
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
    handleAddColumn(tableName) {
      if (tableName == "centerTopData") {
        this.bigscreenDetailCopy.configDataJson.centerTopData.push({
          name: "",
          value: "",
        });
      } else if (tableName == "leftTableData") {
        this.bigscreenDetailCopy.configDataJson.leftTableData.push({
          name: "",
          value: "",
        });
      } else if (tableName == "centerData1") {
        this.bigscreenDetailCopy.configDataJson.centerData1.push({
          name: "",
          value: "",
        });
      } else if (tableName == "rightTableData") {
        this.bigscreenDetailCopy.configDataJson.rightTableData.push({
          testItem: "",
          testMethod: "",
          testValue: "",
          standardValue: "",
          singleConclusion: "",
        });
      }
    },
    handleDeleteColumn(index, row, tableName) {
      if (tableName == "centerTopData") {
        this.bigscreenDetailCopy.configDataJson.centerTopData.splice(index, 1);
      } else if (tableName == "leftTableData") {
        this.bigscreenDetailCopy.configDataJson.leftTableData.splice(index, 1);
      } else if (tableName == "centerData1") {
        this.bigscreenDetailCopy.configDataJson.centerData1.splice(index, 1);
      } else if (tableName == "rightTableData") {
        this.bigscreenDetailCopy.configDataJson.rightTableData.splice(index, 1);
      }
      this.checkTableDataEmpty();
    },
    checkTableDataEmpty() {
      if (this.bigscreenDetailCopy.configDataJson.centerTopData.length == 0) {
        this.bigscreenDetailCopy.configDataJson.centerTopData.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.leftTableData.length == 0) {
        this.bigscreenDetailCopy.configDataJson.leftTableData.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.centerData1.length == 0) {
        this.bigscreenDetailCopy.configDataJson.centerData1.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.rightTableData.length == 0) {
        this.bigscreenDetailCopy.configDataJson.rightTableData.push({
          testItem: "",
          testMethod: "",
          testValue: "",
          standardValue: "",
          singleConclusion: "",
        });
      }
    },
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
  margin-right: 10px;
  height: 150px;
  width: 200px;
}
</style>


