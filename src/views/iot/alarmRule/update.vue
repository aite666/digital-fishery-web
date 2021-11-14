<template> 
  <alarm-rule-detail :is-edit='true'></alarm-rule-detail>
</template>
<script>
  import AlarmRuleDetail from './components/AlarmRuleDetail'
  export default {
    name: 'updateAlarmRule',
    components: { AlarmRuleDetail }
  }
</script>
<style>
</style>
