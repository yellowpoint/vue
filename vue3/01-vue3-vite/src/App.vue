<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <todo></todo>
  <compositionApi></compositionApi>
  <!-- <newCom></newCom> -->
  <ul>
    <newCom :data="[5,3,1,6,9,4,2,8]" />
  </ul>
  <newCon_teleport></newCon_teleport>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import todo from './components/todo.vue'
import compositionApi from './components/compositionApi.vue'
import newCom from './components/newCom.vue'
import newCon_teleport from './components/newCon_teleport.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    todo,
    compositionApi,
    newCom,
    newCon_teleport
  }
}
</script>
