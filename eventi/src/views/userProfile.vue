<template class="hero">
    <section class="user-profile container" v-if="user">
        <h1 class="title">User Profile</h1>
        <div class="main tile is-ancestor">
            <div class="tile is-parent is-4">
                <ul class="sidebar box tile is-child is-paddingless">
                    <li class="box">Profile</li>
                    <li class="box">My Eventi</li>
                </ul>
            </div>
            <div class="tile is-parent">
                <div class="box tile is-child">
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
                            <div class="columns is-multiline">
                                <div class="column">
                                    
                                </div>
                            </div>
                            
                        </div>                        
                    </article>
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
import eventiList from '@/components/eventiList.vue';

export default {
  created() {
    this.$store.dispatch({ type: 'loadUser' });
  },
  computed: {
    user() {
      return this.$store.getters.userForDisplay;
    }
  },
  components: {
    eventiList
  }
};
</script>

<style>
.user-profile {
  padding: 1.5rem;
  /* height of nav bar*/
  min-height: calc(100vh - 78px);
  display: flex;
  flex-direction: column;
}
.user-profile .main {
  flex-grow: 1;
}
.user-profile .sidebar {
  background-color: #42b983;
}
</style>
