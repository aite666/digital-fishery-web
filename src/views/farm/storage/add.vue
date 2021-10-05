<template> 
  <storage-detail :is-edit='false'></storage-detail>
</template>
<script>
  import StorageDetail from './components/StorageDetail'
  export default {
    name: 'addStorage',
    components: { StorageDetail }
  }
</script>
<style>
</style>
