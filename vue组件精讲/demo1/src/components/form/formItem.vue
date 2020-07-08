<!-- form-item.vue -->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'iFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    },
    mounted() {
      if (this.prop) {
        this.dispatch('iForm', 'on-form-item-add', this);
        this.setRules();
      }
    },
    methods: {
      setRules() {
        this.$on('on-form-blur', this.onFieldBlur);
        this.$on('on-form-change', this.onFieldChange);
      },
    },
  }
}
</script>
