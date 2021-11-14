<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="header-alert" @click="handleViewAlertRecord()">
      <svg-icon icon-class="monitor" class="color-main"></svg-icon>
      <span>告警</span>
      <span class="num">{{alarmCount > 99 ? '99+': alarmCount}}</span>
    </div>
    <el-divider class="right-divider" direction="vertical"></el-divider>
    <el-dropdown class="bigscreen-container" trigger="click">
      <div class="bigscreen-wrapper">
        <span>可视化大屏</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="bigscreen-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="handleViewOpeningPage('map')" style="display:block;">基地一张图</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="handleViewOpeningPage('giftedFish')" style="display:block;">天赋渔鲜品牌</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="handleViewOpeningPage('riceTurtl')" style="display:block;">稻鳖共生模式</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-divider class="right-divider2" direction="vertical"></el-divider>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getCount } from "@/api/alarm";


export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userId'
    ])
  },
  data() {
    return {
      alarmCount: 0
    }
  },
  created() {
    this.getAlarmCount();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleViewOpeningPage(bigscreenType) {
      let url = null;
      if (bigscreenType == 'map') {
        url = "/#/opening/bigscreenMap";
      } else if (bigscreenType == 'giftedFish') {
        url = "/#/opening/giftedFish";
      } else if (bigscreenType == 'riceTurtl') {
        url = "/#/opening/riceTurtl";
      }
      if (url) {
        window.open(url, "_blank");
      }
    },
    handleViewAlertRecord() {
      this.$router.push({path: '/iot/monitor'});
    },
    getAlarmCount() {
      console.log(this.userId)
      let params = {'userId': this.userId}
      getCount(params).then((response) => {
        console.log(response)
        if (response.code == 200) {
          this.alarmCount = response.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .header-alert {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 275px;
    color: #606266;
    cursor: pointer;
    font-size: 14px;
    .num {
      position: absolute;
      color: #eee;
      top: 5px;
      right: -20px;
      min-width: 19px;
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      padding: 0px 2px;
      background: rgb(255, 77, 79);
      border-radius: 8px;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(255, 255, 255, 0.5);
      border-image: initial;
    }
  }
  .right-divider {
    position: absolute;
    right: 230px;
    top: 15px;
    height: 25px;
  }
  .right-divider2 {
    position: absolute;
    right: 90px;
    top: 15px;
    height: 25px;
  }
  .bigscreen-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 120px;
    // border-right: 1px solid #ebeef5;
  }
}
</style>

