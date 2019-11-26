import { autorun, computed, observable } from 'mobx'
import StorageHelper from '~/services/StorageHelper'
import { MusicEntity } from '../../@types/api'

interface SerializedSongStore {
  readonly history: MusicEntity[],
}

const STORE_KEY = 'song-store'

export class SongStore {
  constructor() {
    StorageHelper.get<SerializedSongStore>(STORE_KEY).then(state => {
      this.populate(state)
    })
    autorun(() => {
      StorageHelper.set(STORE_KEY, this.serialized)
    })
  }

  public readonly history = observable.array<MusicEntity>([], { deep: false })

  @computed private get serialized(): SerializedSongStore {
    return {
      history: [...this.history]
    }
  }

  private populate(state: SerializedSongStore): void
  {
    this.history.replace(state.history || [])
  }
}
