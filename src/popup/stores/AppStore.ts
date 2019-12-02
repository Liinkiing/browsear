import { action, autorun, computed, observable } from 'mobx'
import StorageHelper from '~/services/StorageHelper'
import { AppTheme } from '~/enums'

interface SerializedState {
  readonly theme: AppTheme
}

const STORAGE_KEY = 'app-store'

export class AppStore {
  @observable public theme = AppTheme.Dark

  constructor() {
    StorageHelper.get<SerializedState>(STORAGE_KEY).then(state => {
      this.populate(state)
    })
    autorun(() => {
      StorageHelper.set(STORAGE_KEY, this.serialized)
    })
  }

  public clearBadge = (): void => {
    chrome.extension.getBackgroundPage()!.unreadMatches = 0
    chrome.browserAction.setBadgeText({
      text: ''
    })
  }

  @action public toggleTheme = (): void => {
    this.theme = this.theme === AppTheme.Dark ? AppTheme.Light : AppTheme.Dark
  }

  @computed
  protected get serialized(): SerializedState {
    return {
      theme: this.theme
    }
  }

  protected populate(state: SerializedState): void {
    this.theme = state.theme
  }
}
