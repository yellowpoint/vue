<template>
  <div id="pageQuiButton">
    <!--使用-->
    <qui-btn v-on:btnClickEvent="doSth" msg="确定啊aa">
    	<img slot="icon" src="//img11.360buyimg.com/focus/s178x178_jfs/t3478/283/1302571508/6356/f837c9d4/58229f12Nf1f971d3.png.webp" alt="" />
    </qui-btn>
    <a class="page-link" href="#/btn/details">详情</a>
    <router-view></router-view>
  </div>
</template>
<script>
  import quiBtn from '../components/quiButton.vue' /*引用*/
  export default {
    name: 'pageQuiButton',
    components: {
      'qui-btn': quiBtn /*注册自定义标签*/
    },
    methods: {
      doSth: function(){
        alert('你点击了组件的click:btnClickEvent');
      }
    }
  }
</script>
