<template>
    <transition
    name="custom-classes-transition"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
    >
        <div v-if="alive" :class="msgClass" class="notification">
            {{msg.txt}}
        </div>
    </transition>
</template>

<script>
import EventBusService, { SHOW_MSG } from '@/services/eventBus';

export default {
  name: 'flash-msg',
  created() {
    EventBusService.$on(SHOW_MSG, msg => {
      this.msg = msg;
      let delay = msg.delay || 2000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
  },
  data() {
    return {
      alive: false,
      msg: null
    };
  },
  computed: {
    msgClass() {
      if (!this.msg) return;
      return `is-${this.msg.type}`;
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 9999;
}
</style>
