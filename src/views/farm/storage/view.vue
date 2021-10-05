<template> 
  <storage-view :is-edit='true'></storage-view>
</template>
<script>
  import StorageView from './components/StorageView'
  export default {
    name: 'viewStorage',
    components: { StorageView }
  }
</script>
<style>
</style>
