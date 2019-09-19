import Vue from 'vue'
import Notification from './notification.vue';

const NotificationConstructor = Vue.extend(Notification);


let instances = []
let seed = 1

const notify = (options = {}) => {

  const position = options.position || 'top-right';
  const id = `Notification_${seed++}`

  let instance = new NotificationConstructor({
    propsData: options
  })

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el);
  instance.visible = true;


  let verticalOffset = 10;
  instances.forEach(item => {
    // 防止每个高度不一样
    verticalOffset += item.$el.offsetHeight + 10
  })

  instance.verticalOffset = verticalOffset

  instances.push(instance)
  instance.$on('closed', () => {
    if (!instance) return
    notifyClosed(instance)
    document.body.removeChild(instance.$el)
    instance.$destroy()
  })
  instance.$on('close', () => {
    instance.visible = false
  })


  return instance
}

const notifyClosed = instance => {
  console.log('instance', instance.id)
  let index = instances.findIndex(item => item.id === instance.id)
  let len = instances.length
  const removeHeight = instance.height
  if (len > 1) {
    for (let i = index + 1; i < len; i++) {
      instances[i].verticalOffset = parseInt(instances[i].verticalOffset - removeHeight - 10)
      console.log(i, instances[i].verticalOffset)
    }
  }

  instances.splice(index, 1)


}


export default notify
