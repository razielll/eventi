<template>
    <section class="">
    <nav class="conatiner navbar is-transparent" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item logo title">
              <svg class="logo-svg" width="149" height="50" viewBox="0 0 149 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" transform="translate(0 2)" fill="#4B4B4B"/>
                <path d="M2.54175 25.568C2.54175 23.36 2.86175 21.44 3.50175 19.808C4.14175 18.144 4.98975 16.768 6.04575 15.68C7.10175 14.592 8.31775 13.776 9.69375 13.232C11.0698 12.688 12.4778 12.416 13.9178 12.416C17.2778 12.416 19.8538 13.472 21.6458 15.584C23.4378 17.664 24.3337 20.848 24.3337 25.136C24.3337 25.328 24.3337 25.584 24.3337 25.904C24.3337 26.192 24.3177 26.464 24.2858 26.72H7.19775C7.38975 29.312 8.14175 31.28 9.45375 32.624C10.7658 33.968 12.8138 34.64 15.5978 34.64C17.1658 34.64 18.4778 34.512 19.5338 34.256C20.6218 33.968 21.4378 33.696 21.9818 33.44L22.6058 37.184C22.0618 37.472 21.1018 37.776 19.7258 38.096C18.3818 38.416 16.8458 38.576 15.1178 38.576C12.9418 38.576 11.0538 38.256 9.45375 37.616C7.88575 36.944 6.58975 36.032 5.56575 34.88C4.54175 33.728 3.77375 32.368 3.26175 30.8C2.78175 29.2 2.54175 27.456 2.54175 25.568ZM19.6778 23.12C19.7098 21.104 19.1978 19.456 18.1418 18.176C17.1178 16.864 15.6938 16.208 13.8698 16.208C12.8458 16.208 11.9338 16.416 11.1338 16.832C10.3658 17.216 9.70975 17.728 9.16575 18.368C8.62175 19.008 8.18975 19.744 7.86975 20.576C7.58175 21.408 7.38975 22.256 7.29375 23.12H19.6778Z" transform="translate(10 1)" fill="white"/>
                <path class="logo-venti" d="M17.5214 18.28C16.5854 21.784 15.4814 25.144 14.2094 28.36C12.9614 31.576 11.7494 34.456 10.5734 37H7.54939C6.37339 34.456 5.14939 31.576 3.87739 28.36C2.62939 25.144 1.53739 21.784 0.601391 18.28H4.20139C4.48939 19.456 4.82539 20.716 5.20939 22.06C5.61739 23.38 6.03739 24.7 6.46939 26.02C6.92539 27.316 7.38139 28.576 7.83739 29.8C8.29339 31.024 8.72539 32.116 9.13339 33.076C9.54139 32.116 9.97339 31.024 10.4294 29.8C10.8854 28.576 11.3294 27.316 11.7614 26.02C12.2174 24.7 12.6374 23.38 13.0214 22.06C13.4294 20.716 13.7774 19.456 14.0654 18.28H17.5214ZM22.4395 27.676C22.4395 26.02 22.6795 24.58 23.1595 23.356C23.6395 22.108 24.2755 21.076 25.0675 20.26C25.8595 19.444 26.7715 18.832 27.8035 18.424C28.8355 18.016 29.8915 17.812 30.9715 17.812C33.4915 17.812 35.4235 18.604 36.7675 20.188C38.1115 21.748 38.7835 24.136 38.7835 27.352C38.7835 27.496 38.7835 27.688 38.7835 27.928C38.7835 28.144 38.7715 28.348 38.7475 28.54H25.9315C26.0755 30.484 26.6395 31.96 27.6235 32.968C28.6075 33.976 30.1435 34.48 32.2315 34.48C33.4075 34.48 34.3915 34.384 35.1835 34.192C35.9995 33.976 36.6115 33.772 37.0195 33.58L37.4875 36.388C37.0795 36.604 36.3595 36.832 35.3275 37.072C34.3195 37.312 33.1675 37.432 31.8715 37.432C30.2395 37.432 28.8235 37.192 27.6235 36.712C26.4475 36.208 25.4755 35.524 24.7075 34.66C23.9395 33.796 23.3635 32.776 22.9795 31.6C22.6195 30.4 22.4395 29.092 22.4395 27.676ZM35.2915 25.84C35.3155 24.328 34.9315 23.092 34.1395 22.132C33.3715 21.148 32.3035 20.656 30.9355 20.656C30.1675 20.656 29.4835 20.812 28.8835 21.124C28.3075 21.412 27.8155 21.796 27.4075 22.276C26.9995 22.756 26.6755 23.308 26.4355 23.932C26.2195 24.556 26.0755 25.192 26.0035 25.84H35.2915ZM46.5929 18.82C47.3609 18.628 48.3809 18.424 49.6529 18.208C50.9249 17.992 52.3889 17.884 54.0449 17.884C55.5329 17.884 56.7689 18.1 57.7529 18.532C58.7369 18.94 59.5169 19.528 60.0929 20.296C60.6929 21.04 61.1129 21.94 61.3529 22.996C61.5929 24.052 61.7129 25.216 61.7129 26.488V37H58.3649V27.208C58.3649 26.056 58.2809 25.072 58.1129 24.256C57.9689 23.44 57.7169 22.78 57.3569 22.276C56.9969 21.772 56.5169 21.412 55.9169 21.196C55.3169 20.956 54.5729 20.836 53.6849 20.836C53.3249 20.836 52.9529 20.848 52.5689 20.872C52.1849 20.896 51.8129 20.932 51.4529 20.98C51.1169 21.004 50.8049 21.04 50.5169 21.088C50.2529 21.136 50.0609 21.172 49.9409 21.196V37H46.5929V18.82ZM73.3968 18.28H80.4888V21.088H73.3968V29.728C73.3968 30.664 73.4688 31.444 73.6128 32.068C73.7568 32.668 73.9728 33.148 74.2608 33.508C74.5488 33.844 74.9088 34.084 75.3408 34.228C75.7728 34.372 76.2768 34.444 76.8528 34.444C77.8608 34.444 78.6648 34.336 79.2648 34.12C79.8888 33.88 80.3208 33.712 80.5608 33.616L81.2088 36.388C80.8728 36.556 80.2848 36.76 79.4448 37C78.6048 37.264 77.6448 37.396 76.5648 37.396C75.2928 37.396 74.2368 37.24 73.3968 36.928C72.5808 36.592 71.9208 36.1 71.4168 35.452C70.9128 34.804 70.5528 34.012 70.3368 33.076C70.1448 32.116 70.0488 31.012 70.0488 29.764V13.06L73.3968 12.484V18.28ZM91.0971 37H87.7491V18.28H91.0971V37ZM89.4051 14.896C88.8051 14.896 88.2891 14.704 87.8571 14.32C87.4491 13.912 87.2451 13.372 87.2451 12.7C87.2451 12.028 87.4491 11.5 87.8571 11.116C88.2891 10.708 88.8051 10.504 89.4051 10.504C90.0051 10.504 90.5091 10.708 90.9171 11.116C91.3491 11.5 91.5651 12.028 91.5651 12.7C91.5651 13.372 91.3491 13.912 90.9171 14.32C90.5091 14.704 90.0051 14.896 89.4051 14.896Z" transform="translate(52)" fill="#4B4B4B"/>
              </svg>
            </router-link>
            <a role="button" class="navbar-burger" :class="{'is-active': toggledBurger}" 
			@click="toggledBurger = !toggledBurger" data-target="nav-bar-menu"> 
		<span></span>
		<span></span>
		<span></span>
   </a>
			</div>
        <div class="navbar-menu" id="navBarMenu" :class="{'is-active': toggledBurger}" >
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
    <eventi-filter/>
    </section>
</template>

<script>
import userLoginModal from "./userLogin";
import userSignupModal from "./userSignup";
import eventiFilter from "./eventiFilter";

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
    userSignupModal,
    eventiFilter
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
  .logo-venti {
    transition: 0.3s;
  }
  .logo-svg:hover .logo-venti {
    fill: #41b883;
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
    padding: 0;
    text-align: center;
    transition: all 0.25s;
    font-weight: bold;
    color: #2c3e50;
    margin: 0 5px;
    text-transform: capitalize;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:after {
      content: "";
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
