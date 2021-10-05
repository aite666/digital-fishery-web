<template> 
  <inspection-detail :is-edit='true'></inspection-detail>
</template>
<script>
  import InspectionDetail from './components/InspectionDetail'
  export default {
    name: 'updateInspection',
    components: { InspectionDetail }
  }
</script>
<style>
</style>
