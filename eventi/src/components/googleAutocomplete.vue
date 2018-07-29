<template>
    <input ref="autocomplete" 
        placeholder="Search" 
        :value="value"
        type="text" />
</template>

<script>
import { connectGoogleApi } from '../services/mapService';
export default {
  name: 'google-autocomplete',
  props: ['value'],
  mounted() {
    connectGoogleApi().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        { types: ['geocode'] }
      );

      this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace();
        let location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address
        };

        this.$emit('onLocationFound', location);
      });
    });
  }
};
</script>

<style>
</style>