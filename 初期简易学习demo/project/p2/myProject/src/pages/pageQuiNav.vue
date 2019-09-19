<template>
  <div id="pageQuiNav">
    <!--使用-->
    <qui-nav></qui-nav>
  </div>
</template>
<script>
  import quiNav from '../components/quiNav.vue' /*引用*/
  export default {
    name: 'pageQuiNav',
    components: {
      'qui-nav': quiNav /*注册自定义标签*/
    }
  }
</script>
