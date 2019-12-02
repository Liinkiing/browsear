import { AudioRecorder } from '~/services/AudioRecorder'

window.recorder = new AudioRecorder()
window.unreadMatches = 0

chrome.runtime.onInstalled.addListener(() => {
  console.log('app was installed')
})

chrome.runtime.onMessage.addListener(message => {
  switch (message.type) {
    case 'INIT_RECORDING':
      window.recorder.record()
      break
    case 'STOP_RECORDING':
      window.recorder.stop()
      break
  }
})
