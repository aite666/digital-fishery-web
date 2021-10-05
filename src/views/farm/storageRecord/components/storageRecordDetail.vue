<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="storageRecordDetail" :rules="rules" ref="storageRecordForm" label-width="120px">
      <el-form-item label="企业名称：" prop="name">
        <el-input v-model="storageRecordDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          :autosize="{ minRows: 4}"
          v-model="storageRecordDetail.description"
          type="textarea"
          placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="成立时间：">
        <el-date-picker
            class="input-width"
            v-model="storageRecordDetail.creationTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="经营内容：" prop="businessContent">
        <el-input
          :autosize="{ minRows: 6}"
          v-model="storageRecordDetail.businessContent"
          type="textarea"
          placeholder="请输入经营内容"></el-input>
      </el-form-item>
      <el-form-item label="法人：" prop="legalPerson">
        <el-input v-model="storageRecordDetail.legalPerson"></el-input>
      </el-form-item>
      <el-form-item label="年产值：" prop="annualOutputValue">
        <el-input-number v-model="storageRecordDetail.annualOutputValue"
        :min="0" :max="100000000000000000"></el-input-number> ￥
      </el-form-item>
      <el-form-item label="年产量：" prop="annualYield">
        <el-input-number v-model="storageRecordDetail.annualYield"
        :min="0" :max="100000000000000000"></el-input-number> kg
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
  import {fetchList,createStorageRecord,updateStorageRecord,deleteStorageRecord,getStorageRecordDetail} from '@/api/storageRecord'

  const defaultStorageRecordDetail= {
    name: '',
    description: '',
    creationTime: '',
    businessContent: '',
    legalPerson: '',
    annualOutputValue: 0,
  };
  export default {
    name: "StorageRecordDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        storageRecordDetail: Object.assign({}, defaultStorageRecordDetail),
        rules: {
          name: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
          ],
          description: [
            {min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur'}
          ],
          businessContent: [
            {min: 2, max: 1000, message: '长度在 2 到 1000 个字符', trigger: 'blur'}
          ],
          legalPerson: [
            {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      if (this.isEdit) {
        getStorageRecordDetail(this.$route.query.id).then(response => {
          this.storageRecordDetail = response.data;
        });
      } else {
        this.storageRecordDetail = Object.assign({}, defaultStorageRecordDetail);
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
