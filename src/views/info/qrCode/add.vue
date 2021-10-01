<template> 
  <qr-code-detail :is-edit='false'></qr-code-detail>
</template>
<script>
  import QrCodeDetail from './components/QrCodeDetail'
  export default {
    name: 'addQrCode',
    components: { QrCodeDetail }
  }
</script>
<style>
</style>
