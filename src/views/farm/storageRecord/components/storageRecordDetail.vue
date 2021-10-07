<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="storageRecordDetail" :rules="rules" ref="storageRecordForm" label-width="120px">
      <el-form-item label="农资类型：" prop="productCategoryId">
        <product-cate-select @product-cate="getProductCate"
          :selectedId="storageRecordDetail.productCategoryId">
        </product-cate-select>
      </el-form-item>
      <el-form-item label="农资名称：" prop="name">
        <el-select v-model="storageRecordDetail.storageId"
          @change="getStorageDetail()"
          clearable>
          <el-option v-for="item of storageList" 
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="品牌：" prop="brand">
        <el-input v-model="storageDetail.brand" disabled></el-input>
      </el-form-item>
      <el-form-item label="生产厂商：" prop="manufacturer">
        <el-input v-model="storageDetail.manufacturer" disabled></el-input>
      </el-form-item>
      <el-form-item label="数量：" prop="quantity">
        <el-input-number v-model="storageRecordDetail.quantity"
        :min="0" :max="100000000000000000"></el-input-number> 
        <span class="unit-span">{{ storageDetail.unit }}</span>
      </el-form-item>
      <el-form-item label="入库时间：">
        <el-date-picker
            class="input-width"
            v-model="storageRecordDetail.recordTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="请选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="价格：" prop="price">
        <el-input-number v-model="storageRecordDetail.price"
        :min="0" :max="100000000000000000"></el-input-number>
        <span class="unit-span">￥</span>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          :autosize="{ minRows: 4}"
          v-model="storageRecordDetail.remark"
          type="textarea"
          placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('storageRecordForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('storageRecordForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import ProductCateSelect from './../../../info/productCate/components/ProductCateSelect';
  import {fetchList,createStorageRecord,updateStorageRecord,deleteStorageRecord,getStorageRecordDetail} from '@/api/storageRecord';
  import {fetchStorageList, getStorageDetail} from '@/api/storage';

  const defaultStorageRecordDetail= {
    storageId: null,
    blockId: null,
    productCategoryId: null,
    recordTime: null,
    type: 1,
    status: 0,
    quantity: 0,
    price: 0,
    remark: null,
    batchId: null,
  };
  const defaultStorageDetail= {
    enterpriseId: 0,
    name: '',
    productCategoryId: 0,
    productCategoryName: '',
    unit: '克',
    brand: '',
    manufacturer: '',
    remark: '',
    max_threshold: 0,
    max_threshold: 0,
    quantity: 0,
  };
  export default {
    name: "StorageRecordDetail",
    components:{ProductCateSelect},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        storageRecordDetail: Object.assign({}, defaultStorageRecordDetail),
        storageDetail:  Object.assign({}, defaultStorageDetail),
        storageList: [],
        storageListQuery: {
          pageNum: 1,
          pageSize: 1000000,
          productCategoryId: null,
        },
        rules: {
        },
      };
    },
    created() {
      if (this.isEdit) {
        getStorageRecordDetail(this.$route.query.id).then(response => {
          this.storageRecordDetail = response.data;
          this.getStorageList(this.storageRecordDetail.productCategoryId);
          this.getStorageDetail();
        });
      } else {
        this.storageRecordDetail = Object.assign({}, defaultStorageRecordDetail);
      }
    },
    computed:{
    },
    methods: {
      getProductCate(productCate) {
        if (productCate) {
          this.getStorageList(productCate.id);
        } else {
          this.storageList = [];
        }
      },
      getStorageList(productCategoryId) {
        this.storageListQuery.productCategoryId = productCategoryId;
        fetchStorageList(this.storageListQuery).then(response => {
          this.storageList = response.data.list;
        });
      },
      getStorageDetail() {
        if (this.storageRecordDetail.storageId) {
          getStorageDetail(this.storageRecordDetail.storageId).then(response => {
            this.storageDetail = response.data;
            this.storageRecordDetail.productCategoryId = this.storageDetail.productCategoryId;
          });
        }
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateStorageRecord(this.$route.query.id, this.storageRecordDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createStorageRecord(this.storageRecordDetail).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
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
      }
    }
  }
</script>

<style scoped>
</style>
