<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="blockDetail"
      :rules="rules"
      ref="blockForm"
      label-width="120px"
    >
      <el-form-item label="区块名称：" prop="name">
        <el-input v-model="blockDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="公司：" prop="enterprise">
        <enterprise-select
            @enterprise="getEnterprise"
            :enterpriseSelectedId="blockDetail.enterpriseId"
        ></enterprise-select>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          :autosize="{ minRows: 6 }"
          v-model="blockDetail.description"
          type="textarea"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="面积：" prop="area">
        <el-input-number
          disabled
          v-model="blockDetail.area"
          :min="0"
          :max="100000000000000000"
        ></el-input-number>
        亩
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('blockForm')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('blockForm')"
          >重置</el-button
        >
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  fetchList,
  createBlock,
  updateBlock,
  deleteBlock,
  getBlockDetail,
} from "@/api/block";
import EnterpriseSelect from "./../../enterprise/components/EnterpriseSelect";

const defaultBlockDetail = {
  name: "",
  description: "",
  enterpriseId: null,
  area: 0,
};
export default {
  name: "BlockDetail",
  components: { EnterpriseSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      blockDetail: Object.assign({}, defaultBlockDetail),
      rules: {
        name: [
          { required: true, message: "请输入区块名称", trigger: "blur" },
          {
            min: 2,
            max: 255,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
        description: [
          {
            min: 2,
            max: 1000,
            message: "长度在 2 到 1000 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (this.isEdit) {
      getBlockDetail(this.$route.query.id).then((response) => {
        this.blockDetail = response.data;
      });
    } else {
      this.blockDetail = Object.assign({}, defaultBlockDetail);
    }
  },
  computed: {},
  methods: {
    getEnterprise(enterprise) {
      if (enterprise) {
        this.blockDetail.enterpriseId = enterprise.id;
      } else {
        this.blockDetail.enterpriseId = null;
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
              updateBlock(this.$route.query.id, this.blockDetail).then(
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
              createBlock(this.blockDetail).then((response) => {
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
</style>
