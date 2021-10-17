<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="storageUseDetail"
      :rules="rules"
      ref="storageUseForm"
      label-width="120px"
    >
      <el-form-item label="区块名称：" prop="blockName">
        <block-select
          @block="getBlock"
          :blockSelectedId="storageUseDetail.blockId"
        ></block-select>
      </el-form-item>
      <!-- <el-form-item label="养殖品种名称：" prop="productCategoryName">
        <fish-cate-select
          @fish-cate="getFishCate"
          :productCateSelectedId="storageUseDetail.productCategoryId"
        >
        </fish-cate-select>
      </el-form-item> -->
      <el-form-item label="农资类型：" prop="productCategoryId">
        <product-cate-select
          @product-cate="getProductCate"
          :selectedId="storageDetail.productCategoryId"
        >
        </product-cate-select>
      </el-form-item>
      <el-form-item label="农资名称：" prop="storageId">
        <el-select
          v-model="storageUseDetail.storageId"
          @change="getStorageDetail()"
          clearable
        >
          <el-option
            v-for="item of storageList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存数量：" prop="storageQuantity">
        <el-input-number
          v-model="storageDetail.quantity"
          :min="0"
          :max="100000000000000000"
          disabled
        ></el-input-number>
        <span class="unit-span">{{ storageDetail.unit }}</span>
      </el-form-item>
      <el-form-item label="数量：" prop="quantity">
        <el-input-number
          v-model="storageUseDetail.quantity"
          :min="0"
          :max="100000000000000000"
        ></el-input-number>
        <span class="unit-span">{{ storageDetail.unit }}</span>
      </el-form-item>
      <el-form-item label="使用时间：">
        <el-date-picker
          class="input-width"
          v-model="storageUseDetail.recordTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="date"
          placeholder="请选择时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          :autosize="{ minRows: 4 }"
          v-model="storageUseDetail.remark"
          type="textarea"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('storageUseForm')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('storageUseForm')"
          >重置</el-button
        >
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ProductCateSelect from "./../../../info/productCate/components/ProductCateSelect";
import BlockSelect from "./../../../info/block/components/BlockSelect";
import FishCateSelect from "./../../../info/productCate/components/FishCateSelect";
import {
  fetchList,
  createStorageRecord,
  updateStorageRecord,
  deleteStorageRecord,
  getStorageRecordDetail,
} from "@/api/storageRecord";
import { fetchStorageList, getStorageDetail } from "@/api/storage";

const defaultStorageUseDetail = {
  storageId: null,
  blockId: null,
  blockName: null,
  productCategoryId: null,
  productCategoryName: null,
  recordTime: null,
  type: 2,
  status: 1,
  quantity: 0,
  price: null,
  remark: null,
  batchId: null,
};
const defaultStorageDetail = {
  enterpriseId: 0,
  name: null,
  productCategoryId: null,
  productCategoryName: null,
  unit: "克",
  brand: "",
  manufacturer: "",
  remark: "",
  max_threshold: 0,
  max_threshold: 0,
  quantity: 0,
};
export default {
  name: "StorageUseDetail",
  components: { ProductCateSelect, BlockSelect, FishCateSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      storageUseDetail: Object.assign({}, defaultStorageUseDetail),
      storageDetail: Object.assign({}, defaultStorageDetail),
      storageList: [],
      storageListQuery: {
        pageNum: 1,
        pageSize: 1000000,
        productCategoryId: null,
      },
      rules: {
        storageId: [
          { required: true, message: "请选择农资名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    if (this.isEdit) {
      getStorageUseDetail(this.$route.query.id).then((response) => {
        this.storageUseDetail = response.data;
        this.getStorageList(this.storageUseDetail.productCategoryId);
        this.getStorageDetail();
      });
    } else {
      this.storageUseDetail = Object.assign({}, defaultStorageUseDetail);
    }
  },
  computed: {},
  methods: {
    getProductCate(productCate) {
      if (productCate) {
        this.getStorageList(productCate.id);
      } else {
        this.storageList = [];
      }
    },
    getBlock(block) {
      if (block) {
        this.storageUseDetail.blockId = block.id;
        this.storageUseDetail.blockName = block.name;
      } else {
        this.storageUseDetail.blockId = null;
        this.storageUseDetail.blockName = null;
      }
    },
    getFishCate(fishCate) {
      if (fishCate) {
        this.storageUseDetail.productCategoryId = fishCate.id;
        this.storageUseDetail.productCategoryName = fishCate.id;
        if (this.storageDetail.productCategoryId == null) {
          this.storageDetail.productCategoryId = fishCate.id;
        }
      } else {
        this.storageUseDetail.productCategoryId = null;
        this.storageUseDetail.productCategoryName = null;
      }
    },
    getStorageList(productCategoryId) {
      this.storageListQuery.productCategoryId = productCategoryId;
      fetchStorageList(this.storageListQuery).then((response) => {
        this.storageList = response.data.list;
      });
    },
    getStorageDetail() {
      if (this.storageUseDetail.storageId) {
        getStorageDetail(this.storageUseDetail.storageId).then((response) => {
          this.storageDetail = response.data;
          // this.storageUseDetail.productCategoryId = this.storageDetail.productCategoryId;
        });
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.storageUseDetail.quantity > this.storageDetail.quantity) {
            this.$message({
              message: "使用数量不得大于库存数量",
              type: "error",
              duration: 1000,
            });
          } else {
            this.$confirm("是否提交数据", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              if (this.isEdit) {
                updateStorageRecord(
                  this.$route.query.id,
                  this.storageUseDetail
                ).then((response) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$router.back();
                });
              } else {
                createStorageRecord(this.storageUseDetail).then((response) => {
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
          }
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
</style>
