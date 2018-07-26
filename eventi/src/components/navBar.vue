<template>
      <!-- <div class="navbar-menu">
        <div class="navbar-start">
            <h1 class="logo navbar-item title is-2"><span class="logo-letter">e</span>venti </h1>
        </div>

        <div class="navbar-end">
          <router-link to="/" class="navbar-item">eventi</router-link> 
          <router-link to="/userProfile" class="navbar-item">user profile</router-link> 
          <a class="navbar-item button is-primary" v-if="!userLoggedIn">login</a>
        </div>
</div> -->
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
     <a class="navbar-item logo title"><span class="logo-letter">e</span>venti </a>
      <!-- <div class="navbar-burger burger" data-target="navBarMenu">
      <span></span>
      <span></span>
      <span></span> -->
    <!-- </div> -->
  </div>
  <div class="navbar-menu" id="navBarMenu">
    <div class="navbar-end">
      <router-link to="/" class="navbar-item">eventi</router-link> 
      <a class="navbar-item" v-if="userLoggedIn">user profile</a> 
      <a class="navbar-item" v-if="!userLoggedIn" @click="userLogin = !userLogin">login</a>
      <userLoginModal :class="{'is-active': userLogin}" @close-modal="closeModal"/>
    </div>
  </div>
 
</nav>

</template>

<script>
import userLoginModal from "./userLogin";

export default {
  name: "nav-bar",
  data() {
    return {
      userLoggedIn: null,
      userLogin: false
    };
  },
  methods: {
    closeModal(){
      console.log('closing modal');
      this.userLogin = false;
    }
  },
  computed: {},
  components: {
    userLoginModal
  }
};
</script>

<style scoped lang="scss">
nav {
  &.navbar {
    padding: 0;
  }
  .logo {
    letter-spacing: 3px;
    color: rgb(75, 75, 75);
    margin: 0;
    &:hover {
      color: #41b883;
    }
  }
  .logo-letter {
    text-align: center;
    line-height: 30px;
    // display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: rgb(75, 75, 75);
    color: white;
  }

  .navbar-menu a {
    display: inline-block;
    transition: 0.3s;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover {
      transform: scale(1.3);
      color: #41b883;
      padding: 1em;
    }
  }
}
</style>
