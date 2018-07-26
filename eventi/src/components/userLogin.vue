<template>
<section class="modal">
	<div class="modal-background"></div>
	<div class="modal-content">
	<div class="field">
       <p class="control">
    	<input class="input" type="text" v-model="userDisplayName" placeholder="Display name">
    	</p>
    </div>
    <div class="field">
    	<p class="control has-icons-left has-icons-right">
    	<input class="input" v-model="userEmail" type="email" placeholder="Email">
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
	    <input class="input" type="password" v-model="userPassword" placeholder="Password">
	    <span class="icon is-small is-left">
	    	<font-awesome-icon icon="lock"></font-awesome-icon>
	    </span>
	  	</p>
	</div>
    <!-- Any other Bulma elements you want -->
		<a class="button is-success" @click="userLogin">Login</a>
	</div>
	<button class="modal-close is-large" aria-label="close" @click="$emit('close-modal')"></button>
</section>
</template>

<script>
export default {
  name: "user-login-modal",
  data() {
    return {
      userDisplayName: "",
      userEmail: "",
      userPassword: ""
    };
  },
  methods: {
	  userLogin(){
		  console.log('logging in user');
		  
	  }
  }
};
</script>

<style scoped lang="scss">
</style>
