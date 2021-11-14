<template>
    <el-card shadow="never">
        <div class="info-panel d-f">
            <div class="left d-f">
              <div class="wapper">
                <div class="top">
                  <block-select class="select-block " @block="getBlock"></block-select>
                </div>
              </div>
            </div>
            <div class="right">
                <ul class="list d-f">
                    <li>
                        <!-- <div class="icon"><i class="el-icon-grape"></i></div> -->
                        <div class="icon"><svg-icon icon-class="monitor" class="color-main"></svg-icon></div>
                        <div class="info">
                            <h3>{{ factorNum }}</h3>
                            <span>监测信息</span>
                        </div>
                    </li>
                    <li>
                        <!-- <div class="icon"><i class="el-icon-refrigerator"></i></div> -->
                        <div class="icon"><svg-icon icon-class="alert" class="color-main"></svg-icon></div>
                        <div class="info">
                            <h3>{{ alertNum }}</h3>
                            <span>警告信息</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
          <span class="content-text">监测数据</span>
          <el-select class="select-monitor-type" v-model="factorSelected" @change="changeFactorType()">
            <el-option
            v-for="item of factorTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-row :gutter="12" style="margin: 20px 0 20px 0">
            <el-col :span="4" v-for="item of factorList" :key="item.factorId">
              <el-card shadow="always" style="margin-bottom:20px;">
                <div class="card-hover">
                  <div class="card-icon"><svg-icon :icon-class="getIcon(item.factorName)" class="color-main"></svg-icon></div>
                  <div class="card-content-item">
                    <strong class="card-num">{{item.value}}</strong>{{item.unit}}
                  </div>
                  <div class="card-content-item">{{item.factorName}} {{item.deviceAddr}}</div>
                  <div class="card-content-item">所在区块：{{item.blockName}}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
    </el-card>
</template>

<script>
  import BlockSelect from './../../info/block/components/BlockSelect';
  import { getDeviceRealtimeList } from '@/api/device';
  import { fetchList } from '@/api/deviceFactor';

  export default {
    name: "display",
    components:{BlockSelect},
    props: {
    },
    data() {
      return {
        activeName: 'first',
        blockSelected: 'all',
        factorSelected: '全部类型',
        factorList: [],
        allFactorList: [],
        factorTypeList: [],
        factorNum: 0,
        alertNum: 0,
        realtimeFactorInfo: null,
        offlineDeviceList: [],
      }
    },
    created() {
      this.getDeviceRealtimeData();
    },
    computed:{
    },
    methods: {
      getBlock(block) {
          if (block) {
            this.blockSelected = block.id;
          } else {
            this.blockSelected = null;
          }
          this.changeFactorType()
      },
      getDeviceRealtimeData() {
        getDeviceRealtimeList().then((response) => {
          console.log(response.data)
          let offlineDeviceList = []
          let realtimeFactorInfo = {}
          for (let item of response.data) {
            let deviceName = item.deviceName
            if (item.deviceStatus == 'offline' || item.dataItem == null) {
              offlineDeviceList.push(deviceName)
            } else {
              for (let subItem of item.dataItem) {
                let nodeId = subItem.nodeId
                for (let subItem2 of subItem.registerItem) {
                  let registerId = subItem2.registerId
                  realtimeFactorInfo[deviceName + '_' + nodeId + '_' + registerId] = subItem2.value
                }
              }
            }
          }
          this.offlineDeviceList = offlineDeviceList
          this.realtimeFactorInfo = realtimeFactorInfo
          this.getFactorList()
        });
      },
      getFactorList() {
        fetchList({pageNum: 1, pageSize: 100000}).then((response) => {
          this.factorList = response.data.list;
          this.factorNum = response.data.total;
          let factorTypeList = [{value: '全部类型', label: '全部类型'}]
          let factorNameList = [];
          for (let item of this.factorList) {
            let factorName = item.factorName.toLocaleUpperCase()
            let factorId = item.factorId
            if (factorNameList.indexOf(factorName) == -1) {
              factorNameList.push(factorName)
              factorTypeList.push({value: item.factorName, label: factorName})
            }
            if (this.offlineDeviceList.indexOf(item.deviceAddr) > -1) {
              item['value'] = '离线'
            } else {
              if (Object.keys(this.realtimeFactorInfo).indexOf(factorId) > -1) {
                item['value'] = this.realtimeFactorInfo[factorId]
              } else {
                item['value'] = '离线'
              }
            }
          }
          // Object.assign(this.allFactorList, this.factorList)
          this.allFactorList = JSON.parse(JSON.stringify(this.factorList));
          this.factorTypeList = factorTypeList;
          this.changeFactorType()
        });
      },
      getIcon(factorName) {
        let icon = 'monitor';
        if (factorName == '溶解氧') {
          icon = '溶解氧';
        } else if (factorName == '水温') {
          icon = '水温计';
        } else if (factorName == 'PH' || factorName == 'ph') {
          icon = 'pH值';
        } else if (factorName == '温度') {
          icon = '温度';
        } else if (factorName == '湿度') {
          icon = '湿度';
        }
        return icon
      },
      changeFactorType() {
        let newFactorList = []
        for (let item of this.allFactorList) { 
          let factorFlag = false
          if (this.factorSelected && this.factorSelected != '全部类型') {
            let factorName = item.factorName.toLocaleUpperCase()
            if (factorName == this.factorSelected) {
              factorFlag = true
            }
          } else {
            factorFlag = true
          }
          let blockFlag = false
          if (this.blockSelected && this.blockSelected != 'all') {
            if (item.blockId == this.blockSelected) {
              blockFlag = true
            }
          } else {
            blockFlag = true
          }
          if (blockFlag && factorFlag) {
            newFactorList.push(item)
          }
        }
        this.factorList = newFactorList
      }
    }
  }
</script>

<style scoped>
.info-panel {
  border-bottom: 1px solid #ebeef5;
}
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
.select-block {
  margin: 0 30px 0 0px;
}
.content-text {
  margin: 0 0 0 10px;
  font-size: 20px;
  font-weight: 500;
}
.select-monitor-type {
  margin: 0 0 0 10px;
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
    margin-top:20px;
}
.card-icon {
  font-size: 22px;
  float: left;
}
.card-num {
  font-size:24px;
  margin-right:5px
}
.card-content-item {
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: 36px;
}
</style>
