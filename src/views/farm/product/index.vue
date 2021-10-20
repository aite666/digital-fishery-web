<template>
  <el-card shadow="never">
    <div class="d-f">
      <div class="left d-f">
        <div class="wapper">
          <div class="top">
            <block-select @block="getBlock"></block-select>
            <el-button class="add-button" type="primary" @click="handleAdd()"
              >添加养殖鱼类</el-button
            >
          </div>
          <p class="extra-info" v-if="blockSelected">
            区域面积：{{ blockSelected.area }}亩
          </p>
        </div>
      </div>
      <div class="right">
        <ul class="list d-f">
          <li>
            <!-- <div class="icon"><i class="el-icon-grape"></i></div> -->
            <div class="icon"><svg-icon icon-class="fish2" class="color-main"></svg-icon></div> 
            <div class="info">
              <h3>{{ productCategoryNum }}</h3>
              <span>当前养殖鱼类</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-refrigerator"></i></div> -->
            <div class="icon"><svg-icon icon-class="batch" class="color-main"></svg-icon></div> 
            <div class="info">
              <h3>{{ batchNum }}</h3>
              <span>投放批次</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-s-tools"></i></div> -->
            <div class="icon"><svg-icon icon-class="outBlock" class="color-main"></svg-icon></div> 
            <div class="info">
              <h3>{{ outRecordNum }}</h3>
              <span>出塘记录</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="12" style="margin: 20px 0 20px 0">
        <el-col
          :span="4"
          v-for="stat of productCategoryStats"
          :key="stat.productCategoryId"
        >
          <el-card shadow="always">
            <div class="card-content-item">{{ stat.productCategoryName }}</div>
            <div class="card-content-item">总批次数: {{ stat.batchCount }}</div>
            <div class="card-content-item">总量: {{ stat.batchTotal | formatBatchTotal}}</div>
          </el-card>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName">
        <el-tab-pane label="投放批次" name="first" lazy>
          <batch-list
            ref="batchList"
            @update-batch="handleUpdate"
            :blockId="blockSelectedId"
            @getAllList="getList"
          ></batch-list>
        </el-tab-pane>
        <el-tab-pane label="出塘记录" name="second" lazy>
          <batch-out-list
            ref="batchOutList"
            :blockId="blockSelectedId"
          ></batch-out-list>
        </el-tab-pane>
        <el-tab-pane label="农资使用记录" name="third" lazy>
          <storage-use-list
            ref="storageUseList"
            :blockId="blockSelectedId"
          ></storage-use-list>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="isEdit ? '编辑养殖鱼类' : '添加养殖鱼类'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="batch" ref="batchForm" label-width="150px" size="small">
        <el-form-item label="批次号：">
          <el-input v-model="batch.code" class="form-width" disabled></el-input>
        </el-form-item>
        <el-form-item label="区块名称：">
          <el-input
            v-model="batch.blockName"
            class="form-width"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="种类：">
          <fish-cate-select @fish-cate="getFishCate"></fish-cate-select>
        </el-form-item>
        <el-form-item label="来源单位：">
          <el-input v-model="batch.origin" class="form-width"></el-input>
        </el-form-item>
        <el-form-item label="养殖日期：">
          <el-date-picker
            class="form-width"
            v-model="batch.farmTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="请选择时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数量：" class="form-width">
          <el-input-number
            v-model="batch.quantity"
            class="form-width"
            :min="0"
            :max="100000000000000000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="单位：">
          <el-select v-model="batch.unit" class="form-width">
            <el-option
              v-for="item in unitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价：">
          <el-input-number
            v-model="batch.unitPrice"
            class="form-width"
            :min="0"
            :max="100000000000000000"
          ></el-input-number>
          ￥
        </el-form-item>
        <el-form-item label="金额：">
          <el-input-number
            v-model="batch.amount"
            class="form-width"
            :min="0"
            :max="100000000000000000"
          ></el-input-number>
          ￥
        </el-form-item>
        <el-form-item label="养殖状态：" v-if="isEdit">
          <el-radio-group v-model="batch.status">
            <el-radio-button label="1">养殖中</el-radio-button>
            <el-radio-button label="0">养殖完毕</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import BlockSelect from "./../../info/block/components/BlockSelect";
