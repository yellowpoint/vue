
<template>
  <div class="tabs">
    <ul class="tabs-header">
      <slot></slot>
    </ul>
    <!-- <tabs-container :panes="panes"></tabs-container> -->
    <div class="tabs-content">
      <slot name="contents"></slot>
    </div>
  </div>
</template>

<script>
import tabsContainer from './tabs-container';
export default {
  name: 'Tabs',
  provide() {
    return {
      value: this.value
    }
  },
  components: {
    tabsContainer
  },
  data() {
    return {
      panes: []
      // contents: null
    };
  },
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  // render() {
  //   return (
  //     <div class='tabs'>
  //       <ul class='tabs-header'>{this.$slots.default}</ul>
  //       <tabs-container panes={this.panes}></tabs-container>
  //     </div>
  //   );
  // },
  mounted() {
    this.$slots.contents = [];
    this.$slots.contents.push(<div>this.$slots.contents</div>);
    console.log('this.$slots', this.$slots);
  },
  watch: {
    // panes() {
    //   console.log('watch');
    //   // console.log('pane',pane.$slots.default)
    //   this.$slots.contents = this.panes.filter(pane => {
    //     return pane.active;
    //   })[0].$slots.default;
    //   console.log('this.$slots.contents', this.$slots.contents);
    // }
  },
  computed: {
    // contents() {
    //   if (this.panes.length == 0) return;
    //   console.log('this.panes', JSON.stringify(this.panes));
    //   return this.panes.map(pane => {
    //     return pane.active ? pane.$slots.default : null;
    //   });
    // }
  },
  methods: {
    onChange(index) {
      this.$emit('change', index);
      // this.value = index;
    }
  }
};
</script>
