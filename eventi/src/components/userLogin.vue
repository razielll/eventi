<template>
	<section class="modal">
	<div class="modal-background"></div>

	<div class="modal-content" @keyup.esc="cancelForm">
    	<div class="field">
    		<p class="control has-icons-left has-icons-right">
				<input class="input" v-model="user.email" v-validate="'required|email'" type="email" name="email">
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
				<input class="input" v-model="user.password" v-validate="'required|min:6'" type="password" name="password" placeholder="password">
				<span class="v-validate-error">{{ errors.first('password') }}</span>
	    		<span class="icon is-small is-left">
	    		<font-awesome-icon icon="lock"></font-awesome-icon>
	    		</span>
	  		</p>
		</div>
    <!-- Any other Bulma elements you want -->
		<a class="user-to-register is-success" @click="goToUserSignup">register new user</a>
		<a class="button user-login is-success" @click="userLogin">Login</a>
		<a class="button user-login-cancel is-danger" @click="cancelForm">Cancel</a>
	</div>
	<button class="modal-close is-large" aria-label="close" @click="cancelForm"></button>
	</section>
</template>

<script>
export default {
  name: "user-login-modal",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    userLogin() {
      this.$validator.validate().then(result => {
        if (result) {
          let user = this.user;
          this.$store.dispatch({ type: "userLogin", user });
          this.$emit("close-modal", "login");
          this.user = {};
        }
      });
    },
    goToUserSignup() {
      this.$emit("go-signup");
    },
    cancelForm() {
      this.user = {};
      this.$emit("close-modal", "login");
    }
  }
};
</script>

<style scoped lang="scss">
.user-login {
  float: right;
}
.user-to-register {
  float: left;
  &:hover {
    color: white;
  }
}
.user-login-cancel {
  float: right;
  margin-right: 5px;
}
.v-validate-error {
  color: white;
}
</style>
