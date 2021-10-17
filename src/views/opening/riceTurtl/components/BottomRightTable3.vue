<template>
  <div class="bottom-right-table-3">
    <dv-border-box-6>
      <div class="table-name">
        <img src="../../../../assets/images/datav_icon3.png" />批次列表
      </div>

      <dv-scroll-board :config="config" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable3',
  data () {
    return {
      config: {
        data: [
          ['甲鱼A', '批次号：202110010700000'],
          ['甲鱼A', '批次号：202110010800000'],
          ['甲鱼A', '批次号：202110010900000'],
          ['甲鱼B', '批次号：202110011000000'],
          ['甲鱼B', '批次号：202110011100000'],
          ['甲鱼B', '批次号：202110011200000']
        ],
        index: true,
        columnWidth: [30, 60],
        align: ['center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<style lang="less">
.bottom-right-table-3 {
  width: calc(~"25% + 10px");
  height: 100%;
  margin: 0 -5px;

  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }

  .table-name {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }

  .dv-scroll-board {
    height: calc(~"100% - 60px");
  }
}
</style>
