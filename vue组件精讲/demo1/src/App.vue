<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/form">form</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>

export default {

  data() {
    return {}
  },
  computed: {
    // userInfo() {
    //   return this.$store.getters.userInfo;
    // }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      console.log('setUserInfo')
      this.$store.dispatch('setUserInfo', { a: 'aaaaa' })
    }, 1000)
  },
  methods: {

  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
