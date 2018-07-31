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
    // this.$store.dispatch({ type: 'checkLogin' });
    // geoService.getPosition(
    //   position => {
    //     let { latitude: lat, longitude: lng } = position.coords;
    //     this.$store.dispatch({ type: 'setPosition', lat, lng });
    //   },
    //   err => {
    //     console.log('geoLocation err:', err);
    //   }
    // );
  },
  components: {
    navBar
  }
};
</script>
<style lang="scss">
</style>