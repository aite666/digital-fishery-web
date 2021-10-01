<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="equipmentCategoryDetail" :rules="rules" ref="equipmentCategoryForm" label-width="120px">
      <el-form-item label="设备种类名称：" prop="name">
        <el-input v-model="equipmentCategoryDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          :autosize="{ minRows: 4}"
          v-model="equipmentCategoryDetail.description"
          type="textarea"
          placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="equipmentCategoryDetail.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('equipmentCategoryForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('equipmentCategoryForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createEquipmentCategory,updateEquipmentCategory,deleteEquipmentCategory,getEquipmentCategoryDetail} from '@/api/equipmentCate'

  const defaultEquipmentCategoryDetail= {
    name: '',
    description: '',
    sort: 0,
  };
  export default {
    name: "EquipmentCateDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        equipmentCategoryDetail: Object.assign({}, defaultEquipmentCategoryDetail),
        rules: {
          name: [
            {required: true, message: '请输入设备种类名称', trigger: 'blur'},
            {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
          ],
          description: [
            {min: 2, max: 500, message: '长度在 2 到 1000 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      if (this.isEdit) {
        getEquipmentCategoryDetail(this.$route.query.id).then(response => {
          this.equipmentCategoryDetail = response.data;
        });
      } else {
        this.equipmentCategoryDetail = Object.assign({}, defaultEquipmentCategoryDetail);
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
                updateEquipmentCategory(this.$route.query.id, this.equipmentCategoryDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createEquipmentCategory(this.equipmentCategoryDetail).then(response => {
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
