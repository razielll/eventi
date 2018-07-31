<template>
    <section class="eventi-list flex wrap">
        <eventiPreview v-for="eventi in eventisToShow" :key="eventi._id" :eventi="eventi"/>
    </section> 
</template>

<script>
import eventiPreview from "./eventiPreview";
export default {
  name: "eventi-list",
  methods: {},
  computed: {
    eventisToShow() {
      return this.$store.getters.eventisToShow;
    }
  },
  components: {
    eventiPreview
  }
};
</script>

<style>
</style>
