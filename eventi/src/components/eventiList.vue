<template>
    <section class="eventi-list flex wrap">
        <transition-group
          class="eventi-list flex wrap"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <eventiPreview v-for="eventi in eventisToShow" :key="eventi._id" :eventi="eventi"/>
        </transition-group>
    </section> 
</template>

<script>
import eventiPreview from './eventiPreview';
export default {
  name: 'eventi-list',
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
