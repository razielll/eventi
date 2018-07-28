<template>
    <section class="eventi-preview-wrapper marginhalf" @click="eventiDetails(eventi)">
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
          <span class="eventi-status card-header-title">COMING UP</span>
          <img :src="eventi.gallery" alt="eventi image">
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
          <p class="subtitle is-6">{{eventi.category.join()}}</p>
        </div>
      </div>

      <div class="content">
        <p class="title is-4"> {{shortDescription}} </p>
          <p class="subtitle is-5"> {{goingUsers}} are coming! </p>
          <br>
        <time datetime="2016-1-5">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
    <footer class="card-footer">
      <eventiClap @clap-click="onClapClick" :clap-count="eventi.clapsCount" class="card-footer-item"/>
      <a href="#" @click.stop class="card-footer-item">Join</a>
      <!-- <a href="#" @click.stop class="card-footer-item">clap</a> -->
      <a href="#" @click.stop class="card-footer-item">Distance</a>
    </footer>
  </div>
    </section>
    
</template>

<script>
import eventiClap from '@/components/eventiClap.vue';
import '@/assets/scss/main.scss';
export default {
  props: ['eventi'],
  computed: {
    goingUsers() {
      return this.eventi.goingUserId.length;
    },
    shortDescription() {
      console.log('this eventi desc', this.eventi.description);
      let shortDesc = this.eventi.description;
      this.eventi.description.length > 40
        ? (shortDesc = shortDesc.slice(0, 40) + '...')
        : (shortDesc = shortDesc);
      return shortDesc;
    }
  },
  methods: {
    eventiDetails(eventi) {
      console.log('got eventi id', eventi._id);
      this.$router.push(`/${eventi._id}`);
    },
    onClapClick() {
      this.$store.dispatch({ type: 'incEventiClap', _id: this.eventi._id });
    }
  },
  components: {
    eventiClap
  }
};
</script>

<style scoped lang="scss">
.eventi-preview-wrapper {
  box-shadow: 0px 0px 8px black;
  max-width: 350px;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  .card-footer-item {
    font-weight: bold;
    transition: all ease-in 0.3s;
  }
  .card-footer-item:hover {
    color: #41b883;
    transform: scale(1.2);
  }
}
.eventi-status {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