import FishCateSelect from "./../../info/productCate/components/FishCateSelect";
import BatchList from "./components/BatchList";
import BatchOutList from "./components/BatchOutList";
import StorageUseList from "./../storageRecord/components/StorageUseList";
import {
  getList,
  createBatch,
  updateBatch,
  deleteBatch,
  getBatchDetail,
  getProductCategoryList,
} from "@/api/batch";
import { getBatchOutCount } from "@/api/batchOut";

const defaultBatch = {
  id: null,
  code: "",
  blockId: null,
  blockName: null,
  productCategoryId: null,
  productCategoryName: null,
  farmTime: null,
  quantity: 0,
  unitPrice: 0,
  amount: 0,
  status: 1,
};
export default {
  name: "product",
  components: {
    BlockSelect,
    BatchList,
    BatchOutList,
    FishCateSelect,
    StorageUseList,
  },
  data() {
    return {
      activeName: "first",
      blockSelected: null,
      blockSelectedId: null,
      dialogVisible: false,
      isEdit: false,
      batch: Object.assign({}, defaultBatch),
      productCategoryStats: [],
      productCategoryNum: 0,
      batchNum: 0,
      outRecordNum: 0,
      unitOptions: [
        { value: "公斤", label: "公斤" },
        { value: "尾", label: "尾" },
      ],
    };
  },
  created() {
    this.getProductCategoryStats();
  },
  filters: {
      formatBatchTotal(formatBatch) {
        return formatBatch.replaceAll(',', '+');
      },
  },
  computed: {},
  methods: {
    getBlock(block) {
      this.blockSelected = block;
      if (this.blockSelected) {
        this.blockSelectedId = this.blockSelected.id;
      } else {
        this.blockSelectedId = null;
      }
      this.getProductCategoryStats();
    },
    getFishCate(fishCate) {
      if (fishCate) {
        this.batch.productCategoryId = fishCate.id;
      } else {
        this.batch.productCategoryId = null;
      }
    },
    getProductCategoryStats() {
      getProductCategoryList(this.blockSelectedId).then((response) => {
        this.productCategoryStats = response.data;
        let productCategoryNum = 0;
        let batchNum = 0;
        for (let item of this.productCategoryStats) {
          productCategoryNum += 1;
          batchNum += item["batchCount"];
        }
        this.productCategoryNum = productCategoryNum;
        this.batchNum = batchNum;
      });
      getBatchOutCount({ blockId: this.blockSelectedId }).then((response) => {
        this.outRecordNum = response.data;
      });
    },
    handleAdd() {
      if (this.blockSelected) {
        this.dialogVisible = true;
        this.isEdit = false;
        this.batch = Object.assign({}, defaultBatch);
        this.batch.blockId = this.blockSelected.id;
        this.batch.blockName = this.blockSelected.name;
      } else {
        this.$message({
          type: "warning",
          message: "请先选择区块再添加养殖鱼类!",
        });
      }
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该养殖批次?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteBatch(params).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.batch = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          updateBatch(this.batch.id, this.batch).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          createBatch(this.batch).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    getList() {
      this.getProductCategoryStats();
      let childBatchList = this.$refs.batchList;
      // childBatchList.blockId = this.blockSelectedId;
      childBatchList.getList();
      let childBatchOutList = this.$refs.batchOutList;
      childBatchOutList.getList();
    },
  },
};
</script>

<style scoped>
.left {
  /* width: 255px; */
  height: 80px;
  border-right: 1px solid #ebeef5;
  padding-left: 10px;
}
.extra-info {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #909399;
  line-height: 17px;
}
.add-button {
  margin: 0 30px 0 24px;
}
.d-f {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.left .area-name {
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  padding-left: 40px;
  padding-right: 60px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right .list {
  padding-left: 10px;
}
.right .list li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  padding-left: 50px;
}
.right .list li .icon {
  margin-right: 20px;
  font-size: 34px;
  padding-top: 13px;
}
.right .list li .info {
  color: #171717;
}
.content {
  margin-top: 20px;
}
.form-width {
  width: 300px;
}
.card-content-item {
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
