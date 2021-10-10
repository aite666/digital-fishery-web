<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="adviceDetail" :rules="rules" ref="adviceForm" label-width="120px">
      <el-form-item label="建议名称：" prop="name">
        <el-input v-model="adviceDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="区块名称：" prop="blockName">
        <block-select @block="getBlock" :blockSelectedId="adviceDetail.blockId"></block-select>
      </el-form-item>
      <el-form-item label="养殖种类名称：" prop="productCategoryName">
        <fish-cate-select @fish-cate="getFishCate"></fish-cate-select>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          :autosize="{ minRows: 4}"
          v-model="adviceDetail.description"
          type="textarea"
          placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('adviceForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('adviceForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import BlockSelect from './../../../info/block/components/BlockSelect';
  import FishCateSelect from './../../../info/productCate/components/FishCateSelect';
  import {fetchList,createAdvice,updateAdvice,deleteAdvice,getAdviceDetail} from '@/api/advice'

  const defaultAdviceDetail= {
    name: '',
    blockId: '',
    blockName: '',
    productCategoryId: '',
    productCategoryName: '',
    description: '',
  };
  export default {
    name: "AdviceDetail",
    components:{BlockSelect,FishCateSelect},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        adviceDetail: Object.assign({}, defaultAdviceDetail),
        rules: {
          name: [
            {required: true, message: '请输入建议名称', trigger: 'blur'},
            {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
          ],
          description: [
            {min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      if (this.isEdit) {
        getAdviceDetail(this.$route.query.id).then(response => {
          this.adviceDetail = response.data;
        });
      } else {
        this.adviceDetail = Object.assign({}, defaultAdviceDetail);
      }
    },
    computed:{
    },
    methods: {
      getBlock(block) {
          if (block) {
            this.adviceDetail.blockId = block.id;
            this.adviceDetail.blockName = block.name;
          } else {
            this.adviceDetail.blockId = null;
            this.adviceDetail.blockName = null;
          }
      },
      getFishCate(fishCate) {
        if (fishCate) {
          this.adviceDetail.productCategoryId = fishCate.id;
          this.adviceDetail.productCategoryName = fishCate.id;
        } else {
          this.adviceDetail.productCategoryId = null;
          this.adviceDetail.productCategoryName = null;
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
                updateAdvice(this.$route.query.id, this.adviceDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createAdvice(this.adviceDetail).then(response => {
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
