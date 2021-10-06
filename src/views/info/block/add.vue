<template> 
  <block-detail :is-edit='false'></block-detail>
</template>
<script>
  import BlockDetail from './components/BlockDetail'
  export default {
    name: 'addBlock',
    components: { BlockDetail }
  }
</script>
<style>
</style>
