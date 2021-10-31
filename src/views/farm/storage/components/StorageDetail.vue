<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="storageDetail"
      :rules="rules"
      ref="storageForm"
      label-width="150px"
    >
      <el-form-item label="农资名称：" prop="name">
        <el-input v-model="storageDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="农资类型：" prop="productCategoryId">
        <product-cate-select
          @product-cate="getProductCate"
          @product-cate-info="getProductCateInfo"
          :selectedId="storageDetail.productCategoryId"
        ></product-cate-select>
      </el-form-item>
      <el-form-item label="数量单位：" prop="unit">
        <el-select v-model="storageDetail.unit">
          <el-option
            v-for="item in unitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌：" prop="brand">
        <el-input v-model="storageDetail.brand"></el-input>
      </el-form-item>
      <el-form-item label="生产厂商：" prop="manufacturer">
        <el-input v-model="storageDetail.manufacturer"></el-input>
      </el-form-item>
      <el-form-item label="许可证号：" prop="license">
        <el-input v-model="storageDetail.license"></el-input>
      </el-form-item>
      <el-form-item label="生产日期：" prop="productionDate">
        <el-date-picker
            class="input-width"
            v-model="storageDetail.productionDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="请选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="供货主体及联系人、联系电话：" prop="contacts">
        <el-input
          :autosize="{ minRows: 3 }"
          v-model="storageDetail.contacts"
          type="textarea"
          placeholder="请输入供货主体及联系人、联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          :autosize="{ minRows: 3 }"
          v-model="storageDetail.remark"
          type="textarea"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
      <el-form-item label="最大库存预警：" prop="maxThreshold">
        <el-input-number
          v-model="storageDetail.maxThreshold"
          :min="0"
          :max="100000000000000000"
        >
        </el-input-number>
        <span class="unit-span">{{ storageDetail.unit }}</span>
      </el-form-item>
      <el-form-item label="最小库存预警：" prop="minThreshold">
        <el-input-number
          v-model="storageDetail.minThreshold"
          :min="0"
          :max="100000000000000000"
        >
        </el-input-number>
        <span class="unit-span">{{ storageDetail.unit }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('storageForm')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('storageForm')"
          >重置</el-button
        >
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ProductCateSelect from "./../../../info/productCate/components/ProductCateSelect";
import {
  fetchList,
  createStorage,
  updateStorage,
  deleteStorage,
  getStorageDetail,
} from "@/api/storage";

const defaultStorageDetail = {
  enterpriseId: null,
  name: null,
  productCategoryId: null,
  productCategoryName: null,
  unit: "克",
  brand: null,
  manufacturer: null,
  remark: null,
  max_threshold: 0,
  max_threshold: 0,
  quantity: 0,
  license: null,
  productionDate: null,
  contacts: null,
};
export default {
  name: "StorageDetail",
  components: { ProductCateSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      storageDetail: Object.assign({}, defaultStorageDetail),
      unitOptions: [
        { value: "克", label: "克" },
        { value: "千克", label: "千克" },
        { value: "斤", label: "斤" },
        { value: "公斤", label: "公斤" },
        { value: "吨", label: "吨" },
        { value: "毫升", label: "毫升" },
        { value: "升", label: "升" },
        { value: "平方米", label: "平方米" },
        { value: "个", label: "个" },
        { value: "条", label: "条" },
      ],
      productCateInfo: {},
      rules: {
        name: [
          { required: true, message: "请输入农资名称", trigger: "blur" },
          {
            min: 2,
            max: 255,
            message: "长度在 2 到 255 个字符",
            trigger: "blur",
          },
        ],
      },
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
      getStorageDetail(this.$route.query.id).then((response) => {
        this.storageDetail = response.data;
      });
    } else {
      this.storageDetail = Object.assign({}, defaultStorageDetail);
    }
  },
  computed: {},
  methods: {
    getProductCate(productCate) {
      if (productCate) {
        this.storageDetail.productCategoryId = productCate.id;
        this.storageDetail.productCategoryName = productCate.id;
      } else {
        this.storageDetail.productCategoryId = null;
        this.storageDetail.productCategoryName = null;
      }
    },
    getProductCateInfo(productCateInfo) {
      this.productCateInfo = productCateInfo;
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
              updateStorage(this.$route.query.id, this.storageDetail).then(
                (response) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  });
                  this.$router.back();
                }
              );
            } else {
              createStorage(this.storageDetail).then((response) => {
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
.unit-span {
  margin-left: 10px;
}
</style>
