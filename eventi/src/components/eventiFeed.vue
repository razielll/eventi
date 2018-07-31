<template>
<section>
  <div class="chat-container">
    <p v-if="isConnected">Joined eventi chat!</p>
	<p v-for="message in eventiMessages" :key="message"> {{message}}</p>
    <p>{{socketMessage}}</p>
  </div>
	<input type="text" v-model="txt" placeholder="say something">
    <button @click.prevent="sendMessage()">send</button>
</section>

</template>

<script>
export default {
  props: ["eventiMessages"],
  data() {
    return {
      isConnected: false,
      socketMessage: "",
      user: "",
      txt: ""
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },
    disconnect() {
      this.isConnected = false;
    },
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    }
  },
  methods: {
    sendMessage() {
      this.user = this.$store.getters.getUser.fullName;
      this.$socket.emit("SEND_MESSAGE", {
        user: this.user,
        txt: this.txt
      });
      let msg = { user: this.user, txt: this.txt };
	  this.txt = "";
	  this.$emit('save-message', msg)
    }
  }
};
</script>
<style lang="scss">
.chat-container {
  height: 150px;
  width: 100%;
  box-shadow: 0px 0px 5px black;
  overflow-x: auto;
  & p {
    padding-left: 5px;
  }
}
</style>
