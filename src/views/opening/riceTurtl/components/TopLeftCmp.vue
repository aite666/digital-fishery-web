<template>
  <div class="top-left-cmp">
    <div class="dc-left">
      <dv-border-box-5>
        <div class="main-value"><span>{{data11}}</span>千斤</div>
        <div class="compare-value"><span>同比</span>{{data11}}%</div>
        <div class="compare-value"><span>环比</span>{{data11}}%</div>
      </dv-border-box-5>
      <div class="dc-text">
        {{title1}}
        <dv-decoration-3 style="width:200px;height:20px;" />
      </div>
    </div>
    <div class="dc-right">
      <div class="dc-text">
        {{title2}}
        <dv-decoration-3 style="width:200px;height:20px;" />
      </div>
      <dv-border-box-5 :reverse="true">
        <div class="main-value"><span>{{data21}}</span>条</div>
        <div class="compare-value"><span>同比</span>{{data22}}%</div>
        <div class="compare-value"><span>环比</span>{{data23}}%</div>
      </dv-border-box-5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopLeftCmp',
  props: {
    title1: {
      type: String,
      default: '',
    },
    data11: {
      type: String,
      default: '',
    },
    data12: {
      type: String,
      default: '',
    },
    data13: {
      type: String,
      default: '',
    },
    title2: {
      type: String,
      default: '',
    },
    data21: {
      type: String,
      default: '',
    },
    data22: {
      type: String,
      default: '',
    },
    data23: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less">
.top-left-cmp {
  display: flex;

  .dc-left, .dc-right {
    width: 50%;
  }

  .dv-border-box-5 {
    height: 60%;
  }

  .dc-text {
    display: flex;
    flex-direction: column;
    height: 40%;
    font-size: 20px;
    padding: 20px;
    box-sizing: border-box;
  }

  .dc-left .dc-text {
    align-items: flex-end;
    justify-content: center;
  }

  .dc-right .dc-text {
    justify-content: flex-start;
    padding-top: 20px;
  }

  .dc-left .dv-border-box-5 {
    padding: 30px;
    box-sizing: border-box;
  }

  .dc-right .dv-border-box-5 {
    padding: 40px;
    padding-left: 75px;
    box-sizing: border-box;
  }

  .main-value {
    font-weight: bold;
    font-size: 18px;

    span {
      font-size: 50px;
      color: #00c0ff;
      margin-right: 15px;
    }
  }

  .compare-value {
    height: 35px;
    line-height: 35px;
    font-size: 18px;

    span {
      margin-right: 30px;
    }
  }
}
</style>
