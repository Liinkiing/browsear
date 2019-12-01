declare namespace chrome.runtime {
  export function sendMessage(message: musicalapp.RuntimeMessage, responseCallback?: (response: any) => void): void
  interface ExtensionMessageEvent {
    addListener(callback: (message: musicalapp.RuntimeMessage, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void): void
  }
}
