import StorageHelper from '~/services/StorageHelper'
import { SerializedState as SerializedSongState, STORAGE_KEY as SONG_STORAGE_KEY } from '~popup/stores/SongStore'
import ACRCloudClient from '~/services/client/ACRCloudClient'

export class AudioRecorder {
  private currentStream: MediaStream | null = null
  private recorder: MediaRecorder | null = null

  public get isRecording(): boolean {
    return this.recorder?.state === 'recording'
  }

  public record = (duration = 5000): void => {
    chrome.tabCapture.capture({
      audio: true,
      video: false
    }, stream => {
      if (stream && stream.getAudioTracks().length > 0) {
        this.currentStream = stream
        const audio = new Audio()
        audio.srcObject = stream
        audio.play()
        this.recorder = new MediaRecorder(stream)
        this.recorder.start()
        setTimeout(() => {
          this.stop()
        }, duration)
        this.recorder.ondataavailable = this.onRecordFinish
      }
    })
  }

  public stop = (): void => {
    if (this.recorder && this.recorder.state === 'recording') {
      this.recorder.stop()
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

  private onRecordFinish = (sample: BlobEvent): void => {
    ACRCloudClient.identify(sample).then(r => {
      console.log(r)
    })
    chrome.runtime.sendMessage({ type: 'FINISH_RECORDING', payload: { src: URL.createObjectURL(sample.data) } })
    StorageHelper.get<SerializedSongState>(SONG_STORAGE_KEY).then(state => {
      StorageHelper.set<SerializedSongState>(SONG_STORAGE_KEY, {
        ...state,
        records: [...state.records, URL.createObjectURL(sample.data)]
      })
    })
  }


}

declare global {
  interface Window {
    recorder: AudioRecorder
  }
}
