<template>
  <div id="app">
      <navBar />
    <router-view/>
  </div>
</template>



<script>
import navBar from '@/components/navBar';
// import {USER_KEY} from '@/service'
export default {
  created() {
    this.$store.dispatch({ type: 'checkLogin' });
  },
  components: {
    navBar
  }
};
</script>
<style lang="scss">
</style>