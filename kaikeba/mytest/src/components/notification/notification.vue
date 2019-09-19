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
  name: "Notification",
  data() {
    return {
      visible: true
    };
  },
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: "关闭"
    },
    callback: {
      type: Function,
      default: null
    }
  },
  mounted () {
    // console.log(this.callback)
  },
  methods: {
    handleClose(e) {
      e.preventDefault();
      this.$emit("close");
    },
    afterLeave() {
      this.$emit("closed");
    },
    // 这里没有用到也要申明
    afterEnter() {},
    clearTimer() {},
    createTimer() {}
  },
  computed: {
    style() {
      return {};
    }
  }
};
</script>
<style scoped>
/* 为啥外部控制visible之后这个bottom的动画就失效了，哦被transition覆盖了由于之前没有触发所以才有效 */
.notification {
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
  transform: translateX(100px);
  opacity: 0;
}
</style>

