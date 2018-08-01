<template>
  <div id="app">
      <navBar />
      <eventiFilter />
    <router-view/>
  </div>
</template>



<script>
import navBar from '@/components/navBar';
import geoService from '@/services/geoService';
import eventiFilter from '@/components/eventiFilter';
export default {
  created() {
    this.$store.dispatch({ type: 'initStore' });
  },
  components: {
    navBar,
    eventiFilter
  }
};
</script>
<style lang="scss">
</style>