<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="saleDetail" :rules="rules" ref="saleForm" label-width="120px">
      <el-form-item label="区块名称：" prop="blockName">
        <el-input v-model="saleDetail.blockName"></el-input>
      </el-form-item>
      <el-form-item label="养殖品种名称：" prop="productCategoryName">
        <el-input v-model="saleDetail.productCategoryName"></el-input>
      </el-form-item>
      <el-form-item label="销售时间：" prop="saleTime">
        <el-date-picker
            class="input-width"
            v-model="saleDetail.saleTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="请选择时间"
            align="right"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="目的地：" prop="destination">
        <el-input v-model="saleDetail.destination"></el-input>
      </el-form-item>
      <el-form-item label="客户名称：" prop="customer">
        <el-input v-model="saleDetail.customer"></el-input>
      </el-form-item>
      <el-form-item label="客户电话：" prop="customerPhone">
        <el-input v-model="saleDetail.customerPhone"></el-input>
      </el-form-item>
      <el-form-item label="数量：" prop="quantity">
        <el-input-number v-model="saleDetail.quantity"
        :min="0" :max="100000000000000000"></el-input-number>
      </el-form-item>
      <el-form-item label="单价：" prop="unitPrice">
        <el-input-number v-model="saleDetail.unitPrice"
        :min="0" :max="100000000000000000"></el-input-number>
      </el-form-item>
      <el-form-item label="金额：" prop="amount">
        <el-input-number v-model="saleDetail.amount"
        :min="0" :max="100000000000000000"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('saleForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('saleForm')">重置</el-button>
        <el-button @click="back()">返回上一级</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList,createSale,updateSale,deleteSale,getSaleDetail} from '@/api/sale'

  const defaultSaleDetail= {
    blockId: 0,
    blockName: '',
    productCategoryId: 0,
    productCategoryName: '',
    saleTime: '',
    destination: '',
    customer: '',
    customerPhone: '',
    quantity: '',
    unitPrice: '',
    amount: '',
  };
  export default {
    name: "SaleDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        saleDetail: Object.assign({}, defaultSaleDetail),
        rules: {
          name: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
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
        getSaleDetail(this.$route.query.id).then(response => {
          this.saleDetail = response.data;
        });
      } else {
        this.saleDetail = Object.assign({}, defaultSaleDetail);
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
                updateSale(this.$route.query.id, this.saleDetail).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createSale(this.saleDetail).then(response => {
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
