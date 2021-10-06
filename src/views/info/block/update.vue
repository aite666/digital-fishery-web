<template> 
  <block-detail :is-edit='true'></block-detail>
</template>
<script>
  import BlockDetail from './components/BlockDetail'
  export default {
    name: 'updateBlock',
    components: { BlockDetail }
  }
</script>
<style>
</style>
