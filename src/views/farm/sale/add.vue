<template> 
  <sale-detail :is-edit='false'></sale-detail>
</template>
<script>
  import SaleDetail from './components/SaleDetail'
  export default {
    name: 'addSale',
    components: { SaleDetail }
  }
</script>
<style>
</style>
