import { action, autorun, computed, observable } from 'mobx'
import { Song } from '~/@types/api'
import StorageHelper from '~/services/StorageHelper'

export interface SongSerializedState {
  readonly history: Song[]
}

export const SONG_STORAGE_KEY = 'song-store'

export class SongStore {
  public history = observable.array<Song>([], { deep: false })

  @observable public recording =
    chrome.extension.getBackgroundPage()?.recorder.isRecording || false

  constructor() {
    this.populateFromStorage()
    autorun(() => {
      StorageHelper.set(SONG_STORAGE_KEY, this.serialized)
    })
    chrome.runtime.onMessage.addListener(message => {
      if (message.type === 'STOP_RECORDING') {
        this.recording = false
      } else if (message.type === 'MATCH_FOUND') {
        this.populateFromStorage()
      }
    })
  }

  @computed
  protected get serialized(): SongSerializedState {
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

  protected populate(state: SongSerializedState): void {
    this.history.replace(state.history || [])
  }

  protected populateFromStorage(): void {
    StorageHelper.get<SongSerializedState>(SONG_STORAGE_KEY).then(state => {
      this.populate(state)
    })
  }
}
