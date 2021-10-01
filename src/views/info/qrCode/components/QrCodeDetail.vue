<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="qrCodeDetail" :rules="rules" ref="qrCodeForm" label-width="120px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="qrCodeDetail.title"></el-input>
      </el-form-item>
      <el-form-item label="背景图：" prop="backgroundImage">
        <el-input v-model="qrCodeDetail.backgroundImage"></el-input>
      </el-form-item>
      <el-form-item label="Logo：" prop="logoImage">
        <el-input v-model="qrCodeDetail.logoImage"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="description">
        <el-input
          :autosize="{ minRows: 4}"
          v-model="qrCodeDetail.description"
          type="textarea"
          placeholder="请输入介绍"></el-input>
      </el-form-item>
      <el-form-item label="责任人：" prop="admin">
        <el-input v-model="qrCodeDetail.admin"></el-input>
      </el-form-item>
      <el-form-item label="责任人头像：" prop="adminImage">
        <el-input v-model="qrCodeDetail.adminImage"></el-input>
      </el-form-item>
      <el-form-item label="位置：" prop="position">
        <el-input v-model="qrCodeDetail.position"></el-input>
      </el-form-item>
      <el-form-item label="经度：" prop="longitude">
        <el-input v-model="qrCodeDetail.longitude"></el-input>
      </el-form-item>
      <el-form-item label="纬度：" prop="latitude">
        <el-input v-model="qrCodeDetail.latitude"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('qrCodeForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('qrCodeForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createQrCode,updateQrCode,deleteQrCode,getQrCodeDetail} from '@/api/qrCode'

  const defaultQrCodeDetail= {
    name: '',
    description: '',
    creationTime: '',
    businessContent: '',
    legalPerson: '',
    annualOutputValue: 0,
  };
  export default {
    name: "QrCodeDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        qrCodeDetail: Object.assign({}, defaultQrCodeDetail),
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
        getQrCodeDetail(this.$route.query.id).then(response => {
          this.qrCodeDetail = response.data;
        });
      } else {
        this.qrCodeDetail = Object.assign({}, defaultQrCodeDetail);
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
                updateQrCode(this.$route.query.id, this.qrCodeDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createQrCode(this.qrCodeDetail).then(response => {
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
