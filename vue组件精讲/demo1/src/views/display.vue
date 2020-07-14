<!-- src/views/display.vue -->
<template>
  <div>
    <h3>动态渲染 .vue 文件的组件—— Display</h3>

    <i-display :code="code"></i-display>
    <tree :data="treeData2"></tree>
  </div>
</template>
<script>
import iDisplay from '@/components/display/display.vue';
import tree from '@/components/tree/tree.vue';
import defaultCode from './default-code.js';

export default {
  components: { iDisplay, tree },
  data() {
    return {
      code: defaultCode,
      treeData: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      treeData2: {
        title: 'parent 0',
        expand: true,
        children: [{
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }]
      }

    }
  }
}
</script>
