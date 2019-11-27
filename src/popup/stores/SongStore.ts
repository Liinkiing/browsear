import { autorun, computed, observable } from 'mobx'
import { MusicEntity } from '~/@types/api'
import StorageHelper from '~/services/StorageHelper'

interface SerializedState {
  readonly history: MusicEntity[]
}

const STORAGE_KEY = 'song-store'

export class SongStore {
  constructor() {
    StorageHelper.get<SerializedState>(STORAGE_KEY).then(state => {
      this.populate(state)
    })
    autorun(() => {
      StorageHelper.set(STORAGE_KEY, this.serialized)
    })
  }

  public history = observable.array<MusicEntity>([], { deep: false })

  @computed
  protected get serialized(): SerializedState {
    return {
      history: [...this.history]
    }
  }

  protected populate(state: SerializedState): void {
    this.history.replace(state.history || [])
  }
}
