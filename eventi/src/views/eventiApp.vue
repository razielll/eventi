<template>
<section>
    <h1> Your events everywhere! </h1>
    <eventiList></eventiList>
  </section>
</template>

<script>
import eventiList from "@/components/eventiList.vue";
import navBar from "@/components/navBar.vue";

export default {
  name: "eventi-home",
  created() {
    this.$store.dispatch({ type: "loadEventi" });
  },
  computed: {},
  components: {
    eventiList,
    navBar
  }
};
</script>
