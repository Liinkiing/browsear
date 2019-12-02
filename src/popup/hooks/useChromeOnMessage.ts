import { RuntimeMessage } from '~/@types/events'
import { DependencyList, useEffect } from 'react'

const useChromeOnMessage = (
  type: RuntimeMessage['type'],
  callback: (payload: any) => void,
  deps?: DependencyList
): void => {
  useEffect(() => {
    const handler = (m: RuntimeMessage): void => {
      if (type === m.type) {
        callback(m)
      }
    }
    chrome.runtime.onMessage.addListener(handler)

    return () => {
      chrome.runtime.onMessage.removeListener(handler)
    }
  }, deps || [])
}

export default useChromeOnMessage
