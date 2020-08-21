import ACRCloudClient from '~/services/client/ACRCloudClient'
import StorageHelper from '~/services/StorageHelper'
import {
  LocalSong,
  SONG_STORAGE_KEY,
  SongSerializedState
} from '~popup/stores/SongStore'
import { Song } from '~/@types/api/acrcloud'
import SpotifyOEmbedClient from '~/services/client/SpotifyOEmbedClient'

const MAX_MATCHES_ENTRY = 20

export class AudioRecorder {
  private currentStream: MediaStream | null = null
  private recorder: MediaRecorder | null = null
  private timeout: number | null = null

  public get isRecording(): boolean {
    return this.recorder?.state === 'recording'
  }

  public record = (duration = 12000): void => {
    if (this.recorder?.state !== 'recording') {
      chrome.tabCapture.capture(
        {
          audio: true,
          video: false
        },
        stream => {
          if (stream && stream.getAudioTracks().length > 0) {
            this.currentStream = stream
            const audio = new Audio()
            audio.srcObject = stream
            audio.play()
            this.recorder = new MediaRecorder(stream)
            this.recorder.start()
            chrome.browserAction.setBadgeText({
              text: 'rec'
            })
            if (chrome.extension.getViews({ type: 'popup' }).length === 0) {
              chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                if (tabs.length > 0) {
                  chrome.tabs.sendMessage(tabs[0].id!, {
                    type: 'ON_BG_RECORDING_START'
                  })
                }
              })
            }
            this.timeout = (setTimeout(() => {
              this.stop()
            }, duration) as unknown) as number
            this.recorder.ondataavailable = this.onRecordFinish
          }
        }
      )
    }
  }

  public stop = (): void => {
    if (this.recorder && this.recorder.state === 'recording') {
      this.recorder.stop()
      this.timeout && clearTimeout(this.timeout)
    }
    if (this.currentStream) {
      this.currentStream.getVideoTracks().forEach(video => {
        video.stop()
      })
      this.currentStream.getAudioTracks().forEach(audio => {
        audio.stop()
      })
      this.currentStream = null
    }
  }

  private onRecordFinish = async (sample: BlobEvent) => {
    chrome.runtime.sendMessage({
      type: 'STOP_RECORDING'
    })
    chrome.browserAction.setBadgeText({
      text: ''
    })
    const response = await ACRCloudClient.identify(sample)

    const match = response.data
      ? response.data.length > 0
        ? response.data[0]
        : null
      : null
    if (match) {
      let thumbnail: string | null
      try {
        thumbnail = match.spotify_id
          ? (await SpotifyOEmbedClient.oembed(match.spotify_id)).thumbnail_url
          : null
      } catch {
        console.log('An error occured while fetching informations from Spotify')
        thumbnail = null
      }
      const entry = this.buildLocalMatch(match, thumbnail)
      StorageHelper.get<SongSerializedState>(SONG_STORAGE_KEY).then(state => {
        StorageHelper.set<SongSerializedState>(SONG_STORAGE_KEY, {
          history: [entry, ...state.history.slice(0, MAX_MATCHES_ENTRY)]
        }).then(() => {
          if (chrome.extension.getViews({ type: 'popup' }).length === 0) {
            window.unreadMatches++
            chrome.browserAction.setBadgeText({
              text: window.unreadMatches.toString()
            })
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
              if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id!, {
                  type: 'ON_BG_RECORDING_STOP',
                  payload: { match: entry }
                })
              }
            })
          }
          chrome.runtime.sendMessage({
            type: 'MATCH_FOUND',
            payload: {
              match: entry
            }
          })
        })
      })
    } else {
      if (chrome.extension.getViews({ type: 'popup' }).length === 0) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id!, {
              type: 'ON_BG_RECORDING_STOP',
              payload: { match: null }
            })
          }
        })
      }
      chrome.runtime.sendMessage({
        type: 'NO_MATCH_FOUND'
      })
    }
  }

  private buildLocalMatch = (
    match: Song,
    thumbnail: string | null = null
  ): LocalSong => ({
    ...match,
    unread: true,
    requestedAt: Date.now(),
    thumbnail
  })
}

declare global {
  interface Window {
    recorder: AudioRecorder
    unreadMatches: number
  }
}
