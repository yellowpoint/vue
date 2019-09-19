<template>
  <div>
    <h2 v-if="error">404页面</h2>
    <h2 v-else>500页面</h2>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style>

</style>
