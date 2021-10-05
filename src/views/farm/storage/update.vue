<template> 
  <storage-detail :is-edit='true'></storage-detail>
</template>
<script>
  import StorageDetail from './components/StorageDetail'
  export default {
    name: 'updateStorage',
    components: { StorageDetail }
  }
</script>
<style>
</style>
