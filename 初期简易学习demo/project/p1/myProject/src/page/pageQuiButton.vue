<template>
  <div id="pageQuiButton">
    <!--使用-->
    <qui-btn msg="确定" class="small"></qui-btn>
  </div>
</template>
<script>
  import quiBtn from '../components/quiButton.vue' /*引用*/
  export default {
    name: 'pageQuiButton',
    components: {
      'qui-btn': quiBtn /*注册自定义标签*/
    }
  }
</script>