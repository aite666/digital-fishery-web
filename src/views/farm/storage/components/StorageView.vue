<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="storageDetail" :rules="rules" ref="storageForm" label-width="120px">
      <el-form-item label="农资名称：" prop="name">
        <el-input v-model="storageDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="农资类型：" prop="productCategoryName">
        <el-select v-model="storageDetail.productCategoryId">
            <el-option
                key="1"
                label="化肥"
                value="1">
            </el-option>
            <el-option
                key="2"
                label="种子"
                value="2">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量单位：" prop="unit">
          <el-select v-model="storageDetail.unit">
            <el-option
                key="g"
                label="克"
                value="g">
            </el-option>
            <el-option
                key="kg"
                label="千克"
                value="kg">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌：" prop="brand">
        <el-input v-model="storageDetail.brand"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input
          :autosize="{ minRows: 4}"
          v-model="storageDetail.remark"
          type="textarea"
          placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="最大库存预警：" prop="maxThreshold">
        <el-input-number v-model="storageDetail.maxThreshold"
        :min="0" :max="100000000000000000"></el-input-number>
      </el-form-item>
      <el-form-item label="最小库存预警：" prop="minThreshold">
        <el-input-number v-model="storageDetail.minThreshold"
        :min="0" :max="100000000000000000"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('storageForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('storageForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createStorage,updateStorage,deleteStorage,getStorageDetail} from '@/api/storage'

  const defaultStorageDetail= {
    enterpriseId: 0,
    name: '',
    productCategoryId: 0,
    productCategoryName: '',
    unit: '',
    brand: '',
    manufacturer: '',
    remark: '',
    max_threshold: 0,
    max_threshold: 0,
    quantity: 0,
  };
  export default {
    name: "StorageView",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        storageDetail: Object.assign({}, defaultStorageDetail),
        rules: {
          name: [
            {required: true, message: '请输入农资名称', trigger: 'blur'},
            {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
      };
    },
    created() {
      if (this.isEdit) {
        getStorageDetail(this.$route.query.id).then(response => {
          this.storageDetail = response.data;
        });
      } else {
        this.storageDetail = Object.assign({}, defaultStorageDetail);
      }
    },
    computed:{
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateStorage(this.$route.query.id, this.storageDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createStorage(this.storageDetail).then(response => {
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
