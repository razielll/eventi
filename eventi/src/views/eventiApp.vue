<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1> Your events everywhere! </h1>
    <eventiList></eventiList>
  </div>
</template>

<script>
import eventiList from "../components/eventiList.vue";

export default {
  name: "eventi home page",
  components: {
    eventiList
  }
};
</script>
