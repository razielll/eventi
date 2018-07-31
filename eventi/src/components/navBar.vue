<template>
	
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
	 <p class="navbar-item logo title"><span class="logo-letter">e</span>venti </p>
	 
	<a role="button" class="navbar-burger" :class="{'is-active': toggledBurger}" 
	@click="toggledBurger = !toggledBurger" data-target="nav-bar-menu"> 
		<span></span>
		<span></span>
		<span></span>
   </a>
  </div>
  <div class="navbar-menu" :class="{'is-active': toggledBurger}" id="nav-bar-menu">
	<div class="navbar-end" v-if="!user">
	  <router-link to="/" class="navbar-item">eventi</router-link> 
	  <a class="navbar-item" v-if="!user" @click="userLogin = !userLogin">login</a>
	  <a class="navbar-item" v-if="!user" @click="userSignup = !userSignup">signup</a>
	</div>
	<div class="navbar-end" v-if="user">
	  <router-link to="/" class="navbar-item">eventi</router-link> 
	  <router-link to="/user" class="navbar-item" v-if="user">{{user}} profile</router-link> 
	  <a class="navbar-item" v-if="user" @click="logOut">logout</a> 
	</div>
	  <userLoginModal :class="{'is-active': userLogin}" @close-modal="closeModal" @go-signup="signup"/>
	  <userSignupModal :class="{'is-active': userSignup}" @close-modal="closeModal"/>
  </div>
</nav>
</template>

<script>
import userLoginModal from "./userLogin";
import userSignupModal from "./userSignup";

export default {
  name: "nav-bar",
  data() {
    return {
      toggledBurger: false,
      userLogin: false,
      userSignup: false
    };
  },
  methods: {
    closeModal(type) {
      type === "login" ? (this.userLogin = false) : (this.userSignup = false);
    },
    signup() {
      this.userLogin = false;
      this.userSignup = true;
    },
    logOut() {
      this.$store.commit({ type: "logout" });
    }
  },
  computed: {
    user() {
      let user;
      if (this.$store.getters.getUser) {
        return (user = this.$store.getters.getUser.fullName);
      } else return false;
    }
  },
  components: {
    userLoginModal,
    userSignupModal
  }
};
</script>

<style scoped lang="scss">
.logo {
  letter-spacing: 8px;
  color: rgb(75, 75, 75);
  margin: 0;
  transition: all 0.25s;
  &:hover {
    color: #41b883;
  }
  & .logo-letter {
    text-align: right;
    line-height: 30px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: rgb(75, 75, 75);
    color: white;
  }
}
.navbar-menu {
  text-align: center;
  transition: all 0.25s;
  & a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0.5rem;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover {
      color: #41b883;
    }
  }
}
@media screen and (max-width: 1087px) {
  .navbar-menu.is-active {
    opacity: 1;
    height: 100%;
  }
  .navbar-menu:not(.is-active) {
    opacity: 0;
    display: block;
    height: 0;
  }
}
</style>