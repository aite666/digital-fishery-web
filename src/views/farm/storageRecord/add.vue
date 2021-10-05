<template> 
  <storage-record-detail :is-edit='false'></storage-record-detail>
</template>
<script>
  import StorageRecordDetail from './components/StorageRecordDetail'
  export default {
    name: 'addStorageRecord',
    components: { StorageRecordDetail }
  }
</script>
<style>
</style>
