<template>
    <section class="">
        <transition-group
          class="eventi-list"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          tag="div">
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

<style scoped>
.eventi-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width: 100%;
  gap: 20px;
}
</style>
