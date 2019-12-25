<!-- 组件说明 -->
<template>
  <div class="tilt">
    <Tilt
      className="Tilt"
      options="{ max : 25 }"
      style="{ height: 250, width: 250 }"
    >
      <div className="Tilt-inner"> 👽 </div>
    </Tilt>
  </div>
</template>

<script>
import Tilt from 'react-tilt'



export default {
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
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
}
</script>

<style lang='less' scoped>
</style>