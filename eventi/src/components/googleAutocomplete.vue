<template>
    <input ref="autocomplete" 
        placeholder="Search" 
        class="search-location"
        onfocus="value = ''" 
        type="text" />
</template>

<script>
export default {
    name: 'google-autocomplete',
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    );

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      let lat = place.geometry.location.lat();
      let lon = place.geometry.location.lng();
      let city = ac[0]["short_name"];

      console.log(`The user picked ${city} with the coordinates ${lat}, ${lon}`);
    });
  }
}
</script>

<style>

</style>