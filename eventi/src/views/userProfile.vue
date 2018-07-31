<template class="hero">
    <section class="user-profile container section" v-if="user">
        <h1 class="title">User Profile</h1>
        <div class="main columns flex-grow-1 is-marginless">
            <div class="sidebar column is-3">
                <ul class="columns is-mobile is-block-tablet is-marginless">
                    <li class="box column is-size-5" 
                        :class="{'has-background-primary': showProfile}"
                        @click="showProfile = true">Profile</li>
                    <li class="box column is-size-5" 
                        :class="{'has-background-primary': !showProfile}"
                        @click="showProfile = false">My Eventi</li>
                </ul>
            </div>
                        
            <div class="my-profile column box">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                        <img :src="user.imageUrl">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{user.fullName}}</strong>&nbsp;<small>{{user.email}}</small>
                                <br/>
                                {{user.phone}}
                            </p>
                            
                        </div>
                        
                        
                    </div>                        
                </article>
                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                >
                <section v-if="showProfile" class="section">
                    <h1 class="title">Eventi History</h1>
                    <div class="columns is-multiline">
                        <div v-for="eventi of user.eventiHistoryData" :key="eventi._id" class="column">
                            <eventiPreview :eventi="eventi"/>
                        </div>
                    </div>
                </section>
                </transition>

                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                >
                <section v-if="!showProfile" class="section">
                    <h1 class="title">My Eventi</h1>
                    <div class="columns is-multiline">
                        <div v-for="eventi of user.myEventiData" :key="eventi._id" class="column">
                            <eventiPreview :eventi="eventi"/>
                        </div>
                    </div>
                </section>
                </transition>
            </div>            
        </div>
    </section>    
</template>

<script>
import eventiPreview from "@/components/eventiPreview.vue";

export default {
  data() {
    return { showProfile: true };
  },
  created() {
    this.$store.dispatch({ type: "loadUser" });
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  components: {
    eventiPreview
  }
};
</script>

<style scoped lang="scss">
.user-profile {
  /* height of nav bar*/
  min-height: calc(100vh - 78px);
  display: flex;
  flex-direction: column;
}
.sidebar {
  padding-top: 0;
}
.sidebar .box {
  background-color: #fff;
  color: #4a4a4a;
  padding: 1.25rem;
  cursor: pointer;
  transition: 0.2s;
  margin-bottom: 0;
}
.sidebar .box:hover {
  background-color: darken(#fff, 5);
  color: darken(#4a4a4a, 5);
}

@media screen and (min-width: 769px) {
  .sidebar .box:first-child {
    margin-bottom: 1.5rem;
  }
}
</style>
