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
        <p class="subtitle is-6 tags">
            <span class="tag has-text-white" :class="eventi.category">{{eventi.category}}</span>
        </p>
      </div>
    </div>
      <div class="content">
        <p class="title is-4"> {{eventi.description}} </p>
         <div class="side-info">
        <p class="subtitle is-5"> {{goingUsers}} are coming! </p>
            <a class="button"> map </a>
        </div>
              <p class="hype"> {{eventi.clapsCount}}<img class="clap-icon" src="../assets/clap.png"/></p>
        <!-- <time datetime="2016-1-5">11:09 PM - 1 Jan 2016</time> -->
      </div>
	  <chat-cmp :eventiMessages="eventi.messages" @save-message="saveMessage"/>
    </div>
    <footer class="card-footer">
      <a href="#" @click.stop class="card-footer-item"><img class="clap-icon" src="../assets/clap.png"/></a>
      <a href="#" @click.stop class="card-footer-item">Join</a>
      <a href="#" @click.stop class="card-footer-item">
        <span class="icon is-medium">
          <font-awesome-icon icon="location-arrow" size="2x"/>
        </span>
        <span>{{distance}}<span class="is-size-7">Km</span></span>
      </a>
    </footer>
  </section>
</template>

<script>
import chatCmp from "@/components/eventiFeed";
import geoService from '@/services/geoService';

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
    let { eventiId } = this.$route.params;
    this.$store.dispatch({ type: "getEventiById", eventiId }).then(eventi => {
      this.eventi = eventi;
      this.goingUsers = eventi.goingUserId.length;
    });
  },
  methods: {
    saveMessage(msg) {
      console.log("got emit!", msg);
      let _id = this.eventi._id;
      this.$store.dispatch({ type: "saveMessage", msg, _id });
    }
  },
  computed: {
    distance() {
      let { lat, lng } = this.$store.getters.getPosition;
      let [eventiLng, eventiLat] = this.eventi.location.coordinates;
      return geoService.distance(lat, lng, eventiLat, eventiLng);
    }
  },
    components: {
	chatCmp
  },
};
</script>







<style scoped lang="scss">
.card-content {
  padding: 0.5rem;
  & .media {
    margin-bottom: 0.3rem;
    & .media-content span.tag {
      margin-bottom: 0;
    }
  }
  & .content p.description {
    margin-bottom: 0;
  }
}
.card-footer-item {
  padding: 0;
  font-weight: bold;
  transition: all ease-in 0.2s;
  & .clap-icon {
    max-width: 50px;
    padding: 0.25rem;
  }
  &:hover {
    color: #41b883;
  }
}
.content .title.is-4 {
  margin: 0;
}
.eventi-details {
  box-shadow: 0px 0px 8px black;
  margin: 5px auto;
  max-width: 95vw;
  padding: 5px;
}
.eventi-img {
  max-height: 300px;
}
.side-info {
  float: right;
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
