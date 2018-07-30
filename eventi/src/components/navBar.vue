<template>
    <section class="">
    <nav class="conatiner navbar is-transparent" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item logo title"><span class="logo-letter">e</span>venti </router-link>
            <!-- <div class="navbar-burger burger" data-target="navBarMenu">
            <span></span>
            <span></span>
            <span></span> -->
            <!-- </div> -->
        </div>
        <div class="navbar-menu" id="navBarMenu">
            <div class="navbar-end" v-if="!user">
                <router-link to="/" class="navbar-item">eventi</router-link>
                <a class="navbar-item" v-if="!user" @click="userLogin = !userLogin">login</a>
                <a class="navbar-item" v-if="!user" @click="userSignup = !userSignup">signup</a>
            </div>
            <div class="navbar-end" v-if="user">
                <router-link to="/" class="navbar-item">eventi</router-link>
                <router-link to="/eventi/edit" class="navbar-item">New Eventi</router-link>
                <router-link to="/user" class="navbar-item">{{user}} profile</router-link>
                <a class="navbar-item" @click="logOut">logout</a>
            </div>
            <userLoginModal :class="{'is-active': userLogin}" @close-modal="closeModal" @go-signup="signup" />
            <userSignupModal :class="{'is-active': userSignup}" @close-modal="closeModal" />
        </div>

    </nav>
    <hr>
    <div class="container">
      <div class="columns filters">
        <div class="column is-8-tablet">
          <div class="buttons">
            <button class="button">Lecture</button>
            <button class="button">Party</button>
            <button class="button">Gathering</button>
            <button class="button">Sale</button>
            <button class="button">Need Help</button>
            <button class="button">Lost &amp; Found</button>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <input class="is-checkradio" id="distance-1" type="radio" name="exampleRadioInline" checked="checked">
            <label for="distance-1">500m</label>
            <input class="is-checkradio" id="distance-2" type="radio" name="exampleRadioInline">
            <label for="distance-2">1000m</label>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="search" placeholder="Search for location">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="search"/>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <hr>
    </section>
</template>

<script>
import userLoginModal from './userLogin';
import userSignupModal from './userSignup';

export default {
  name: 'nav-bar',
  data() {
    return {
      userLogin: false,
      userSignup: false
    };
  },
  methods: {
    closeModal(type) {
      type === 'login' ? (this.userLogin = false) : (this.userSignup = false);
    },
    signup() {
      this.userLogin = false;
      this.userSignup = true;
    },
    logOut() {
      this.$store.commit({ type: 'logout' });
      this.currUser = null;
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
nav {
  &.navbar {
    // padding: 0;
    align-items: center;
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
    position: relative;
    margin: 0 5px;
    text-transform: capitalize;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:after {
      content: '';
      height: 3px;
      width: 0;
      position: absolute;
      background-color: #42b983;
      bottom: 0;
      left: 0;
      transition: 0.3s;
    }
    &:hover {
      color: #42b983;
    }
    &:hover::after {
      width: 100%;
    }
  }
}
.filters {
  align-items: center;
}
</style>
