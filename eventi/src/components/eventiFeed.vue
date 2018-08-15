<template>
<section>
  <div class="chat-container">
    <p v-if="isConnected"><strong> Event feed! </strong></p>
	 <div class="chat-msg-container">
	<p class="chat-msg" v-for="(message,idx) in eventiMessages" :key="idx"> <strong> 
		{{message.user ? message.user : 'Anonymus'}}  </strong> wrote:  {{message.txt}}</p>
   </div>
  </div>
  <div class="field">
    <div class="control">
        <input  @keyup.enter="sendMessage" class="input chat-input" type="text" v-model="txt" placeholder="say something about this event">
    </div>
  </div>
    <button class="button" @click.prevent="sendMessage">send</button>
</section>

</template>

<script>
export default {
  props: ['eventiMessages'],
  data() {
    return {
      isConnected: false,
      socketMessage: '',
      user: '',
      txt: ''
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
    messageChannel(msg) {
      let user = msg.user ? msg.user : 'Anonymus';
      let msgTxt = msg.txt;
      document.querySelector(
        '.chat-msg-container'
      ).innerHTML += `<p class="chat-msg"><strong>${user}</strong> wrote: ${msgTxt}</p>`;
    }
  },
  methods: {
    sendMessage() {
      this.user = this.$store.getters.getUser.fullName
        ? this.$store.getters.getUser.fullName
        : 'Anonymus';
      this.$socket.emit('SEND_MESSAGE', {
        user: this.user,
        txt: this.txt
      });
      let msg = { user: this.user, txt: this.txt };
      this.txt = '';
      this.$emit('save-message', msg);
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
p.chat-msg {
  margin-left: 5px;
}
.chat-input {
  width: 60vw;
}
</style>
