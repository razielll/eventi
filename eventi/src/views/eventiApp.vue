<template>
<section class="home">
    <h1 class="title is-2"> Most popular eventis </h1>
    <eventiList></eventiList>
    <h1 class="title is-2"> Eventis close to you </h1>

  </section>
</template>

<script>
import "@/assets/scss/main.scss";
import eventiList from "@/components/eventiList.vue";

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
<style>
h1.title.is-2 {
  margin-left: 1rem;
  font-family: ubuntu;
  margin-bottom: 0;
}
</style>
