<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <todo></todo>
  <compositionApi></compositionApi>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import todo from './components/todo.vue'
import compositionApi from './components/compositionApi.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    todo,
    compositionApi
  }
}
</script>
