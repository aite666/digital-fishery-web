<template> 
  <storage-use-detail :is-edit='false'></storage-use-detail>
</template>
<script>
  import StorageUseDetail from './components/StorageUseDetail'
  export default {
    name: 'addStorageUse',
    components: { StorageUseDetail }
  }
</script>
<style>
</style>
