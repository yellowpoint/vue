<template>
  <div>
    <i-form
      :model="formValidate"
      :rules="ruleValidate"
    >
      <i-form-item
        label="用户名"
        prop="name"
      >
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item
        label="邮箱"
        prop="mail"
      >
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
import iForm from '../components/form/form.vue';
import iFormItem from '../components/form/formItem.vue';
import iInput from '../components/input/input.vue';
export default {
  name: '',
  provide() {
    return {
      form_this: this
    }
  },
  components: { iForm, iFormItem, iInput },
  props: {
    prop: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
      }
    }
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