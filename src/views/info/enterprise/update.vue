<template> 
  <enterprise-detail :is-edit='true'></enterprise-detail>
</template>
<script>
  import EnterpriseDetail from './components/EnterpriseDetail'
  export default {
    name: 'updateEnterprise',
    components: { EnterpriseDetail }
  }
</script>
<style>
</style>
