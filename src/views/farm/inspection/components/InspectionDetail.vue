<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="inspectionDetail"
      :rules="rules"
      ref="inspectionForm"
      label-width="150px"
    >
      <el-form-item label="区块名称：" prop="name">
        <block-select
          @block="getBlock"
          :blockSelectedId="inspectionDetail.blockId"
          class="input-width"
        ></block-select>
      </el-form-item>
      <el-form-item label="区试时间：">
        <el-date-picker
          class="input-width"
          v-model="inspectionDetail.inspectionTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择时间"
          align="right"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="品种繁育指标数据：" prop="productData">
        <el-input
          :autosize="{ minRows: 4 }"
          v-model="inspectionDetail.productData"
          type="textarea"
          placeholder="请输入品种繁育指标数据"
        ></el-input>
      </el-form-item>
      <el-form-item label="环境数据：" prop="environmentData">
        <el-input
          :autosize="{ minRows: 4 }"
          v-model="inspectionDetail.environmentData"
          type="textarea"
          placeholder="请输入环境数据"
        ></el-input>
      </el-form-item>
      <el-form-item label="品种性状描述：" prop="characterDescription">
        <el-input
          :autosize="{ minRows: 4 }"
          v-model="inspectionDetail.characterDescription"
          type="textarea"
          placeholder="请输入品种性状描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片：" prop="images">
        <!-- <el-input v-model="inspectionDetail.images"></el-input> -->
        <multi-upload v-model="selectPics"></multi-upload>
      </el-form-item>
      <el-form-item label="区试人员：" prop="createUser">
        <admin-select
          class="input-width"
          @admin="getAdmin"
          :adminSelectedId="inspectionDetail.adminId"
        ></admin-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('inspectionForm')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('inspectionForm')"
          >重置</el-button
        >
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import BlockSelect from "./../../../info/block/components/BlockSelect";
import AdminSelect from "./../../../ums/admin/components/AdminSelect";
import MultiUpload from "@/components/Upload/multiUpload";
import {
  fetchList,
  createInspection,
  updateInspection,
  deleteInspection,
  getInspectionDetail,
} from "@/api/inspection";

const defaultInspectionDetail = {
  blockId: null,
  blockName: "",
  inspectionTime: "",
  productData: "",
  environmentData: "",
  characterDescription: "",
  images: "",
  createUser: null,
  adminId: null,
};
export default {
  name: "InspectionDetail",
  components: { BlockSelect, MultiUpload, AdminSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inspectionDetail: Object.assign({}, defaultInspectionDetail),
      rules: {
        createUser: [
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
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
      getInspectionDetail(this.$route.query.id).then((response) => {
        this.inspectionDetail = response.data;
        console.log(this.inspectionDetail);
      });
    } else {
      this.inspectionDetail = Object.assign({}, defaultInspectionDetail);
    }
  },
  computed: {
    selectPics: {
      get: function () {
        let pics = [];
        if (
          this.inspectionDetail.images === undefined ||
          this.inspectionDetail.images == null ||
          this.inspectionDetail.images === ""
        ) {
          return pics;
        }
        let imageList = this.inspectionDetail.images.split(",");
        for (let i = 0; i < imageList.length; i++) {
          pics.push(imageList[i]);
        }
        return pics;
      },
      set: function (newValue) {
        if (newValue == null || newValue.length === 0) {
          this.inspectionDetail.images = null;
        } else {
          this.inspectionDetail.images = "";
          if (newValue.length > 1) {
            for (let i = 0; i < newValue.length; i++) {
              this.inspectionDetail.images += newValue[i];
              if (i !== newValue.length - 1) {
                this.inspectionDetail.images += ",";
              }
            }
          } else {
            this.inspectionDetail.images = newValue[0];
          }
        }
      },
    },
  },
  methods: {
    getBlock(block) {
      if (block) {
        this.inspectionDetail.blockId = block.id;
        this.inspectionDetail.blockName = block.name;
      } else {
        this.inspectionDetail.blockId = null;
        this.inspectionDetail.blockName = null;
      }
    },
    getAdmin(admin) {
      if (admin) {
        this.inspectionDetail.adminId = admin.id;
        this.inspectionDetail.createUser = admin.nickName;
      } else {
        this.inspectionDetail.adminId = null;
        this.inspectionDetail.createUser = null;
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
              updateInspection(
                this.$route.query.id,
                this.inspectionDetail
              ).then((response) => {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            } else {
              createInspection(this.inspectionDetail).then((response) => {
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
.input-width {
  width: 300px;
}
</style>
