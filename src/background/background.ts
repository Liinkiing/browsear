import { AudioRecorder } from '~/services/AudioRecorder'

window.recorder = new AudioRecorder()
window.unreadMatches = 0

chrome.runtime.onInstalled.addListener(() => {})

chrome.commands.onCommand.addListener(command => {
  switch (command) {
    case 'toggle-recording':
      if (window.recorder.isRecording) {
        window.recorder.stop()
      } else {
        window.recorder.record()
      }
      break
  }
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
