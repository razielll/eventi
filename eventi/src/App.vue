<template>
  <div  class="">
    <flash-msg />
    <navBar/>
    <section class="hero is-fullheight" v-if="$route.name === 'eventi-home'">
      <div class="hero-head">
      </div>
      <div class="hero-body">
        <div class="container banner-title">
          <div class="banner-box box">
            <h1 class="title is-2 is-spaced is-size-3-mobile">
              Events in Your Community
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
          <strong>Eventi</strong> by <a @click.prevent href="#">Anton</a> & <a  @click.prevent href="#">Ariel</a>
        </p>
      </div>
    </footer>
  </div>


</template>



<script>
import navBar from '@/components/navBar';
import geoService from '@/services/geoService';
import eventiFilter from '@/components/eventiFilter';
import flashMsg from '@/components/flashMsg';

export default {
  created() {
    this.$store.dispatch({ type: 'initStore' });
    this.$store.dispatch({ type: 'checkLogin' });
  },
  components: {
    navBar,
    eventiFilter,
    flashMsg
  }
};
</script>
<style scoped lang="scss">
.hero {
  background-image: url(./assets/googPicEvents.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &.is-fullheight {
    min-height: calc(100vh - 65px);
  }
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
  margin-top: 1rem;
  border-top: 1px solid #ddd;
  padding: 1em;
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