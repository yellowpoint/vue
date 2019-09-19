<template>
  <button class="qui-btn">
    <span>{{msg}}</span>
  </button>
</template>

<script>
  export default {
    props: {
      msg: {
        default: '下载'
      }
    },
    methods: {    //绑定事件的关键代码
      btnClickEvent: function(){
        alert(this.msg);
      }
    }
  }
</script>
<style scoped>
  @import './css/reset.import.css';
  @import './css/qui-btn.import.css';
</style>