class StorageHelper {
  public get = <T>(key: string): Promise<T> => {
    return new Promise<T>(resolve => {
      chrome.storage.sync.get(key, data => {
        if (data[key]) {
          resolve(data[key])
        }
      })
    })
  }

  public set = <T>(key: string, value: T): Promise<T> => {
    return new Promise<T>(resolve => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve(value)
      })
    })
  }

  public clearAll = (): void => {
    chrome.storage.sync.clear(() => {})
  }

  public clear = (...keys: string[]): Promise<void> => {
    return new Promise<void>(resolve => {
      chrome.storage.sync.remove(keys, resolve)
    })
  }
}

export default new StorageHelper()
