class StorageHelper {
  public get = <T>(key: string): Promise<T> => {
    return new Promise<T>(resolve => {
      chrome.storage.sync.get(key, data => {
        console.log(`getting ${key}: `, data)
        if (data[key]) {
          resolve(data[key])
        }
      })
    })
  }

  public set = <T>(key: string, value: T): Promise<T> => {
    return new Promise<T>(resolve => {
      chrome.storage.sync.set({ [key]: value }, () => {
        console.log(`successfully set "${key}" to `, value)
        resolve(value)
      })
    })
  }

  public clearAll = (): void => {
    chrome.storage.sync.clear(() => {
      console.log('successfully cleared storage')
    })
  }

  public clear = (...keys: string[]): void => {
    chrome.storage.sync.remove(keys)
  }
}

export default new StorageHelper()
