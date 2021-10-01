<template> 
  <qr-code-detail :is-edit='true'></qr-code-detail>
</template>
<script>
  import QrCodeDetail from './components/QrCodeDetail'
  export default {
    name: 'updateQrCode',
    components: { QrCodeDetail }
  }
</script>
<style>
</style>
