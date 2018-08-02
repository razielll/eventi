<template>
<section class="home container">
    <h1 class="title is-2"> Most popular eventis </h1>
    <eventiList></eventiList>
  </section>
</template>

<script>
import '@/assets/scss/main.scss';
import eventiList from '@/components/eventiList.vue';

export default {
  name: 'eventi-home',
  created() {
    // this.$store.dispatch({ type: 'loadEventi' });
  },
  computed: {},
  components: {
    eventiList
  }
};
</script>
<style scoped>
.home {
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: 100vh;
}
h1.title.is-2 {
  margin-left: 1rem;
  font-family: ubuntu;
  /* margin-bottom: 0; */
}
</style>
