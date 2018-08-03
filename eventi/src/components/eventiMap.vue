<template>
    <div class="map" ref="eventiMap"></div>
</template>

<script>
import { initMap, addMarker } from '@/services/mapService';
export default {
  name: 'eventi-map',
  props: ['location'],
  mounted() {
    let el = this.$refs.eventiMap;
    let { lat, lng } = this.location;
    initMap(lat, lng, el).then(() => {
      addMarker({ lat, lng });
    });
  }
};
</script>

<style>
</style>
