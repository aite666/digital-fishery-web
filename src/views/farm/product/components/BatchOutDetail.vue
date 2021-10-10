<template>
  <el-form
    :model="batchOutDetail"
    :rules="rules"
    ref="batchOutForm"
    label-width="120px"
  >
    <el-form-item label="批次号：" prop="blockName">
      <el-input
        v-model="batchOutDetail.batchCode"
        disabled
        class="input-width"
      ></el-input>
    </el-form-item>
    <el-form-item label="区块名称：" prop="blockName">
      <el-input
        v-model="batchOutDetail.blockName"
        disabled
        class="input-width"
      ></el-input>
    </el-form-item>
    <el-form-item label="养殖品种名称：" prop="productCategoryName">
      <el-input
        v-model="batchOutDetail.productCategoryName"
        disabled
        class="input-width"
      ></el-input>
    </el-form-item>
    <el-form-item label="销售时间：" prop="outTime">
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
        :min="0"
        :max="100000000000000000"
      ></el-input-number>
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
import {
  fetchList,
  createBatchOut,
  updateBatchOut,
  deleteBatchOut,
  getBatchOutDetail,
} from "@/api/batchOut";

const defaultBatchOutDetail = {
  batchId: 0,
  batchCode: "",
  blockId: 0,
  blockName: "",
  productCategoryId: 0,
  productCategoryName: "",
  outTime: "",
  quantity: "",
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
    };
  },
  created() {
    if (this.isEdit) {
      this.batchOutDetail = this.editDetail;
    } else {
      this.batchOutDetail = Object.assign({}, defaultBatchOutDetail);
      if (this.batchDetail) {
        this.batchOutDetail.batchId = this.batchDetail.id;
        this.batchOutDetail.batchCode = this.batchDetail.code;
        this.batchOutDetail.blockId = this.batchDetail.blockId;
        this.batchOutDetail.blockName = this.batchDetail.blockName;
        this.batchOutDetail.productCategoryId = this.batchDetail.productCategoryId;
        this.batchOutDetail.productCategoryName = this.batchDetail.productCategoryName;
      }
    }
  },
  computed: {},
  methods: {
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
