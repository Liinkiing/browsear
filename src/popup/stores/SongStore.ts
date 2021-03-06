import { action, autorun, computed, observable } from 'mobx'
import { Song } from '~/@types/api/acrcloud'
import StorageHelper from '~/services/StorageHelper'

export type LocalSong = Song & {
  requestedAt: number
  thumbnail: string | null
  unread: boolean
}

export interface SongSerializedState {
  readonly history: LocalSong[]
}

export const SONG_STORAGE_KEY = 'song-store'

export class SongStore {
  public history = observable.array<LocalSong>([], { deep: false })

  @observable public fetchingMetadatas = false
  @observable public recording =
    chrome.extension.getBackgroundPage()?.recorder.isRecording || false

  constructor() {
    this.populateFromStorage()
    autorun(() => {
      StorageHelper.set(SONG_STORAGE_KEY, this.serialized)
    })
    chrome.runtime.onMessage.addListener(message => {
      switch (message.type) {
        case 'START_FETCHING_METADATA':
          this.fetchingMetadatas = true
          break
        case 'STOP_FETCHING_METADATA':
          this.fetchingMetadatas = false
          break
        case 'STOP_RECORDING':
          this.recording = false
          break
        case 'MATCH_FOUND':
          this.populateFromStorage()
          break
      }
    })
  }

  @computed
  protected get serialized(): SongSerializedState {
    return {
      history: [...this.history]
    }
  }

  @computed
  public get matchesCount(): number {
    return this.history.length
  }

  @computed
  public get hasUnreadMatches(): boolean {
    return this.history.filter(match => match.unread).length > 0
  }

  @computed
  public get unreadMatchesCount(): number {
    return this.history.filter(match => match.unread).length
  }

  @action public clear = (): void => {
    this.history.replace([])
    StorageHelper.clear(SONG_STORAGE_KEY).then(this.populateFromStorage)
  }

  @action public markUnreadAsRead = (): void => {
    this.history.replace(
      this.history.map(entry => ({ ...entry, unread: false }))
    )
  }

  @action public removeSong = (song: LocalSong): void => {
    this.history.remove(song)
  }

  @action public requestRecording = (): void => {
    chrome.runtime.sendMessage({ type: 'INIT_RECORDING' })
    this.recording = true
  }

  @action public stopRecording = (): void => {
    chrome.runtime.sendMessage({ type: 'STOP_RECORDING' })
    this.recording = false
  }

  protected populate = (state: SongSerializedState): void => {
    this.history.replace(state.history || [])
  }

  protected populateFromStorage = (): void => {
    StorageHelper.get<SongSerializedState>(SONG_STORAGE_KEY).then(state => {
      this.populate(state)
    })
  }

  public static getInitialState = (): SongSerializedState => ({
    history: []
  })
}
