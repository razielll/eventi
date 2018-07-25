<template>
<section>
  <navBar/>
    <img src="../assets/logo.png">
    <h1> Your events everywhere! </h1>
    <eventiList></eventiList>
  </section>
</template>

<script>
import eventiList from "@/components/eventiList.vue";
import navBar from "@/components/navBar.vue";

export default {
  name: "eventi-home",
  components: {
    eventiList,
    navBar
  }
};
</script>
