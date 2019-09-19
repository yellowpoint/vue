import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    // 继承过来的组件，自己再覆盖其style
    style() {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  data() {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible:false
    }
  },
  mounted() {
    this.createTimer()
  },
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    createTimer() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter() {
      this.height = this.$el.offsetHeight
    }
  },

}
