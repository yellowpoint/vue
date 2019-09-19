<template>
  <li
    :class="classNames"
    @click="handleClick"
  >
    <slot name="label">
      <span>{{label}}</span>
    </slot>
  </li>
</template>

<script>
export default {
  name: "Tab",
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: "tab"
    }
  },
  data() {
    return {
      // classNames: {
      //   tab: true,
      //   active: this.active
      // }
    };
  },
  mounted() {
    this.$parent.panes.push(this);
  },
  // inject:['value'], 值不是响应式的，有办法解决；当父级关系不确定的时候可以考虑用这个
  computed: {
    active() {
      return this.$parent.value === this.index;
    },
    classNames(){
      return  {
        tab: true,
        active: this.active
      }
    }
  },
  methods: {
    handleClick() {
      this.$parent.onChange(this.index);
    }
  },
  render() {
    // const tab = this.$slots.label || <span>{this.label}</span>;
    // const classNames = {
    //   tab: true,
    //   active: this.active
    // };
    // return (
    //   <li class={classNames} on-click={this.handleClick}>
    //     {tab}
    //   </li>
    // );
  }
};
</script>
<style scoped>
.tab {
  display: inline;
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
}

.tab.active {
  border-bottom: 2px solid blue;
}

.tab:last-child {
  margin-right: 0;
}
</style>
