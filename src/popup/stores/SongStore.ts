import { observable, action, computed, autorun } from 'mobx'
import StorageHelper from '../../services/StorageHelper'

interface SerializedSongStore {
  count: number,
  name: string,
  age: number
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

  @observable public count = 0
  @observable public name = 'John Doe'
  @observable public age = 22

  @action public increment = (): void => {
    this.count++
  }

  @action decrement = (): void => {
    this.count--
  }

  @action changeName = (name: string): void => {
    this.name = name
  }

  @action changeAge = (age: number): void => {
    this.age = age
  }

  @computed private get serialized(): SerializedSongStore {
    return {
      count: this.count,
      name: this.name,
      age: this.age
    }
  }

  private populate(state: SerializedSongStore): void
  {
    Object.entries(state).forEach(entry => {
      (this as any)[entry[0]] = entry[1]
    })
  }
}
