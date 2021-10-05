<template> 
  <sale-detail :is-edit='true'></sale-detail>
</template>
<script>
  import SaleDetail from './components/SaleDetail'
  export default {
    name: 'updateSale',
    components: { SaleDetail }
  }
</script>
<style>
</style>
