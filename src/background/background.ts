import { AudioRecorder } from '~/services/AudioRecorder'
import StorageHelper from '~/services/StorageHelper'
import { SONG_STORAGE_KEY, SongStore } from '~popup/stores/SongStore'
import { APP_STORAGE_KEY, AppStore } from '~popup/stores/AppStore'

window.recorder = new AudioRecorder()
window.unreadMatches = 0

chrome.runtime.onInstalled.addListener(() => {
  StorageHelper.set(SONG_STORAGE_KEY, SongStore.getInitialState())
  StorageHelper.set(APP_STORAGE_KEY, AppStore.getInitialState())
})

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
