<template>
  <div class="bigscreen-container">
    <el-descriptions title="稻鳖共生模式专题分析" :column="1" border>
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
      <el-descriptions-item label="副标题">{{
        bigscreenDetail.configDataJson.subTitle
      }}</el-descriptions-item>
      <el-descriptions-item label="左上标题1">{{
        bigscreenDetail.configDataJson.leftTopTitle1
      }}</el-descriptions-item>
      <el-descriptions-item label="左上数据1">
        产量：{{ bigscreenDetail.configDataJson.leftTopData11 }}
        同比：{{ bigscreenDetail.configDataJson.leftTopData12 }} 环比：{{
          bigscreenDetail.configDataJson.leftTopData13
        }}
      </el-descriptions-item>
      <el-descriptions-item label="左上标题2">{{
        bigscreenDetail.configDataJson.leftTopTitle2
      }}</el-descriptions-item>
      <el-descriptions-item label="左上数据2">
        产量：{{ bigscreenDetail.configDataJson.leftTopData21 }}
        同比：{{ bigscreenDetail.configDataJson.leftTopData22 }} 环比：{{
          bigscreenDetail.configDataJson.leftTopData23
        }}
      </el-descriptions-item>

      <el-descriptions-item label="中间图表标题1">{{
        bigscreenDetail.configDataJson.centerTitle1
      }}</el-descriptions-item>
      <el-descriptions-item label="中间图表数据1">
        <el-table
          :data="bigscreenDetail.configDataJson.centerData1"
          style="width: 100%"
        >
          <el-table-column prop="time" label="时间"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
        </el-table>
      </el-descriptions-item>
      <el-descriptions-item label="中间图表标题2">{{
        bigscreenDetail.configDataJson.centerTitle2
      }}</el-descriptions-item>
      <el-descriptions-item label="中间图表数据2">
        <el-table
          :data="bigscreenDetail.configDataJson.centerData2"
          style="width: 100%"
        >
          <el-table-column prop="time" label="时间"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
        </el-table>
      </el-descriptions-item>

      <el-descriptions-item label="左下角图表标题1">{{
        bigscreenDetail.configDataJson.leftBottomTitle1
      }}</el-descriptions-item>
      <el-descriptions-item label="左下角图表销售总额">{{
        bigscreenDetail.configDataJson.leftBottomSaleTotal
      }}</el-descriptions-item>
      <el-descriptions-item label="左下角图表数据1">
        <el-table
          :data="bigscreenDetail.configDataJson.leftBottomData1"
          style="width: 100%"
        >
          <el-table-column prop="name" label="客户名称"> </el-table-column>
          <el-table-column prop="value" label="百分比"> </el-table-column>
        </el-table>
      </el-descriptions-item>

      <el-descriptions-item label="左下角图表标题2">{{
        bigscreenDetail.configDataJson.leftBottomTitle2
      }}</el-descriptions-item>
      <el-descriptions-item label="左下角图表平均时间">{{
        bigscreenDetail.configDataJson.leftBottomTimeAvg
      }}</el-descriptions-item>
      <el-descriptions-item label="左下角图表数据2">
        <el-table
          :data="bigscreenDetail.configDataJson.leftBottomData2"
          style="width: 100%"
        >
          <el-table-column prop="name" label="时间范围"> </el-table-column>
          <el-table-column prop="value" label="百分比"> </el-table-column>
        </el-table>
      </el-descriptions-item>

      <el-descriptions-item label="右下角图表标题1">{{
        bigscreenDetail.configDataJson.rightTitle1
      }}</el-descriptions-item>
      <el-descriptions-item label="右下角图表数据1">
        <el-table
          :data="bigscreenDetail.configDataJson.rightData1"
          style="width: 100%"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
        </el-table>
      </el-descriptions-item>

      <el-descriptions-item label="右下角图表标题2">{{
        bigscreenDetail.configDataJson.rightTitle2
      }}</el-descriptions-item>
      <el-descriptions-item label="右下角图表数据2">
        <el-table
          :data="bigscreenDetail.configDataJson.rightData2"
          style="width: 100%"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
        </el-table>
      </el-descriptions-item>

      <el-descriptions-item label="右下角图表标题3">{{
        bigscreenDetail.configDataJson.rightTitle3
      }}</el-descriptions-item>
      <el-descriptions-item label="右下角图表数据3">
        <el-table
          :data="bigscreenDetail.configDataJson.rightData3"
          style="width: 100%"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
        </el-table>
      </el-descriptions-item>

      <el-descriptions-item label="右下角图表标题4">{{
        bigscreenDetail.configDataJson.rightTitle4
      }}</el-descriptions-item>
      <el-descriptions-item label="右下角图表数据4">
        <el-table
          :data="bigscreenDetail.configDataJson.rightData4"
          style="width: 100%"
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="value" label="数值"> </el-table-column>
        </el-table>
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
        label-width="180px"
        size="small"
      >
        <el-form-item label="主标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.mainTitle"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右上副标题：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.subTitle"
            class="form-width"
          ></el-input>
        </el-form-item>

        <el-form-item label="左上标题1：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopTitle1"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左上数据1：">
          产量：
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopData11"
            class="form-width"
          ></el-input>
          <br />
          同比：
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopData12"
            class="form-width"
          ></el-input>
          <br />
          环比：
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopData13"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左上标题2：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopTitle2"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左上数据2：">
          产量：
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopData21"
            class="form-width"
          ></el-input>
          <br />
          同比：
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopData22"
            class="form-width"
          ></el-input>
          <br />
          环比：
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftTopData23"
            class="form-width"
          ></el-input>
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
            <el-table-column prop="time" label="时间">
              <template slot-scope="scope">
                <el-input v-model="scope.row.time"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="数值">
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
          <el-table
            :data="bigscreenDetailCopy.configDataJson.centerData2"
            style="width: 100%"
          >
            <el-table-column prop="time" label="时间">
              <template slot-scope="scope">
                <el-input v-model="scope.row.time"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="数值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('centerData2')"
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

        <el-form-item label="左下角图表标题1：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftBottomTitle1"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左下角图表销售总额：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftBottomSaleTotal"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左下角图表数据：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.leftBottomData1"
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
                  @click="handleAddColumn('leftBottomData1')"
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
        <el-form-item label="左下角图表标题2：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftBottomTitle2"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左下角图表平均时间：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.leftBottomTimeAvg"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="左下角图表数据2：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.leftBottomData2"
            style="width: 100%"
          >
            <el-table-column prop="name" label="时间">
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
                  @click="handleAddColumn('leftBottomData2')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'leftBottomData2')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="右下角图表标题1：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle1"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右下角图表数据1：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.rightData1"
            style="width: 100%"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="数值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('rightData1')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'rightData1')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="右下角图表标题2：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle2"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右下角图表数据2：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.rightData2"
            style="width: 100%"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="数值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('rightData2')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'rightData2')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="右下角图表标题3：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle3"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右下角图表数据3：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.rightData3"
            style="width: 100%"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="数值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('rightData3')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'rightData3')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="右下角图表标题4：">
          <el-input
            v-model="bigscreenDetailCopy.configDataJson.rightTitle4"
            class="form-width"
          ></el-input>
        </el-form-item>
        <el-form-item label="右下角图表数据4：">
          <el-table
            :data="bigscreenDetailCopy.configDataJson.rightData4"
            style="width: 100%"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="数值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
              <template slot-scope="scope">
                <i
                  class="el-icon-circle-plus-outline icon-class"
                  @click="handleAddColumn('rightData4')"
                ></i>
                <i
                  class="el-icon-remove-outline icon-class"
                  @click="
                    handleDeleteColumn(scope.$index, scope.row, 'rightData4')
                  "
                ></i>
              </template>
            </el-table-column>
          </el-table>
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
import lodash from "lodash";

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
      bigscreenDetailCopy: {
        name: "riceTurtl",
        configDataJson: {
          mainTitle: "",
          subTitle: "",
          leftTopTitle1: "",
          leftTopData11: "",
          leftTopData12: "",
          leftTopData13: "",
          leftTopTitle2: "",
          leftTopData21: "",
          leftTopData22: "",
          leftTopData23: "",

          centerTitle1: "",
          centerData1: [],
          centerTitle2: "",
          centerData2: [],

          leftBottomTitle1: "",
          leftBottomSaleTotal: "",
          leftBottomData1: [],
          leftBottomTitle2: "",
          leftBottomTimeAvg: "",
          leftBottomData2: [],

          rightTitle1: "",
          rightData1: [],
          rightTitle2: "",
          rightData2: [],
          rightTitle3: "",
          rightData3: [],
          rightTitle4: "",
          rightData4: [],
        },
      },
      bigscreenDetail: {
        name: "riceTurtl",
        configDataJson: {
          mainTitle: "",
          subTitle: "",
          leftTopTitle1: "",
          leftTopData11: "",
          leftTopData12: "",
          leftTopData13: "",
          leftTopTitle2: "",
          leftTopData21: "",
          leftTopData22: "",
          leftTopData23: "",

          centerTitle1: "",
          centerData1: [],
          centerTitle2: "",
          centerData2: [],

          leftBottomTitle1: "",
          leftBottomSaleTotal: "",
          leftBottomData1: [],
          leftBottomTitle2: "",
          leftBottomTimeAvg: "",
          leftBottomData2: [],

          rightTitle1: "",
          rightData1: [],
          rightTitle2: "",
          rightData2: [],
          rightTitle3: "",
          rightData3: [],
          rightTitle4: "",
          rightData4: [],
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
      this.listQuery.name = "riceTurtl";
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        let list = response.data.list;
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
        updateBigscreenByName("riceTurtl", this.bigscreenDetailCopy).then(
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
      if (tableName == "centerData1") {
        this.bigscreenDetailCopy.configDataJson.centerData1.push({
          time: "",
          value: "",
        });
      } else if (tableName == "centerData2") {
        this.bigscreenDetailCopy.configDataJson.centerData2.push({
          time: "",
          value: "",
        });
      } else if (tableName == "leftBottomData1") {
        this.bigscreenDetailCopy.configDataJson.leftBottomData1.push({
          name: "",
          value: "",
        });
      } else if (tableName == "leftBottomData2") {
        this.bigscreenDetailCopy.configDataJson.leftBottomData2.push({
          name: "",
          value: "",
        });
      } else if (tableName == "rightData1") {
        this.bigscreenDetailCopy.configDataJson.rightData1.push({
          name: "",
          value: "",
        });
      } else if (tableName == "rightData2") {
        this.bigscreenDetailCopy.configDataJson.rightData2.push({
          name: "",
          value: "",
        });
      } else if (tableName == "rightData3") {
        this.bigscreenDetailCopy.configDataJson.rightData3.push({
          name: "",
          value: "",
        });
      } else if (tableName == "rightData4") {
        this.bigscreenDetailCopy.configDataJson.rightData4.push({
          name: "",
          value: "",
        });
      }
    },
    handleDeleteColumn(index, row, tableName) {
      if (tableName == "centerData1") {
        this.bigscreenDetailCopy.configDataJson.centerData1.splice(index, 1);
      } else if (tableName == "centerData2") {
        this.bigscreenDetailCopy.configDataJson.centerData2.splice(index, 1);
      } else if (tableName == "leftBottomData1") {
        this.bigscreenDetailCopy.configDataJson.leftBottomData1.splice(index, 1);
      } else if (tableName == "leftBottomData2") {
        this.bigscreenDetailCopy.configDataJson.leftBottomData2.splice(index, 1);
      } else if (tableName == "rightData1") {
        this.bigscreenDetailCopy.configDataJson.rightData1.splice(index, 1);
      } else if (tableName == "rightData2") {
        this.bigscreenDetailCopy.configDataJson.rightData2.splice(index, 1);
      } else if (tableName == "rightData3") {
        this.bigscreenDetailCopy.configDataJson.rightData3.splice(index, 1);
      } else if (tableName == "rightData4") {
        this.bigscreenDetailCopy.configDataJson.rightData4.splice(index, 1);
      }
      this.checkTableDataEmpty();
    },
    checkTableDataEmpty() {
      if (this.bigscreenDetailCopy.configDataJson.centerData1.length == 0) {
        this.bigscreenDetailCopy.configDataJson.centerData1.push({
          time: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.centerData2.length == 0) {
        this.bigscreenDetailCopy.configDataJson.centerData2.push({
          time: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.leftBottomData1.length == 0) {
        this.bigscreenDetailCopy.configDataJson.leftBottomData1.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.leftBottomData2.length == 0) {
        this.bigscreenDetailCopy.configDataJson.leftBottomData2.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.rightData1.length == 0) {
        this.bigscreenDetailCopy.configDataJson.rightData1.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.rightData2.length == 0) {
        this.bigscreenDetailCopy.configDataJson.rightData2.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.rightData3.length == 0) {
        this.bigscreenDetailCopy.configDataJson.rightData3.push({
          name: "",
          value: "",
        });
      }
      if (this.bigscreenDetailCopy.configDataJson.rightData4.length == 0) {
        this.bigscreenDetailCopy.configDataJson.rightData4.push({
          name: "",
          value: "",
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
</style>


