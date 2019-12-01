import { action, autorun, computed, observable } from 'mobx'
import { Song } from '~/@types/api'
import StorageHelper from '~/services/StorageHelper'

export interface SerializedState {
  readonly history: Song[]
}

export const STORAGE_KEY = 'song-store'

export class SongStore {
  public history = observable.array<Song>([], { deep: false })

  @observable public recording = chrome.extension.getBackgroundPage()?.recorder.isRecording

  constructor() {
    StorageHelper.get<SerializedState>(STORAGE_KEY).then(state => {
      this.populate(state)
    })
    autorun(() => {
      StorageHelper.set(STORAGE_KEY, this.serialized)
    })
    chrome.runtime.onMessage.addListener(message => {
      if (message.type === 'FINISH_RECORDING') {
        this.recording = false
        if (message.payload.match) {
          this.history.replace([message.payload.match, ...this.history])
        }
      }
    })
  }

  @computed
  protected get serialized(): SerializedState {
    return {
      history: [...this.history]
    }
  }

  @action public clear = (): void => {
    this.history.replace([])
  }

  @action public requestRecording = (): void => {
    chrome.runtime.sendMessage({ type: 'INIT_RECORDING' })
    this.recording = true
  }

  @action public stopRecording = (): void => {
    chrome.runtime.sendMessage({ type: 'STOP_RECORDING' })
    this.recording = false
  }

  protected populate(state: SerializedState): void {
    this.history.replace(state.history || [])
  }
}
