<template>
  <el-form
    :model="batchOutDetail"
    :rules="rules"
    ref="batchOutForm"
    label-width="120px"
  >
    <!-- <el-form-item label="批次号：" prop="blockName">
      <el-input
        v-model="batchOutDetail.batchCode"
        disabled
        class="input-width"
      ></el-input>
    </el-form-item> -->
    <el-form-item label="区块名称：" prop="blockName">
      <block-select
        @block="getBlock"
        class="input-width"
        :blockSelectedId="batchOutDetail.blockId"
      ></block-select>
    </el-form-item>
    <el-form-item label="养殖品种名称：" prop="productCategoryName">
      <fish-cate-select
        @fish-cate="getFishCate"
        class="input-width"
        :productCateSelectedId="batchOutDetail.productCategoryId"
      ></fish-cate-select>
    </el-form-item>
    <el-form-item label="出塘时间：" prop="outTime">
      <el-date-picker
        class="input-width"
        v-model="batchOutDetail.outTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetime"
        placeholder="请选择时间"
        align="right"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="数量：" prop="quantity">
      <el-input-number
        v-model="batchOutDetail.quantity"
        class="input-width"
        :min="0"
        :max="100000000000000000"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="单位：">
      <el-select v-model="batchOutDetail.unit" class="input-width">
        <el-option
          v-for="item in unitOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出塘类型：">
      <el-select v-model="batchOutDetail.outType" class="input-width">
        <el-option
          v-for="item in outTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="单价："
      v-if="batchOutDetail.outType == 1"
      class="input-width"
    >
      <el-input-number
        v-model="saleDetail.unitPrice"
        :min="0"
        :max="100000000000000000"
      ></el-input-number>
    </el-form-item>
    <el-form-item
      v-if="batchOutDetail.outType == 1"
      label="目的地："
      prop="destination"
    >
      <el-input v-model="saleDetail.destination" class="input-width"></el-input>
    </el-form-item>
    <el-form-item
      v-if="batchOutDetail.outType == 1"
      label="客户名称："
      prop="customer"
    >
      <el-input v-model="saleDetail.customer" class="input-width"></el-input>
    </el-form-item>
    <el-form-item
      v-if="batchOutDetail.outType == 1"
      label="客户电话："
      prop="customerPhone"
    >
      <el-input
        v-model="saleDetail.customerPhone"
        class="input-width"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('batchOutForm')"
        >提交</el-button
      >
      <el-button v-if="!isEdit" @click="resetForm('batchOutForm')"
        >重置</el-button
      >
      <el-button v-if="!isEdit" @click="onCancel()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import BlockSelect from "./../../../info/block/components/BlockSelect";
import FishCateSelect from "./../../../info/productCate/components/FishCateSelect";
import { createSale } from "@/api/sale";
import {
  fetchList,
  createBatchOut,
  updateBatchOut,
  deleteBatchOut,
  getBatchOutDetail,
} from "@/api/batchOut";

const defaultBatchOutDetail = {
  batchId: null,
  batchCode: null,
  blockId: null,
  blockName: null,
  productCategoryId: null,
  productCategoryName: null,
  outTime: null,
  quantity: null,
  unit: null,
  outType: null,
};
const defaultSaleDetail = {
  blockId: 0,
  blockName: "",
  productCategoryId: 0,
  productCategoryName: "",
  saleTime: "",
  destination: "",
  customer: "",
  customerPhone: "",
  quantity: "",
  unitPrice: "",
  amount: "",
};
export default {
  name: "BatchOutDetail",
  components: { BlockSelect, FishCateSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    batchDetail: {
      type: Object,
      default: null,
    },
    editDetail: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      batchOutDetail: Object.assign({}, defaultBatchOutDetail),
      saleDetail: Object.assign({}, defaultSaleDetail),
      rules: {},
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
      unitOptions: [
        { value: "公斤", label: "公斤" },
        { value: "尾", label: "尾" },
      ],
      outTypeOptions: [
        { value: 1, label: "直接销售" },
        { value: 2, label: "赠送" },
        { value: 3, label: "扔掉" },
        { value: 4, label: "其他" },
      ],
    };
  },
  created() {
    if (this.isEdit) {
      this.batchOutDetail = this.editDetail;
    } else {
      this.batchOutDetail = Object.assign({}, defaultBatchOutDetail);
      if (this.batchDetail) {
        // this.batchOutDetail.batchId = this.batchDetail.id;
        // this.batchOutDetail.batchCode = this.batchDetail.code;
        this.batchOutDetail.blockId = this.batchDetail.blockId;
        // this.batchOutDetail.blockName = this.batchDetail.blockName;
        // this.batchOutDetail.productCategoryId = this.batchDetail.productCategoryId;
        // this.batchOutDetail.productCategoryName = this.batchDetail.productCategoryName;
      }
    }
  },
  computed: {},
  methods: {
    getBlock(block) {
      if (block) {
        this.batchOutDetail.blockId = block.id;
        this.batchOutDetail.blockName = block.name;
      } else {
        this.batchOutDetail.blockId = null;
        this.batchOutDetail.blockName = null;
      }
    },
    getFishCate(fishCate) {
      if (fishCate) {
        this.batchOutDetail.productCategoryId = fishCate.id;
        this.batchOutDetail.productCategoryName = fishCate.id;
      } else {
        this.batchOutDetail.productCategoryId = null;
        this.batchOutDetail.productCategoryName = null;
      }
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
              updateBatchOut(this.batchOutDetail.id, this.batchOutDetail).then(
                (response) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.commitSuccess();
                }
              );
            } else {
              if (this.batchOutDetail.outType == 1) {
                this.saleDetail.blockId = this.batchOutDetail.blockId;
                this.saleDetail.blockName = this.batchOutDetail.blockName;
                this.saleDetail.productCategoryId = this.batchOutDetail.productCategoryId;
                this.saleDetail.productCategoryName = this.batchOutDetail.productCategoryName;
                this.saleDetail.saleTime = this.batchOutDetail.outTime;
                this.saleDetail.quantity = this.batchOutDetail.quantity;
                this.saleDetail.unit = this.batchOutDetail.unit;
                this.saleDetail.amount =
                  this.saleDetail.quantity * this.saleDetail.unitPrice;
                createSale(this.saleDetail).then((response) => {});
              }
              createBatchOut(this.batchOutDetail).then((response) => {
                this.$refs[formName].resetFields();
                this.resetForm(formName);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
                this.commitSuccess();
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
    onCancel() {
      this.$emit("cancel");
    },
    commitSuccess() {
      this.$emit("commitSuccess");
    },
  },
};
</script>

<style scoped>
.input-width {
  width: 350px;
}
</style>
