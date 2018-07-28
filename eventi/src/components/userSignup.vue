<template>
	<section class="modal">
	<div class="modal-background"></div>

	<div class="modal-content" @keyup.esc="cancelForm">
		<div class="field">
    		<p class="control has-icons-left">
			<input class="input" v-model="user.fullName" 
			v-validate="'required|alpha_dash'" type="text" name="username" placeholder="Your name...">
			<span class="v-validate-error">{{ errors.first('username') }}</span>
			<span class="icon is-small is-left">
    			<font-awesome-icon icon="user"></font-awesome-icon>
    		</span>
    		</p>
    	</div>
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
		<a class="button user-signup is-success" @click="userSignup">Signup</a>
		<a class="button user-signup-cancel is-danger" @click="cancelForm">Cancel</a>
	</div>
	<button class="modal-close is-large" aria-label="close" @click="cancelForm"></button>
	</section>
</template>

<script>
export default {
  name: "user-signup-modal",
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    userSignup() {
      this.$validator.validate().then(result => {
        if (result) {
          let user = this.user;
          this.$store.dispatch({ type: "userSignup", user }).then(() => {
            this.user = {};
            this.$emit("close-modal");
          });
        }
      });
    },
    cancelForm() {
      this.user = {};
      this.$emit("close-modal", 'signup');
    }
  }
};
</script>

<style scoped lang="scss">
.user-signup {
  float: right;
}
.user-signup-cancel {
  float: right;
  margin-right: 5px;
}
.v-validate-error {
  color: white;
}
</style>
