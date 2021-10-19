<template>
  <div class="form-container" shadow="never">
    <div>
      总共步骤数：
      <el-input-number
        class="step-num-input"
        v-model="stepNum"
        @change="changeStepNum()"
        :min="0"
        :max="100000000000000000"
      ></el-input-number>
    </div>
    <div class="step-form">
      <el-steps direction="vertical" :active="1000">
        <el-step
          :title="'步骤' + item.step"
          v-for="item in list"
          :key="item.step"
        >
          <template slot="description">
            <el-form ref="form" label-width="100px">
              <el-form-item label="天数：">
                <el-input-number
                  class="input-width"
                  v-model="item.stepDay"
                  :min="0"
                  :max="100000000000000000"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="建议标题：">
                <el-input
                  class="input-width"
                  v-model="item.stepTitle"
                ></el-input>
              </el-form-item>
              <el-form-item label="建议内容：">
                <el-input
                  class="input-width"
                  :autosize="{ minRows: 2 }"
                  v-model="item.stepContent"
                  type="textarea"
                  placeholder="请输入建议内容"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-step>
      </el-steps>
    </div>
    <div class="step-form-button">
      <el-button type="primary" @click="onSubmit()">提交</el-button>
      <el-button @click="back()">返回上一级</el-button>
    </div>
  </div>
</template>
<script>
import { fetchList, updateAdviceDetailBatch } from "@/api/adviceDetail";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  adviceId: null,
};
const defaultAdviceDetail = {
  adviceId: null,
  step: null,
  stepDay: null,
  stepTitle: null,
  stepContent: null,
};
export default {
  name: "AdviceDetail",
  components: {},
  props: {},
  data() {
    return {
      adviceId: null,
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      stepNum: 0,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.adviceId = this.$route.query.id;
      this.listQuery.adviceId = this.$route.query.id;
      this.getList();
    }
  },
  computed: {},
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.stepNum = response.data.total;
      });
    },
    changeStepNum() {
      if (this.stepNum < this.list.length) {
        this.list = this.list.slice(0, this.stepNum);
      } else if (this.stepNum > this.list.length) {
        let diff = this.stepNum - this.list.length;
        let oldLength = this.list.length;
        for (let i = 0; i < diff; i++) {
          let adviceDetail = Object.assign({}, defaultAdviceDetail);
          adviceDetail.adviceId = this.adviceId;
          adviceDetail.step = oldLength + i + 1;
          this.list.push(adviceDetail);
        }
      }
    },
    onSubmit() {
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateAdviceDetailBatch(this.adviceId, this.list).then((response) => {
          this.$message({
            message: "修改具体步骤成功",
            type: "success",
            duration: 1000,
          });
          this.$router.back();
        });
      });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.step-form {
  height: 600px;
  overflow-y: auto;
}
.step-num-input {
  margin-bottom: 10px;
}
.input-width {
  width: 500px;
}
.el-form-item {
  margin-bottom: 10px;
}
.step-form-button {
  display: flex;
  justify-content: center; /*水平居中*/
  width: 100%;
  padding-top: 10px;
}
</style>