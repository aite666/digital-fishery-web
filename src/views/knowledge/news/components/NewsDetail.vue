<template>
  <el-card class="news-form-container" shadow="never">
    <el-form
      :model="newsDetail"
      :rules="rules"
      ref="newsForm"
      label-width="120px"
    >
      <el-form-item label="标题：" prop="title">
        <el-input v-model="newsDetail.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="richContent">
        <tinymce
          ref="newsTinymce"
          :width="770"
          :height="300"
          v-model="newsDetail.richContent"
        ></tinymce>
      </el-form-item>
      <el-form-item label="图片：" prop="annualOutputValue">
        <single-upload v-model="newsDetail.image"></single-upload>
      </el-form-item>
      <el-form-item label="发布时间：">
        <el-date-picker
          class="input-width"
          v-model="newsDetail.newsTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="date"
          placeholder="请选择时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发布人：" prop="createUser">
        <el-input v-model="newsDetail.createUser"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('newsForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('newsForm')"
          >重置</el-button
        >
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import Tinymce from "@/components/Tinymce";
import SingleUpload from "@/components/Upload/singleUpload";
import {
  fetchList,
  createNews,
  updateNews,
  deleteNews,
  getNewsDetail,
} from "@/api/news";

const defaultNewsDetail = {
  title: null,
  content: null,
  richContent: null,
  image: null,
  newsTime: null,
  createUser: null,
};
export default {
  name: "NewsDetail",
  components: { Tinymce, SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newsDetail: Object.assign({}, defaultNewsDetail),
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 500 个字符",
            trigger: "blur",
          },
        ],
        createUser: [
          { required: true, message: "请输入发布人", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    if (this.isEdit) {
      getNewsDetail(this.$route.query.id).then((response) => {
        this.newsDetail = response.data;
      });
    } else {
      this.newsDetail = Object.assign({}, defaultNewsDetail);
    }
  },
  computed: {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.newsDetail.content = this.$refs.newsTinymce.getContentText();
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              if (this.isEdit) {
                updateNews(this.$route.query.id, this.newsDetail).then(
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
                createNews(this.newsDetail).then((response) => {
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
            })
            .catch(() => {});
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
.news-form-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 1000px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}
</style>


