import { Song } from '~/@types/api'

export type RuntimeMessage =
  { type: 'INIT_RECORDING' } |
  { type: 'STOP_RECORDING' } |
  { type: 'FINISH_RECORDING', payload: { match: Song | null } }

declare global {
  // eslint-disable-next-line no-redeclare
  namespace chrome.runtime {
    export function sendMessage(message: RuntimeMessage, responseCallback?: (response: any) => void): void
    interface ExtensionMessageEvent {
      addListener(callback: (message: RuntimeMessage, sender: any, sendResponse: (response?: any) => void) => void): void
    }
  }
}
