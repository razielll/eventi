<template>
	<section class="modal">
    <div class="modal-background"></div>

    <div class="modal-content" @keyup.esc="cancelForm">
        <div class="has-text-centered has-text-white title">Login</div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" v-model="user.email" v-validate="'required|email'" type="email" name="email" placeholder="email" value="asto1387@gmail.com">
                <span class="v-validate-error">{{ errors.first('email') }}</span>
                <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope"></font-awesome-icon>
                </span>
                <span class="icon is-small is-right">
                    <font-awesome-icon icon="check"></font-awesome-icon>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" v-model="user.password" v-validate="'required|min:6'" type="password" name="password" placeholder="password"
                    value="randompass">
                <span class="v-validate-error">{{ errors.first('password') }}</span>
                <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock"></font-awesome-icon>
                </span>
            </p>
        </div>
        <div class="field is-grouped is-grouped-centered is-grouped-multiline">
          <p class="control">
            <a class="user-to-register is-success" @click="goToUserSignup">register new user</a>
          </p>
          <p class="control">
            <a class="button user-login is-success" @click="userLogin">Login</a>
          </p>
          <p class="control">
            <a class="button user-login-cancel is-danger" @click="cancelForm">Cancel</a>
          </p>
          <p class="control">
            <fb-signin-button class="button is-info" :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">
                Sign in with Facebook
            </fb-signin-button>
          </p>
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="cancelForm"></button>
</section>
</template>

<script>
window.fbAsyncInit = function() {
  FB.init({
    appId: '691429734541960',
    cookie: true,
    xfbml: true,
    version: 'v3.1'
  });

  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

export default {
  name: 'user-login-modal',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    };
  },
  methods: {
    userLogin() {
      this.$validator.validate().then(result => {
        if (result) {
          let user = this.user;
          this.$store.dispatch({ type: 'userLogin', user });
          this.$emit('close-modal', 'login');
          this.user = {};
        }
      });
    },
    goToUserSignup() {
      this.$emit('go-signup');
    },
    cancelForm() {
      this.user = {};
      this.$emit('close-modal', 'login');
    },

    onSignInSuccess(response) {
      console.log('res', response);
      FB.api('/me?fields=id,name,picture,email', dude => {
        console.log('dude', dude);
        let user = { email: dude.email, password: dude.id };
        this.$store
          .dispatch({ type: 'userLogin', user })
          .then(_ => {
            this.$emit('close-modal', 'login');
          })
          .catch(err => {
            let user = {
              fullName: dude.name,
              email: dude.email,
              password: dude.id,
              imageUrl: dude.picture.data.url
            };

            this.$store
              .dispatch({ type: 'userSignup', user })
              .then(_ => {
                this.$emit('close-modal', 'login');
              })
              .catch(err => console.log(err));
          });
      });
    },
    onSignInError(error) {
      console.log('OH NOES', error);
    }
  }
};
</script>

<style scoped lang="scss">
.v-validate-error {
  color: white;
}
.push-left {
  margin-left: auto;
}
.modal-content {
  overflow: hidden;
}
@media (max-width: 540px) {
}
</style>
