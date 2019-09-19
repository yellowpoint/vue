<!-- 组件说明 -->
<template>
  <div class="">
    <h1>news</h1>
    <h2>newsId:{{$route.params.newsId}}</h2>
    <ul>
      <li><nuxt-link to="/">home</nuxt-link> </li>
      <li><nuxt-link :to="{name:'news-id',params:{id:111,title:'新闻一标题'}}">新闻一</nuxt-link> </li>
      <li><nuxt-link to="/news/222fff">新闻二</nuxt-link> </li>
    </ul>
  </div>
</template>

<script>
  //import x from ''
  export default {
    transition: 'test',
    name: '',
    components: {

    },
    props: {
      prop: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {

      };
    },
    computed: {

    },
    created(){

    },
    mounted(){

    },
    methods: {

    },
  }
</script>

<style lang='less' scoped>

</style>