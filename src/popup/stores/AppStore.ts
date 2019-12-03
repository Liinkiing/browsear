import { action, autorun, computed, observable } from 'mobx'
import StorageHelper from '~/services/StorageHelper'
import { AppTheme } from '~/enums'

interface AppSerializedState {
  readonly theme: AppTheme
}

export const APP_STORAGE_KEY = 'app-store'

export class AppStore {
  @observable public theme = AppTheme.Dark

  constructor() {
    StorageHelper.get<AppSerializedState>(APP_STORAGE_KEY).then(state => {
      this.populate(state)
    })
    autorun(() => {
      StorageHelper.set(APP_STORAGE_KEY, this.serialized)
    })
    autorun(() => {
      chrome.browserAction.setIcon({
        path: `assets/icon-128-${this.theme.toLowerCase()}.png`
      })
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
  protected get serialized(): AppSerializedState {
    return {
      theme: this.theme
    }
  }

  protected populate(state: AppSerializedState): void {
    this.theme = state.theme
  }

  public static getInitialState = (): AppSerializedState => ({
    theme: AppTheme.Dark
  })
}
