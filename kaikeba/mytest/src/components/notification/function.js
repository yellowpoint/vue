import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(item => instance.id == item.id)
  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset - removeHeight - 16)
  }
}

const notify = (options) => {
  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data() {
      return {
        autoClose: autoClose ? autoClose : 3000
      }
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el) 
  instance.vm.visible = true
  let verticalOffset = 16;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm //可以不返回，但返回方便以后可能要操作
}

export default notify
