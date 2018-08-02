<template>
	<section class="card" @click="eventiDetails(eventi)">
  		<!-- <div class="card"> -->
			<div class="card-image">
	  			<figure class="image is-4by3">
		  			<p class="eventi-status card-header-title">{{ eventi.startTime | moment("ddd, hA") }} :
				 						{{ eventi.startTime | moment("from") }}</p>
		  			<img :src="eventi.gallery" alt="eventi image">
	  			</figure>
			</div>
   		<div class="card-content">
	  		<div class="media">
			<div class="media-left">
				<figure class="image is-48x48">
					<img :src="avatarImg" alt="creator image">
				</figure>
			</div>
				<div class="media-content">
					<p class="title is-4">{{eventi.name}}</p>
					<p class="subtitle is-6 tags">
				<span class="tag">{{eventi.category}}</span>
			  </p>
				</div>
	  		</div>
	  		<div class="content">
	  			<p class="description"> {{shortDescription}} </p>
	  			<p class="going-users"> {{goingUsers}} are coming! </p>
			  <p class="hype"><img class="clap-icon" src="../assets/clap.png"/>{{eventi.clapsCount}}</p>
	  		  	<!-- <time datetime="2016-1-5">11:09 PM - 1 Jan 2016</time> -->
	  		</div>
		</div>

	<footer class="card-footer">
			<span @click.stop="onClapClick" class="card-footer-item">
        <img class="clap-icon" src="../assets/clap.png"/>
      </span>
			<span @click.stop class="card-footer-item" @click="joinEventiToggle(eventi._id)">
		{{isSignedForEventi? 'Leave' : 'Join'}}
			</span>
			<span @click.stop class="card-footer-item distance">
        <span class="icon">
          <font-awesome-icon icon="location-arrow"/>
        </span>
        <span>{{distance}}<span class="is-size-7">Km</span></span>
      </span>
</footer>
  		<!-- </div> -->
	</section>
</template>

<script>
import '@/assets/scss/main.scss';
import geoService from '@/services/geoService';

export default {
  props: ['eventi'],
  data() {
    return {};
  },
  computed: {
    goingUsers() {
      return this.eventi.goingUserId.length;
    },
    shortDescription() {
      let shortDesc = this.eventi.description;
      this.eventi.description.length > 40
        ? (shortDesc = shortDesc.slice(0, 40) + '...')
        : (shortDesc = shortDesc);
      return shortDesc;
    },
    isSignedForEventi() {
      let loggedInUser = this.$store.getters.getUser;
      if (loggedInUser && loggedInUser.eventiHistory) {
        return loggedInUser.eventiHistory.includes(this.eventi._id);
      }
      return false;
    },
    distance() {
      let { lat, lng } = this.$store.getters.getPosition;
      let [eventiLng, eventiLat] = this.eventi.location.coordinates;
      return geoService.distance(lat, lng, eventiLat, eventiLng);
    },
    avatarImg() {
      return `http://i.pravatar.cc/48?u=${Math.random()}`;
    }
  },
  methods: {
    eventiDetails(eventi) {
      this.$router.push(`/eventi/${eventi._id}`);
    },
    onClapClick() {
      if (this.$route.name === 'user-profile') {
        this.$store.dispatch({
          type: 'incEventiClapFromUserProfile',
          eventi: this.eventi
        });
      } else {
        this.$store.dispatch({
          type: 'incEventiClap',
          _id: this.eventi._id
        });
      }
    },
    joinEventiToggle(eventiId) {
      let user = this.$store.getters.getUser;
      if (!user._id) return;
      else {
        let userId = user._id;
        const data = { userId, eventiId };
        if (!user.eventiHistory.includes(eventiId)) {
          console.log('toggle going');
          this.$store.dispatch({ type: 'addUser', data });
          // this.$store.dispatch({ type: "userJoinEventi", data });
        } else if (user.eventiHistory.includes(eventiId)) {
          console.log('toggle not going');
          const eventis = this.$store.getters.getUser.eventiHistory;
          this.$store.dispatch({ type: 'removeUser', data, eventis });
          // this.$store.dispatch({ type: "userLeaveEventi", data, eventis });
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.card-content {
  padding: 0.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  cursor: pointer;
  & .clap-icon {
    max-width: 50px;
    padding: 0.25rem;
  }
  &:hover {
    color: #41b883;
  }
  &.distance {
    background-color: #41b883;
    color: #fff;
  }
}
.eventi-preview-wrapper {
  font-family: ubuntu;
  margin: 1rem auto;
  box-shadow: 0px 0px 8px black;
  max-width: 250px;
  transition: all 0.25s;
  &:hover {
    transform: scale(1.03);
    cursor: pointer;
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
}
.eventi-status {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
.going-users {
  position: absolute;
  right: 5px;
}
.hype img.clap-icon {
  max-width: 25px;
}
</style>