<template>
  <section class="eventi-details card">
      <div class="card-image">
        <figure class="image">
          <span class="eventi-status card-header-title">COMING UP</span>
          <img class="eventi-img" :src="eventi.gallery" alt="eventi image">
        </figure>
      </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="creator image">
          </figure>
        </div>
      <div class="media-content">
        <p class="title is-4">{{eventi.name}}</p>
        <p class="subtitle is-6">{{category}}</p>
      </div>
    </div>
      <div class="content">
        <p class="title is-4"> {{eventi.description}} </p>
        <p class="subtitle is-5"> {{goingUsers}} are coming! </p>
        <br>
        <time datetime="2016-1-5">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" @click.stop class="card-footer-item">Join</a>
      <a href="#" @click.stop class="card-footer-item"><img class="clap-icon" src="../assets/clap.png"/></a>
      <a href="#" @click.stop class="card-footer-item">Distance</a>
    </footer>
  </section>
</template>

<script>
export default {
  name: "eventi-details",
  data() {
    return {
      eventi: {},
      goingUsers: "",
      category: ""
    };
  },
  created() {
    let eventiId = this.$route.params;
    this.$store.dispatch({ type: "getEventiById", eventiId }).then(eventi => {
      this.eventi = eventi;
      this.category = eventi.category.join();
      this.goingUsers = eventi.goingUserId.length;
    });
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.eventi-details {
  box-shadow: 0px 0px 8px black;
  margin: 5px auto;
  max-width: 95vw;
}
.eventi-img {
  max-height: 350px;
}
.card {
  padding: 5px;
}
.eventi-status {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
.clap-icon {
  max-width: 50px;
}
</style>
