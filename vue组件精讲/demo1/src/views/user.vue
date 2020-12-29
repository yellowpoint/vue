<!-- 组件说明 -->
<template>
  <div class="">
    <div @click="getUser">获取userInfo</div>
    <!-- <div>userInfo：{{userInfo}}</div> -->
  </div>
</template>

<script>
import user from './user.js'
export default {
  mixins: [user],
  name: '',
  components: {

  },
  props: {
    prop: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    };
  },

  mounted() {
    setTimeout(() => {
      // console.log('  this.aa = 22')
      // this.aa = 22
      // this.userInfo = { a: 1 }
      // this.$store.dispatch('setUserInfo', { a: 333 })
    }, 1000)
  },
  methods: {
    getUser() {
      // console.log(this.aa)
      console.log(this.userInfo.a)
    }
  },
}
</script>

<style lang='less' scoped>
</style>