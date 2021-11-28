<template>
   
  <div>
    <el-input
      v-model="listQuery.deviceName"
      class="input-width"
      placeholder="设备名称"
    ></el-input>
    <el-button type="primary" @click="handleSearchList()"> 查询搜索 </el-button>
    <el-button
      v-if="deviceType == '所有设备' || (deviceType == '采集设备' && !onlyView)"
      type="primary"
      style="float: right"
      @click="handleRefresh()"
      >刷新
    </el-button>
    <el-button
      v-if="deviceType == '所有设备' || (deviceType != '采集设备' && !onlyView)"
      type="primary"
      style="float: right"
      @click="handleAddDevice()"
      >新增设备
    </el-button>
    <div class="table-container">
      <el-table
        ref="deviceTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="设备名称" align="center">
          <template slot-scope="scope">{{ scope.row.deviceName }}</template>
        </el-table-column>
        <el-table-column label="设备地址码" align="center">
          <template slot-scope="scope">{{ scope.row.deviceAddr }}</template>
        </el-table-column>
        <el-table-column
          label="设备类型"
          align="center"
          v-if="deviceType == '所有设备'"
        >
          <template slot-scope="scope">{{ scope.row.deviceType }}</template>
        </el-table-column>
        <el-table-column
          label="报警数据"
          align="center"
          v-if="deviceType == '采集设备'"
        >
          <template slot-scope="scope">{{
            scope.row.alarmRecord | formatAlarmRecord
          }}</template>
        </el-table-column>
        <el-table-column
          label="报警类型"
          align="center"
          v-if="deviceType == '采集设备'"
        >
          <template slot-scope="scope">{{
            scope.row.alarmSwitch | formatAlarmSwitch
          }}</template>
        </el-table-column>
        <el-table-column
          label="标记位置"
          align="center"
          v-if="deviceType == '采集设备'"
        >
          <template slot-scope="scope">{{
            scope.row.useMarkLocation | formatUseMarkLocation
          }}</template>
        </el-table-column>
        <el-table-column
          label="离线判断间隔"
          align="center"
          v-if="deviceType == '采集设备'"
        >
          <template slot-scope="scope"
            >{{ scope.row.offlineinterval }}分钟</template
          >
        </el-table-column>
        <el-table-column
          label="保存数据间隔"
          align="center"
          v-if="deviceType == '采集设备'"
        >
          <template slot-scope="scope"
            >{{ scope.row.savedatainterval }}分钟</template
          >
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{
            scope.row.status | formatStatus
          }}</template>
        </el-table-column>
        <el-table-column label="所在区块" align="center">
          <template slot-scope="scope">{{ scope.row.blockName }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          align="center"
          v-if="!onlyView"
        >
          <template slot-scope="scope">
            <p
              style="margin-bottom: 4px; margin-top: 4px"
              v-if="scope.row.deviceType == '采集设备'"
            >
              <el-button
                size="mini"
                type="primary"
                @click="handleUpdateDevice(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                @click="handleViewFactor(scope.$index, scope.row)"
                >因子信息
              </el-button>
              <el-button
                size="mini"
                @click="handleViewRelay(scope.$index, scope.row)"
                >继电器信息
              </el-button>
            </p>
            <p
              style="margin-bottom: 4px; margin-top: 4px"
              v-if="scope.row.deviceType != '采集设备'"
            >
              <el-button
                size="mini"
                type="primary"
                @click="handleUpdateDevice(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteDevice(scope.$index, scope.row)"
                >删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit ? '编辑设备信息' : '新增设备信息'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="deviceInfo"
        ref="bindBlockForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="设备名称：">
          <el-input v-model="deviceInfo.deviceName" class="input-width">
          </el-input>
        </el-form-item>
        <el-form-item label="设备地址码：">
          <el-input
            v-model="deviceInfo.deviceAddr"
            class="input-width"
            :disabled="deviceInfo.deviceType == '采集设备'"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="设备类型："
          v-if="deviceInfo.deviceType != '采集设备'"
        >
          <equipment-cate-select
            @equipment-cate="getEquipmentCate"
            class="input-width"
            :checkDeviceFlag="checkDeviceFlag"
            :equipmentCateSelectedName="deviceInfo.deviceType"
          >
          </equipment-cate-select>
        </el-form-item>
        <el-form-item label="区块名称：">
          <block-select
            @block="getBlock"
            class="input-width"
            :blockSelectedId="deviceInfo.blockId"
          >
          </block-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  updateDevice,
  createDevice,
  refeashDevice,
} from "@/api/device";
import { formatDate } from "@/utils/date";
import BlockSelect from "./../../../info/block/components/BlockSelect";
import EquipmentCateSelect from "./../../../info/equipmentCate/components/EquipmentCateSelect";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  deviceName: null,
  deviceAddr: null,
  deviceType: null,
  blockId: null,
};
export default {
  name: "DeviceList",
  components: { BlockSelect, EquipmentCateSelect },
  props: {
    blockId: {
      type: Number,
      default: null,
    },
    deviceType: {
      type: String,
      default: null,
    },
    onlyView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      dialogVisible: false,
      isEdit: false,
      checkDeviceFlag: false,
      deviceInfo: {
        id: null,
        deviceName: null,
        deviceAddr: null,
        blockId: null,
      },
    };
  },
  created() {
    this.getList();
  },
  watch: {
    blockId(val, valOld) {
      this.blockId = val;
      this.getList();
    },
  },
  filters: {
    formatAlarmRecord(value) {
      if (value == 1) {
        return "开";
      } else {
        return "关";
      }
    },
    formatAlarmSwitch(value) {
      if (value == 1) {
        return "离线报警";
      } else if (value == 2) {
        return "超限报警";
      } else if (value == 3) {
        return "离线报警、超限报警";
      }
    },
    formatUseMarkLocation(value) {
      if (value == 1) {
        return "开启";
      } else {
        return "关闭";
      }
    },
    formatStatus(value) {
      if (value == 1) {
        return "在线";
      } else {
        return "离线";
      }
    },
  },
  methods: {
    getBlock(block) {
      if (block) {
        this.deviceInfo.blockId = block.id;
      } else {
        this.deviceInfo.blockId = null;
      }
    },
    getEquipmentCate(equipmentCate) {
      if (equipmentCate) {
        this.deviceInfo.deviceType = equipmentCate.name;
      } else {
        this.deviceInfo.deviceType = null;
      }
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      if (this.deviceType == "所有设备") {
        this.listQuery.deviceType = null;
      } else {
        this.listQuery.deviceType = this.deviceType;
      }
      this.listQuery.blockId = this.blockId;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleUpdateDevice(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.deviceInfo = {
        id: row.id,
        deviceName: row.deviceName,
        deviceAddr: row.deviceAddr,
        deviceType: row.deviceType,
        blockId: row.blockId,
      };
    },
    handleViewFactor(index, row) {
      this.$router.push({
        path: "/iot/deviceFactor",
        query: { deviceAddr: row.deviceAddr },
      });
    },
    handleViewRelay(index, row) {
      this.$router.push({
        path: "/iot/deviceRelay",
        query: { deviceAddr: row.deviceAddr },
      });
    },
    // handleUpdateDevice(index, row) {
    //   this.$emit("update-batch", index, row);
    // },
    handleDeleteDevice(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteDevice(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
          this.$emit("getAllList");
        });
      });
    },
    handleAddDevice() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.deviceInfo = {
        deviceName: null,
        deviceAddr: null,
        deviceType: null,
        blockId: null,
      };
    },
    handleRefresh() {
      this.$confirm("是否要进行刷新操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        refeashDevice().then((response) => {
          this.$message({
            message: "刷新成功",
            type: "success",
            duration: 2000,
          });
          this.getList();
          this.$emit("getAllList");
        });
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
    commitSuccess() {
      this.dialogVisible = false;
      this.$emit("getAllList");
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          updateDevice(this.deviceInfo.id, this.deviceInfo).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
            this.$emit("getAllList");
          });
        } else {
          createDevice(this.deviceInfo).then((response) => {
            this.$message({
              message: "新增成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
            this.$emit("getAllList");
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 300px;
}
.color-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 8px;
  margin-right: 6px;
}
</style>