<!-- 组件说明 -->
<template>
  <div class="">
    <div @click="getUser">获取userInfo</div>
    <!-- <div>userInfo：{{userInfo}}</div> -->
  </div>
</template>

<script>
//import x from ''
export default {
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
      // userInfo: null,
      aa: 11
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      // this.aa = 22
      // this.userInfo = { a: 1 }
    }, 1000)
  },
  methods: {
    getUser() {
      console.log(this.$parent.userInfo.a)
    }
  },
}
</script>

<style lang='less' scoped>
</style>