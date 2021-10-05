<template> 
  <inspection-detail :is-edit='false'></inspection-detail>
</template>
<script>
  import InspectionDetail from './components/InspectionDetail'
  export default {
    name: 'addInspection',
    components: { InspectionDetail }
  }
</script>
<style>
</style>
