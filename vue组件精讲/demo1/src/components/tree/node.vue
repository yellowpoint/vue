<!-- 组件说明 -->
<template>
  <div class="">
    <span>{{ data.title }}</span>
    <!-- <tree-node
      v-if="data.expand"
      v-for="(item, index) in data.children"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
    ></tree-node> -->
  </div>
</template>

<script>
//import x from ''
export default {
  name: 'TreeNode',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => ({})
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