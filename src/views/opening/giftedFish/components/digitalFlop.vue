<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      :style="{ width: itemWidth }"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width: 100px; height: 50px"
        />
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>
    <dv-decoration-10 />
  </div>
</template>

<script>
export default {
  name: "DigitalFlop",
  props: {
    dataList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      digitalFlopData: [],
      itemWidth: "11%",
    };
  },
  created() {
    console.log(this.dataList);
    const { createData } = this;
    createData();
    setInterval(createData, 20000);
  },
  watch: {
    dataList(val, valOld) {
      this.createData();
    },
  },
  methods: {
    createData() {
      const { randomExtend } = this;
      let colorList = ["#4d99fc", "#f46827", "#40faee"];
      let digitalFlopData = [];
      this.itemWidth =
        parseInt((100 * 2) / 3 / this.dataList.length).toString() + "%";
      for (let i = 0; i < this.dataList.length; i++) {
        let item = this.dataList[i];
        let min = parseInt((item.value * 3) / 4);
        let data = {
          title: item.name,
          number: {
            number: [randomExtend(min, item.value)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: colorList[i % 3],
              fontWeight: "bold",
            },
          },
          unit: "公斤",
        };
        digitalFlopData.push(data);
      }
      this.digitalFlopData = digitalFlopData;
    },
    randomExtend(minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10);
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      }
    },
  },
};
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 15%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    // width: 11%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
