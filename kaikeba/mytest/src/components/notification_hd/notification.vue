<template>
  <transition
    name="fade"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
  >
    <div
      class="notification"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{content}}</span>
      <a
        class="btn"
        @click="handleClose"
      >{{btn}}</a>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Notification2",
  data() {
    return {
      visible: false,
      verticalOffset: 10,
      height: 0 //通知框的高度要等到afterEnter之后再取
    };
  },
  props: {
    content: {
      type: String,
      required: true,
      default: "默认文字"
    },
    btn: {
      type: String,
      default: "关闭"
    },
    duration: {
      type: Number,
      default: 3000
    }
  },

  mounted() {
    this.createTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    handleClose(e) {
      e.preventDefault();
      this.$emit("close");
    },
    afterLeave() {
      this.$emit("closed");
    },
    afterEnter() {
      this.height = this.$el.offsetHeight;
    },
    createTimer() {
      this.timer = setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }
  },
  computed: {
    style() {
      return {
        bottom: `${this.verticalOffset}px`
      };
    }
  }
};
</script>
<style scoped>
.notification {
  position: fixed;
  right: 10px;
  bottom: 10px;

  width: 180px;
  height: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: aliceblue;
  padding: 20px;
  transition: bottom .5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  /* transform: translateX(100px); */
  opacity: 0;
}
</style>

