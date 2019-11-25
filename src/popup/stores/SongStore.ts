import { observable, action, computed } from 'mobx'

export class SongStore {
  @observable public count = 0

  @action public increment = (): void => {
    this.count++
  }

  @action decrement = (): void => {
    this.count--
  }

  @computed get doubleCount(): number {
    return this.count * 2
  }
}
