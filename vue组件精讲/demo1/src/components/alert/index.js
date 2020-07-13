import Alert from './alert.js'

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