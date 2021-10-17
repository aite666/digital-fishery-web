<template> 
  <fish-detail :is-edit='false'></fish-detail>
</template>
<script>
  import FishDetail from './components/FishDetail'
  export default {
    name: 'viewFish',
    components: { FishDetail }
  }
</script>
<style>
</style>
