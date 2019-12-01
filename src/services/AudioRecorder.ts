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

  private onRecordFinish = async (sample: BlobEvent) => {
    const response = await ACRCloudClient.identify(sample)
    chrome.runtime.sendMessage({
      type: 'FINISH_RECORDING',
      payload: { match: response.data ? response.data.length > 0 ? response.data[0] : null : null}
    })
  }


}

declare global {
  interface Window {
    recorder: AudioRecorder
  }
}
