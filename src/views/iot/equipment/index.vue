<template>
  <el-card shadow="never">
    <div class="d-f">
      <div class="left d-f">
        <div class="wapper">
          <div class="top">
            <block-select @block="getBlock"></block-select>
            <el-button class="add-button" type="primary" @click="handleAddEquipmentCate()"
              >添加设备种类</el-button
            >
          </div>
          <p class="extra-info" v-if="blockSelected">
            区域面积：{{ blockSelected.area }}亩
          </p>
        </div>
      </div>
      <div class="right">
        <ul class="list d-f">
          <li>
            <!-- <div class="icon"><i class="el-icon-grape"></i></div> -->
            <div class="icon"><svg-icon icon-class="total-equipment" class="color-main"></svg-icon></div> 
            <div class="info">
              <h3>{{ totalEquipmentNum }}</h3>
              <span>设备总数</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-refrigerator"></i></div> -->
            <div class="icon"><svg-icon icon-class="online-equipment" class="color-main"></svg-icon></div> 
            <div class="info">
              <h3>{{ onlineEquipmentNum }}</h3>
              <span>在线设备数</span>
            </div>
          </li>
          <li>
            <!-- <div class="icon"><i class="el-icon-s-tools"></i></div> -->
            <div class="icon"><svg-icon icon-class="offline-equipment" class="color-main"></svg-icon></div> 
            <div class="info">
              <h3>{{ offlineEquipmentNum }}</h3>
              <span>离线设备数</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane 
            v-for="item of equipmentCateList"
            :key="item.id"
            :label="item.name" :name="item.name" lazy>
            <device-list
                :blockId="blockSelectedId" :deviceType="activeName">
            </device-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import BlockSelect from "./../../info/block/components/BlockSelect";
import DeviceList from "./components/DeviceList";
import { fetchList } from "@/api/equipmentCate";
import { fetchAllDeviceList } from "@/api/device";


const defaultDevice = {
  id: null,
  code: "",
  blockId: null,
  blockName: null,
  productCategoryId: null,
  productCategoryName: null,
  farmTime: null,
  quantity: 0,
  unitPrice: 0,
  amount: 0,
  status: 1,
};
export default {
  name: "equipment",
  components: {
      BlockSelect,
      DeviceList,
  },
  data() {
    return {
      activeName: "所有设备",
      blockSelected: null,
      blockSelectedId: null,
      dialogVisible: false,
      isEdit: false,
      device: Object.assign({}, defaultDevice),
      equipmentCategoryStats: [],
      totalEquipmentNum: 0,
      onlineEquipmentNum: 0,
      offlineEquipmentNum: 0,
      equipmentCateList: [],
    };
  },
  created() {
      this.getDeviceStats();
      this.getEquipmentCateList();
  },
  filters: {
  },
  computed: {},
  methods: {
    getBlock(block) {
      this.blockSelected = block;
      if (this.blockSelected) {
        this.blockSelectedId = this.blockSelected.id;
      } else {
        this.blockSelectedId = null;
      }
      this.getProductCategoryStats();
    },
    handleAdd() {
      if (this.blockSelected) {
        this.dialogVisible = true;
        this.isEdit = false;
        this.batch = Object.assign({}, defaultBatch);
        this.batch.blockId = this.blockSelected.id;
        this.batch.blockName = this.blockSelected.name;
      } else {
        this.$message({
          type: "warning",
          message: "请先选择区块再添加养殖鱼类!",
        });
      }
    },
    handleAddEquipmentCate() {
      this.$router.push({path: '/info/equipmentCate', query: {showUpperLevel: 1}});
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该养殖批次?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteBatch(params).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.batch = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          updateBatch(this.batch.id, this.batch).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          createBatch(this.batch).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    getDeviceStats() {
        fetchAllDeviceList().then((response) => {
            this.totalEquipmentNum = response.data.total;
            let onlineEquipmentNum = 0;
            let offlineEquipmentNum = 0;
            for (let item of response.data.list) {
                if (item.status == 1) {
                    onlineEquipmentNum += 1;
                } else {
                    offlineEquipmentNum += 1;
                }
            }
            this.onlineEquipmentNum = onlineEquipmentNum;
            this.offlineEquipmentNum = offlineEquipmentNum;
        });
    },
    getEquipmentCateList() {
        fetchList({
            pageNum: 1,
            pageSize: 100000
        }).then((response) => {
            let equipmentCateList = [{
                'id': 0,
                'name': '所有设备'
            }]
            this.equipmentCateList = equipmentCateList.concat(response.data.list);
            // this.equipmentCateList = response.data.list;
      });
    },
  },
};
</script>

<style scoped>
.left {
  /* width: 255px; */
  height: 80px;
  border-right: 1px solid #ebeef5;
  padding-left: 10px;
}
.extra-info {
  margin-top: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #909399;
  line-height: 17px;
}
.add-button {
  margin: 0 30px 0 20px;
}
.d-f {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.left .area-name {
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  padding-left: 40px;
  padding-right: 60px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right .list {
  padding-left: 10px;
}
.right .list li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  padding-left: 50px;
}
.right .list li .icon {
  margin-right: 20px;
  font-size: 34px;
  padding-top: 13px;
}
.right .list li .info {
  color: #171717;
}
.content {
  margin-top: 20px;
}
.form-width {
  width: 300px;
}
</style>
