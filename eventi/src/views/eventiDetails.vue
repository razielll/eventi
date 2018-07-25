<template>
    <section>
        {{toy}}
    </section>
</template>

<script>
export default {
  name: "eventi-details",
  data() {
    return {
      toy: {}
    };
  },
  created() {
    let eventiId = this.$route.params;
    this.$store.dispatch({ type: "getEventiById", eventiId }).then(eventi => {
      console.log("returned to details", eventi);
      this.toy = eventi;
    });
  }
};
</script>

<style>
</style>
