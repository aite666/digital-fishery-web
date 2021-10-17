<template> 
  <news-detail :is-edit='false'></news-detail>
</template>
<script>
  import NewsDetail from './components/NewsDetail'
  export default {
    name: 'addNews',
    components: { NewsDetail }
  }
</script>
<style>
</style>
