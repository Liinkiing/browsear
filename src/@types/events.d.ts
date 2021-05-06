import { Song } from '~/@types/api/acrcloud'
import { LocalSong } from '~popup/stores/SongStore'

export type RuntimeMessage =
  | { type: 'ON_BG_RECORDING_START' }
  | { type: 'ON_BG_RECORDING_STOP'; payload: { match: LocalSong | null } }
  | { type: 'INIT_RECORDING' }
  | { type: 'START_FETCHING_METADATA' }
  | { type: 'STOP_FETCHING_METADATA' }
  | { type: 'STOP_RECORDING' }
  | { type: 'MATCH_FOUND'; payload: { match: Song } }
  | { type: 'NO_MATCH_FOUND' }

export type CommandMessage = 'toggle-recording'

declare global {
  // eslint-disable-next-line no-redeclare
  namespace chrome.commands {
    interface CommandEvent {
      addListener(callback: (message: CommandMessage) => void): void
    }
  }
  // eslint-disable-next-line no-redeclare
  namespace chrome.runtime {
    export function sendMessage(
      message: RuntimeMessage,
      responseCallback?: (response: any) => void
    ): void
    interface ExtensionMessageEvent {
      addListener(
        callback: (
          message: RuntimeMessage,
          sender: any,
          sendResponse: (response?: any) => void
        ) => void
      ): void
    }
  }
}
