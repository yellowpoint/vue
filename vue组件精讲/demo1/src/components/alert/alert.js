import Alert from './alert.vue'
import Vue from 'vue'

Alert.newInstance = (props = {
  notices: [{
    name: 111,
    content: 'aaaa'
  }]
}) => {
  const Instance = new Vue({
    data: {
      bb: 11
    },  //这个data只能在这个文件用啊，如在render中用this.bb;但是不能注入到alert.vue里，只能用props，或者mount之后再设置
    render(h) {
      return h(Alert, {
        props
      })
    }
  })
  console.log('Instance', Instance)

  const component = Instance.$mount()

  document.body.appendChild(component.$el)

  const alert = Instance.$children[0]
  alert.cc = 33
  alert.aa = 12
  return {
    add(e) {
      alert.add(e)
    },
    remove(name) {
      alert.remove(name)
    }
  }
}

// export default Alert

let messageInstance;

function getMessageInstance() {
  messageInstance = messageInstance || Alert.newInstance();
  return messageInstance
}

function add({
  duration = 1.5,
  content = ''
}) {
  let instance = getMessageInstance();
  instance.add({
    content,
    duration
  })
}

export default {
  info(options) {
    return add(options)
  }
}