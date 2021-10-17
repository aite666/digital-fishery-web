<template> 
  <news-detail :is-edit='true'></news-detail>
</template>
<script>
  import NewsDetail from './components/NewsDetail'
  export default {
    name: 'updateNews',
    components: { NewsDetail }
  }
</script>
<style>
</style>
