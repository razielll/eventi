<template>
<section class="modal">
	<div class="modal-background"></div>
	<div class="modal-content" @keyup.esc="$emit('close-modal')">
	<div class="field">
       <p class="control has-icons-left">
    	<input class="input" type="text" v-model="user.fullName" placeholder="Your name...">
		<span class="icon is-small is-left">
    		<font-awesome-icon icon="user"></font-awesome-icon>
    	</span>
    	</p>
    </div>
    <div class="field">
    	<p class="control has-icons-left has-icons-right">
    	<input class="input" v-model="user.email" type="email" placeholder="Email...">
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
	    <input class="input" type="password" v-model="user.password" placeholder="Password!">
	    <span class="icon is-small is-left">
	    	<font-awesome-icon icon="lock"></font-awesome-icon>
	    </span>
	  	</p>
	</div>
    <!-- Any other Bulma elements you want -->
		<a class="button user-login is-success" @click="userSignup">Signup</a>
		<a class="button user-login-cancel is-danger" @click="$emit('close-modal')">Cancel</a>
	</div>
	<button class="modal-close is-large" aria-label="close" @click="$emit('close-modal')"></button>
</section>
</template>

<script>
export default {
  name: "user-login-modal",
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
      let user = this.user;
      if (this.user.email && this.user.fullName && this.user.password) {
        this.$store.dispatch({ type: "userSignup", user });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.user-login {
  float: right;
}
.user-login-cancel {
  float: right;
  margin-right: 5px;
}
</style>
