<template> 
  <enterprise-detail :is-edit='false'></enterprise-detail>
</template>
<script>
  import EnterpriseDetail from './components/EnterpriseDetail'
  export default {
    name: 'addEnterprise',
    components: { EnterpriseDetail }
  }
</script>
<style>
</style>
