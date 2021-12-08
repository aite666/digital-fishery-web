<template>
  <div>
    <dv-decoration-10 />
    <dv-border-Box-7 :color="borderColor" id="center-bottom">
      <el-carousel :interval="8000" type="card" height="200px">
        <el-carousel-item v-for="image of imageList" :key="image">
          <img :src="image" class="image">
        </el-carousel-item>
      </el-carousel>
    </dv-border-Box-7>
  </div>
</template>

<script>
export default {
  name: "CenterBottom",
  props: {
    images: {
      type: String,
      default: null,
    },
  },
  watch: {
    images(val, valOld) {
      if (val != null) {
        this.imageList = val.split(",");
      }
    }
  },
  data() {
    return {
      borderColor: ["rgba(1, 153, 209, 0.5)", "rgba(1, 153, 209, 0.5)"],
      imageList: []
    };
  },
  methods: {
  },
  created() {
    console.log(this.images)
    if (this.images) {
      this.imageList = this.images.split(",");
    }
  },
};
</script>

<style lang="less">
.dv-decoration-10 {
  width: 100%;
  height: 5px;
}
#center-bottom {
  width: 100%;
  height: 100%;
  margin-top: 2px;
  background-color: rgba(6, 30, 93, 0.5);
  box-sizing: border-box;
  padding: 10px;
  
  .image {
      width: 400px;
      height: 200px;
  }
  .el-carousel__item.is-active{
      border: 2px solid rgba(1, 153, 209, 1);
  }
}
</style>