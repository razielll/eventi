<template>
<div class="eventi-details container" v-if="eventi">
    <div class="columns">
        <div class="column is-8">
            <div class="image is-3by1 gallery" :style="{'background-image': galleryImage}">
				<p class="eventi-status" :class="{'is-now': isNow}">{{eventiTime}}</p>
            </div>
        </div>
        <div class="column">
            <eventi-map :location="location" />
        </div>
    </div>
    <div class="columns">
        <div class="column is-8">
            <div class="details">
                <div class="columns">
                    <div class="column">
                        <div class="media">
                          <div class="media-left">
                              <figure class="image is-48x48">
                                <img :src="avatarImg" alt="creator image">
                              </figure>
                          </div>
                          <div class="media-content">
                              <h1 class="title is-4">{{eventi.name}}</h1>
                              <div class="flex align-center space-between">
                                <span class="tag" :class="eventi.category">{{eventi.category | formatCategory}}</span>
                                <h2 class="title is-5 is-inline-block"> {{goingUsers === 1? '1 person is' : goingUsers + ' people are'}} coming! </h2>
                              </div>
                          </div>
                        </div>
                        .
                    </div>
                    <div class="column is-3 buttons">
                        <a class="button is-medium is-fullwidth is-primary">
                            <span class="icon is-small">
                                <font-awesome-icon icon="location-arrow"/>
                            </span>
                            <span class="is-size-6">{{distance}}
                                <span class="is-size-7">Km</span>
                            </span>
                        </a>
                        <a @click.stop="onClapClick" class="button is-medium is-fullwidth">
                            <span class="icon is-small">
                                <img class="clap-icon image is-32x32" src="../assets/clap.png" />
                            </span>
                            <span>{{eventi.clapsCount}}</span>
                        </a>
                        <a href="#" @click.stop class="button is-medium is-fullwidth" v-if="!isOwner">Join</a>
                        <router-link  
                            class="button is-medium is-fullwidth" 
                            v-if="isOwner"
                            :to="`/eventi/edit/${eventi._id}`">Edit</router-link>
                    </div>
                </div>
            </div>
            <div class="content">
                <p class="is-size-4"> {{eventi.description}} </p>
            </div>
        </div>
        <div class="column">
            <chat-cmp :eventiMessages="eventi.messages" @save-message="saveMessage" />
        </div>
    </div>
</div>
  
</template>

<script>
import chatCmp from '@/components/eventiFeed';
import geoService from '@/services/geoService';
import eventiMap from '@/components/eventiMap';
import { eventiTime } from '@/mixins/eventiTime';

export default {
  name: 'eventi-details',
  mixins: [eventiTime],
  data() {
    return {
      eventi: null,
      goingUsers: '',
      category: ''
    };
  },
  created() {
    let { eventiId } = this.$route.params;
    this.$store.dispatch({ type: 'getEventiById', eventiId }).then(eventi => {
      this.eventi = eventi;
      this.goingUsers = eventi.goingUserId.length;
    });
  },
  methods: {
    saveMessage(msg) {
      let _id = this.eventi._id;
      this.$store.dispatch({ type: 'saveMessage', msg, _id });
    },
    onClapClick() {
      this.$store
        .dispatch({
          type: 'incEventiClap',
          _id: this.eventi._id
        })
        .then(res => {
          if (res.ok) this.eventi.clapsCount++;
        });
    }
  },
  computed: {
    distance() {
      let { lat, lng } = this.$store.getters.getPosition;
      let [eventiLng, eventiLat] = this.eventi.location.coordinates;
      return geoService.distance(lat, lng, eventiLat, eventiLng);
    },
    galleryImage() {
      return `url(${this.eventi.gallery})`;
    },
    location() {
      let [lng, lat] = this.eventi.location.coordinates;
      return { lng, lat };
    },
    avatarImg() {
      return `http://i.pravatar.cc/48?u=${Math.random()}`;
    },
    isOwner() {
      let user = this.$store.getters.getUser;
      if (user) return this.eventi.ownerId === user._id;
      else return false;
    }
  },
  components: {
    chatCmp,
    eventiMap
  }
};
</script>

<style scoped lang="scss">
.eventi-details {
  font-family: ubuntu;
  margin-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  min-height: calc(100vh - 66px - 66px);
}
.details {
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.gallery {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
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
.eventi-img {
  max-height: 300px;
}
.eventi-status {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 1.3rem;
  padding: 0.75rem;
  &.is-now {
    background-color: rgba(65, 184, 131, 0.8);
  }
}
.clap-icon {
  max-width: 50px;
}

.buttons {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
}
.buttons .button {
  flex-basis: 0;
}
@media (min-width: 769px) {
  .buttons {
    display: block;
  }
}
</style>
