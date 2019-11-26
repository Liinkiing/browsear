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

  public set = <T>(key: string, value: T): void => {
    chrome.storage.sync.set({ [key]: value }, () => {
      console.log(`successfully set "${key}" to `, value)
    })
  }

  public clear = (): void => {
    chrome.storage.sync.clear(() => {
      console.log('successfully cleared storage')
    })
  }


}

export default new StorageHelper()
