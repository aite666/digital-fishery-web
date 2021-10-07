<template> 
  <storage-record-detail :is-edit='true'></storage-record-detail>
</template>
<script>
  import StorageRecordDetail from './components/StorageRecordDetail'
  export default {
    name: 'updateStorageRecord',
    components: { StorageRecordDetail }
  }
</script>
<style>
</style>
