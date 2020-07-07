<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <todo></todo>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import todo from './components/todo.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    todo
  }
}
</script>
