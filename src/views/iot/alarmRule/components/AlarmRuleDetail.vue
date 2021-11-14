<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="alarmRuleDetail"
      :rules="rules"
      ref="alarmRuleForm"
      label-width="120px"
    >
      <el-form-item label="因子名称：" prop="factorName">
        <el-select class="form-width" v-model="alarmRuleDetail.factorName">
          <el-option
            v-for="item of factorTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作符：" prop="operator">
        <el-select v-model="alarmRuleDetail.operator" class="form-width">
          <el-option
            v-for="item in operatorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阈值：" prop="threshold">
        <el-input-number
          class="form-width"
          v-model="alarmRuleDetail.threshold"
          :min="0"
          :max="100000000000000000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="所在区块：">
        <block-select
          class="form-width"
          @block="getBlock"
          :blockSelectedId="blockSelectedId"
        ></block-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('alarmRuleForm')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('alarmRuleForm')"
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
  createAlarmRule,
  updateAlarmRule,
  deleteAlarmRule,
  getAlarmRuleDetail,
} from "@/api/alarmRule";
import { fetchDeviceFactorList } from "@/api/deviceFactor";
import BlockSelect from "./../../../info/block/components/BlockSelect";

const defaultAlarmRuleDetail = {
  factorName: null,
  operator: null,
  threshold: null,
  blockId: null,
};
export default {
  name: "AlarmRuleDetail",
  components: { BlockSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      alarmRuleDetail: Object.assign({}, defaultAlarmRuleDetail),
      blockSelectedId: null,
      factorTypeOptions: [],
      operatorOptions: [
        { value: "等于", label: "等于" },
        { value: "大于", label: "大于" },
        { value: "小于", label: "小于" },
        { value: "不等于", label: "不等于" },
        { value: "大于等于", label: "大于等于" },
        { value: "小于等于", label: "小于等于" },
      ],
      rules: {
        factorName: [
          { required: true, message: "请输入因子名称", trigger: "blur" },
        ],
        operator: [
          { required: true, message: "请输入操作符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getFactorTypeList();
    if (this.isEdit) {
      getAlarmRuleDetail(this.$route.query.id).then((response) => {
        this.alarmRuleDetail = response.data;
      });
    } else {
      this.alarmRuleDetail = Object.assign({}, defaultAlarmRuleDetail);
    }
  },
  computed: {},
  methods: {
    getBlock(block) {
      if (block) {
        this.blockSelectedId = block.id;
      } else {
        this.blockSelectedId = null;
      }
    },
    getFactorTypeList() {
      fetchDeviceFactorList({ pageNum: 1, pageSize: 100000 }).then(
        (response) => {
          let factorTypeOptions = [];
          let factorNameList = [];
          for (let item of response.data.list) {
            let factorName = item.factorName.toLocaleUpperCase();
            if (factorNameList.indexOf(factorName) == -1) {
              factorNameList.push(factorName);
              factorTypeOptions.push({
                value: item.factorName,
                label: factorName,
              });
            }
          }
          this.factorTypeOptions = factorTypeOptions;
        }
      );
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.alarmRuleDetail.blockId = this.blockSelectedId
            if (this.isEdit) {
              updateAlarmRule(this.$route.query.id, this.alarmRuleDetail).then(
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
              createAlarmRule(this.alarmRuleDetail).then((response) => {
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
      this.blockSelectedId = null;
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.form-width {
  width: 300px;
}
</style>
