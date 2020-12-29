<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
        >babel</a></li>
      <li><a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
        >eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a
          href="https://vuejs.org"
          target="_blank"
          rel="noopener"
        >Core Docs</a></li>
      <li><a
          href="https://forum.vuejs.org"
          target="_blank"
          rel="noopener"
        >Forum</a></li>
      <li><a
          href="https://chat.vuejs.org"
          target="_blank"
          rel="noopener"
        >Community Chat</a></li>
      <li><a
          href="https://twitter.com/vuejs"
          target="_blank"
          rel="noopener"
        >Twitter</a></li>
      <li><a
          href="https://news.vuejs.org"
          target="_blank"
          rel="noopener"
        >News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a
          href="https://router.vuejs.org"
          target="_blank"
          rel="noopener"
        >vue-router</a></li>
      <li><a
          href="https://vuex.vuejs.org"
          target="_blank"
          rel="noopener"
        >vuex</a></li>
      <li><a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >vue-devtools</a></li>
      <li><a
          href="https://vue-loader.vuejs.org"
          target="_blank"
          rel="noopener"
        >vue-loader</a></li>
      <li><a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
        >awesome-vue</a></li>
    </ul>
    <div>
      测试下v-show是否没有v-else,是的，不然就直接报错
      <div v-show="1">我是v-show的</div>
      <!-- <div v-else>我是v-else</div> -->
    </div>

    <testUserInfo></testUserInfo>
  </div>
</template>

<script>
import testUserInfo from './testUserInfo'
export default {
  components: {
    testUserInfo
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      userInfo: null
    }
  },
  mounted() {
    setTimeout(() => {
      // this.aa = 22
      this.userInfo = { a: 1 }
      console.log('aaa')
    }, 5000)
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
