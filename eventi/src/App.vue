<template>
  <div  class="">
    <navBar/>
    <section class="hero is-fullheight" v-if="$route.name === 'eventi-home'">
      <div class="hero-head">
      </div>
      <div class="hero-body">
        <div class="container banner-title">
          <div class="banner-box box">
            <h1 class="title is-2 is-spaced is-size-3-mobile">
              Find & Share Events in Your Community
            </h1>
            <h2 class="subtitle is-4">
              Find Events, Garage Sales, Lectures and more around you
            </h2>
          </div>
        </div>
      </div>
      <div class="hero-foot">
      </div>
    </section>
    <eventiFilter v-if="$route.name === 'eventi-home'"/>
    <router-view></router-view>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Eventi</strong> by <a href="#">Anton</a> & <a href="#">Ariel</a>
        </p>
      </div>
    </footer>
  </div>


</template>



<script>
import navBar from "@/components/navBar";
import geoService from "@/services/geoService";
import eventiFilter from "@/components/eventiFilter";

export default {
  created() {
    this.$store.dispatch({ type: "initStore" });
    this.$store.dispatch({ type: "checkLogin" });
  },
  components: {
    navBar,
    eventiFilter
  }
};
</script>
<style scoped lang="scss">
.hero {
  background-image: url(./assets/banner1_2.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.hero-body {
  flex-direction: column;
}
.banner-title {
  display: flex;
  align-items: flex-start;
}
.banner-box {
  display: block;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
}
.footer {
  margin-top: 2rem;
  border-top: 1px solid #ddd;
}
@media (min-width: 768px) {
  .banner-box {
    width: 60%;
  }
  .banner-title {
    align-items: center;
  }
}
</style>