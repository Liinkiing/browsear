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

  public record = (duration = 5000): void => {
    chrome.tabCapture.capture(
      {
        audio: true,
        video: false
      },
      stream => {
        if (stream && stream.getAudioTracks().length > 0) {
          chrome.browserAction.setBadgeText({
            text: 'rec'
          })
          this.currentStream = stream
          const audio = new Audio()
          audio.srcObject = stream
          audio.play()
          this.recorder = new MediaRecorder(stream)
          this.recorder.start()
          this.timeout = (setTimeout(() => {
            this.stop()
          }, duration) as unknown) as number
          this.recorder.ondataavailable = this.onRecordFinish
        }
      }
    )
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
    const response = await ACRCloudClient.identify(sample)

    const match = response.data
      ? response.data.length > 0
        ? response.data[0]
        : null
      : null
    if (match) {
      const thumbnail = match.spotify_id
        ? (await SpotifyOEmbedClient.oembed(match.spotify_id)).thumbnail_url
        : null
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
