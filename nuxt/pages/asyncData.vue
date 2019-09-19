<template>
  <div>
    {{info.name}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: 'aa22a'
    }
  },
  // asyncData() {
  //   return axios.get('https://api.myjson.com/bins/11l7rl')
  //     .then(res => {
  //       return { info: res.data }
  //     })
  // }
  async asyncData(){
    let {data} = await axios.get('https://api.myjson.com/bins/11l7rl')
    return { info: data }
  }
}
</script>

<style>
</style>
