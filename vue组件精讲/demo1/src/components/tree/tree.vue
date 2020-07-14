<!-- src/components/tree/tree.vue -->
<template>
  <div>
    <tree-node
      v-for="(item, index) in cloneData.children"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
    ></tree-node>
    <Tree
      v-if="cloneData.children.length"
      v-for="(item, index) in cloneData.children"
      :key="index+'a'"
      :data="item"
    ></Tree>
  </div>
</template>
<script>
import TreeNode from './node.vue';
import { deepCopy } from '@/utils/assist.js';

export default {
  name: 'Tree',
  components: { TreeNode },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cloneData: []
    }
  },
  watch: {
    data() {
      this.rebuildData();
    }
  },
  created() {
    this.rebuildData();
  },

  methods: {
    rebuildData() {
      this.cloneData = deepCopy(this.data);
    }
  }
}
</script>
