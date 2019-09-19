<template>
  <div>
    <h2>新闻详情</h2>
    <h2>newsId:{{$route.params.id}}</h2>
    <ul>
      <li><nuxt-link to="/">home</nuxt-link> </li>
    </ul>
  </div>
</template>

<script>
export default {
  validate({params}){
    return /^\d+$/.test(params.id)
  },
  data(){
    return{
      title:this.$route.params.title
    }
  },
  head(){
    return{
      title:this.title,
      meta:[
        {hid:'description',name:'description',content:'fffff'}
      ]
    }
  }
}
</script>

<style>

</style>
