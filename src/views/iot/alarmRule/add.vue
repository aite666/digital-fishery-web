<template> 
  <alarm-rule-detail :is-edit='false'></alarm-rule-detail>
</template>
<script>
  import AlarmRuleDetail from './components/AlarmRuleDetail'
  export default {
    name: 'addAlarmRule',
    components: { AlarmRuleDetail }
  }
</script>
<style>
</style>
