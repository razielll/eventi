<template>
  <div id="app">
      <navBar />
    <router-view/>
  </div>
</template>



<script>
import navBar from '@/components/navBar';
import geoService from '@/services/geoService';

export default {
  created() {
    this.$store.dispatch({ type: 'initStore' });
  },
  components: {
    navBar
  }
};
</script>
<style lang="scss">
</style>